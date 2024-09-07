# cleanups

Simple, yet powerful utility for managing cleanups.

This utility is widely used in [screen.studio](https://screen.studio) app and I believe it saved us a lot of time and effort.

TLDR:

```
npm install cleanups
yarn add cleanups
```

```typescript
import { createCleanup } from 'cleanups';

const cleanup = createCleanup();

cleanup.next = () => {
  console.log('cleanup 1');
};

cleanup.next = () => {
  console.log('cleanup 2');
};

cleanup.next = () => {
  console.log('cleanup 3');
};

cleanup();

// Output:
// cleanup 1
// cleanup 2
// cleanup 3
```

React example:

```typescript
import { useEffect } from 'react';
import { createCleanup } from 'cleanups';

/**
 * Will register multiple event listeners with the same handler
 */
function useElementEvents(ref: RefObject<HTMLElement>, types: string[], handler: (event: Event) => void) {
  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const cleanup = createCleanup();

    for (const type of types) {
      cleanup.next = addEventListener(element, type, handler);
    }

    return cleanup;
  }, [ref, types, handler]);
}

// Unify addEventListener and removeEventListener in one function - you can do the same with setTimeout, requestAnimationFrame, etc.
function addEventListener(element: HTMLElement, type: string, handler: (event: Event) => void) {
  element.addEventListener(type, handler);

  return () => element.removeEventListener(type, handler);
}
```

Note: I considered using `cleanup.add(cb)` instead of `cleanup.next = cb`, but decided to go with the latter as it results in less nesting (especially when using code formatters).

# Rationale

I think there are two main problems with managing cleanups in JavaScript:

1. JavaScript APIs are inconsistent in how they require you to clean up things (not managed by this lib)
2. It is hard to compose cleanups (managed by this lib)

Let's consider adding some event listeners and cleaning them up later.

```typescript
// We need to store those functions to be able to remove them later
function someEventHandlerA() {}
function someEventHandlerB() {}

element.addEventListener('click', someEventHandlerA);
element.addEventListener('click', someEventHandlerB);

// Later on
return function cleanup() {
  element.removeEventListener('click', someEventHandlerA);
  element.removeEventListener('click', someEventHandlerB);
};
```

We need to call a different function to add and remove event listeners. We also need to store those functions in the outer scope.

The same goes with many other APIs:

- setTimeout returns ID that you need to pass to clearTimeout
- ResizeObserver.observe returns nothing and you need to call disconnect later
- The same with requestAnimationFrame, IntersectionObserver, etc.

Now, let's create an improved version of `addEventListener` that simply returns a cleanup function and owns the responsibility of executing some cleanup logic.

```typescript
function addEventListener<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) {
  element.addEventListener(type, handler, options);

  return () => element.removeEventListener(type, handler, options);
}
```

Note: We can easily create similar wrappers like `createTimeout`, `createAnimationFrame`, etc.

```typescript
function createTimeout(cb: () => void, delay: number) {
  const id = setTimeout(cb, delay);

  return () => clearTimeout(id);
}
```

Back on track - the same code looks like this:

```typescript
// We only need to know how to add event listeners, we don't need to remember how to remove them
const cleanup1 = addEventListener(element, 'click', function someEventHandlerA() {});
const cleanup2 = addEventListener(element, 'click', function someEventHandlerB() {});

// Later on
return function cleanup() {
  cleanup1();
  cleanup2();
};
```

Ok, now let's say we have some logic that is conditional and we have an array of elements we want to add event listeners to.

```typescript
const elements = [element1, element2, element3];

const cleanups: Array<() => void> = [];

for (const element of elements) {
  if (someCondition) {
    cleanups.push(addEventListener(element, 'click', function someEventHandler() {}));
  }
}

// Later on
return () => {
  for (const cleanup of cleanups) {
    try {
      cleanup();
    } catch (e) {
      // We have to catch as otherwise one error would prevent cleaning up the rest
      console.error('Error while cleaning up', e);
    }
  }
};
```

It's already way better than if using .addEventListener and .removeEventListener directly, but it's still a bit messy.

Now let's use 'cleanups' utility:

```typescript
import { createCleanup } from 'cleanups';

const cleanup = createCleanup();

const elements = [element1, element2, element3];

for (const element of elements) {
  if (someCondition) {
    cleanup.next = addEventListener(element, 'click', function someEventHandler() {});
  }
}

// Later on
cleanup();
```

Now, this is also composable:

Say we have a parent and a child class. We want to clean up both parent and all the children when the parent is destroyed.

```typescript
class ParentThing {
  // Parent has its own cleanup. Children will add their cleanups to this cleanup
  destroy = createCleanup();

  constructor() {
    // Parent own cleanups
    this.destroy.next = () => {
      console.log('destroying parent');
    };

    this.destroy.next = addEventListener(this.foo, 'click', function someEventHandler() {});
  }

  children: ChildThing[] = [];

  addChild() {
    this.children.push(new ChildThing(this));
  }
}

class ChildThing {
  // Child has its own cleanup
  destroy = createCleanup();

  constructor(parent: ParentThing) {
    // Child has its own cleanups
    this.destroy.next = () => {
      console.log('destroying child');
    };

    // If parent is destroyed, child will be destroyed as well
    this.parent.destroy.next = this.destroy;
  }
}
```

# API

## createCleanup

```typescript
function createCleanup(options?: CleanupOptions): CleanupObject;

interface CleanupOptions {
  // If true, the cleanup will be executed only once and will warn if more cleanups are added after it was executed
  once?: boolean;
  // This arg will be passed as `this` to each cleanup function
  thisArg?: unknown;
}

const cleanup = createCleanup();

cleanup.next = someFunction; // Add a cleanup to the cleanup chain
cleanup.wasCalled; // Returns true if the cleanup was already called at least once
cleanup(); // Execute all cleanups and reset the cleanup
```
