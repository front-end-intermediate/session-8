# VIII - React Intro Continued

## Homework

Review the notes below, step through them again using them and the finished version as a guide. Finish the form that sends a pirate to the back end, updates the database and displays the new pirate in the front end.

For your final project you will create a version of the recipes list and details pages in React.

Of course, if you wish you can do something entirely original. Just propose it.

## Reading

It is important to get some hands on with 'primitive' (i.e. outside the Create React App setup) React coding.

* Spend some quality time with the exercises on [Built with React](http://buildwithreact.com) (do the simple Tutorial).
* Another useful tutorial you could try is the official [Intro to React](https://reactjs.org/tutorial/tutorial.html) tutorial.

<!-- * THIS IS GOOD STUFF - SEE THE BEGINNING BOOK TOO `http://exploringjs.com/es6/` (specifically `http://exploringjs.com/es6/ch_core-features.html#sec_from-constr-to-class` and `http://exploringjs.com/es6/ch_classes.html#ch_classes`) -->

<!-- * Book marking the [Create React App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-stylesheet) notes is also a very good idea. Please skim them. -->

## React Basics

Refer to `reference > react-overview > Basics > 1-react.html`

### Vanilla JS to React

Note that the Vanilla element is on object:

`console.log(typeof(element))`

and that is why we can run:

`console.log(element.textContent)`

Switch over to React objects.

Note that the properties are stored on a props obect.

`console.log(element.props.children)`

### Transpiling with babel

Use `2-react-jsx.html` and note the error.

```html
<script type="text/babel">
```

The JS:

```js
const rootElement = document.getElementById('root')

const elem = <div className="container">Hello World</div>

ReactDOM.render(elem, rootElement)
```

Try `const elem = <div className="container">Hello World</div>` at the Babel Repl.

Note that, with react turned on, it transpiles to `React.createElement()` before we call `ReactDOM.render()`.

### Externalize to variables:

```js
const rootElement = document.getElementById('root')

const content = 'Hello World'
const myClassName = 'container'

const elem = <div className={myClassName}>{content}</div>

ReactDOM.render(elem, rootElement)
```

The curly braces are JS and used evaluate to an expression.

So, for example, we could use an IIFE:

```js
const rootElement = document.getElementById('root')

const content = 'Hello World'
const myClassName = 'container'

const elem = <div className={myClassName}>{(() => content)()}</div>

ReactDOM.render(elem, rootElement)
```

In React we typically use use the `props` object for variables:

```js
const rootElement = document.getElementById('root')

const props = {
  className: 'container',
  children: 'Hello World',
}

const element = <div {...props} />

ReactDOM.render(element, rootElement)
```

And an object spread in JS to spread the props into the element. (See `reference > spread-operator.html`.)

### Overriding

Using a default class name:

```js
const element = <div className="myClass" {...props} />
```

Overriding a class name:

```js
const element = <div {...props} className="myClass" />
```

Overriding children props:

```js
const element = <div {...props} className="myClass">Hi There</div>
```

## Creating reusable React components

Refer to `reference > react-overview > index.html`. 

For this you will need to open the page via HTTP. You can install and use `Live Server` in VS Code, the [lite-server](https://www.npmjs.com/package/lite-server) npm package or, if you have Python installed (default on MacOs) cd into `rect-overview` and run:

```sh
python -m SimpleHTTPServer 9001
```

Again, note that the variable `elem` is compiling to `React.createElement()`.

Extract the component to a variable - add:

```js
const helloWorld = <div>Hello World</div>
```

And render it:

```js
const elem = (
  <div className="container">
    { helloWorld }
    { helloWorld }
  </div>
)
```

Reuse and parameterize code:

```js
const message = (props) => <div>{props.msg}</div>
```

Render them

```js
const rootElement = document.getElementById('root')

const message = (props) => <div>{props.msg}</div>

const elem = (
  <div className="container">
    { message ({ msg: 'Hellow World' })}
    { message ({ msg: 'Goodbye World' })}
  </div>
)

ReactDOM.render(elem, rootElement)
```

Because JSX compiles down to `React.createElement` calls we can take a function and pass props down to the function.

```js
  <div className="container">
    { React.createElement(message, { msg: 'Hello World' })}
    { React.createElement(message, { msg: 'Goodbye World' })}
  </div>
```

Note the error when we try to use the standalone component:

 ```js
  <div className="container">
    <message />
    { React.createElement(message, { msg: 'Hello World' })}
    { React.createElement(message, { msg: 'Goodbye World' })}
  </div>
```

Try putting `<messsage />` into the Babel Repl.

```js
"use strict";

React.createElement("message", null);
```

We get a string.

In JSX to differentiate between a variable and a DOM element you need to capitalize the component.

Try in Repl:

```js
const message = (props) => <div>{props.msg}</div>;
<message />
```

v.s.

```js
const Message = (props) => <div>{props.msg}</div>;
<Message />
```

Remove some of the JS in favor of JSX and capitalize the variable name:

```js
const rootElement = document.getElementById('root')

const Message = (props) => <div>{props.msg}</div>

const elem = (
  <div className="container">
    <Message msg='Hello World' />
    <Message msg='Goodbye World' />
  </div>
)

ReactDOM.render(elem, rootElement)
```

We can use the child prop like this:

```js
const rootElement = document.getElementById('root')

const Message = (props) => <div>{props.children }</div>

const elem = (
  <div className="container">
    <Message children ='Hello World' />
    <Message children ='Goodbye World' />
  </div>
)

ReactDOM.render(elem, rootElement)
```

Or like this:

```js
  <div className="container">
    <Message>Hello World</Message>
    <Message>Goodbye World</Message>
  </div>
```


## Prototypal inheritance

Before we get any further let's look at the `class` syntax we will be using in React.

cd into `reference > classes`, run a server and open `1-inheritance.html` in a browser.

Classes in React (ref. `react-overview > forms.js`) are based on JS prototypal inheritance.

We have a constructor function:

```js
function Car(model, make) {
  this.model = model;
  this.make = make;
}
```

and a car with properties.

```sh
> expo
```

Prototypal inheritance - methods on the original constructor will be inherited.

### Example: Array 

Create an array: 

```sh
> const names = ['John', 'Henry']
```

Examine the Array - Array prototypes

```sh
> names.join(', ')
> names.pop()
```

Add a prototype:

```js
Car.prototype.drive = function() {
    console.log(`Vroom vroom 🚗 🚗 🚗! I'm a ${this.model} and I'm a ${this.make}`);
};
```

Examine the prototype on the car object.

Add a second car:

```js
const miata = new Car('Miata', 'Mazda');
```

Execute the drive method:

```sh
> miata.drive()
```

Add an additional method:

```js
Car.prototype.stop = function() {
    console.log(`Screech! 🚒 🚑 🚓`);
};
```

```sh
> expo.stop()
```

In classic protoypal inheritance the function `Car` is our 'constructor' and we add methods using `Car.prototype`.

### Classes

See `2-classes.html`

Note syntax - (esp. lack of comma):

```js
class Car {
  constructor(model, make) {
    this.model = model;
    this.make = make;
  }
  drive() {
    console.log(`Vroom vroom 🚗🚗🚗! I'm a ${this.model} and I'm a ${this.make}`);
  }
  stop() {
    console.log(`Screech! 🚒🚑🚓`);
  }
}
```

```sh
> expo
> expo.drive()
> expo.stop()
```

### Static Methods

```js
static info() {
  console.log('I\'m a static method, cars only need apply' );
}
```

```sh
> expo.info()
> Car.info()
> expo
```

Inspect the expo prototype.

A static method is similar to `Array.of` - in that it is not inherited.

### Static methods on an Array

`Array.of` and the spread operator:

[Emmet](https://docs.emmet.io/abbreviations/syntax/) (ctrl-e):

`ul>li*4>a[href="#"]{link}`

```sh
> Array.of(1,2,3,4)
> const links = document.querySelectorAll('li')
> Array.of(links)
> Array.of(...links)
```

But `.of` is not inerited

```sh
> numbers = [6,7,8,9]
> numbers.of(1,2,3,4)
```

A static method applied to Cars only:

```sh
Car.info()
```

### Getters and Setters

```js
get description() {
  return `${this.model} is a ${this.make} type of car`;
}
```

* Not a method (no braces when calling)

```sh
> expo.description
```

Setters

```js
set nicknames(value) {
  this.nick = value.trim();
}
```

```sh
> expo.nicknames = '   sadsack  '
```

```js
get nicknames() {
  return this.nick.toUpperCase();
}
```

```sh
> expo.nicknames
```

### Extending Classes

See `3-extending-classes.html`

```js
class Animal {
  constructor(name) {
    this.name = name;
    this.thirst = 100;
    this.belly = [];
  }
  drink() {
    this.thirst -= 10;
    return this.thirst;
  }
  eat(food) {
    this.belly.push(food);
    return this.belly;
  }
}

const rhino = new Animal('Rhiney');
```

```sh
> rhino
> rhino.eat('lilies')
> rhino.eat('hunters')
> rhino.drink()
> rhino
```

#### Super

Calls the thing that you are extending first.

e.g. we want to extend our Animal class to include a subclass of `dogs`.

This will not work:

```js
class Dog extends Animal {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
}
```

```js
const yorik = new Dog('Yorik', 'Terrier');
```

We need to call `super` first and here, super needs a name:

```js
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}
```

```sh
> yorik
```

Add a bark method:

```js
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  bark() {
    console.log(`Bark bark my name is ${this.name} and I\'m a dog`);
  }
}
```

Dogs can bark. Rhinos can't:

```sh
> yorik.bark()
> rhino.bark()
```

### Extending Arrays

See `4-extending-arrays.html`

Make our own classes modeled after Array.

Start off with an array with a property:

```js
const movies = new MovieCollection('My Favorite Movies',
  { name: 'Bee Movie', stars: 10 },
  { name: 'Star Wars Trek', stars: 1 },
  { name: 'Virgin Suicides', stars: 7 },
  { name: 'King of the Road', stars: 8 }
);
```

We create a class _off_ the Array.

Adding name and using a spread operator to add the items:

```js
class MovieCollection extends Array {
  constructor(name, ...items) {
    super(...items);
    this.name = name;
  }
```

Super calls the Array prototype with a spread operator.

```sh
> movies[4]
> movies.name
```

We have an Array that also has properties (possible because in JS, Arrays are objects):

```sh
> typeof [1,2]
```

Methods using the array prototype methods can be used:

```js
add(movie) {
  this.push(movie);
}
```

## Review For... In Loops

A `for...in` loop is a modified version of a for loop that you can use to loop through objects.

The first part, `key`, is a variable that gets assigned to the object key on each loop. The second part, is the object to loop over.

`for... in`:

```sh
> for (const movie in movies){ console.log(movie) }
```

Returns the key _and_ the name property.

Also useful will be `for... of` which returns only the array:

```sh
> for (const movie of movies){ console.log(movie) }
```

We get the object (not the key) and the property (`name`) is not shown. 

N.B. for of loops skip over the properties.

```sh
> movies.topRated()
```

See `topRated()`:

```js
topRated() {
  const ordered = this.sort(function(firstMovie, secondMovie){
    if(firstMovie.stars > secondMovie.stars){
      return 1
    } else {
      return -1
    }
    })
}
```

```sh
> console.table(movies.topRated())
```

Using the `limit`:

```sh
> console.table(movies.topRated(2))
```

If you just want the keys: 

```sh
> Object.keys(movies)
```

We will be using this with React.



## Create a React Project

To create a new app, run:

```bash
npx create-react-app react-pirates
```

Move the `data` and `assets` folders from reference to the `src` directory in `react-pirates`.

```bash
cd react-pirates
npm start
```

### JSX

Review in `src > App.js`:

1. logo: {logo}: JSX
1. class → className: JSX
1. xhtml style closing tags: JSX

Examine CSS in the Elements inspector (`head` region):

1. injected via Webpack:`<style>`
1. note prefixing in output

### Nesting

* App.js

Add `<p>test</p>` above div to see a common error.

### Comments

Native in VS Code?

`{/* <img src={logo} className="logo" alt="logo" /> */}`

Import our fonts and clean up the default html template.

* `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link href="https://fonts.googleapis.com/css?family=Pirata+One" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Trade+Winds" rel="stylesheet">

  <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">

  <title>React App</title>
</head>
<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>

</body>
</html>
```

### Components

Create `Pirate.js` in a new `components` folder.

* `src/components/Pirate.js`

```js
import React, { Component } from 'react';

import '../assets/css/Pirate.css'

class Pirate extends Component {
  render(){
    return (
      <p>Pirate Component</p>
      )
  }
}

export default Pirate;
```

## Properties

* `App.js`:

```js
import Pirate from './components/Pirate';
```

In the render function.

```js
<Pirate />
```

Ensure it is visible in the view.

Add a property (`prop`) to the component instance in `App.js`:

```js
<Pirate tagline="Ahoy from the Pirate Component" />
```

* Pirate.js

```js
import React, { Component } from 'react';

import '../assets/css/Pirate.css'

class Pirate extends Component {
  render(){
    return (
      <div className='pirate'>
        <p>{this.props.tagline}</p>
      </div>
      )
  }
}

export default Pirate;
```

### React tool

Native `this` selector: `$0`

React selector: `$r`

Inspect using React tool.

Examine component structure (nesting).

Select `<Pirate />`

Console: `$r.props`

## Header component

Create a new Header component:

```js
import React, { Component } from 'react';
import '../assets/css/Header.css'
import logo from '../assets/img/anchor.svg';

class Header extends React.Component {
  render(){
    return (
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
        <h1>Pirates!</h1>
      </div>)
    }
  }

export default Header;
```

Import `Header.js` into `App.js`:

`import Header from './components/Header';`

* Add it to `App.js`:

```jsx
import React, { Component } from 'react';

import Pirate from './components/Pirate';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Pirate tagline="Ahoy from the Pirate Component" />
      </div>
    );
  }
}

