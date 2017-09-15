# Workshop Async/await

This repository contains a mock server, dummy code and documentation to gain knowledge of async functions.

## The basics aka the golden rules of async/await

### 1. The foundation of async functions are [Promises](http://exploringjs.com/es6/ch_promises.html).

So readup on Promises when you don't fully understand them yet.
- [MDN Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Exploring JS Promises for async programming](http://exploringjs.com/es6/ch_promises.html)

### 2. Async functions always return a Promise _when called_

```javascript
async function greet(name) {
  if (name.toLocaleLowerCase() === 'bob'){
    throw new Error('Not allowed');
  }

  return `Hello ${name}`;
}

greet('Joe').then(console.log) // Hello Joe

greet('Bob')
  .then(console.log)
  .catch(console.error); // Error: Not allowed
```

### 3. An async function can contain an `await` expression

- The `await` operator is used to wait for the result of a `Promise`.
- __It can only be used inside an async function!__

```javascript
const getJson = (url) => fetch(url).then(res => res.json());

const getUsers = async () => {
  const users = await getJson('/users');

  console.log(users);
}

getUsers();
```

When the return value of the `await` expression is not a `Promise`, it's converted to a resolved Promise.

```javascript
async function w00t() {
  const value = await 1337;

  console.log(value); // 1337
}

w00t();
```

Otherwise you can just return the value without using `await` (and wrapping the result).

```javascript
async function getJson(url) {
  return fetch(url).then(res => res.json());
}

// Don't do this, it's less efficient
async function getJson(url) {
  return await fetch(url).then(res => res.json());
}
```

- [MDN await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

### 4. Handling errors and results with `await`.

The operator `await` (which is only allowed inside async functions) waits for its operand, a Promise, to be settled:

- If the Promise is fulfilled, the result of await is the fulfillment value.
- If the Promise is rejected, await throws the rejection value.

```javascript
async function getUsers() {
  try {
    const users = await getJson('/users');

    return users;
  } catch (err) {
    logError(`Could not retrieve users: ${err.message}`);
  }
}
```

### 5. `await` is sequential, use `Promise.all()` for parallel execution

The following functions are executed sequentially.

```javascript
async function foo() {
  const result1 = await asyncFunc1();
  const result2 = await asyncFunc2();
}
```

But executing them in parallel can speed things up.

```javascript
async function foo() {
  const [result1, result2] = await Promise.all([
    asyncFunc1(),
    asyncFunc2(),
  ]);
}
```

## More information

- http://2ality.com/2016/10/async-function-tips.html
- http://exploringjs.com/es2016-es2017/ch_async-functions.html
- https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9