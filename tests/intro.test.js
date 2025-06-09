import { describe, test, it, expect } from 'vitest';
import { max, fizzBuzz, calculateAverage, factorial } from '../src/intro';

describe('max', () => {
  it('should return the first argument if it is greater', () => {
    expect(max(2, 1)).toBe(2);
  });
  it('should return the second argument if it is greater', () => {
    expect(max(1, 2)).toBe(2);
  });
  it('should return the first argument if arguments are equal', () => {
    expect(max(2, 2)).toBe(2);
  });
});

describe('fizzBuzz', () => {
  it('should return FizzBuzz if the arg is divisible by 3 and 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });
  it('should return Fizz if the arg is divisible by 3 and not 5', () => {
    expect(fizzBuzz(3)).toBe('Fizz');
  });
  it('should return Buzz if the arg is divisible by 5 and not 3', () => {
    expect(fizzBuzz(5)).toBe('Buzz');
  });
  it('should return the arg as string if it is not by 3 or 5', () => {
    expect(fizzBuzz(7)).toBe('7');
  });
});

describe('calculateAverage', () => {
  it('should return NaN if given an empty array', () => {
    expect(calculateAverage([])).toBe(NaN);
  });
  it('should calculate the average of an array with a single element', () => {
    expect(calculateAverage([1])).toBe(1);
  });
  it('should calculate the average of an array with 2 elements', () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });
  it('should calculate the average of an array with 3 elements', () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe('factorial', () => {
  it('should return 1 if given a 0', () => {
    expect(factorial(0)).toBe(1);
  });
  it('should return 1 if given a 1', () => {
    expect(factorial(1)).toBe(1);
  });
  it('should return 2 if given a 2', () => {
    expect(factorial(2)).toBe(2);
  });
  it('should return 6 if given a 3', () => {
    expect(factorial(3)).toBe(6);
  });
  it('should return 24 if given a 4', () => {
    expect(factorial(4)).toBe(24);
  });
  it('should return undefined if given a negative number', () => {
    expect(factorial(-1)).toBeUndefined();
  });
});
