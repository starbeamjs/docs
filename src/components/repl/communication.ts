export interface ChildAPI {
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

export interface ParentAPI {
  add(a: number, b: number): number;
}