export default App;
```

Delete the `App.css` file from the top level of source and the import statement for it in `App.js`.

Because we are not going to be doing much with the header at this point we don't need to use a class based component. Let's try using a React functional component instead.

Edit `Header.js`:

```js
import React from 'react';
import '../assets/css/Header.css'
import logo from '../assets/img/anchor.svg';


const Header = (props) => {
  return (
    <div className="header">
    <img src={logo} className="logo" alt="logo" />
    <h1>Pirates!</h1>
    </div>)
  }
  
export default Header;
```

## Adding Pirates

Create a new component `PirateForm.js`:

```js
import React, { Component } from 'react';
import AddPirateForm from './AddPirateForm';

class PirateForm extends Component {
  render(){
    return (
      <div>
      <h3>Pirate Form Component</h3>
      <AddPirateForm />
      </div>
      )
  }
}

export default PirateForm;
```

Note the import statement and JSX.

Create another component - `AddPirateForm.js` in components:

```js
import React, { Component } from 'react';

import '../assets/css/AddPirateForm.css';

class AddPirateForm extends Component {
  render(){
    return (
      <div>
        <h3>Add Pirate Form Component</h3>
      <form>
        <input type="text" placeholder="Pirate name" />
        <input type="text" placeholder="Pirate vessel" />
        <input type="text" placeholder="Pirate weapon" />
        <button type="submit">Add Pirate</button>
      </form>
      </div>
      )
  }
}

