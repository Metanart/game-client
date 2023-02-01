export const checkIfArraysAreEquival = (a: number[], b: number[]) =>
    a.length === b.length && a.every((ai, i) => ai === b[i]);

export const checkIfArrayIsBigger = (a: number[], b: number[]) =>
    a.length === b.length && a.every((ai, i) => ai > b[i]);

export const checkIfArrayIsBiggerOrEquival = (a: number[], b: number[]) =>
    a.length === b.length && a.every((ai, i) => ai >= b[i]);

export const checkIfArrayIsSmaller = (a: number[], b: number[]) =>
    a.length === b.length && a.every((ai, i) => ai < b[i]);

export const checkIfArrayIsSmallerOrEquival = (a: number[], b: number[]) =>
    a.length === b.length && a.every((ai, i) => ai <= b[i]);
