var now = new Date();
var hour = now.getHours();

function greeting(x) {
    var greetingText = document.getElementById("greeting");

    if (greetingText) {
        if (x < 5 || x >= 20) {
            greetingText.innerHTML = "Good night";
        } else if (x < 12) {
            greetingText.innerHTML = "Good morning";
        } else if (x < 18) {
            greetingText.innerHTML = "Good afternoon";
        } else {
            greetingText.innerHTML = "Good evening";
        }
    }
}

greeting(hour);
console.log("script loaded");
console.log(hour);

function addYear() {
    var year = new Date().getFullYear();
    var yearText = document.getElementById("copyYear");

    if (yearText) {
        yearText.innerHTML = "© " + year + " MonoMuse. All rights reserved.";
    }
}

var x = 5;
var y = 7;
var z = x + y;

console.log(z); // should print 12

var A = "Hello ";
var B = "world!";
var C = A + B;

console.log(C); // should print "Hello world!"
function sumnPrint(x1, x2) {
    var result = x1 + x2;
    console.log(result);
}

sumnPrint(x, y);   // 12
sumnPrint(A, B);   // Hello world!
if (C.length > z) {
    console.log(C);
} else if (C.length < z) {
    console.log(z);
} else {
    console.log("good job!");
}
var L1 = ["Watermelon","Pineapple","Pear","Banana"];
var L2 = ["Apple","Banana","Kiwi","Orange"];

function findTheBanana(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "Banana") {
            alert("Found Banana!");
        }
    }
}

//findTheBanana(L1);
//findTheBanana(L2);
function findTheBananaForEach(arr) {
    arr.forEach(function(item) {
        if (item === "Banana") {
            alert("Found Banana!");
        }
    });
}

//findTheBananaForEach(L1);
//findTheBananaForEach(L2);
