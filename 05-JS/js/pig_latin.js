/*
Pig Latin
*/

function igpayAtinlay() {

  let str = document.getElementById("txtVal").value

  let answer = document.getElementById("pigLatLbl")



  var returnArray = [],
    wordArray = str.split(' ');
  // TODO: make sure that the output is being properly built to produce the desired result.
  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = word.charAt(0);

    if (/[aeiouAEIOU]/.test(beginning)) {
      returnArray.push(word += 'way');
      continue;
    }

    for (var ii = 1; ii < word.length; ii++) {
      if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
        break;
      } else {
        beginning += word.charAt(ii);
      }
    }
    returnArray.push(word.substr(beginning.length) + beginning + 'ay');
  }
  answer.innerHTML = returnArray.join(' ');
}

// Some examples of expected outputs
console.log(igpayAtinlay("pizza")); // "izzapay"
console.log(igpayAtinlay("apple")); // "appleway"
console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"