export default AddPirateForm;
```

Import and add it to the JSX in `App.js`:

```js
import PirateForm from './components/PirateForm';

...

    return (
      <div className="App">
        <Header />
        <Pirate tagline="Ahoy from the Pirate component" />
        <PirateForm />
      </div>
    );
```

## Adding Methods

Wire up the form in `AddPirateForm` with `<form onSubmit = { (e) => this.createPirate(e) }>`:

```js
return (
  <form onSubmit = { (e) => this.createPirate(e) }>
    <input type="text" placeholder="Pirate name" />
    <input type="text" placeholder="Pirate vessel" />
    <input type="text" placeholder="Pirate weapon" />
    <button type="submit">Add Pirate</button>
  </form>
  )
```

### Using Forms in React

Open `reference > react-overview > index.html` in a browser running http.

By default, clicking on the submit button causes a page refresh. Disable page refresh:

`<form onSubmit={this.handleSubmit}>`

```js
handleSubmit = event => {
  event.preventDefault()
}
```

Log the target

```js
handleSubmit = event => {
  event.preventDefault()
  console.log(event.target)
  console.log(typeof(event.target)) // object
  console.log({target: event.target})
}
```

The first property is `input` and it has a value property.

Add text to the input field and this to the logging:

`console.log(event.target[0].value)`

Add a `name` attribute:

`<input type="text" name="username" />`

The value is a property of the username:

`console.log( event.target.elements.username.value )`

In React we use refs to assign and access the inputMode:

```js
<input type="text" name="username"
ref={node => (this.inputNode = node)}  />
```

`console.log(this.inputNode.value)`

## The Pirate Form

In `AddPirateForm` create a method on the class:

```js
createPirate(e) {
  e.preventDefault();
  console.log('making a pirate')
}
```

```js
import React, { Component } from 'react';
import '../assets/css/AddPirateForm.css';

