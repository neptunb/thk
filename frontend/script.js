const print = (msg) => {
  newDiv = document.createElement("div");
  newDiv.innerText = msg;
  newDiv.style.fontSize = '24px';
  document.body.appendChild(newDiv);
  newDiv = document.createElement("div");
  newDiv.innerText = " ";
  document.body.appendChild(newDiv);
} 

/* ************************************************* Synchronous Callbacks *****  */

// function myCallback(){
//   console.log("Step-myCallback");
//   print("Step-myCallback")
// }

// function mainFunc(cb) {
//   console.log("Step-Main");
//   print("Step-Main")
//   if (typeof cb == 'function'){
//     cb();
//   }
// }

// mainFunc(myCallback);



const numbers = [1, 2, 3, 4, 5];

// Doubled numbers with map
print("\n***** doubled numbers in map *****");
const doubled = numbers.map(function(number) {
  return number * 2;
});
console.log(doubled);
print(doubled)

// Even numbers with filter
print("\n***** even numbers in filter *****");
const evens = numbers.filter(function(number) {
  return number % 2 === 0;
});
console.log(evens); 
print(evens)

// Log numbers with forEach
print("\n***** numbers in forEach *****");
numbers.forEach(function(number) {
  console.log(number);
  print(number)
});
