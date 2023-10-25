/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
  "use strict";

  function isPrime(n) {
      var i;

      for (i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) {
              return false;
          }
      }
      return true;
  }

  var i, sequence = [];

  for (i = 2; i <= n; i++) {
      if (n % i === 0) {
          if (isPrime(i)) {
              n /= i;
              sequence.push(i);
          }
      }
  }
    
  for (var k = 0; k < sequence.length; k++) {
      console.log(sequence[k]);
  }
  
  return sequence;
};

function get_result(){
  let val = parseInt(document.getElementById('num').value);
  let res = getPrimeFactors(val).join(" ");
  document.getElementById('pf').innerHTML = res;
}

// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
console.log(getPrimeFactors(30030));