class AddPirateForm extends Component {

  createPirate(e) {
    e.preventDefault();
    console.log('making a pirate')
  }

  render(){
    return (
      <form onSubmit = { (e) => this.createPirate(e) }>
        <input type="text" placeholder="Pirate name" />
        <input type="text" placeholder="Pirate vessel" />
        <input type="text" placeholder="Pirate weapon" />
        <button type="submit">Add Pirate</button>
      </form>
      )
  }
}

export default AddPirateForm;
```

And test using the form interface.

## HERE

Add [refs](https://facebook.github.io/react/docs/refs-and-the-dom.html) to the form to store references to the input:

```js
return (
  <form onSubmit={ (e) => this.createPirate(e) }>
    <input ref={ (input) => this.name = input } type="text" placeholder="Pirate name" />
    <input ref={ (input) => this.vessel = input } type="text" placeholder="Pirate vessel" />
    <input ref={ (input) => this.weapon = input } type="text" placeholder="Pirate weapon" />
    <button type="submit">Add Pirate</button>
  </form>
)
```

Go to the React dev tools, find the `AddPirateForm` component, `$r` in the console to see the inputs.

Create a `pirate` object in `AddPirateForm`'s `createPirate` function.

`AddPirateForm.js`:

```jsx
createPirate(e) {
  e.preventDefault();

  const pirate = {
    name: this.name.value,
    vessel: this.vessel.value,
    weapon: this.weapon.value,
  }
  console.log(pirate)
}
```

Test by entering a pirate in the form and examining the browser console.

## State

State is data at a particular moment in time. It’s the present “state” of your data. 

Today’s more popular JavaScript frameworks, including React and Vue, use state and components to make managing the UI easier.

With this approach, instead of targeting specific elements in the DOM and adjusting a class here or a style there, you treat your data, or state, as the single source of truth.

Update your state, render a fresh copy of the UI based on the new data, and move on. You never have to think about which element in the DOM to target or how it needs to change.

The key difference between props and [state](https://facebook.github.io/react-native/docs/state.html): 

* state is internal and controlled by the component itself
* props are external and controlled by whatever component renders the component. - [ref](http://buildwithreact.com/tutorial/state).

Get the pirate object into state.

We initialize the state in `App.js` to an empty object.

`App.js`:

```js
class App extends Component {
...
  constructor() {
    super();
    this.state = {
      pirates: {}
    }
  }
```

(For `super` review `reference/classes`.)

In React tools, find `App` note the `state` entry.

And add a method to `App.js` using the date method to create a unique identifier:

```js
  addPirate(pirate) {
    //take a copy of the current state and put it into pirates var
    const pirates = {...this.state.pirates}
    //create a unique id
    const timestamp = Date.now()
    //add new pirate using accessor and id - objectName["propertyName"] and assignment
    pirates[`pirate-${timestamp}`] = pirate
    //set state pirates with var pirates
    this.setState({ pirates: pirates })
  }
```

(For spread operator see: `reference / spread-operator.html`.)

Bind the add form to our app in `App.js`:

```js
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.state = {
      pirates: {}
    }
  }
