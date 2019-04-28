"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var Lint = require("tslint");
/**
 * Custom TSLint rule that fails if the "safeInvoke" utility function is used
 * on a function that is guaranteed to never be null or undefined.
 */
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithWalker(new Walker(sourceFile, this.getOptions(), program));
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
var Walker = /** @class */ (function (_super) {
    __extends(Walker, _super);
    function Walker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Walker.prototype.visitCallExpression = function (node) {
        // The expression being called as a function
        var expression = node.expression;
        // Ignore call expressions that are not calling "safeInvoke".
        if (!ts.isIdentifier(expression) || expression.text !== "safeInvoke") {
            return;
        }
        // The first argument to "safeInvoke", which is the function to be invoked.
        var functionArg = node.arguments[0];
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
        var type = this.getTypeChecker().getTypeAtLocation(functionArg);
        if (!isTypePossiblyNullOrUndefined(type)) {
            // The rest of the arguments to "safeInvoke" (to be passed to the invoked function)
            var otherArgs = node.arguments.slice(1);
            var otherArgsAsText = otherArgs.map(function (otherArg) { return otherArg.getText(); }).join(", ");
            this.addFailureAt(expression.getStart(), expression.getWidth(), "Unnecessary use of safeInvoke. The function parameter is not possibly null/undefined.", 
            // Fix by replacing the "safeInvoke" call with a direct call the the desired function
            Lint.Replacement.replaceNode(node, functionArg.getText() + "(" + otherArgsAsText + ")"));
        }
    };
    return Walker;
}(Lint.ProgramAwareRuleWalker));
/**
 * Test if a type could potentially allow a value of null or undefined.
 * @param type - The Type to test.
 * @return True if the type could potentially allow a value of null or undefined.
 */
function isTypePossiblyNullOrUndefined(type) {
    // If this is a union type, then recursively test if any types in the union are
    // possibly null/undefined.
    if (type.isUnion()) {
        return type.types.some(function (aType) { return isTypePossiblyNullOrUndefined(aType); });
    }
    // NOTE: For the purpose of this rule, type "any" is considered potentially null or undefined.
    //       This is because there's no guarantee that it won't be null/undefined, so
    // tslint:disable-next-line:no-bitwise
    return !!(type.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.Void | ts.TypeFlags.Any));
}
