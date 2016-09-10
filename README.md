# React Starter App
A React/Redux Starter Kit

> NOTE: At this point the connection between to a backend experimental, and the data expected to be provided is being
> mocked in. See ```fixtures/contacts.json``` ```fixtures/messages.json```


# Achieving Good Code
Rewrite our existing code to:

Write code that is clean, easy to refactor, and easy to improve. This will require some experimentation. Try moving your
component around the page. Does it still work? Put your component in a separate npm module. Can you do it? Reuse
your component in another scenario. Does it handle more than one scenario?

# Dev Setup
To Run locally, just install dependencies and run the server using npm.

#### Install dependencies
```bash
npm install
```

#### Start the Webpack Dev Server
```bash
npm start
```

You can browse to [http://localhost:3333](http://localhost:3333) to view your changes as you make them.

#### Hot Reloading
Webpack Hot [Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html) is enabled in development
mode ```npm start```. It will load any changes you make in your react components, while keeping the page state (no page
reload). This is great for working on layout, stye, and seeing your changes as you work.

# Organization
Follow consistent [organizational patterns](https://medium.com/@msandin/strategies-for-organizing-code-2c9d690b6f33#.dboa0r3ij),
and use generators. The result will be clean consistent code, which is easy to understand, read, debug, and modify.
Create new repeatable patterns when they are not provided. That way, we can keep things clean.

Components are all nested at the same level within the ```src/components``` directory.
![Component Nesting Image](docs/component_nesting.png)
This enforces the React notion of reusable components, which can accept any sub components.

Redux Store, Actions, and reducers are located in the ```src/store``` directory, and organized by feature. For instance,
  all "message" related (store/action/reducer) functionality is located in the ```src/store/messages``` directory.

# Developing

## Add a New Component
Add a new component when needed.
___
### 1. Reuse Components if Possible

Look into the components directory ```src/components```. Components should be names identical to their corresponding
PAXL components

___
### 2. Use the Generators

To make it easier to avoid boilerplate, use the included generators.

Install the generator
```bash
npm generators:install ## Will prompt you for your password
```
___
### 3. Create a new Component

Create a new "MyComponent" component
```bash
npm generators:component ## will prompt you for needed vars
```
![Generate Action Image](docs/generate_component.png)
___
### 4. Create a new Action / Store

Create an action "addEvent" in the "calendar" reducer
```bash
npm generators:action ## will prompt you for needed vars
```
![Generate Action Image](docs/generate_action.png)

This generator will "wire up" you new store, action, reducer to the rootReducer. You can start using it right away!
Your new reducer will perform a no-op by default. So, there won't be any consequences. But, all you need to do is to
add a payload to your action, and a state mutation to your reducer... Reducers are initialized with an immutable ```Map```
from [immutable.js](https://facebook.github.io/immutable-js/). So, check out the docs at the link.

Immutable state prevents us from creating anomalous side effects. Javascript references can easily cause tricky
behavior. Immutable solves that problem by preventing any direct modification of the state. Instead, state is copied, and
the new copy is then modified and returned from your reducer. [Immutable.js](https://facebook.github.io/immutable-js/docs/#/) has all the nice functional sugar you need for
manipulating Objects and Arrays.

# Testing
Using Enzyme, write tests that cover any custom functionality. Code you wrote to do something unique or special must be tested.
https://github.com/airbnb/enzyme/tree/master/docs

This is a great article for testing Redux:
http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html


# Additional Resources

## Libraries Used
### React-Intl
Provides Declarative formatting for dates, numbers, and strings
https://github.com/yahoo/react-intl/wiki/Components

### Normalizr
https://github.com/paularmstrong/normalizr
https://egghead.io/lessons/javascript-redux-normalizing-api-responses-with-normalizr

### JSON Generator
http://www.json-generator.com/
This site is amazing for generating fake JSON data

### Madoka
https://www.npmjs.com/package/madoka
Amazing npm module for generating JSON