```

React does not implicitly bind the methods to the component itself - you need to bind them. Inside the constructor `this` is bound to the app component.

### Review

Super extends the app component.

Review `super` in classes: `reference / extending-classes.html`

Note - `bind()` - creates a new function that, when called, has its `this` keyword set to the provided value.

See: `reference / bind / index.html` and `reference / bind / button.html`

## State continued

Our `createPirate` function in `AddPirateForm` is called and works but it does not save the new pirate.

We have an `addPirate` function in App.js:

```js
  addPirate(pirate) {
    //take a copy of the current state and put it into pirates var
    const pirates = {...this.state.pirates}
    //create a unique id
    const timestamp = Date.now()
    //add new pirate using accessor and id - objectName["propertyName"] and assignment
    pirates[`pirate-${timestamp}`] = pirate
    //set state pirates with var pirates
    this.setState({ pirates: pirates })
  }
```

Unlike the `createPirate` function, it stores the new pirate in `state`. Test with `App` in React tool:

`$r.addPirate({name: 'joe'})`

### Passing Props

`App.js`:

```js
<PirateForm tagline="Ahoy Pirate Form" childTagline="Ahoy Add Pirate Form" />
```

`PirateForm.js`:

```js
<h3>{this.props.tagline}</h3>
<AddPirateForm tagline={this.props.childTagline} />
```

`AddPirateForm.js`:

```js
<h3>{this.props.tagline}</h3>
```

### Passing a Function via props

We need to make the `addPirate` function available to the `AddPirateForm` by passing it using props:

`App.js > PirateForm > AddPirateForm`

* To `PirateForm` from `App.js` we will use `<PirateForm addPirate={this.addPirate} />`:

```js
  render() {
    return (
      <div className="App">
      <Header />
      <Pirate tagline="Ahoy there matey!" />
      <PirateForm addPirate={this.addPirate} />
      </div>
      );
  }
```

Examine the `PirateForm` props in React tool.

Only one level more. Pass the prop to `AddPirateForm` from `PirateForm` with `<AddPirateForm addPirate={this.props.addPirate} />`:

```js
import React, { Component } from 'react';
import AddPirateForm from './AddPirateForm'

class PirateForm extends Component {
  render() {
    return (
      <div className="pirate-form">
      <h3>Pirate Forms</h3>
      <AddPirateForm addPirate={this.props.addPirate} />
      </div>
      )
  }
}

export default PirateForm;
```

Examine the `AddPirateForm` props in React's inspector. Note the property.

Since there is no reference to `AddPirateForm` in `App.js` we needed to perform this props pass via `PirateForm`.

We will use `createPirate` to develop a pirate instance and then pass the result to addPirate to store the instance in state.

In `AddPirateForm`:

`this.props.addPirate(pirate);`

```js
  createPirate(e) {
    e.preventDefault();
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    this.props.addPirate(pirate);
  }
```

We should now be able to create a pirate using the form and see it in the React browser extension when examining `App`.

## Resetting the Form

We have refs on the input fields. When we click "Add Pirate" the form still holds the data so we need to reset it.

Empty the form by assigning a [ref](https://facebook.github.io/react/docs/refs-and-the-dom.html#adding-a-ref-to-a-class-component) to the input fields.

* `AddPirateFrom`

`<form ref={ (input)=>this.pirateForm = input } onSubmit={(e) => this.createPirate(e)}>`:

```js
return (
  <form ref={ (input)=>this.pirateForm = input } onSubmit={ (e) => this.createPirate(e) }>
    <input ref={ (input) => this.name = input } type="text" placeholder="Pirate name" />
    <input ref={ (input) => this.vessel = input } type="text" placeholder="Pirate vessel" />
    <input ref={ (input) => this.weapon = input } type="text" placeholder="Pirate weapon" />
    <button type="submit">Add Pirate</button>
  </form>
  )
```

and `this.pirateForm.reset();`:

```js
createPirate(e) {
    e.preventDefault()

    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }

    this.props.addPirate(pirate)
    this.pirateForm.reset()
  }
```

The form should now empty and the `addPirate` function is called to store our pirate in state.

## Displaying Pirates

We can add pirates to state but cannot see them in the UI. Let's create an unordered list in `Pirate.js`.

* `Pirate.js`:

```js
    return (
      <div className='pirate'>
        <ul>
          <li></li>
        </ul>
      </div>
      )
```

## Review .map with Sample Pirates

We will use a JSON Array in `Pirate.js` and [JSON stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) to get a quick look at some pirates.

Examine the sample files in the `data` folder. Ensure that the data folder is inside `src`.

* `Pirate.js`:

```js
import piratesFile from '../data/sample-pirates-array';`:
...
<pre><code>{ JSON.stringify(piratesFile, null, 4)}</code></pre>
```

`JSON.stringify(<data-that-you-want-to-stringify>,<replacer-function-null>,<indentation>)`

```jsx
import React, { Component } from 'react';
import piratesFile from '../data/sample-pirates-array'
import '../assets/css/Pirate.css'

class Pirate extends React.Component {
  render(){
    return (
      <div className='pirate'>
        <ul>
          <li><pre><code>{ JSON.stringify(piratesFile, null, 4)}</code></pre></li>
        </ul>
      </div>
      )
  }
}

export default Pirate;
```

With `Array.map()`:

`array.map()` to create components.

Review Example - Doubling numbers:

