import * as React from "react";
import { ReactWrapper } from "enzyme";
import _ from "lodash";

/**
 * A type that can be null or undefined.
 */
export type nil = null | undefined;

/**
 * A simple pair of typed value and label.
 */
export interface ValueLabelPair<T> {
    /**
     * The value of an item.
     */
    value: T;
    /**
     * The display label for an item.
     */
    label: string;
}

/**
 * Generic interface for a simple object used as a map of type T, keyed by string.
 */
export interface ObjectMap<T> {
    [name: string]: T;
}

/**
 * Generic interface for a simple object used as a map of type T, keyed by number.
 */
export interface ObjectMapByNumber<T> {
    [name: number]: T;
}

/**
 * Extracts keys of type T that are assignable to string.
 * (omits number and symbol key types).
 */
export type StringKeyOf<T> = Extract<keyof T, string>;

/**
 * Extracts keys of type T that are assignable to number.
 * (omits string and symbol key types).
 */
export type NumberKeyOf<T> = Extract<keyof T, number>;

/**
 * Remove types from T that are not assignable to U
 */
export type Filter<T, U> = T extends U ? T : never;

/**
 * Removes null from type T.
 */
export type NonNull<T> = Exclude<T, null>;

/**
 * Removes undefined from type T.
 */
export type NonUndefined<T> = Exclude<T, undefined>;

/**
 * Removes null and undefined from type T.
 */
export type NonNil<T> = Exclude<T, nil>;

/**
 * Utility type that modifies an object type to allow `undefined` on all properties.
 */
export type WithUndefinedProperties<T extends {}> = {
    [P in keyof T]: T[P] | undefined
};

/**
 * Extracts the type of a React component's props from the React component type T.
 * Usage example: type MyComponentProps = ExtractReactPropsType<typeof MyComponent>;
 */
export type ExtractReactPropsType<T> = T extends React.ComponentType<infer P>
    ? P
    : T extends React.Component<infer P>
    ? P
    : T extends React.ComponentClass<infer P>
    ? P
    : never;

/**
 * Builds an enzyme ReactWrapper type from the React component type T.
 * Usage example: type MyComponentWrapper = ReactWrapperType<typeof MyComponent>;
 */
export type EnzymeWrapperType<T> = ReactWrapper<ExtractReactPropsType<T>>;

/**
 * Adds a string "id" property to any type.
 */
export type WithId<T> = T & {
    /**
     * The ID of this object.
     */
    id: string;
};

/**
 * Deep/recursive version of the standard Partial<T> type.
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : DeepPartial<T[P]>
};

/**
 * Gets keys of type T whose types are assignable to type U.
 * E.g., get keys of all string properties: KeysOfType<SampleType, string>
 */
export type KeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never
}[keyof T];

/**
 * Gets string keys of type T whose types are assignable to type U.
 * E.g., get keys of all string properties: StringKeysOfType<SampleType, string>
 */
export type StringKeysOfType<T, U> = Extract<KeysOfType<T, U>, string>;
