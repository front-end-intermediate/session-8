import pirates from './sample-pirates-object.js';

console.log(pirates);
console.log(Object.keys(pirates));

// Object.keys(pirates).map(key => {
// 	pirates[key];
// });

Object.keys(pirates).map((key) => {
  console.log(pirates[key].name)
})

// const renderHTML = () => {
//   Object.keys(pirates).map((key) => x{
//     `<p>${(pirates[key].name)}</p>`
// 	})
	
// }

// renderHTML();