```js
> var numbers = [1,5,8]
> numbers
> numbers.map(function(number){return number * 2})
> const double = function(number){return number * 2}
> double(5)
> numbers.map(double)
```

* `Pirate.js`:

```js
<ul>
{piratesFile.pirates.map(function(pirate){
  return (
    <li>
    <h4>{pirate.name}</h4>
    </li>
  )
})}
</ul>
```

Review over, rollback the Pirate component to its original state:

* `Pirate`:

```js
import React, { Component } from 'react';
import '../assets/css/Pirate.css'

class Pirate extends React.Component {
  render(){
    return (
      <div className='pirate'>
      <p>{this.props.tagline}</p>
      </div>
      )
  }
}

export default Pirate;
```

### Object.keys()

We cannot directly use `.map` which is a method on the Array prototype - not the Object prototype.

Use `Object.keys()` (a private method on the Object) instead. See the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) article on Object keys.

```js
> var arr = [1,2,3]
> Object.keys(arr)
```

We will massage the `<Pirate />` component in `App.js` to enable the use of `.map()`.

`App.js`:

```js
render() {
  return (
    <div className="App">
    <Header />
    <ul>
    {
      Object.keys(this.state.pirates)
      .map( key => <Pirate key={key} /> )
    }
    </ul>
    <PirateForm addPirate={this.addPirate} />
    </div>
    );
  }

```

And edit to use the key to pass a details prop to the Pirate component using:

`.map( key => <Pirate key={key} details={this.state.pirates[key]}`

`App.js`:

```js
  render() {
    return (
      <div className="App">
      <Header />

      <ul>
      {
        Object.keys(this.state.pirates)
        .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
      }
      </ul>

      <PirateForm addPirate={this.addPirate} />
      </div>
    );
  }
```

* `Pirate.js`:

```js
import React, { Component } from 'react';
import '../assets/css/Pirate.css'

class Pirate extends React.Component {
  render(){
    return (
        <li>{this.props.details.name}</li>
    )
  }
}

export default Pirate;
```

Create a new pirate using the form.

Add an object with the details to the Pirate properties and a few more display entries shortening them with a variable: `const { details } = this.props;`.

* `Pirate.js`:

```js
import React, { Component } from 'react';
import '../assets/css/Pirate.css'

class Pirate extends Component {
  render(){
    const { details } = this.props;
    return (
      <div className='pirate'>
      <ul>
      <li>{details.name}</li>
      <li>{details.weapon}</li>
      <li>{details.vessel}</li>
      </ul>
      </div>
      )
  }
}
export default Pirate;
```

Test again using the form.

### Load sample data via PirateForm

We will import the data into `App.js` as an object. Switch the array out for the object version of the pirate samples.

`App.js`:

```js
import piratesFile from './data/sample-pirates-object';
```

Create a new method in `App.js`:

```js
loadSamples(){
  this.setState({
    pirates: piratesFile
  })
}
```

Bind it in the constructor:

```js
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.state = {
      pirates: {}
    }
  }
```

We will use a button in `PirateForm`:

`<button onClick={this.props.loadSamples}>Load Sample Pirates</button>`:

```js
render() {
  return (
    <div className="pirate-form">
    <h3>Pirate Forms</h3>
    <AddPirateForm addPirate={this.props.addPirate} />
    <button onClick={this.props.loadSamples}>Load Sample Pirates</button>
    </div>
    )
}
```

The `PirateFrom` will need access to this method.

Add `loadSamples={this.loadSamples}` to props.

* `App.js`:

```js
<PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />
```

```js
render() {
  return (
    <div className="App">
    <Header />
    <button onClick={this.loadSamples}>Load Sample Pirates</button>
    {
      Object
      .keys(this.state.pirates)
      .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
    }
    <PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />
    </div>
    );
  }
}
```

Test the button. Now you can load sample pirates from the pirate form.

Test the form.

### Remove Pirate

Add a new method to `App.js`:

```js
removePirate(key){
  const pirates = {...this.state.pirates}
  delete pirates[key]
  this.setState({pirates})
}
```

Bind it to the constructor in App:

```js
this.removePirate = this.removePirate.bind(this);
```

`$r` App to see the results:

```js
$r.removePirate('pirate1')
```

We will locate the control to remove pirates in the `Pirate.js` component.

Pass the prop to `Pirate` from App using `removePirate = {this.removePirate}`:

* `App.js`:

```js
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate key = { key }
    details = {this.state.pirates[key]}
    removePirate = {this.removePirate} /> )
}
```

<!-- We could also pass the prop to `PirateForm` from `App`:

```js
<PirateForm
addPirate={this.addPirate}
removePirate={this.removePirate}
loadSamples={this.loadSamples} />
```

And delete a pirate from there.

* PirateForm

`<button onClick={() => this.props.removePirate('pirate1')}>X</button>`

Test. This only removes pirate1. -->

Since we want the controls to be associated with each Pirate entry we'll add them to the `Pirate` component by including a new list item: `<li><button onClick={() => this.props.removePirate('pirate1')}>X</button></li>`.

* `Pirate.js`:

