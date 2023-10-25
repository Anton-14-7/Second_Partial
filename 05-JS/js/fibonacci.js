/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers
var memo = {1:1, 2:1};
function fibonacci() {
    "use strict";
    //parseInt so it returns an integer
    var n = parseInt(document.getElementById("num").value);
    var val = f(n);
    document.getElementById("fibonacciLbl").textContent = val;
    console.log(memo)
    return f;
}

function f(n) {

    var value;
    // Check if the memory array already contains the requested number
    if (memo.hasOwnProperty(n)) {
        value = memo[n];
    } else {
        //TODO: Implement the fibonacci function here!
        value = f(n-1) + f(n-2)
        memo[n] = value;
    }

    return value;
}
