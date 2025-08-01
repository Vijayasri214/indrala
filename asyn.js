// //promises
// console.log("1.Order placed.");

// function preparePizza() {
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             resolve("Pizza ready! Enjoy!");
//         },3000); //Simulate a 3-second delay
//     });
// }
// //calling the function and handling the promise
// preparePizza()
// .then((message) => {
//     console.log(`3.${message}`);    //.then() method is executed, and when it fails (i.e., it rejects), the .catch() method handles the error.
// })

// .catch((error) => {
//     console.log("Something went wrong:",error);
// });

// console.log("2.Doing other things while waititng for pizza");


//using asyn and await
console.log("1.Order placed");

function preparePizza() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Pizza ready! Enjoy!");
        },3000); //Simulate a 3-second delay
    });
}

async function orderPizza() {
   console.log("2.Doing other things while waititng for pizza");
   const message= await preparePizza(); //waits fo rhe promise to resolve
   console.log(`3.${message}`);
    
}

//calls the async function
orderPizza();