```js
return (
  <div className="pirate">
  <ul>
    <li>{details.name}</li>
    <li>{details.weapon}</li>
    <li>{details.vessel}</li>
    <li><button onClick={() => this.props.removePirate('pirate1')}>✖︎</button></li>
  </ul>
  </div>
  )
```

We have temorarily hard coded the button to remove just one pirate from the list.

Load pirates and examine the state in App.

Pass it along as part of the Pirate component `index={key}` in App.

* `App.js`:

```js
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate key={key}
    index={key}
    details={this.state.pirates[key]}
    removePirate={this.removePirate} /> )
}
```

Pass the index value of the pirate in question to the method:

* `Pirate`:

```html
  <ul>
    <li>{details.name}</li>
    <li>{details.weapon}</li>
    <li>{details.vessel}</li>
    <li><button onClick={() => this.props.removePirate(this.props.index)}>✖︎</button></li>
  </ul>
```

Now we can add and delete any pirate.

But aren't we already passing along a key? Why do we need an index?

Try this is `Pirate.js`:

```js
<li><button onClick={() => this.props.removePirate(this.props.key)}>✖︎</button></li>
```

Note the error message. The key prop has a special meaning in React. It it is not passed to the component as prop but is used by React to aid the reconciliation of collections.

## Persisting the Data

`cd` to the top level of today's repo.

```sh
$ mkdir express-pirates
$ cd express-pirates
$ npx express-generator --no-view
$ npm i
$ npm i -S nodemon mongoose
```

VSCode settings (for clarity).

Back end:

```js
{
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#FF2C70",
    "titleBar.inactiveBackground": "#FF2C70CC"
  }
}
```

Front end:

```js
{
  "workbench.colorCustomizations": {
    "titleBar.activeForeground": "#000",
    "titleBar.inactiveForeground": "#000000CC",
    "titleBar.activeBackground": "#FFC600",
    "titleBar.inactiveBackground": "#FFC600CC"
  }
}
```

Create a dot gitignore, set the PORT to 3005, the npm script to use nodemon and edit `app.js` to:

```js
var express = require('express');
var router = express.Router();

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
```

Create the pirate schema, a database on mLab and the mongoose connection string:

```js
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mongoUri = 'mongodb://devereld:dd2345@ds113746.mlab.com:13746/pirates';

// schema
const PirateSchema = new Schema({
  name: String,
  weapon: String,
  vessel: String
});

const Pirate = mongoose.model('Pirate', PirateSchema);

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initialization
mongoose.connect(mongoUri, { useNewUrlParser: true });

module.exports = app;

```

Add a default route and test

```js
app.get('/', function(req, res){
    return res.send('Hello from the API');
});
```

<!-- ```js
app.get('/api/pirates', function(req, res){
  Pirate.find({}, function(err, results) {
    return res.send(results);
  });
});
``` -->

Create an end point for viewing pirates:

```js
app.get('/api/pirates', function(req, res){
  Pirate.find({}, function(err, results) {
    return res.send(results);
  });
});
```

Implement a seed for the database.

```js
app.get('/api/import', (req, res) => {
  Pirate.create(
    {
      "name": "John Rackham",
      "image": "avatar.svg",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam fuga minus molestiae placeat ad iure asperiores nam, recusandae dolor quasi debitis, eveniet reiciendis veritatis et! Sit provident, praesentium laborum tempore.",
      "year": 1724,
      "weapon": "Sword",
      "vessel": "Bounty"
    }, {
      "name": "Donald Trump",
      "image": "avatar.svg",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia consectetur, praesentium eaque ad odit. Nihil molestiae ut temporibus commodi natus delectus cumque architecto, eligendi ad repellat, quasi porro eos dignissimos.",
      "year": 1800,
      "weapon": "Twitter",
      "vessel": "Bounty"
    }, {
      "name": "Sea Dog",
      "image": "avatar.svg",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem autem rerum, nam minima dolorum blanditiis, velit aliquid assumenda illum totam magni sint laudantium laboriosam odit minus distinctio repellendus. Cumque, quod.",
      "year": 1684,
      "weapon": "Sword",
      "vessel": "Bounty"
    }, {
      "name": "Jean Lafitte",
      "image": "avatar.svg",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus pariatur ratione dicta, neque sed, odio maxime, saepe autem libero dolore nobis. Dicta deleniti, illo natus nemo suscipit impedit quod amet!",
      "year": 1629,
      "weapon": "Sword",
      "vessel": "Bounty"
    }, {
      "name": "Crab McPirate",
      "image": "avatar.svg",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam magnam ullam eveniet eius provident, omnis quos ex quam maiores id fugit accusantium ea ipsa tenetur excepturi vero quis nulla aliquid!",
      "year": 1734,
      "weapon": "Sword",
      "vessel": "Bounty"
    }, {
      "name": "Atlantic Terror",
      "image": "avatar.svg",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio unde reiciendis, similique recusandae velit corrupti fugit quasi eos labore dicta eligendi possimus fugiat. Doloribus fugit consequuntur harum perspiciatis, dicta enim?",
      "year": 1753,
      "weapon": "Sword",
      "vessel": "Bounty"
    }, {
      "name": "Oyster Boy",
      "image": "avatar.svg",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, corporis nemo animi, qui, vero delectus odit, quaerat aspernatur ullam magni unde aliquid amet consequuntur magnam. Molestiae architecto deleniti temporibus inventore.",
      "year": 1543,
      "weapon": "Sword",
      "vessel": "Bounty"
    }, {
      "name": "Mussel Man",
      "image": "avatar.svg",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque labore pariatur similique necessitatibus ut deserunt, esse quod ipsum in quam, provident aspernatur culpa hic quisquam dolores odit nemo obcaecati commodi.",
      "year": 1825,
      "weapon": "Sword",
      "vessel": "Bounty"
    }, {
      "name": "Jumbo the Prawn",
      "image": "avatar.svg",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia odio, tempora eum vel et, nobis optio adipisci quibusdam, asperiores a quia non pariatur. Neque, sequi est voluptatem labore hic eum!",
      "year": 1850,
      "weapon": "Sword",
      "vessel": "Bounty"
    },
    function(err) {
      if (err) return console.log(err);
      return res.sendStatus(202);
    }
  )
})
```

