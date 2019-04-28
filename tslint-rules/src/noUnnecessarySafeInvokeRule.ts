import * as ts from "typescript";
import * as Lint from "tslint";
import { RuleFailure } from "tslint/lib/language/rule/rule";

/**
 * Custom TSLint rule that fails if the "safeInvoke" utility function is used
 * on a function that is guaranteed to never be null or undefined.
 */
export class Rule extends Lint.Rules.TypedRule {
    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): RuleFailure[] {
        return this.applyWithWalker(new Walker(sourceFile, this.getOptions(), program));
    }
}

class Walker extends Lint.ProgramAwareRuleWalker {
    public visitCallExpression(node: ts.CallExpression): void {
        // The expression being called as a function
        const expression = node.expression;

        // Ignore call expressions that are not calling "safeInvoke".
        if (!ts.isIdentifier(expression) || expression.text !== "safeInvoke") {
            return;
        }

        // The first argument to "safeInvoke", which is the function to be invoked.
        const functionArg = node.arguments[0];

        // Ignore calls to "safeInvoke" with 0 arguments (this will be a compiler error)
        if (!functionArg) {
            return;
        }

        // The type of the function argument passed to "safeInvoke"
        // TODO-PDSWEBAPP-741: This returns type "any" in cases where the type should be well-known. Why?
        // - One case: argument is a property of a generic interface.
        // - Another case: argument is a property of a 3rd party interface (defined in node_modules).
        // - This causes false negatives.
        // - Are we not using the TS API correctly?
        // - Are we not configuring/running tslint correctly?
        const type = this.getTypeChecker().getTypeAtLocation(functionArg);

        if (!isTypePossiblyNullOrUndefined(type)) {
            // The rest of the arguments to "safeInvoke" (to be passed to the invoked function)
            const otherArgs = node.arguments.slice(1);
            const otherArgsAsText = otherArgs.map((otherArg) => otherArg.getText()).join(", ");

            this.addFailureAt(
                expression.getStart(),
                expression.getWidth(),
                `Unnecessary use of safeInvoke. The function parameter is not possibly null/undefined.`,
                // Fix by replacing the "safeInvoke" call with a direct call the the desired function
                Lint.Replacement.replaceNode(node, `${functionArg.getText()}(${otherArgsAsText})`)
            );
        }
    }
}

/**
 * Test if a type could potentially allow a value of null or undefined.
 * @param type - The Type to test.
 * @return True if the type could potentially allow a value of null or undefined.
 */
function isTypePossiblyNullOrUndefined(type: ts.Type): boolean {
    // If this is a union type, then recursively test if any types in the union are
    // possibly null/undefined.
    if (type.isUnion()) {
        return type.types.some((aType) => isTypePossiblyNullOrUndefined(aType));
    }

    // NOTE: For the purpose of this rule, type "any" is considered potentially null or undefined.
    //       This is because there's no guarantee that it won't be null/undefined, so
    // tslint:disable-next-line:no-bitwise
    return !!(type.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.Void | ts.TypeFlags.Any));
}