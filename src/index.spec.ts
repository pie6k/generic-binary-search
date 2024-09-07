import {
  binaryFind,
  binaryFindAllIndices,
  binaryFindBetween,
  binaryFindGtIndex,
  binaryFindGte,
  binaryFindGteIndex,
  binaryFindLtIndex,
  binaryFindLte,
  binaryFindLteIndex,
} from './index';
import { describe, expect, it, vi } from 'vitest';

function identity<T>(item: T): T {
  return item;
}

describe('binaryFind', () => {
  it('binaryFindGte', () => {
    expect(binaryFindGte([1, 2, 3, 4, 5], 6, identity)).toBe(null);
    expect(binaryFindGte([1, 2, 3, 4, 5], 0, identity)).toBe(1);
    expect(binaryFindGte([1, 2, 3, 4, 5], 1, identity)).toBe(1);
    expect(binaryFindGte([1, 2, 3, 4, 5], 2.5, identity)).toBe(3);
    expect(binaryFindGte([1, 2, 3, 4, 5], 5, identity)).toBe(5);
    expect(binaryFindGte([1, 2, 3, 4, 5], -5, identity)).toBe(1);
    expect(binaryFindGte([1, 2, 3, 4, 5], 100, identity)).toBe(null);
  });

  it('binaryFindLte', () => {
    expect(binaryFindLte([1, 2, 3, 4, 5], 6, identity)).toBe(5);
    expect(binaryFindLte([1, 2, 3, 4, 5], 0, identity)).toBe(null);
    expect(binaryFindLte([1, 2, 3, 4, 5], 1, identity)).toBe(1);
    expect(binaryFindLte([1, 2, 3, 4, 5], 2.5, identity)).toBe(2);
    expect(binaryFindLte([1, 2, 3, 4, 5], 5, identity)).toBe(5);
    expect(binaryFindLte([1, 2, 3, 4, 5], -5, identity)).toBe(null);
    expect(binaryFindLte([1, 2, 3, 4, 5], 100, identity)).toBe(5);
  });

  it('binaryFindGtIndex', () => {
    expect(binaryFindGtIndex([1, 2, 3, 4, 5], 6, identity)).toBe(null);
    expect(binaryFindGtIndex([1, 2, 3, 4, 5], 0, identity)).toBe(0);
    expect(binaryFindGtIndex([1, 2, 3, 4, 5], 1, identity)).toBe(1);
    expect(binaryFindGtIndex([1, 2, 3, 4, 5], 2.5, identity)).toBe(2);
    expect(binaryFindGtIndex([1, 2, 3, 4, 5], 4, identity)).toBe(4);
    expect(binaryFindGtIndex([1, 2, 3, 4, 5], 5, identity)).toBe(null);
    expect(binaryFindGtIndex([1, 2, 3, 4, 5], -5, identity)).toBe(0);
    expect(binaryFindGtIndex([1, 2, 3, 4, 5], 100, identity)).toBe(null);
    expect(binaryFindGtIndex([1, 2, 2, 2, 3, 4, 5], 1, identity)).toBe(1);
  });

  it('binaryFindGteIndex', () => {
    expect(binaryFindGteIndex([1, 2, 3, 4, 5], 6, identity)).toBe(null);
    expect(binaryFindGteIndex([1, 2, 3, 4, 5], 0, identity)).toBe(0);
    expect(binaryFindGteIndex([1, 2, 3, 4, 5], 1, identity)).toBe(0);
    expect(binaryFindGteIndex([1, 2, 3, 4, 5], 2.5, identity)).toBe(2);
    expect(binaryFindGteIndex([1, 2, 3, 4, 5], 4, identity)).toBe(3);
    expect(binaryFindGteIndex([1, 2, 3, 4, 5], 5, identity)).toBe(4);
    expect(binaryFindGteIndex([1, 2, 3, 4, 5], -5, identity)).toBe(0);
    expect(binaryFindGteIndex([1, 2, 3, 4, 5], 100, identity)).toBe(null);
    expect(binaryFindGteIndex([1, 2, 2, 3, 3, 3, 3, 5], 3, identity)).toBe(3);
    expect(binaryFindGteIndex([1, 3, 3, 3, 3, 4, 5], 3, identity)).toBe(1);
  });

  it('binaryFindLtIndex', () => {
    expect(binaryFindLtIndex([1, 2, 3, 4, 5], 6, identity)).toBe(4);
    expect(binaryFindLtIndex([1, 2, 3, 4, 5], 0, identity)).toBe(null);
    expect(binaryFindLtIndex([1, 2, 3, 4, 5], 1, identity)).toBe(null);
    expect(binaryFindLtIndex([1, 2, 3, 4, 5], 2.5, identity)).toBe(1);
    expect(binaryFindLtIndex([1, 2, 3, 4, 5], 5, identity)).toBe(3);
    expect(binaryFindLtIndex([1, 2, 3, 4, 5], -5, identity)).toBe(null);
    expect(binaryFindLtIndex([1, 2, 3, 4, 5], 100, identity)).toBe(4);
    expect(binaryFindLtIndex([1, 2, 2, 2, 3, 4, 5], 3, identity)).toBe(3);
    expect(binaryFindLtIndex([1, 2, 2, 3, 4, 5], 3, identity)).toBe(2);
  });

  it('binaryFindLteIndex', () => {
    expect(binaryFindLteIndex([1, 2, 3, 4, 5], 6, identity)).toBe(4);
    expect(binaryFindLteIndex([1, 2, 3, 4, 5], 0, identity)).toBe(null);
    expect(binaryFindLteIndex([1, 2, 3, 4, 5], 1, identity)).toBe(0);
    expect(binaryFindLteIndex([1, 2, 3, 4, 5], 2.5, identity)).toBe(1);
    expect(binaryFindLteIndex([1, 2, 3, 4, 5], 5, identity)).toBe(4);
    expect(binaryFindLteIndex([1, 2, 3, 4, 5], -5, identity)).toBe(null);
    expect(binaryFindLteIndex([1, 2, 3, 4, 5], 100, identity)).toBe(4);
    expect(binaryFindLteIndex([1, 3, 3, 3, 3, 4, 5], 3, identity)).toBe(1);
    expect(binaryFindLteIndex([1, 2, 2, 3, 4, 5], 3, identity)).toBe(3);
  });

  it('binaryFindRange', () => {
    expect(binaryFindBetween([1, 2, 3, 4, 5], 2, 4, identity)).toEqual([2, 3, 4]);
    expect(binaryFindBetween([1, 2, 3, 4, 5], 1.5, 4, identity)).toEqual([2, 3, 4]);
    expect(binaryFindBetween([1, 2, 3, 4, 5], 1.5, 4.5, identity)).toEqual([2, 3, 4]);
    expect(binaryFindBetween([1, 2, 3, 4, 5], 1, 4.5, identity)).toEqual([1, 2, 3, 4]);
    expect(binaryFindBetween([1, 2, 3, 4, 5], -5, 4.5, identity)).toEqual([1, 2, 3, 4]);
    expect(binaryFindBetween([1, 2, 3, 4, 5], -10, 10, identity)).toEqual([1, 2, 3, 4, 5]);
    expect(binaryFindBetween([3, 4, 5], 0, 2, identity)).toEqual([]);
    expect(binaryFindBetween([3, 4, 5], 6, 8, identity)).toEqual([]);
    expect(binaryFindBetween([3, 4, 5], 4, 8, identity)).toEqual([4, 5]);
    expect(binaryFindBetween([3, 4, 5], 2, 4, identity)).toEqual([3, 4]);
  });

  it('binaryFind', () => {
    expect(binaryFind([1, 2, 3, 4, 5], 2, identity)).toBe(2);
    expect(binaryFind([1, 2, 3, 4, 5], 2.5, identity)).toBe(null);
    expect(binaryFind([1, 2, 3, 4, 5], -2, identity)).toBe(null);
    expect(binaryFind([1, 2, 3, 4, 5], 10, identity)).toBe(null);
    expect(binaryFind([1, 2, 3, 4, 5], 1, identity)).toBe(1);
    expect(binaryFind([1, 2, 3, 4, 5], 5, identity)).toBe(5);
  });

  it('binaryFind', () => {
    expect(binaryFind([1, 2, 3, 4, 5], 2, identity)).toBe(2);
    expect(binaryFind([1, 2, 3, 4, 5], 2.5, identity)).toBe(null);
    expect(binaryFind([1, 2, 3, 4, 5], -2, identity)).toBe(null);
    expect(binaryFind([1, 2, 3, 4, 5], 10, identity)).toBe(null);
    expect(binaryFind([1, 2, 3, 4, 5], 1, identity)).toBe(1);
    expect(binaryFind([1, 2, 3, 4, 5], 5, identity)).toBe(5);
  });

  it('binaryFindAllIndices', () => {
    expect(binaryFindAllIndices([1, 2, 3, 4, 5], 2, identity)).toEqual([1, 1]);
    expect(binaryFindAllIndices([1, 2, 3, 4, 5], 2.5, identity)).toEqual(null);
    expect(binaryFindAllIndices([1, 2, 3, 3, 3, 4, 5], 3, identity)).toEqual([2, 4]);
    expect(binaryFindAllIndices([1, 2, 3, 3, 3], 3, identity)).toEqual([2, 4]);
    expect(binaryFindAllIndices([3, 3, 3, 4, 5], 3, identity)).toEqual([0, 2]);
    expect(binaryFindAllIndices([3, 3, 3, 4, 5], 2, identity)).toEqual(null);
    expect(binaryFindAllIndices([3, 3, 3, 4, 5], 6, identity)).toEqual(null);
    expect(binaryFindAllIndices([3, 3, 3, 4, 5], -6, identity)).toEqual(null);
    expect(binaryFindAllIndices([1], 1, identity)).toEqual([0, 0]);
    expect(binaryFindAllIndices([1, 1, 1], 1, identity)).toEqual([0, 2]);
    expect(binaryFindAllIndices([], 1, identity)).toEqual(null);
  });

  it('O(n)', () => {
    const getAndMeasure = vi.fn((i: number) => {
      return i;
    });
    const arr = Array.from({ length: 1000 }, (_, i) => i);

    expect(binaryFind(arr, 0, getAndMeasure)).toBe(0);

    expect(getAndMeasure).toHaveBeenCalledTimes(9);

    getAndMeasure.mockClear();

    expect(binaryFind(arr, 499, getAndMeasure)).toBe(499);

    expect(getAndMeasure).toHaveBeenCalledTimes(1);
  });
});
