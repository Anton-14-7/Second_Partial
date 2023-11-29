var Num = Math.floor(Math.random() * 6) + 1; 

var DicePic = "dice" + Num + ".png";

var randomImageSource = "images/" + DicePic; 

var img1 = document.querySelectorAll("img")[0];

img1.setAttribute("src", randomImageSource);


var Num2 = Math.floor(Math.random() * 6) + 1;

var img2 = "images/dice" + Num2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src", img2);


//If player 1 wins
if (Num > Num2) {
  document.querySelector("h1").innerHTML = "🚩 Player 1 WINS!";
}
else if (Num2 > Num) {
  document.querySelector("h1").innerHTML = "Player 2 WINS! 🚩";
}
else {
  document.querySelector("h1").innerHTML = "It's a tie!";
}