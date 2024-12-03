const print = (msg) => {
  newDiv = document.createElement("div");
  newDiv.innerText = msg;
  newDiv.style.fontSize = '24px';
  document.body.appendChild(newDiv);
  newDiv = document.createElement("div");
  newDiv.innerText = " ";
  document.body.appendChild(newDiv);
} 

/* ************************************************* Asynchronous Callbacks *****  */

console.log('Start');
print('Start')
Promise.resolve().then(() => {
  console.log('Promise');
  print('Promise')
});
console.log('End');
print('End')


// console.log('Start');
// print('Start')
// setTimeout(() => {
//   console.log('Timeout');
//   print('Timeout')
// }, 1000);
// console.log('End');
// print('End')




// // What is IIFE (Immediately Invoked Function Expression)
// (async() => {
//   console.log('Start');print('Start')
//   await Promise.resolve().then(() => {
//     console.log('Promise');print('Promise')
//   });
//   console.log('End');print('End')
// })();

/* Reference:  http://latentflip.com/loupe */