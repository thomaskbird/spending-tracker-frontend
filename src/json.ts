/**
 * Type declarations and utilities for working with JSON-compatible data structures.
 * @module
 */

/**
 * Any primitive data type that is allowed in JSON, except null.
 */
export type JSONPrimitiveNonNull = string | number | boolean;

/**
 * Any primitive data type that is allowed in JSON.
 */
export type JSONPrimitive = JSONPrimitiveNonNull | null;

/**
 * Any value data type allowed in JSON (primitives, arrays, and objects), except null
 */
export type JSONValueNonNull = JSONPrimitiveNonNull | JSONArray | JSONObject;

/**
 * Any value data type allowed in JSON (primitives, arrays, and objects).
 */
export type JSONValue = JSONValueNonNull | null;

/**
 * An array of data types allowed in JSON.
 */
export interface JSONArray extends Array<JSONValue> {}

/**
 * An object whose properties are of types allowed in JSON.
 */
export interface JSONObject {
    [name: string]: JSONValue;
}

/**
 * Test if a JSONValue is a JSONObject.
 * @param jsonValue - The value to be tested.
 * @return true if the JSONValue is a JSONObject.
 */
export function isJSONObject(jsonValue: JSONValue): jsonValue is JSONObject {
    return jsonValue != null && jsonValue.constructor === Object;
}

/**
 * Test if a JSONValue is a JSONArray.
 * @param jsonValue - The value to be tested.
 * @return true if the JSONValue is a JSONArray.
 */
export function isJSONArray(jsonValue: JSONValue): jsonValue is JSONArray {
    return jsonValue instanceof Array;
}

/**
 * Test if a JSONValue is a JSONPrimitive.
 * @param jsonValue - The value to be tested.
 * @return true if the JSONValue is a JSONPrimitive.
 */
export function isJSONPrimitive(
    jsonValue: JSONValue
): jsonValue is JSONPrimitive {
    return !isJSONArray(jsonValue) && !isJSONObject(jsonValue);
}

/**
 * Test if a JSONValue is a string.
 * @param jsonValue - The value to be tested.
 * @return true if the JSONValue is a string.
 */
export function isJSONString(jsonValue: JSONValue): jsonValue is string {
    return typeof jsonValue === "string";
}

/**
 * Test if a JSONValue is a number.
 * @param jsonValue - The value to be tested.
 * @return true if the JSONValue is a number.
 */
export function isJSONNumber(jsonValue: JSONValue): jsonValue is number {
    return typeof jsonValue === "number";
}

/**
 * Test if a JSONValue is a boolean.
 * @param jsonValue - The value to be tested.
 * @return true if the JSONValue is a boolean.
 */
export function isJSONBoolean(jsonValue: JSONValue): jsonValue is boolean {
    return typeof jsonValue === "boolean";
}
