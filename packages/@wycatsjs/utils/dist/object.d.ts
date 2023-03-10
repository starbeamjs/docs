type Value<R> = R[keyof R];
export declare function mapEntries<R extends Record<keyof any, any>, U>(obj: R, fn: (value: Value<R>, key: keyof R, obj: R) => [keyof R, U]): Record<keyof R, U>;
export {};
//# sourceMappingURL=object.d.ts.map