`App.js`:

```js
  componentWillMount(){
    fetch('http://localhost:3005/api/pirates')
    .then(response => response.json())
    .then(pirates => this.setState({pirates}))
  }
```

Note the error in the console. Add cors headers:

```js
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mongoUri = 'mongodb://devereld:dd2345@ds113746.mlab.com:13746/pirates';

// schema
const PirateSchema = new Schema({
  name: String,
  weapon: String,
  vessel: String
});

const Recipe = mongoose.model('Pirate', PirateSchema);

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE")
  next()
})

app.get('/api/pirates', function(req, res){
  Recipe.find({}, function(err, results) {
    return res.send(results);
  });
});

// initialization
mongoose.connect(mongoUri, { useNewUrlParser: true });

module.exports = app;

```

_Or_ use cors middleware:

```js
const cors = require('cors');
...
app.use(cors());
```

## Loading

The loading state should be used to indicated that an asynchronous request is happening. Set an `isLoading` property in the constructor:

```js
  this.state = {
    pirates: {},
    isLoading: true
  }
}
```

Turn it off once the data is loaded:

```js
componentDidMount(){
  this.setState({ isLoading: true });
  fetch('http://localhost:3005/api/pirates')
  .then(response => response.json())
  .then(pirates => this.setState({pirates, isLoading: false}))
}
```

In your render() method you can use React’s conditional rendering to display either a loading indicator or the resolved data.

```js
render() {

  const { isLoading } = this.state;

  if (isLoading) {
    return <p>Loading ...</p>;
  }
```

Test the loading by going to Chrome dev tools > Network > Online and set it to Slow 3G. 

As an exercise you could try implementing a [React Content Loader](https://github.com/danilowoz/react-content-loader).

## Error Handling

The second state that you could keep in your local state would be an error state. Create a new entry in state:

```js
  this.state = {
    pirates: {},
    isLoading: false,
    error: null
  }
}
```

Add error handling to the initialization and a new render method to support it:

```js
componentDidMount(){
  this.setState({ isLoading: true });
  fetch('http://localhost:3005/api/pirates')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong ...');
    }
  })
  .then(pirates => this.setState({pirates, isLoading: false}))
  .catch(error => this.setState({ error, isLoading: false }));
}

render() {
  const { isLoading, error } = this.state;

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }
```

Try to induce an error by changing the connection string to the back end.

## Axios

You can substitute the native fetch API with another library. A commonly used library for fetching data is axios. 

Install axios in your project with `npm install axios -S` and use it instead of the native fetch API in your project. 

Refactor using axios instead of the fetch API:

```js
import axios from 'axios';

  componentDidMount(){
    this.setState({ isLoading: true });
    axios.get('http://localhost:3005/api/pirates')
    .then(response => this.setState({
      pirates: response.data,
      isLoading: false
    }))
    .catch(error => this.setState({
      error,
      isLoading: false
    }));
  }
```

## Removing Pirates

Currently our `removePirate` function removes pirates from state but has no effect on the database.

Let's use axios and a get query to delete a pirate.

```js
removePirate(key){
  const pirates = {...this.state.pirates}
  console.log(key)
  console.log(this.state.pirates[key]._id)
  let pirateDel = this.state.pirates[key]._id;
  axios.get(`http://localhost:3005/api/pirates/${pirateDel}`)
  .then(delete pirates[key])
  .then(this.setState({pirates}))
}
```

Create a corresponding end point in express for deleting a pirate.

```js
app.get('/api/pirates/:id', function(req, res){
  let id = req.params.id;
  Pirate.deleteOne({ _id: id}, result => {
    return res.sendStatus(200)
  })
})
```

## Adding Pirates

Here is some starter code. It is up to you to debug and get the pirate successfully showing in the front end.

`App.js`:

```js
addPirate(pirate) {
  console.log(pirate)
  const pirates = {...this.state.pirates}
  axios.post('http://localhost:3005/api/pirates/', {pirate})
  .then(response => response.data)
  .then(this.setState({ pirates: pirates }))
}
```

Express:

```js
app.post('/api/pirates', function(req, res){
  Pirate.create( req.body, (err, pirate) => {
    if (err) return console.log(err);
    return res.send(pirate)
  })
})
```

## Notes