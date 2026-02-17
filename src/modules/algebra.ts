import {questionArea} from "../script.js";

interface SeriesType{
    expr: string;
    conv: string;
}

export function generateLogarithm(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["basic", "change_base", "equation", "properties", "exponential_form"];
    let type=types[Math.floor(Math.random()*types.length)];
    let base=Math.floor(Math.random()*4)+2;
    let arg=Math.pow(base, Math.floor(Math.random()*4)+1);
    let newBase=Math.floor(Math.random()*3)+2;
    let hint="";
    switch (type){
        case "basic":{
            let answer=(Math.log(arg)/Math.log(base)).toFixed(2);
            questionArea.innerHTML=`Evaluate: \\( \\log_{${base}} ${arg} \\)`;
            window.correctAnswer={
                correct: answer,
                alternate: answer
            };
            hint="Enter a decimal number, e.g., 2.5";
            break;
        }
        case "change_base":{
            let numerator=Math.log(arg)/Math.log(newBase);
            let denominator=Math.log(base)/Math.log(newBase);
            let numericAnswer=(numerator/denominator).toFixed(2);
            let expr=`log_${newBase}(${arg})/log_${newBase}(${base})`;
            questionArea.innerHTML=`Express \\( \\log_{${base}} ${arg} \\) in base \\( ${newBase} \\)`;
            window.correctAnswer={
                correct: numericAnswer,
                alternate: expr
            };
            hint="Enter as fraction (e.g., log3(8)/log3(2)) or decimal";
            break;
        }
        case "equation":{
            let exponent=Math.floor(Math.random()*3)+2;
            questionArea.innerHTML=`Solve for \\( x \\): \\( ${base}^{x}=${Math.pow(base, exponent)} \\)`;
            window.correctAnswer={
                correct: exponent.toString(),
                alternate: exponent.toString()
            };
            hint="Enter a whole number";
            break;
        }
        case "properties":{
            let a=Math.floor(Math.random()*8)+2;
            let b=Math.floor(Math.random()*8)+2;
            let logSum=(Math.log(a*b)/Math.log(base)).toFixed(2);
            questionArea.innerHTML=`Evaluate: \\( \\log_{${base}} (${a} \\times ${b}) \\)`;
            window.correctAnswer={
                correct: logSum,
                alternate: `\\log_{${base}} ${a}+\\log_{${base}} ${b}=${(Math.log(a)/Math.log(base)).toFixed(2)}+${(Math.log(b)/Math.log(base)).toFixed(2)}=${logSum}`
            };
            break;
        }
        case "exponential_form":{
            let exponent=Math.floor(Math.random()*3)+2;
            let result=Math.pow(base, exponent);
            questionArea.innerHTML=`If \\( \\log_{${base}} x=${exponent} \\), find \\( x \\)`;
            window.correctAnswer={
                correct: result.toString(),
                alternate: `${base}^${exponent}`
            };
            hint="Enter a number or expression (e.g., 8 or 2^3)";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateExponent(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["basic", "solve", "laws", "growth", "compare"];
    let type=types[Math.floor(Math.random()*types.length)];
    let base=Math.floor(Math.random()*4)+2;
    let exponent=Math.floor(Math.random()*5)+2;
    let hint="";
    switch (type){
        case "basic":
            questionArea.innerHTML=`Evaluate: \\( ${base}^{${exponent}} \\)`;
            window.correctAnswer={
                correct: Math.pow(base, exponent).toString(),
                alternate: Math.pow(base, exponent).toString()
            };
            hint="Enter a number";
            break;
        case "solve":{
            let power=Math.pow(base, exponent);
            questionArea.innerHTML=`Solve for \\( x \\): \\( ${base}^{x}=${power} \\)`;
            window.correctAnswer={
                correct: exponent.toString(),
                alternate: exponent.toString()
            };
            hint="Enter a whole number";
            break;
        }
        case "laws":{
            let a=Math.floor(Math.random()*3)+2;
            let b=Math.floor(Math.random()*3)+2;
            questionArea.innerHTML=`Simplify: \\( (${base}^{${a}}) \\times (${base}^{${b}}) \\)`;
            window.correctAnswer={
                correct: Math.pow(base, a+b).toString(),
                alternate: `${base}^${a+b}`
            };
            hint="Enter a number (e.g., 32) or an expression (e.g., 2^5)";
            break;
        }
        case "growth":{
            let rate=(Math.random()*20+5).toFixed(1);
            questionArea.innerHTML=`A population grows at \\( ${rate}\\% \\) annually. What is the growth factor?`;
            let factor=(1+parseFloat(rate)/100).toFixed(3);
            window.correctAnswer={
                correct: factor,
                alternate: factor
            };
            hint="Enter a decimal (e.g., 1.05)";
            break;
        }
        case "compare":{
            let b1=Math.floor(Math.random()*3)+2;
            let b2=Math.floor(Math.random()*3)+2;
            let e1=Math.floor(Math.random()*4)+2;
            let e2=Math.floor(Math.random()*4)+2;
            questionArea.innerHTML=`Which is larger: \\( ${b1}^{${e1}} \\) or \\( ${b2}^{${e2}} \\)?`;
            let vals=[Math.pow(b1, e1), Math.pow(b2, e2)];
            let largerExpr=vals[0]>vals[1]?`${b1}^${e1}`:`${b2}^${e2}`;
            window.correctAnswer={
                correct: Math.max(...vals).toString(),
                alternate: largerExpr
            };
            hint="Enter the larger value (e.g., 32) or the expression (e.g., 2^5)";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateFactorial(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["basic", "division", "equation", "approximation", "prime"];
    let type=types[Math.floor(Math.random()*types.length)];
    let n=Math.floor(Math.random()*7)+5;
    let k=Math.floor(Math.random()*(n-2))+2;
    let factorial=(num: number): number=>{
        return Array.from({ length: num }, (_, i)=> i+1).reduce((a, b)=> a*b, 1);
    };
    let hint="";
    switch (type){
        case "basic":
            questionArea.innerHTML=`Calculate \\( ${n}! \\)`;
            window.correctAnswer={
                correct: factorial(n).toString(),
                alternate: factorial(n).toString()
            };
            hint="Enter a whole number";
            break;
        case "division":{
            let result=Array.from({ length: n-k }, (_, i)=> n-i).reduce((a, b)=> a*b, 1);
            questionArea.innerHTML=`Simplify: \\( \\frac{${n}!}{${k}!} \\)`;
            window.correctAnswer={
                correct: result.toString(),
                alternate: (factorial(n)/factorial(k)).toString()
            };
            hint="Enter a whole number";
            break;
        }
        case "equation":{
            let factVal=factorial(n);
            questionArea.innerHTML=`Solve for \\( n \\): \\( n!=${factVal} \\)`;
            window.correctAnswer={
                correct: n.toString(),
                alternate: n.toString()
            };
            hint="Enter a whole number";
            break;
        }
        case "approximation":{
            questionArea.innerHTML=`Estimate \\( ${n}! \\) using Stirling"s approximation`;
            let stirling=Math.sqrt(2*Math.PI*n)*Math.pow(n/Math.E, n);
            window.correctAnswer={
                correct: stirling.toFixed(0),
                alternate: Math.round(stirling).toString()
            };
            hint="Enter a rounded whole number";
            break;
        }
        case "prime":{
            let primes=[2, 3, 5, 7, 11];
            let prime=primes[Math.floor(Math.random()*primes.length)];
            questionArea.innerHTML=`Find the exponent of \\( ${prime} \\) in \\( ${n}! \\) (prime factorization)`;
            let count=0;
            let temp=n;
            while (temp>0){
                temp=Math.floor(temp/prime);
                count+=temp;
            }
            window.correctAnswer={
                correct: count.toString(),
                alternate: count.toString()
            };
            hint="Enter a whole number";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateSeries(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["arithmetic_sum", "geometric_sum", "convergence", "nth_term"];
    let type=types[Math.floor(Math.random()*types.length)];
    let mathExpression="";
    let plainCorrectAnswer="";
    let hint="";
    switch (type){
        case "arithmetic_sum":{
            let a1=Math.floor(Math.random()*10)+1;
            let d=Math.floor(Math.random()*5)+1;
            let n=Math.floor(Math.random()*10)+5;
            let sum=(n/2)*(2*a1+(n-1)*d);
            mathExpression=`Find the sum of the first ${n} terms of the arithmetic sequence: \\[ S_n=\\frac{n}{2} [2a_1+(n-1)d] \\] where \\( a_1=${a1} \\) and \\( d=${d} \\).`;
            plainCorrectAnswer=sum.toString();
            window.correctAnswer={correct: plainCorrectAnswer};
            hint="Enter a number";
            break;
        }
        case "geometric_sum":{
            let a1=Math.floor(Math.random()*5)+1;
            let rValue=(Math.random() < 0.5?-1:1)*(Math.random()*0.9+0.1);
            let r=rValue.toFixed(2);
            let n=Math.floor(Math.random()*8)+3;
            let sum=a1*(1-Math.pow(rValue, n))/(1-rValue);
            mathExpression=`Find the sum of the first ${n} terms of the geometric sequence: \\[ S_n=a_1 \\frac{1-r^n}{1-r} \\] where \\( a_1=${a1} \\) and \\( r=${r} \\).`;
            plainCorrectAnswer=sum.toFixed(2);
            window.correctAnswer={
                correct: plainCorrectAnswer,
                alternate: `(${a1}*(1-${r}^${n}))/(1-${r})`
            };
            hint="Enter a decimal or the formula (e.g., 2.5 or (3*(1-0.5^4))/(1-0.5))";
            break;
        }
        case "convergence":{
            let seriesTypes: SeriesType[]=[{expr: "\\frac{1}{n^2}", conv: "converges"}, {expr: "\\frac{1}{\\sqrt{n}}", conv: "diverges"}, {expr: "(-1)^n \\frac{1}{n}", conv: "converges"}];
            let chosen=seriesTypes[Math.floor(Math.random()*seriesTypes.length)];
            mathExpression=`Determine if the series converges or diverges: \\[ \\sum_{n=1}^{\\infty} ${chosen.expr} \\]`;
            plainCorrectAnswer=chosen.conv;
            window.correctAnswer={
                correct: plainCorrectAnswer,
                alternate: plainCorrectAnswer==="converges"?"converge":"diverge"
            };
            hint="Enter \"converges\" or \"diverges\"";
            break;
        }
        case "nth_term":{
            let a1=Math.floor(Math.random()*10)+1;
            let d=Math.floor(Math.random()*5)+1;
            let n=Math.floor(Math.random()*10)+5;
            let an=a1+(n-1)*d;
            mathExpression=`Find the ${n}${getOrdinal(n)} term of the arithmetic sequence: \\[ a_n=a_1+(n-1)d \\] where \\( a_1=${a1} \\) and \\( d=${d} \\).`;
            plainCorrectAnswer=an.toString();
            window.correctAnswer={correct: plainCorrectAnswer};
            hint="Enter a number";
            break;
        }
    }
    window.expectedFormat=hint;
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=mathExpression;
    questionArea.appendChild(mathContainer);
    if (window.MathJax&&window.MathJax.typesetPromise){
        window.MathJax.typesetPromise([mathContainer]).catch((err: any)=>
            console.log("MathJax typeset error:", err)
        );
    }
}
export function generateRoot(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let root=Math.floor((Math.random()*4))+2;
    let base=Math.floor((Math.random()*10))+1;
    let radicand=Math.pow(base, root);
    let rootExpression="";
    if (root=== 2){
        rootExpression=`\\[ \\sqrt{${radicand}}=? \\]`;
    }
    else{
        rootExpression=`\\[ \\sqrt[${root}]{${radicand}}=? \\]`;
    }
    let correctRoot=base.toString();
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=rootExpression;
    questionArea.appendChild(mathContainer);
    if (window.MathJax&&window.MathJax.typesetPromise){
        window.MathJax.typesetPromise([mathContainer]).catch((err: any)=>
            console.log("MathJax typeset error:", err)
        );
    }
    window.correctAnswer={
        correct: correctRoot,
        alternate: correctRoot
    };
    window.expectedFormat="Enter a whole number";
}
export function getOrdinal(n: number): string{
    let s=["th", "st", "nd", "rd"];
    let v=n%100;
    return s[(v-20)%10]||s[v]||s[0];
}