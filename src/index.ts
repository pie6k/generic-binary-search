export function binaryFindIndex<T>(
  input: T[],
  targetValue: number,
  valueGetter: (item: T, index: number) => number,
): number | null {
  let left = 0;
  let right = input.length - 1;

  let mid: number;
  let midValue: number;

  while (left <= right) {
    mid = left + ((right - left) >> 1);
    midValue = valueGetter(input[mid], mid);

    if (midValue === targetValue) {
      return mid; // Exact match found
    } else if (midValue < targetValue) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null; // No exact match found
}

/**
 * Will find item in array by some condition using binary search algorithm.
 *
 * Note: it expects array to be sorted by field used in condition.
 */
export function binaryFind<T>(
  input: T[],
  targetValue: number,
  valueGetter: (item: T, index: number) => number,
): T | null {
  const index = binaryFindIndex(input, targetValue, valueGetter);
  return index !== null ? input[index] : null;
}

export function binaryFindClosestIndex<T>(
  input: T[],
  targetValue: number,
  valueGetter: (item: T, index: number) => number,
): number | null {
  if (input.length === 0) {
    return null;
  }

  let left = 0;
  let right = input.length - 1;

  let mid: number;
  let midValue: number;

  let nextMid: number;
  let nextMidValue: number;

  while (left < right) {
    mid = left + ((right - left) >> 1);
    midValue = valueGetter(input[mid], mid);

    if (midValue === targetValue) {
      return mid; // Exact match found
    }

    nextMid = mid + 1;
    nextMidValue = valueGetter(input[nextMid], nextMid);

    if (midValue < targetValue && targetValue < nextMidValue) {
      // Target is between mid and nextMid
      return Math.abs(targetValue - midValue) <= Math.abs(targetValue - nextMidValue) ? mid : nextMid;
    }

    if (targetValue < midValue) {
      right = mid;
    } else {
      left = nextMid;
    }
  }

  return left; // At this point, left == right
}

export function binaryFindClosest<T>(
  items: T[],
  targetValue: number,
  getValue: (item: T, index: number) => number,
): T | null {
  const index = binaryFindClosestIndex(items, targetValue, getValue);

  if (index === null) return null;

  return items[index];
}

export function binaryFindGtIndex<T>(
  input: T[],
  targetValue: number,
  valueGetter: (item: T, index: number) => number,
): number | null {
  let left = 0;
  let right = input.length - 1;
  let result: number | null = null;

  let mid: number;
  let midValue: number;

  while (left <= right) {
    mid = left + ((right - left) >> 1);
    midValue = valueGetter(input[mid], mid);

    if (midValue > targetValue) {
      result = mid;
      right = mid - 1; // Continue searching to the left
    } else {
      left = mid + 1;
    }
  }

  return result;
}

export function binaryFindLtIndex<T>(
  input: T[],
  targetValue: number,
  valueGetter: (item: T, index: number) => number,
): number | null {
  let left = 0;
  let right = input.length - 1;
  let result: number | null = null;

  let mid: number;
  let midValue: number;

  while (left <= right) {
    mid = left + ((right - left) >> 1);
    midValue = valueGetter(input[mid], mid);

    if (midValue < targetValue) {
      result = mid;
      left = mid + 1; // Continue searching to the right
    } else {
      right = mid - 1;
    }
  }

  return result;
}

export function binaryFindAllIndices<T>(
  input: T[],
  targetValue: number,
  valueGetter: (item: T, index: number) => number,
): [number, number] | null {
  return binaryFindIndicesBetween(input, targetValue, targetValue, valueGetter);
}

export function binaryFindAll<T>(items: T[], targetValue: number, getValue: (item: T, index: number) => number): T[] {
  const indices = binaryFindAllIndices(items, targetValue, getValue);

  if (indices === null) return [];

  const [low, high] = indices;

  return items.slice(low, high + 1);
}

export function binaryFindGteIndex<T>(
  input: T[],
  targetValue: number,
  valueGetter: (item: T, index: number) => number,
): number | null {
  let left = 0;
  let right = input.length - 1;
  let result = null;

  let mid: number;
  let midValue: number;

  while (left <= right) {
    mid = left + ((right - left) >> 1);
    midValue = valueGetter(input[mid], mid);

    if (midValue >= targetValue) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}

export function binaryFindGte<T>(
  items: T[],
  targetValue: number,
  getValue: (item: T, index: number) => number,
): T | null {
  const index = binaryFindGteIndex(items, targetValue, getValue);

  if (index === null) return null;

  return items[index];
}

export function binaryFindLteIndex<T>(
  input: T[],
  targetValue: number,
  valueGetter: (item: T, index: number) => number,
): number | null {
  if (input.length === 0) {
    return null;
  }

  let left = 0;
  let right = input.length - 1;

  // Check if target is less than the first element
  if (valueGetter(input[left], left) > targetValue) {
    return null;
  }

  let mid: number;
  let midValue: number;

  while (left <= right) {
    mid = left + ((right - left) >> 1);
    midValue = valueGetter(input[mid], mid);

    if (midValue > targetValue) {
      right = mid - 1;
    } else if (midValue < targetValue) {
      left = mid + 1;
    } else {
      // We found a matching value, now let's find the first occurrence
      if (mid === 0 || valueGetter(input[mid - 1], mid - 1) < midValue) {
        return mid;
      }
      right = mid - 1; // Continue searching to the left
    }
  }

  // At this point, right is the index of the last element <= targetValue
  return right;
}

export function binaryFindLte<T>(items: T[], targetValue: number, getValue: (item: T) => number): T | null {
  const index = binaryFindLteIndex(items, targetValue, getValue);

  if (index === null) return null;

  return items[index];
}

export function binaryFindBetween<T>(items: T[], min: number, max: number, getValue: (item: T) => number): T[] {
  if (!items.length) return [];

  const rangeIndices = binaryFindIndicesBetween(items, min, max, getValue);

  if (!rangeIndices) {
    return [];
  }

  return items.slice(rangeIndices[0], rangeIndices[1] + 1);
}

export function binaryFindIndicesBetween<T>(
  items: T[],
  startValue: number,
  endValue: number,
  getValue: (item: T, index: number) => number,
): [number, number] | null {
  if (items.length === 0 || startValue > endValue) {
    return null;
  }

  // Find the index of the first item >= startValue
  let left = 0;
  let right = items.length - 1;
  let startIndex = -1;

  let mid: number;
  let midValue: number;

  while (left <= right) {
    mid = left + ((right - left) >> 1);
    midValue = getValue(items[mid], mid);

    if (midValue >= startValue) {
      startIndex = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  // If no item is >= startValue, return null
  if (startIndex === -1) {
    return null;
  }

  // Find the index of the last item <= endValue
  left = startIndex;
  right = items.length - 1;
  let endIndex = -1;

  while (left <= right) {
    mid = left + ((right - left) >> 1);
    midValue = getValue(items[mid], mid);

    if (midValue <= endValue) {
      endIndex = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // If no item is <= endValue, return null
  // This should not happen if the input is valid, but we check for safety
  if (endIndex === -1) {
    return null;
  }

  return [startIndex, endIndex];
}

export function binaryFindRangeItem<T>(
  items: T[],
  value: number,
  getStart: (item: T) => number,
  getEnd: (item: T) => number,
): T | null {
  let left = 0;
  let right = items.length - 1;

  let mid: number;
  let start: number;
  let end: number;
  let item: T;

  while (left <= right) {
    mid = left + ((right - left) >> 1);
    item = items[mid];
    start = getStart(item);
    end = getEnd(item);

    if (start <= value && value <= end) {
      return item; // Found an item that contains the value
    } else if (value < start) {
      right = mid - 1; // Value is in the left half
    } else {
      left = mid + 1; // Value is in the right half
    }
  }

  return null; // No item found that contains the value
}
