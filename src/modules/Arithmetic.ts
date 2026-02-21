import {questionArea} from "../script.js";

function getRangeForDifficulty(difficulty?: string): {min: number, max: number}{
    if (difficulty==="easy") return {min: 1, max: 50};
    if (difficulty==="hard") return {min: -1000, max: 3000};
    return {min: -1000, max: 1500};
}
function getMaxForDifficulty(difficulty?: string, baseMax: number=10): number{
    if (difficulty==="easy") return Math.floor(baseMax*0.5);
    if (difficulty==="hard") return Math.floor(baseMax*2);
    return baseMax;
}
function gcd(a: number, b: number): number{
    return b===0 ? Math.abs(a) : gcd(b, a % b);
}
function isPrime(n: number): boolean{
    if (n<2) return false;
    if (n===2) return true;
    if (n%2===0) return false;
    for (let i=3; i*i<=n; i+=2){
        if (n%i===0) return false;
    }
    return true;
}
export function generateAddition(difficulty?: string): void{
    if (!questionArea) return;
    let range=getRangeForDifficulty(difficulty);
    let num1: number=parseFloat(((Math.random()*(range.max-range.min))+range.min).toFixed(3));
    let num2: number=parseFloat((Math.random()*range.max).toFixed(3));
    questionArea.innerHTML=`\$${num1}+${num2}=\$`;
    window.correctAnswer={
        correct: (num1+num2).toFixed(3),
        alternate: (num1+num2).toFixed(3)
    };
    window.expectedFormat="Enter a number (up to 3 decimals)";
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateSubtraction(difficulty?: string): void{
    if (!questionArea) return;
    let range=getRangeForDifficulty(difficulty);
    let num1: number=parseFloat(((Math.random()*(range.max-range.min))+range.min).toFixed(3));
    let num2: number=parseFloat((Math.random()*range.max).toFixed(3));
    questionArea.innerHTML=`\$${num1}-${num2}=\$`;
    window.correctAnswer={
        correct: (num1-num2).toFixed(3),
        alternate: (num1-num2).toFixed(3)
    };
    window.expectedFormat="Enter a number (up to 3 decimals)";
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateMultiplication(difficulty?: string): void{
    if (!questionArea) return;
    let range=getRangeForDifficulty(difficulty);
    let num1: number=parseFloat(((Math.random()*(range.max-range.min))+range.min).toFixed(2));
    let num2: number=parseFloat((Math.random()*range.max).toFixed(2));
    questionArea.innerHTML=`\$${num1} \\times ${num2}=\$<br>Round your answer to two decimal places`;
    let actualAnswer: number=num1*num2;
    window.correctAnswer={
        correct: (Math.round(actualAnswer*100)/100).toFixed(2),
        alternate: actualAnswer.toFixed(5)
    };
    window.expectedFormat="Enter a number rounded to 2 decimal places";
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateDivision(difficulty?: string): void{
    if (!questionArea) return;
    let range=getRangeForDifficulty(difficulty);
    let num1: number=parseFloat(((Math.random()*(range.max-range.min))+range.min).toFixed(2));
    let num2: number=parseFloat((Math.random()*range.max).toFixed(2));
    questionArea.innerHTML=`\$${num1} \\div ${num2}=\$<br>Round your answer to two decimal places`;
    let actualAnswer: number=num1/num2;
    window.correctAnswer={
        correct: (Math.round(actualAnswer*100)/100).toFixed(2),
        alternate: actualAnswer.toFixed(5)
    };
    window.expectedFormat="Enter a number rounded to 2 decimal places";
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateWholeNumberPlaceValue(difficulty?: string): void{
    if (!questionArea) return;
    let types=["place_value", "expanded_form", "rounding"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxNum=getMaxForDifficulty(difficulty, 9999);
    let num=Math.floor(Math.random()*maxNum)+100;
    let hint="";
    switch (type){
        case "place_value":{
            let digits=num.toString().split("");
            let placeIndex=Math.floor(Math.random()*digits.length);
            let placeValue=parseInt(digits[placeIndex]) * Math.pow(10, digits.length-1-placeIndex);
            questionArea.innerHTML=`What is the place value of the digit ${digits[placeIndex]} in ${num}? (e.g., 500 or "hundreds")`;
            window.correctAnswer={
                correct: placeValue.toString(),
                alternate: placeValue.toString()
            };
            hint="Enter a number (e.g., 500)";
            break;
        }
        case "expanded_form":{
            let expanded=num.toString().split("").map((d, i) => parseInt(d) * Math.pow(10, num.toString().length-1-i)).filter(v=>v!==0).join(" + ");
            questionArea.innerHTML=`Write ${num} in expanded form.`;
            window.correctAnswer={
                correct: expanded,
                alternate: expanded
            };
            hint="Enter as 200 + 30 + 4";
            break;
        }
        case "rounding":{
            let place=Math.pow(10, Math.floor(Math.random()*3)+1);
            let rounded=Math.round(num/place)*place;
            questionArea.innerHTML=`Round ${num} to the nearest ${place===10?"ten":place===100?"hundred":"thousand"}.`;
            window.correctAnswer={
                correct: rounded.toString(),
                alternate: rounded.toString()
            };
            hint="Enter a number";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateNumberLineOrdering(difficulty?: string): void{
    if (!questionArea) return;
    let range=getMaxForDifficulty(difficulty, 20);
    let numbers: number[]=[];
    for (let i=0; i<4; i++){
        numbers.push(Math.floor(Math.random()*range*2)-range);
    }
    if (!numbers.some(n=>n<0)) numbers[0]=-numbers[0];
    if (!numbers.some(n=>n>0)) numbers[1]=Math.abs(numbers[1])+1;
    let sorted=[...numbers].sort((a,b)=>a-b);
    questionArea.innerHTML=`Order the numbers from least to greatest: ${numbers.join(", ")}.`;
    window.correctAnswer={
        correct: sorted.join(", "),
        alternate: sorted.join(", ")
    };
    window.expectedFormat="Enter numbers separated by commas, e.g., -3, 0, 5, 7";
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateDivisibility(difficulty?: string): void{
    if (!questionArea) return;
    let types=["rule", "identify_prime", "divisible_by"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxNum=getMaxForDifficulty(difficulty, 100);
    let num=Math.floor(Math.random()*maxNum)+2;
    let hint="";
    switch (type){
        case "rule":{
            let divisors=[2,3,5,9,10];
            let d=divisors[Math.floor(Math.random()*divisors.length)];
            let rule="";
            if (d===2) rule="A number is divisible by 2 if its last digit is even.";
            else if (d===3) rule="A number is divisible by 3 if the sum of its digits is divisible by 3.";
            else if (d===5) rule="A number is divisible by 5 if its last digit is 0 or 5.";
            else if (d===9) rule="A number is divisible by 9 if the sum of its digits is divisible by 9.";
            else if (d===10) rule="A number is divisible by 10 if its last digit is 0.";
            questionArea.innerHTML=`State the divisibility rule for ${d}.`;
            window.correctAnswer={
                correct: rule,
                alternate: rule
            };
            hint="Enter the rule in your own words";
            break;
        }
        case "identify_prime":{
            let isPrimeNum=isPrime(num);
            questionArea.innerHTML=`Is ${num} prime or composite?`;
            window.correctAnswer={
                correct: isPrimeNum?"prime":"composite",
                alternate: isPrimeNum?"prime":"composite"
            };
            hint="Enter 'prime' or 'composite'";
            break;
        }
        case "divisible_by":{
            let divisors=[2,3,4,5,6,8,9,10];
            let d=divisors[Math.floor(Math.random()*divisors.length)];
            if (Math.random()<0.5){
                num=Math.floor(num/d)*d;
                if (num===0) num=d;
            }
            let isDivisible=(num%d===0);
            questionArea.innerHTML=`Is ${num} divisible by ${d}? (yes/no)`;
            window.correctAnswer={
                correct: isDivisible?"yes":"no",
                alternate: isDivisible?"yes":"no"
            };
            hint="Enter 'yes' or 'no'";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateGCFLCM(difficulty?: string): void{
    if (!questionArea) return;
    let types=["gcf", "lcm", "word"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 30);
    let a=Math.floor(Math.random()*maxVal)+5;
    let b=Math.floor(Math.random()*maxVal)+5;
    let hint="";
    switch (type){
        case "gcf":{
            let g=gcd(a,b);
            questionArea.innerHTML=`Find the greatest common factor (GCF) of ${a} and ${b}.`;
            window.correctAnswer={
                correct: g.toString(),
                alternate: g.toString()
            };
            hint="Enter a number";
            break;
        }
        case "lcm":{
            let l=(a*b)/gcd(a,b);
            questionArea.innerHTML=`Find the least common multiple (LCM) of ${a} and ${b}.`;
            window.correctAnswer={
                correct: l.toString(),
                alternate: l.toString()
            };
            hint="Enter a number";
            break;
        }
        case "word":{
            let g=gcd(a,b);
            questionArea.innerHTML=`Two numbers are ${a} and ${b}. What is the largest number that divides both evenly?`;
            window.correctAnswer={
                correct: g.toString(),
                alternate: g.toString()
            };
            hint="Enter a number";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
