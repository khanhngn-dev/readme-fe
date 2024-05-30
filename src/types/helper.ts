// Pick property that is nullable
export type PickNullable<T> = {
  [P in keyof T as null extends T[P] ? P : never]: T[P];
};

// Pick property that is not nullable
export type PickNotNullable<T> = {
  [P in keyof T as null extends T[P] ? never : P]: T[P];
};

// Optional nullable properties
export type OptionalNullable<T> = {
  [K in keyof PickNullable<T>]?: T[K];
} & {
  [K in keyof PickNotNullable<T>]: T[K];
};
