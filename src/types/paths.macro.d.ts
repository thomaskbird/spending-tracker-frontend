// Type definitions for {@link https://www.npmjs.com/package/paths.macro}
declare module "paths.macro" {
    /**
     * Absolute path to NPM project root.
     * Example: "/Users/your/project"
     */
    export const npmRoot: string;
    /**
     * Absolute path to Git project root.
     * Example: "/Users/your/project"
     */
    export const gitRoot: string;
    /**
     * Absolute path to current working directory.
     * Example: "/Users/your/project"
     */
    export const wd: string;
    /**
     * Absolute path to current source file.
     * Example: "/Users/your/project/src/file.ts"
     */
    export const fileAbsolute: string;
    /**
     * Current source file name (with extension).
     * Example: "file.ts"
     */
    export const file: string;
    /**
     * File extension of the current source file.
     * (Yes, the variable name is misspelled).
     * Example: ".ts"
     */
    export const extention: string;
    /**
     * Current source file name (without extension).
     * Example: "file"
     */
    export const filename: string;
    /**
     * Absolute path the directory containing the current source file.
     * Example: "/Users/you/project/src/"
     */
    export const baseAbsolute: string;
    /**
     * Path to the directory containing the current source file, relative to the
     * project root.
     * Example: "/src/"
     */
    export const base: string;
    export default base;
}
