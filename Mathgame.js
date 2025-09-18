
let prompt = require('prompt-sync')();

// game introduction
console.log("\n")
console.log("MATH GAME!!");
console.log("\n")
console.log("1) Max Score");
console.log("2) Three-out\n");

//  mode selection
let choice = Number(prompt("Select A Mode - "));
if (choice !== 1 && choice !== 2) {
    console.log("That is NOT a Number for a Mode");
    return;
}

//  difficulty selection
console.log("\n")
console.log("1) Easy");
console.log("2) Medium");
console.log("3) Hard");
let Difficulty = Number(prompt("Select the difficulty - "));

if (Difficulty === 1) {
    console.log("\n")
    console.log("You Selected Easy");
    console.log("\n")
} else if (Difficulty === 2) {
    console.log("\n")
    console.log("You Selected Medium");
    console.log("\n")
} else if (Difficulty === 3) {
    console.log("\n")
    console.log("You Selected Hard");
    console.log("\n")
} else {
    console.log("That is NOT a number for a Difficulty");
    console.log("\n")
    return;
}


// random number generator
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Operations list in each difficulty
function generateQuestion(difficulty) {
    let num1, num2, op;
    let opsEasy = ['+', '-'];
    let opsMedium = ['+', '-', '*', '/', '%'];
    let opsHard = ['+', '-', '*', '/', '%'];

    let opsList = difficulty === 1 ? opsEasy : (difficulty === 2 ? opsMedium : opsHard);
    op = opsList [getRndInteger(0, opsList.length)];


    //The  max and min numbers in each difficulty
    if (difficulty === 1) {
        num1 = getRndInteger(1, 10);
        num2 = getRndInteger(1, 10);
    } 
    else if (difficulty === 2) {
        if (op === '+' || op === '-') {
            num1 = getRndInteger(10, 100);
            num2 = getRndInteger(10, 100);
        } 
        else {
            num1 = getRndInteger(1, 10);
            num2 = getRndInteger(1, 10);
        }
    } 
    else {
        if (op === '+' || op === '-') {
            num1 = getRndInteger(100, 1000);
            num2 = getRndInteger(100, 1000);
        } 
        else {
            num1 = getRndInteger(10, 100);
            num2 = getRndInteger(1, 10);
        }
    }

    // No divide by zero
    if ((op === '/' || op === '%') && num2 === 0) {
        num2 = getRndInteger(1, 10);
    }

    let question = num1 + " " + op + " " + num2;
    let ans = solve(num1, op, num2);
    return { question: question, ans: ans };
}

//  Math and Operations
function solve(a, op, b) {
    if (op === '+'){ 
        return a + b;
    }
    if (op === '-'){ 
        return a - b;
    }
    if (op === '*'){ 
        return a * b;
    }
    if (op === '/'){
         return Math.floor(a / b);
    }
    if (op === '%'){ 
        return a % b;
    }
    return null;
}

// lifes display 
function Lifes(l) {
    if (l === 3){
        console.log("3 lifes left");

    }
    else if (l === 2){
         console.log("2 lifes left");
    }
    else if (l === 1){
        console.log("1 life left");
    }
    else{ 
        console.log("You Have Ran out Of Lives");
    }
}

// max score mode 
if (choice === 1) {
    console.log("You Selected Max Score\n");
    let score = 0;
    for (let i = 0; i < 20; i++) {
        let q = generateQuestion(Difficulty);
        console.log((i + 1) + ") " + q.question + " = ?");
        let userInput = prompt();

        if (userInput.toLowerCase() === "skip") {
            console.log("Skipped. Score: " + score);
        } 
        else if (Number(userInput) === q.ans) {
            score += 10;
            console.log("Correct! Score: " + score);
        } 
        else {
            score -= 5;
            console.log("Wrong! Score: " + score);
        }
    }
    console.log("\nGame Over! Final Score: " + score);
}

// three-out mode 
else if (choice === 2) {
    console.log("You Selected Three-out");
    console.log("\n")
    let score = 0;
    let lives = 3;
    let questionCount = 0;

    while (lives > 0) {
        questionCount++;
        let q = generateQuestion(Difficulty);
        console.log(questionCount + ") " + q.question + " = ?");
        let userInput = prompt();

        if (userInput.toLowerCase() === "skip") {
            lives--;
            console.log("Skipped. Score: " + score);
            Lifes(lives);
        } 
        else if (Number(userInput) === q.ans) {
            score += 10;
            console.log("Correct! Score: " + score);
            Lifes(lives);
        } 
        else {
            lives--;
            console.log("Wrong! Score: " + score);
            Lifes(lives);
        }
    }
    console.log("\nGame Over! Final Score: " + score);
}
