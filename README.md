# Generic Binary Search Library

A versatile and efficient TypeScript library for performing various binary search operations on arrays of any type.

## Quick Examples

```typescript
import { binaryFind, binaryFindClosest, binaryFindGte } from 'generic-binary-search';

const products = [
  { price: 10.99, name: 'Basic Widget' },
  { price: 24.99, name: 'Standard Widget' },
  { price: 49.99, name: 'Premium Widget' },
  { price: 99.99, name: 'Deluxe Widget' },
];

// Find exact match
const exactMatch = binaryFind(products, 24.99, (product) => product.price);
console.log(exactMatch); // Output: { price: 24.99, name: 'Standard Widget' }

// Find closest match
const closestMatch = binaryFindClosest(products, 30, (product) => product.price);
console.log(closestMatch); // Output: { price: 24.99, name: 'Standard Widget' }

// Find first item greater than or equal to
const gteMatch = binaryFindGte(products, 50, (product) => product.price);
console.log(gteMatch); // Output: { price: 99.99, name: 'Deluxe Widget' }
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

const employees = [
  { salary: 30000, name: 'Alice' },
  { salary: 45000, name: 'Bob' },
  { salary: 60000, name: 'Charlie' },
  { salary: 75000, name: 'David' },
];

// Find the employee with salary 60000
const employee = binaryFind(employees, 60000, (emp) => emp.salary);
console.log(employee); // Output: { salary: 60000, name: 'Charlie' }

// Find the index of the employee with salary 45000
const index = binaryFindIndex(employees, 45000, (emp) => emp.salary);
console.log(index); // Output: 1
```

### 2. Closest Match

```typescript
import { binaryFindClosest, binaryFindClosestIndex } from 'generic-binary-search';

const temperatures = [
  { celsius: 15.5, location: 'Mountain' },
  { celsius: 22.3, location: 'Beach' },
  { celsius: 28.7, location: 'Desert' },
  { celsius: 35.1, location: 'Volcano' },
];

// Find the location with temperature closest to 25°C
const closestTemp = binaryFindClosest(temperatures, 25, (temp) => temp.celsius);
console.log(closestTemp); // Output: { celsius: 22.3, location: 'Beach' }

// Find the index of the location with temperature closest to 30°C
const closestIndex = binaryFindClosestIndex(temperatures, 30, (temp) => temp.celsius);
console.log(closestIndex); // Output: 2 (index of Desert)
```

### 3. Greater Than or Equal / Less Than or Equal

```typescript
import { binaryFindGte, binaryFindLte, binaryFindGteIndex, binaryFindLteIndex } from 'generic-binary-search';

const houses = [
  { price: 150000, address: '123 Oak St' },
  { price: 250000, address: '456 Elm St' },
  { price: 350000, address: '789 Maple St' },
  { price: 450000, address: '101 Pine St' },
];

// Find the first house with price greater than or equal to 300000
const gteHouse = binaryFindGte(houses, 300000, (house) => house.price);
console.log(gteHouse); // Output: { price: 350000, address: '789 Maple St' }

// Find the most expensive house with price less than or equal to 400000
const lteHouse = binaryFindLte(houses, 400000, (house) => house.price);
console.log(lteHouse); // Output: { price: 350000, address: '789 Maple St' }

// Find the index of the first house with price greater than or equal to 250000
const gteIndex = binaryFindGteIndex(houses, 250000, (house) => house.price);
console.log(gteIndex); // Output: 1

// Find the index of the most expensive house with price less than or equal to 300000
const lteIndex = binaryFindLteIndex(houses, 300000, (house) => house.price);
console.log(lteIndex); // Output: 1 (index of 456 Elm St)
```

### 4. Greater Than / Less Than

```typescript
import { binaryFindGtIndex, binaryFindLtIndex } from 'generic-binary-search';

const scores = [
  { points: 10, player: 'Alice' },
  { points: 20, player: 'Bob' },
  { points: 30, player: 'Charlie' },
  { points: 40, player: 'David' },
];

// Find the index of the first player with score greater than 25
const gtIndex = binaryFindGtIndex(scores, 25, (score) => score.points);
console.log(gtIndex); // Output: 2 (index of Charlie)

// Find the index of the last player with score less than 35
const ltIndex = binaryFindLtIndex(scores, 35, (score) => score.points);
console.log(ltIndex); // Output: 2 (index of Charlie)
```

### 5. Find Items Within a Range

```typescript
import { binaryFindBetween, binaryFindIndicesBetween } from 'generic-binary-search';

const products = [
  { price: 10.99, name: 'Basic Widget' },
  { price: 24.99, name: 'Standard Widget' },
  { price: 49.99, name: 'Premium Widget' },
  { price: 99.99, name: 'Deluxe Widget' },
];

// Find products with prices between 20 and 60
const rangeProducts = binaryFindBetween(products, 20, 60, (product) => product.price);
console.log(rangeProducts); // Output: [{ price: 24.99, name: 'Standard Widget' }, { price: 49.99, name: 'Premium Widget' }]

// Find indices of products with prices between 20 and 60
const rangeIndices = binaryFindIndicesBetween(products, 20, 60, (product) => product.price);
console.log(rangeIndices); // Output: [1, 2]
```

### 6. Find All Occurrences

```typescript
import { binaryFindAll, binaryFindAllIndices } from 'generic-binary-search';

const books = [
  { pageCount: 100, title: 'Short Stories' },
  { pageCount: 250, title: 'Novel A' },
  { pageCount: 250, title: 'Novel B' },
  { pageCount: 400, title: 'Epic Tale' },
];

// Find all books with 250 pages
const allBooks = binaryFindAll(books, 250, (book) => book.pageCount);
console.log(allBooks); // Output: [{ pageCount: 250, title: 'Novel A' }, { pageCount: 250, title: 'Novel B' }]

// Find all indices of books with 250 pages
const allIndices = binaryFindAllIndices(books, 250, (book) => book.pageCount);
console.log(allIndices); // Output: [1, 2]
```

### 7. Find Item Containing a Value (Range-based data)

```typescript
import { binaryFindRangeItem } from 'generic-binary-search';

const meetings = [
  { startTime: 9, endTime: 10, title: 'Morning Standup' },
  { startTime: 10, endTime: 11, title: 'Team Planning' },
  { startTime: 13, endTime: 14, title: 'Client Call' },
  { startTime: 15, endTime: 16, title: 'Project Review' },
];

// Find the meeting happening at 13:30
const currentMeeting = binaryFindRangeItem(
  meetings,
  13.5,
  (meeting) => meeting.startTime,
  (meeting) => meeting.endTime,
);
console.log(currentMeeting); // Output: { startTime: 13, endTime: 14, title: 'Client Call' }
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
