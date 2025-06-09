import { describe, it, expect, beforeEach, beforeAll, afterAll, afterEach } from "vitest";
import { calculateDiscount, canDrive, fetchData, getCoupons, isPriceInRange, isValidUsername, Stack, validateUserInput } from "../src/core";

describe('getCoupons', () => {
  it('should return an array of coupons', () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });
  it('should return an array with valid coupon codes', () => {
    const coupons = getCoupons();
    coupons.forEach(coupon => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string');
      expect(coupon.code).toBeTruthy();
    });
  });
  it('should return an array with valid discounts', () => {
    const coupons = getCoupons();
    coupons.forEach(coupon => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number');
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe('calculateDiscount', () => {
  it('should return dicounted price if given valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });
  it('should handle non-numeric price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
  });
  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });
  it('should handle non-string discount code', () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });
  it('should handle invalid discount code', () => {
    expect(calculateDiscount(10, 'INVALID')).toBe(10);
  });
});

describe('validateUserInput', () => {
  it('should return success if given valid input', () => {
    expect(validateUserInput('mosh', 42)).toMatch(/success/i);
  });
  it('should return an error if username is not a string', () => {
    expect(validateUserInput(1, 42)).toMatch(/invalid/i);
  });
  it('should return an error if username is less than 3 characters', () => {
    expect(validateUserInput('ab', 42)).toMatch(/invalid/i);
  });
  it('should return an error if username is longer than 255 characters', () => {
    expect(validateUserInput('A'.repeat(256), 42)).toMatch(/invalid/i);
  });
  it('should return an error if age is not a number', () => {
    expect(validateUserInput('mosh', '42')).toMatch(/invalid/i);
  });
  it('should return an error if age is less than 18', () => {
    expect(validateUserInput(1, 17)).toMatch(/invalid/i);
  });
  it('should return an error if age is greater than 100', () => {
    expect(validateUserInput(1, 100)).toMatch(/invalid/i);
  });
  it('should return an error if both username and age are invalid', () => {
    expect(validateUserInput('', 0)).toMatch(/invalid username/i);
    expect(validateUserInput('', 0)).toMatch(/invalid age/i);
  });
});

describe('isPriceInRange', () => {
  it.each([
    { scenario: 'price < min', value: -10, result: false},
    { scenario: 'price = min', value: 0, result: true},
    { scenario: 'price within range', value: 50, result: true},
    { scenario: 'price = max', value: 100, result: true},
    { scenario: 'price > max', value: 200, result: false},
  ])('should return $result when $scenario', ({ scenario, value, result }) => {
    expect(isPriceInRange(value, 0, 100)).toBe(result);
  })
});

describe('isValidUsername', () => {
  const minLength = 5;
  const maxLength = 15;

  it('should return false when the username length is outside of range', () => {
    expect(isValidUsername('a'.repeat(minLength - 1))).toBe(false);
    expect(isValidUsername('a'.repeat(maxLength + 1))).toBe(false);
  });
  it('should return true when the username length is at the min or max length', () => {
    expect(isValidUsername('a'.repeat(minLength))).toBe(true);
    expect(isValidUsername('a'.repeat(maxLength))).toBe(true);
  });
  it('should return true when the username length is inside the range', () => {
    expect(isValidUsername('a'.repeat(minLength + 1))).toBe(true);
    expect(isValidUsername('a'.repeat(maxLength - 1))).toBe(true);
  });
  it('should return false for invalid input types', () => {
    expect(isValidUsername(null)).toBe(false);    
    expect(isValidUsername(undefined)).toBe(false);    
    expect(isValidUsername(1)).toBe(false);    
  });
});

describe('canDrive', () => {
  it('should return error for invalid country code', () => {
    expect(canDrive(20, 'FR')).toMatch(/invalid/i);
  });
  it.each([
    { age: 15, country: 'US', result: false},
    { age: 16, country: 'US', result: true},
    { age: 17, country: 'US', result: true},
    { age: 16, country: 'UK', result: false},
    { age: 17, country: 'UK', result: true},
    { age: 18, country: 'UK', result: true},
  ])('should return $result for ($age, $country)', ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  })
})

describe('fetchData', () => {
  it('should return a promise that will resolve to an array of numbers', async () => {
    try {
      const result = await fetchData();
    } catch (error){
      expect(error).toHaveProperty('reason');
      expect(error.reason).toMatch(/fail/i);
    }
  })
})

describe('test suite', () => {
  beforeAll(() => {
    console.log('beforeAll called')
  })
  beforeEach(() => {
    console.log('beforeEach called')
  })
  afterEach(() => {
    console.log('afterEach called')
  })
  afterAll(() => {
    console.log('afterAll called')
  })
  it('test case 1', () => {
    
  })
  it('test case 2', () => {
    
  })
})

describe('Stack', () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
  })
  it('push should add an item to the stack', () => {
    stack.push(1);
    expect(stack.size()).toBe(1);
  });
  it('pop should remove and return the top item from the stack', () => {
    stack.push(1);
    stack.push(2);

    const poppedItem = stack.pop();

    expect(poppedItem).toBe(2);
    expect(stack.size()).toBe(1);
  });
  it('pop should throw an error if stack is empty', () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });
  it('peek should return the top item from the stack without removing it', () => {
    stack.push(1);
    stack.push(2);

    const peekedItem = stack.peek();

    expect(peekedItem).toBe(2);
    expect(stack.size()).toBe(2);
  });
  it('peek should throw an error if stack is empty', () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });
  it('isEmpty should return true if stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
  })
  it('isEmpty should return false if stack is not empty', () => {
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });
  it('size should return the number of items in the stack', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.size()).toBe(2);
  });
  it('clear should remove all items from the stack', () => {
    stack.push(1);
    stack.push(2);

    stack.clear();

    expect(stack.size()).toBe(0);
  })
})