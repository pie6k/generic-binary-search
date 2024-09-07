# Generic Binary Search Library

A versatile and efficient TypeScript library for performing various binary search operations on arrays of any type.

## Quick Examples

```typescript
import { binaryFind, binaryFindClosest, binaryFindGte } from 'generic-binary-search';

const users = [
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Bob' },
  { id: 5, name: 'Charlie' },
  { id: 7, name: 'David' },
];

// Find exact match
const exactMatch = binaryFind(users, 3, (user) => user.id);
console.log(exactMatch); // Output: { id: 3, name: 'Bob' }

// Find closest match
const closestMatch = binaryFindClosest(users, 4, (user) => user.id);
console.log(closestMatch); // Output: { id: 3, name: 'Bob' }

// Find first item greater than or equal to
const gteMatch = binaryFindGte(users, 6, (user) => user.id);
console.log(gteMatch); // Output: { id: 7, name: 'David' }
```

## Features

- Generic implementation: Works with arrays of any type
- Customizable value extraction: Provide a function to extract numeric values from your items
- Multiple search operations:
  - Exact match
  - Closest match
  - Greater than / Less than
  - Greater than or equal / Less than or equal
  - Find all occurrences
  - Find items within a range
  - Find item containing a value (for range-based data)

## Rationale

Binary search is a powerful algorithm for quickly finding elements in sorted arrays. However, most implementations are limited to simple arrays of numbers. This library provides a generic approach, allowing you to use binary search on arrays of any type by specifying a function to extract numeric values from your items.

This flexibility makes the library useful for a wide range of applications, from simple number arrays to complex objects with multiple fields.

## Installation

```bash
npm install generic-binary-search

# or

yarn add generic-binary-search
```

## Usage

Here are examples of how to use each function in the library with simple objects, ordered by most common usage:

### 1. Basic Binary Search (Exact Match)

```typescript
import { binaryFind, binaryFindIndex } from 'generic-binary-search';

const users = [
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Bob' },
  { id: 5, name: 'Charlie' },
  { id: 7, name: 'David' },
];

// Find the item with id 3
const user = binaryFind(users, 3, (user) => user.id);
console.log(user); // Output: { id: 3, name: 'Bob' }

// Find the index of the item with id 5
const index = binaryFindIndex(users, 5, (user) => user.id);
console.log(index); // Output: 2
```

### 2. Closest Match

```typescript
import { binaryFindClosest, binaryFindClosestIndex } from 'generic-binary-search';

const users = [
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Bob' },
  { id: 5, name: 'Charlie' },
  { id: 7, name: 'David' },
];

// Find the user with id closest to 4
const closestUser = binaryFindClosest(users, 4, (user) => user.id);
console.log(closestUser); // Output: { id: 3, name: 'Bob' }

// Find the index of the user with id closest to 6
const closestIndex = binaryFindClosestIndex(users, 6, (user) => user.id);
console.log(closestIndex); // Output: 2 (index of Charlie)
```

### 3. Greater Than or Equal / Less Than or Equal

```typescript
import { binaryFindGte, binaryFindLte, binaryFindGteIndex, binaryFindLteIndex } from 'generic-binary-search';

const users = [
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Bob' },
  { id: 5, name: 'Charlie' },
  { id: 7, name: 'David' },
];

// Find the first user with id greater than or equal to 4
const gteUser = binaryFindGte(users, 4, (user) => user.id);
console.log(gteUser); // Output: { id: 5, name: 'Charlie' }

// Find the last user with id less than or equal to 6
const lteUser = binaryFindLte(users, 6, (user) => user.id);
console.log(lteUser); // Output: { id: 5, name: 'Charlie' }

// Find the index of the first user with id greater than or equal to 5
const gteIndex = binaryFindGteIndex(users, 5, (user) => user.id);
console.log(gteIndex); // Output: 2

// Find the index of the last user with id less than or equal to 4
const lteIndex = binaryFindLteIndex(users, 4, (user) => user.id);
console.log(lteIndex); // Output: 1 (index of Bob)
```

### 4. Greater Than / Less Than

```typescript
import { binaryFindGtIndex, binaryFindLtIndex } from 'generic-binary-search';

const users = [
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Bob' },
  { id: 5, name: 'Charlie' },
  { id: 7, name: 'David' },
];

// Find the index of the first user with id greater than 4
const gtIndex = binaryFindGtIndex(users, 4, (user) => user.id);
console.log(gtIndex); // Output: 2 (index of Charlie)

// Find the index of the last user with id less than 6
const ltIndex = binaryFindLtIndex(users, 6, (user) => user.id);
console.log(ltIndex); // Output: 2 (index of Charlie)
```

### 5. Find Items Within a Range

```typescript
import { binaryFindBetween, binaryFindIndicesBetween } from 'generic-binary-search';

const users = [
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Bob' },
  { id: 5, name: 'Charlie' },
  { id: 7, name: 'David' },
];

// Find users with ids between 2 and 6
const rangeUsers = binaryFindBetween(users, 2, 6, (user) => user.id);
console.log(rangeUsers); // Output: [{ id: 3, name: 'Bob' }, { id: 5, name: 'Charlie' }]

// Find indices of users with ids between 2 and 6
const rangeIndices = binaryFindIndicesBetween(users, 2, 6, (user) => user.id);
console.log(rangeIndices); // Output: [1, 2]
```

### 6. Find All Occurrences

```typescript
import { binaryFindAll, binaryFindAllIndices } from 'generic-binary-search';

const users = [
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Bob' },
  { id: 5, name: 'Charlie' },
  { id: 5, name: 'Chris' },
  { id: 7, name: 'David' },
];

// Find all users with id 5
const allUsers = binaryFindAll(users, 5, (user) => user.id);
console.log(allUsers); // Output: [{ id: 5, name: 'Charlie' }, { id: 5, name: 'Chris' }]

// Find all indices of users with id 5
const allIndices = binaryFindAllIndices(users, 5, (user) => user.id);
console.log(allIndices); // Output: [2, 3]
```

### 7. Find Item Containing a Value (Range-based data)

```typescript
import { binaryFindRangeItem } from 'generic-binary-search';

const ranges = [
  { start: 0, end: 10, name: 'Range A' },
  { start: 11, end: 20, name: 'Range B' },
  { start: 21, end: 30, name: 'Range C' },
  { start: 31, end: 40, name: 'Range D' },
];

// Find the range containing 15
const range = binaryFindRangeItem(
  ranges,
  15,
  (item) => item.start,
  (item) => item.end,
);
console.log(range); // Output: { start: 11, end: 20, name: 'Range B' }
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
