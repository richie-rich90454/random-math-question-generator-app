import {questionArea} from "../script.js";

interface SeriesType{
    expr: string;
    conv: string;
}
function factorial(n: number): number{
    if (n<0) return NaN;
    let res=1;
    for (let i=2; i<=n; i++) res *= i;
    return res;
}
function gcd(a: number, b: number): number{
    return b===0 ? Math.abs(a) : gcd(b, a % b);
}
export function generateLogarithm(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["basic", "change_base", "equation", "properties", "exponential_form"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxBase=getMaxForDifficulty(difficulty, 4);
    let base=Math.floor(Math.random()*maxBase)+2;
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

export function generateExponent(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["basic", "solve", "laws", "growth", "compare"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxBase=getMaxForDifficulty(difficulty, 4);
    let base=Math.floor(Math.random()*maxBase)+2;
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
export function generateFactorial(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["basic", "division", "equation", "approximation", "prime"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxN=getMaxForDifficulty(difficulty, 7);
    let n=Math.floor(Math.random()*maxN)+5;
    let k=Math.floor(Math.random()*(n-2))+2;
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
export function generateSeries(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["arithmetic_sum", "geometric_sum", "convergence", "nth_term"];
    let type=types[Math.floor(Math.random()*types.length)];
    let mathExpression="";
    let plainCorrectAnswer="";
    let hint="";
    let maxVal=getMaxForDifficulty(difficulty, 10);
    switch (type){
        case "arithmetic_sum":{
            let a1=Math.floor(Math.random()*maxVal)+1;
            let d=Math.floor(Math.random()*(maxVal/2))+1;
            let n=Math.floor(Math.random()*maxVal)+5;
            let sum=(n/2)*(2*a1+(n-1)*d);
            mathExpression=`Find the sum of the first ${n} terms of the arithmetic sequence: \\[ S_n=\\frac{n}{2} [2a_1+(n-1)d] \\] where \\( a_1=${a1} \\) and \\( d=${d} \\).`;
            plainCorrectAnswer=sum.toString();
            window.correctAnswer={correct: plainCorrectAnswer};
            hint="Enter a number";
            break;
        }
        case "geometric_sum":{
            let a1=Math.floor(Math.random()*maxVal/2)+1;
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
            let a1=Math.floor(Math.random()*maxVal)+1;
            let d=Math.floor(Math.random()*(maxVal/2))+1;
            let n=Math.floor(Math.random()*maxVal)+5;
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

export function generateRoot(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let maxRoot=getMaxForDifficulty(difficulty, 4);
    let maxBase=getMaxForDifficulty(difficulty, 10);
    let root=Math.floor((Math.random()*maxRoot))+2;
    let base=Math.floor((Math.random()*maxBase))+1;
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
function getMaxForDifficulty(difficulty?: string, baseMax: number=10): number{
    if (difficulty==="easy") return Math.floor(baseMax*0.5);
    if (difficulty==="hard") return Math.floor(baseMax*2);
    return baseMax;
}
export function generateFraction(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["add", "subtract", "multiply", "divide", "simplify", "convert"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 12);
    let hint="";
    let num1=Math.floor(Math.random()*maxVal)+1;
    let den1=Math.floor(Math.random()*(maxVal-1))+2;
    let num2=Math.floor(Math.random()*maxVal)+1;
    let den2=Math.floor(Math.random()*(maxVal-1))+2;
    switch (type){
        case "add":{
            let commonDen=den1*den2;
            let newNum1=num1*den2;
            let newNum2=num2*den1;
            let sumNum=newNum1+newNum2;
            let g=gcd(sumNum, commonDen);
            let simplified=`${sumNum/g}/${commonDen/g}`;
            questionArea.innerHTML=`Add: \\( \\frac{${num1}}{${den1}} + \\frac{${num2}}{${den2}} \\)`;
            window.correctAnswer={
                correct: simplified,
                alternate: `${sumNum}/${commonDen}`
            };
            hint="Enter as a fraction (e.g., 3/4)";
            break;
        }
        case "subtract":{
            let commonDen=den1*den2;
            let newNum1=num1*den2;
            let newNum2=num2*den1;
            let diffNum=newNum1-newNum2;
            let g=gcd(diffNum, commonDen);
            let simplified=`${diffNum/g}/${commonDen/g}`;
            questionArea.innerHTML=`Subtract: \\( \\frac{${num1}}{${den1}} - \\frac{${num2}}{${den2}} \\)`;
            window.correctAnswer={
                correct: simplified,
                alternate: `${diffNum}/${commonDen}`
            };
            hint="Enter as a fraction (e.g., 1/2)";
            break;
        }
        case "multiply":{
            let prodNum=num1*num2;
            let prodDen=den1*den2;
            let g=gcd(prodNum, prodDen);
            let simplified=`${prodNum/g}/${prodDen/g}`;
            questionArea.innerHTML=`Multiply: \\( \\frac{${num1}}{${den1}} \\times \\frac{${num2}}{${den2}} \\)`;
            window.correctAnswer={
                correct: simplified,
                alternate: `${prodNum}/${prodDen}`
            };
            hint="Enter as a fraction (e.g., 5/8)";
            break;
        }
        case "divide":{
            let quotNum=num1*den2;
            let quotDen=den1*num2;
            let g=gcd(quotNum, quotDen);
            let simplified=`${quotNum/g}/${quotDen/g}`;
            questionArea.innerHTML=`Divide: \\( \\frac{${num1}}{${den1}} \\div \\frac{${num2}}{${den2}} \\)`;
            window.correctAnswer={
                correct: simplified,
                alternate: `${quotNum}/${quotDen}`
            };
            hint="Enter as a fraction (e.g., 7/3)";
            break;
        }
        case "simplify":{
            let num=Math.floor(Math.random()*30)+2;
            let den=Math.floor(Math.random()*30)+2;
            let g=gcd(num, den);
            let simplified=`${num/g}/${den/g}`;
            questionArea.innerHTML=`Simplify: \\( \\frac{${num}}{${den}} \\)`;
            window.correctAnswer={
                correct: simplified,
                alternate: simplified
            };
            hint="Enter as a fraction in lowest terms";
            break;
        }
        case "convert":{
            let decimal=(Math.random()*10).toFixed(2);
            let fraction=`${Math.round(parseFloat(decimal)*100)}/100`;
            questionArea.innerHTML=`Convert \\( ${decimal} \\) to a fraction in simplest form.`;
            window.correctAnswer={
                correct: fraction,
                alternate: fraction
            };
            hint="Enter as a fraction (e.g., 3/4)";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generatePercent(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["percent_of", "increase", "decrease", "interest", "markup"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 100);
    let hint="";
    let percent=Math.floor(Math.random()*50)+10;
    let whole=Math.floor(Math.random()*maxVal)+10;
    let part=Math.round(whole*percent/100);
    switch (type){
        case "percent_of":{
            questionArea.innerHTML=`What is \\( ${percent}\\% \\) of \\( ${whole} \\)?`;
            window.correctAnswer={
                correct: part.toString(),
                alternate: part.toString()
            };
            hint="Enter a number";
            break;
        }
        case "increase":{
            let increase=Math.floor(Math.random()*50)+5;
            let newVal=whole+Math.round(whole*increase/100);
            questionArea.innerHTML=`If \\( ${whole} \\) increases by \\( ${increase}\\% \\), what is the new value?`;
            window.correctAnswer={
                correct: newVal.toString(),
                alternate: newVal.toString()
            };
            hint="Enter a number";
            break;
        }
        case "decrease":{
            let decrease=Math.floor(Math.random()*30)+5;
            let newVal=whole-Math.round(whole*decrease/100);
            questionArea.innerHTML=`If \\( ${whole} \\) decreases by \\( ${decrease}\\% \\), what is the new value?`;
            window.correctAnswer={
                correct: newVal.toString(),
                alternate: newVal.toString()
            };
            hint="Enter a number";
            break;
        }
        case "interest":{
            let principal=Math.floor(Math.random()*1000)+500;
            let rate=(Math.random()*5+2).toFixed(1);
            let time=Math.floor(Math.random()*3)+1;
            let interest=Math.round(principal*parseFloat(rate)/100*time);
            questionArea.innerHTML=`Simple interest on \\( $${principal} \\) at \\( ${rate}\\% \\) for \\( ${time} \\) years?`;
            window.correctAnswer={
                correct: interest.toString(),
                alternate: interest.toString()
            };
            hint="Enter a whole number (nearest dollar)";
            break;
        }
        case "markup":{
            let cost=Math.floor(Math.random()*50)+10;
            let markup=Math.floor(Math.random()*40)+20;
            let price=cost+Math.round(cost*markup/100);
            questionArea.innerHTML=`A store buys an item for \\( $${cost} \\) and marks it up \\( ${markup}\\% \\). What is the selling price?`;
            window.correctAnswer={
                correct: price.toString(),
                alternate: price.toString()
            };
            hint="Enter a number (nearest dollar)";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateRatioProportion(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["ratio", "proportion", "scale", "unit_rate"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 20);
    let hint="";
    switch (type){
        case "ratio":{
            let a=Math.floor(Math.random()*maxVal)+1;
            let b=Math.floor(Math.random()*maxVal)+1;
            questionArea.innerHTML=`Simplify the ratio \\( ${a}:${b} \\) to lowest terms.`;
            let g=gcd(a,b);
            window.correctAnswer={
                correct: `${a/g}:${b/g}`,
                alternate: `${a/g}/${b/g}`
            };
            hint="Enter as a:b or a/b";
            break;
        }
        case "proportion":{
            let a=Math.floor(Math.random()*5)+2;
            let b=Math.floor(Math.random()*5)+2;
            let c=Math.floor(Math.random()*10)+5;
            let x=Math.round(c*a/b);
            questionArea.innerHTML=`Solve for x: \\( \\frac{${a}}{${b}}=\\frac{${c}}{x} \\)`;
            window.correctAnswer={
                correct: x.toString(),
                alternate: x.toString()
            };
            hint="Enter a number";
            break;
        }
        case "scale":{
            let map=Math.floor(Math.random()*10)+1;
            let actual=Math.floor(Math.random()*50)+10;
            let scaled=Math.round(actual/map);
            questionArea.innerHTML=`On a map with scale 1:${map}, a distance measures ${scaled} cm. What is the actual distance in cm?`;
            window.correctAnswer={
                correct: actual.toString(),
                alternate: actual.toString()
            };
            hint="Enter a number";
            break;
        }
        case "unit_rate":{
            let quantity=Math.floor(Math.random()*100)+20;
            let units=Math.floor(Math.random()*10)+2;
            let rate=Math.round(quantity/units);
            questionArea.innerHTML=`If ${quantity} items cost $${units}, what is the unit price? (nearest cent)`;
            window.correctAnswer={
                correct: rate.toFixed(2),
                alternate: rate.toString()
            };
            hint="Enter a number (e.g., 2.50)";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateUnitConversion(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["length_us", "length_metric", "area", "volume", "multi_step"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 50);
    let hint="";
    let value=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "length_us":{
            let conversions=[
                {from:"ft", to:"in", factor:12},
                {from:"yd", to:"ft", factor:3},
                {from:"mi", to:"ft", factor:5280}
            ];
            let c=conversions[Math.floor(Math.random()*conversions.length)];
            let result=value*c.factor;
            questionArea.innerHTML=`Convert \\( ${value} \\text{ ${c.from}} \\) to \\( \\text{${c.to}} \\).`;
            window.correctAnswer={
                correct: result.toString(),
                alternate: result.toString()
            };
            hint="Enter a number";
            break;
        }
        case "length_metric":{
            let conversions=[
                {from:"m", to:"cm", factor:100},
                {from:"km", to:"m", factor:1000},
                {from:"cm", to:"mm", factor:10}
            ];
            let c=conversions[Math.floor(Math.random()*conversions.length)];
            let result=value*c.factor;
            questionArea.innerHTML=`Convert \\( ${value} \\text{ ${c.from}} \\) to \\( \\text{${c.to}} \\).`;
            window.correctAnswer={
                correct: result.toString(),
                alternate: result.toString()
            };
            hint="Enter a number";
            break;
        }
        case "area":{
            let value2=Math.floor(Math.random()*10)+1;
            let result=value2*9;
            questionArea.innerHTML=`Convert \\( ${value2} \\text{ yd}^2 \\) to \\( \\text{ft}^2 \\). (1 yd=3 ft)`;
            window.correctAnswer={
                correct: result.toString(),
                alternate: result.toString()
            };
            hint="Enter a number";
            break;
        }
        case "volume":{
            let value2=Math.floor(Math.random()*5)+1;
            let result=value2*1000;
            questionArea.innerHTML=`Convert \\( ${value2} \\text{ L} \\) to \\( \\text{mL} \\).`;
            window.correctAnswer={
                correct: result.toString(),
                alternate: result.toString()
            };
            hint="Enter a number";
            break;
        }
        case "multi_step":{
            let value2=Math.floor(Math.random()*10)+1;
            let result=value2*12*3;
            questionArea.innerHTML=`Convert \\( ${value2} \\text{ yd} \\) to \\( \\text{in} \\). (1 yd=3 ft, 1 ft=12 in)`;
            window.correctAnswer={
                correct: result.toString(),
                alternate: result.toString()
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
export function generateExpressionEvaluation(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["linear", "quadratic", "with_substitution"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 10);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let x=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "linear":{
            questionArea.innerHTML=`Evaluate \\( ${a}x + ${b} \\) when \\( x=${x} \\).`;
            let result=a*x+b;
            window.correctAnswer={
                correct: result.toString(),
                alternate: result.toString()
            };
            hint="Enter a number";
            break;
        }
        case "quadratic":{
            questionArea.innerHTML=`Evaluate \\( ${a}x^2 + ${b}x + 1 \\) when \\( x=${x} \\).`;
            let result=a*x*x + b*x + 1;
            window.correctAnswer={
                correct: result.toString(),
                alternate: result.toString()
            };
            hint="Enter a number";
            break;
        }
        case "with_substitution":{
            let expr=`${a}x + ${b}y`;
            let y=Math.floor(Math.random()*maxVal)+1;
            questionArea.innerHTML=`Evaluate \\( ${expr} \\) when \\( x=${x} \\) and \\( y=${y} \\).`;
            let result=a*x + b*y;
            window.correctAnswer={
                correct: result.toString(),
                alternate: result.toString()
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
export function generateLinearEquation(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["one_step", "two_step", "both_sides", "parentheses", "literal"];
    let type=types[Math.floor(Math.random()*types.length)];
    let range=getMaxForDifficulty(difficulty, 10);
    let hint="";
    let a=Math.floor(Math.random()*range)+1;
    let b=Math.floor(Math.random()*range)+1;
    let c=Math.floor(Math.random()*range)+1;
    let x=Math.floor(Math.random()*range)+1;
    switch (type){
        case "one_step":{
            let op=Math.random()<0.5?"+":"-";
            let rhs=op==="+"?a+x:a-x;
            questionArea.innerHTML=`Solve: \\( ${op==="+"?a+"+x":a+"-x"}=${rhs} \\)`;
            window.correctAnswer={
                correct: x.toString(),
                alternate: x.toString()
            };
            hint="Enter a number";
            break;
        }
        case "two_step":{
            let coeff=Math.max(1,a);
            let constant=b;
            let rhs=coeff*x+constant;
            questionArea.innerHTML=`Solve: \\( ${coeff}x + ${constant}=${rhs} \\)`;
            window.correctAnswer={
                correct: x.toString(),
                alternate: x.toString()
            };
            hint="Enter a number";
            break;
        }
        case "both_sides":{
            let coeff1=Math.max(1,a);
            let coeff2=Math.max(1,b);
            let constant=c;
            let rhs=coeff1*x+constant;
            questionArea.innerHTML=`Solve: \\( ${coeff1}x + ${constant}=${coeff2}x + ${rhs} \\)`;
            window.correctAnswer={
                correct: x.toString(),
                alternate: x.toString()
            };
            hint="Enter a number";
            break;
        }
        case "parentheses":{
            let coeff=Math.max(1,a);
            let inner=Math.max(1,b);
            let rhs=coeff*(x+inner);
            questionArea.innerHTML=`Solve: \\( ${coeff}(x + ${inner})=${rhs} \\)`;
            window.correctAnswer={
                correct: x.toString(),
                alternate: x.toString()
            };
            hint="Enter a number";
            break;
        }
        case "literal":{
            let eq=`${a}x + ${b}y=${c}`;
            questionArea.innerHTML=`Solve for x: \\( ${eq} \\)`;
            window.correctAnswer={
                correct: `(${c} - ${b}y)/${a}`,
                alternate: `(${c} - ${b}y)/${a}`
            };
            hint="Enter as an expression in y";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateLinearWordProblem(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["consecutive_integers", "money", "distance", "age", "mixture"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 20);
    let hint="";
    switch (type){
        case "consecutive_integers":{
            let n=Math.floor(Math.random()*maxVal)+1;
            let sum=n+(n+1);
            questionArea.innerHTML=`The sum of two consecutive integers is ${sum}. Find the smaller integer.`;
            window.correctAnswer={
                correct: n.toString(),
                alternate: n.toString()
            };
            hint="Enter a whole number";
            break;
        }
        case "money":{
            let quarters=Math.floor(Math.random()*5)+2;
            let dimes=Math.floor(Math.random()*5)+2;
            let total=quarters*25+dimes*10;
            questionArea.innerHTML=`You have ${quarters} quarters and ${dimes} dimes. How much money do you have in cents?`;
            window.correctAnswer={
                correct: total.toString(),
                alternate: total.toString()
            };
            hint="Enter a number (cents)";
            break;
        }
        case "distance":{
            let rate=Math.floor(Math.random()*30)+20;
            let time=Math.floor(Math.random()*3)+2;
            let dist=rate*time;
            questionArea.innerHTML=`A car travels at ${rate} mph for ${time} hours. How far does it travel?`;
            window.correctAnswer={
                correct: dist.toString(),
                alternate: dist.toString()
            };
            hint="Enter a number (miles)";
            break;
        }
        case "age":{
            let now=Math.floor(Math.random()*20)+10;
            let past=Math.floor(Math.random()*5)+2;
            let ago=now-past;
            questionArea.innerHTML=`A person is ${now} years old. How old were they ${past} years ago?`;
            window.correctAnswer={
                correct: ago.toString(),
                alternate: ago.toString()
            };
            hint="Enter a number";
            break;
        }
        case "mixture":{
            let total=Math.floor(Math.random()*20)+10;
            let percent=Math.floor(Math.random()*30)+20;
            let amount=Math.round(total*percent/100);
            questionArea.innerHTML=`A ${total} gallon mixture contains ${percent}% alcohol. How many gallons of alcohol are in it?`;
            window.correctAnswer={
                correct: amount.toString(),
                alternate: amount.toString()
            };
            hint="Enter a number (gallons)";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generatePolynomial(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["add", "subtract", "multiply"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxCoeff=getMaxForDifficulty(difficulty, 5);
    let hint="";
    let a=Math.floor(Math.random()*maxCoeff)+1;
    let b=Math.floor(Math.random()*maxCoeff)+1;
    let c=Math.floor(Math.random()*maxCoeff)+1;
    let d=Math.floor(Math.random()*maxCoeff)+1;
    switch (type){
        case "add":{
            let p1=`${a}x^2 + ${b}x + ${c}`;
            let p2=`${d}x^2 + ${a}x + ${b}`;
            let sumA=a+d;
            let sumB=b+a;
            let sumC=c+b;
            let result=`${sumA}x^2 + ${sumB}x + ${sumC}`;
            questionArea.innerHTML=`Add: \\( (${p1}) + (${p2}) \\)`;
            window.correctAnswer={
                correct: result,
                alternate: result.replace(/\s+/g,"")
            };
            hint="Enter as a polynomial, e.g., 3x^2+5x+2";
            break;
        }
        case "subtract":{
            let p1=`${a}x^2 + ${b}x + ${c}`;
            let p2=`${d}x^2 + ${a}x + ${b}`;
            let diffA=a-d;
            let diffB=b-a;
            let diffC=c-b;
            let result=`${diffA}x^2 + ${diffB}x + ${diffC}`;
            questionArea.innerHTML=`Subtract: \\( (${p1}) - (${p2}) \\)`;
            window.correctAnswer={
                correct: result,
                alternate: result.replace(/\s+/g,"")
            };
            hint="Enter as a polynomial";
            break;
        }
        case "multiply":{
            let p1=`${a}x + ${b}`;
            let p2=`${c}x + ${d}`;
            let term1=a*c;
            let term2=a*d + b*c;
            let term3=b*d;
            let result=`${term1}x^2 + ${term2}x + ${term3}`;
            questionArea.innerHTML=`Multiply: \\( (${p1})(${p2}) \\)`;
            window.correctAnswer={
                correct: result,
                alternate: result.replace(/\s+/g,"")
            };
            hint="Enter as a polynomial";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generatePolynomialDivision(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["simple", "with_remainder"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 5);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "simple":{
            let dividend=`${a}x^2 + ${b}x`;
            let divisor=`x`;
            let quotient=`${a}x + ${b}`;
            questionArea.innerHTML=`Divide: \\( \\frac{${dividend}}{${divisor}} \\)`;
            window.correctAnswer={
                correct: quotient,
                alternate: quotient.replace(/\s+/g,"")
            };
            hint="Enter as a polynomial";
            break;
        }
        case "with_remainder":{
            let dividend=`${a}x^2 + ${b}x + ${a}`;
            let divisor=`x + 1`;
            let remainder=a - b;
            let quotient=`${a}x + ${b - a}`;
            questionArea.innerHTML=`Divide: \\( \\frac{${dividend}}{${divisor}} \\)`;
            window.correctAnswer={
                correct: `${quotient} + \\frac{${remainder}}{${divisor}}`,
                alternate: `${quotient} + ${remainder}/(${divisor})`
            };
            hint="Enter as polynomial + remainder/divisor";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateFactoring(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["gcf", "trinomial", "difference_squares", "sum_cubes", "difference_cubes"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 10);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let c=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "gcf":{
            let expr=`${a*b}x + ${a*c}`;
            questionArea.innerHTML=`Factor: \\( ${expr} \\)`;
            window.correctAnswer={
                correct: `${a}(${b}x + ${c})`,
                alternate: `${a}(${b}x+${c})`
            };
            hint="Enter as a(bx+c)";
            break;
        }
        case "trinomial":{
            let p=a*c;
            let q=a+c;
            questionArea.innerHTML=`Factor: \\( x^2 + ${q}x + ${p} \\)`;
            window.correctAnswer={
                correct: `(x + ${a})(x + ${c})`,
                alternate: `(x+${a})(x+${c})`
            };
            hint="Enter as (x+a)(x+b)";
            break;
        }
        case "difference_squares":{
            let expr=`${a*a}x^2 - ${b*b}`;
            questionArea.innerHTML=`Factor: \\( ${expr} \\)`;
            window.correctAnswer={
                correct: `(${a}x - ${b})(${a}x + ${b})`,
                alternate: `(${a}x-${b})(${a}x+${b})`
            };
            hint="Enter as (ax-b)(ax+b)";
            break;
        }
        case "sum_cubes":{
            let expr=`x^3 + ${a*a*a}`;
            questionArea.innerHTML=`Factor: \\( ${expr} \\)`;
            window.correctAnswer={
                correct: `(x + ${a})(x^2 - ${a}x + ${a*a})`,
                alternate: `(x+${a})(x^2-${a}x+${a*a})`
            };
            hint="Enter as (x+a)(x^2-ax+a^2)";
            break;
        }
        case "difference_cubes":{
            let expr=`x^3 - ${a*a*a}`;
            questionArea.innerHTML=`Factor: \\( ${expr} \\)`;
            window.correctAnswer={
                correct: `(x - ${a})(x^2 + ${a}x + ${a*a})`,
                alternate: `(x-${a})(x^2+${a}x+${a*a})`
            };
            hint="Enter as (x-a)(x^2+ax+a^2)";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateQuadraticEquation(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["factor", "complete_square", "quadratic_formula", "discriminant"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 5);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let c=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "factor":{
            let p=a*c;
            let q=a+c;
            questionArea.innerHTML=`Solve by factoring: \\( x^2 + ${q}x + ${p}=0 \\)`;
            window.correctAnswer={
                correct: `-${a}, -${c}`,
                alternate: `x=-${a}, x=-${c}`
            };
            hint="Enter roots separated by commas (e.g., -2, -3)";
            break;
        }
        case "complete_square":{
            let d=Math.floor(Math.random()*3)+1;
            let e=Math.floor(Math.random()*5)+1;
            let rhs=e*e;
            questionArea.innerHTML=`Solve by completing the square: \\( (x + ${d})^2=${rhs} \\)`;
            let sol1=-d+e;
            let sol2=-d-e;
            window.correctAnswer={
                correct: `${sol1}, ${sol2}`,
                alternate: `x=${sol1}, x=${sol2}`
            };
            hint="Enter roots as decimals";
            break;
        }
        case "quadratic_formula":{
            let disc=b*b-4*a*c;
            let sol1=(-b+Math.sqrt(disc))/(2*a);
            let sol2=(-b-Math.sqrt(disc))/(2*a);
            questionArea.innerHTML=`Solve using the quadratic formula: \\( ${a}x^2 + ${b}x + ${c}=0 \\)`;
            window.correctAnswer={
                correct: `${sol1.toFixed(2)}, ${sol2.toFixed(2)}`,
                alternate: `x=${sol1.toFixed(2)}, x=${sol2.toFixed(2)}`
            };
            hint="Enter roots as decimals (e.g., 0.38, -2.62)";
            break;
        }
        case "discriminant":{
            let disc=b*b-4*a*c;
            let nature=disc>0?"two real":disc===0?"one real":"two complex";
            questionArea.innerHTML=`Find the discriminant of \\( x^2 + ${b}x + ${c}=0 \\) and state the nature.`;
            window.correctAnswer={
                correct: `${disc}, ${nature}`,
                alternate: `${disc}`
            };
            hint="Enter discriminant and nature (e.g., '9, two real')";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateLinearInequality(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["solve", "graph", "compound", "absolute"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 10);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let x=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "solve":{
            let rhs=a*x+b;
            questionArea.innerHTML=`Solve: \\( ${a}x + ${b} > ${rhs} \\)`;
            window.correctAnswer={
                correct: `x > ${x}`,
                alternate: `x>${x}`
            };
            hint="Enter as x > number";
            break;
        }
        case "graph":{
            questionArea.innerHTML=`Graph the inequality \\( x < ${x} \\) on a number line. (Enter the solution set)`;
            window.correctAnswer={
                correct: `(-∞, ${x})`,
                alternate: `(-∞,${x})`
            };
            hint="Enter as interval, e.g., (-∞,3)";
            break;
        }
        case "compound":{
            let lower=Math.floor(Math.random()*3)+1;
            let upper=lower+Math.floor(Math.random()*5)+2;
            questionArea.innerHTML=`Solve: \\( ${lower} < x < ${upper} \\) (Enter the interval)`;
            window.correctAnswer={
                correct: `(${lower}, ${upper})`,
                alternate: `(${lower},${upper})`
            };
            hint="Enter as (a,b)";
            break;
        }
        case "absolute":{
            let k=Math.floor(Math.random()*5)+2;
            questionArea.innerHTML=`Solve: \\( |x| < ${k} \\) (Enter interval)`;
            window.correctAnswer={
                correct: `(-${k}, ${k})`,
                alternate: `(-${k},${k})`
            };
            hint="Enter as (-a,a)";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateQuadraticInequality(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["solve", "graph"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 5);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let c=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "solve":{
            let disc=b*b-4*a*c;
            let root1=(-b-Math.sqrt(disc))/(2*a);
            let root2=(-b+Math.sqrt(disc))/(2*a);
            questionArea.innerHTML=`Solve: \\( x^2 + ${b}x + ${c} < 0 \\) (Enter interval)`;
            if (root1>root2) [root1,root2]=[root2,root1];
            window.correctAnswer={
                correct: `(${root1.toFixed(2)}, ${root2.toFixed(2)})`,
                alternate: `(${root1.toFixed(2)},${root2.toFixed(2)})`
            };
            hint="Enter interval (a,b)";
            break;
        }
        case "graph":{
            questionArea.innerHTML=`Graph the inequality \\( y > x^2 - 4 \\). (Enter the solution description)`;
            window.correctAnswer={
                correct: "above the parabola",
                alternate: "above"
            };
            hint="Enter 'above' or 'below'";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateRationalInequality(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let maxVal=getMaxForDifficulty(difficulty, 5);
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    questionArea.innerHTML=`Solve: \\( \\frac{x-${a}}{x-${b}} > 0 \\) (Enter intervals)`;
    let intervals:string;
    if (a<b){
        intervals=`(-∞,${a}) ∪ (${b},∞)`;
    } else {
        intervals=`(-∞,${b}) ∪ (${a},∞)`;
    }
    window.correctAnswer={
        correct: intervals,
        alternate: intervals.replace(/∞/g,"infinity")
    };
    window.expectedFormat="Enter intervals e.g., (-∞,2) ∪ (5,∞)";
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateSystem2x2(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["graphing", "substitution", "elimination", "word"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 10);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let c=Math.floor(Math.random()*maxVal)+1;
    let d=Math.floor(Math.random()*maxVal)+1;
    let e=Math.floor(Math.random()*maxVal)+1;
    let x=Math.floor(Math.random()*maxVal)+1;
    let y=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "graphing":{
            let eq1=`${a}x + ${b}y=${a*x+b*y}`;
            let eq2=`${c}x + ${d}y=${c*x+d*y}`;
            questionArea.innerHTML=`Solve by graphing:<br> \\( ${eq1} \\)<br> \\( ${eq2} \\)`;
            window.correctAnswer={
                correct: `(${x}, ${y})`,
                alternate: `(${x},${y})`
            };
            hint="Enter as (x,y)";
            break;
        }
        case "substitution":{
            let eq1=`y=${a}x + ${b}`;
            let eq2=`${c}x + ${d}y=${e}`;
            questionArea.innerHTML=`Solve by substitution:<br> \\( ${eq1} \\)<br> \\( ${eq2} \\)`;
            let xSol= (e - d*b) / (c + d*a);
            let ySol= a*xSol + b;
            window.correctAnswer={
                correct: `(${xSol.toFixed(2)}, ${ySol.toFixed(2)})`,
                alternate: `(${xSol.toFixed(2)},${ySol.toFixed(2)})`
            };
            hint="Enter as (x,y) decimals";
            break;
        }
        case "elimination":{
            let eq1=`${a}x + ${b}y=${a*x+b*y}`;
            let eq2=`${c}x + ${d}y=${c*x+d*y}`;
            questionArea.innerHTML=`Solve by elimination:<br> \\( ${eq1} \\)<br> \\( ${eq2} \\)`;
            window.correctAnswer={
                correct: `(${x}, ${y})`,
                alternate: `(${x},${y})`
            };
            hint="Enter as (x,y)";
            break;
        }
        case "word":{
            let sum=x+y;
            let diff=Math.abs(x-y);
            questionArea.innerHTML=`The sum of two numbers is ${sum} and their difference is ${diff}. Find the numbers.`;
            let larger=(sum+diff)/2;
            let smaller=(sum-diff)/2;
            window.correctAnswer={
                correct: `${larger}, ${smaller}`,
                alternate: `${larger},${smaller}`
            };
            hint="Enter as larger,smaller";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateSystem3x3(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let maxVal=getMaxForDifficulty(difficulty, 5);
    let x=Math.floor(Math.random()*maxVal)+1;
    let y=Math.floor(Math.random()*maxVal)+1;
    let z=Math.floor(Math.random()*maxVal)+1;
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let c=Math.floor(Math.random()*maxVal)+1;
    let d=Math.floor(Math.random()*maxVal)+1;
    let e=Math.floor(Math.random()*maxVal)+1;
    let f=Math.floor(Math.random()*maxVal)+1;
    let g=Math.floor(Math.random()*maxVal)+1;
    let h=Math.floor(Math.random()*maxVal)+1;
    let i=Math.floor(Math.random()*maxVal)+1;
    questionArea.innerHTML=`Solve the system:<br>
        \\( ${a}x + ${b}y + ${c}z=${a*x + b*y + c*z} \\)<br>
        \\( ${d}x + ${e}y + ${f}z=${d*x + e*y + f*z} \\)<br>
        \\( ${g}x + ${h}y + ${i}z=${g*x + h*y + i*z} \\)`;
    window.correctAnswer={
        correct: `(${x}, ${y}, ${z})`,
        alternate: `(${x},${y},${z})`
    };
    window.expectedFormat="Enter as (x, y, z)";
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateFunctionConcepts(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["domain", "range", "notation", "evaluate"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 10);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let x=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "domain":{
            questionArea.innerHTML=`Find the domain of \\( f(x)=\\sqrt{x-${a}} \\). (Enter interval)`;
            window.correctAnswer={
                correct: `[${a}, ∞)`,
                alternate: `[${a}, infinity)`
            };
            hint="Enter interval like [a,∞)";
            break;
        }
        case "range":{
            questionArea.innerHTML=`Find the range of \\( f(x)=x^2 + ${a} \\). (Enter interval)`;
            window.correctAnswer={
                correct: `[${a}, ∞)`,
                alternate: `[${a}, infinity)`
            };
            hint="Enter interval";
            break;
        }
        case "notation":{
            questionArea.innerHTML=`If \\( f(x)=${a}x + 3 \\), find \\( f(${x}) \\).`;
            window.correctAnswer={
                correct: (a*x+3).toString(),
                alternate: (a*x+3).toString()
            };
            hint="Enter a number";
            break;
        }
        case "evaluate":{
            questionArea.innerHTML=`Given \\( f(x)=x^2 - ${a} \\), evaluate \\( f(${x}) \\).`;
            window.correctAnswer={
                correct: (x*x - a).toString(),
                alternate: (x*x - a).toString()
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
export function generateLinearGraphing(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["slope", "intercepts", "equation_from_points", "parallel_perpendicular"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 10);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let x1=Math.floor(Math.random()*maxVal)+1;
    let y1=Math.floor(Math.random()*maxVal)+1;
    let x2=Math.floor(Math.random()*maxVal)+1;
    let y2=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "slope":{
            let slope=(y2-y1)/(x2-x1);
            questionArea.innerHTML=`Find the slope between (${x1},${y1}) and (${x2},${y2}).`;
            window.correctAnswer={
                correct: slope.toFixed(2),
                alternate: slope.toString()
            };
            hint="Enter a number";
            break;
        }
        case "intercepts":{
            let eq=`${a}x + ${b}y=${a*b}`;
            let xInt=b;
            let yInt=a;
            questionArea.innerHTML=`Find the x- and y-intercepts of \\( ${eq} \\).`;
            window.correctAnswer={
                correct: `(${xInt},0) and (0,${yInt})`,
                alternate: `(${xInt},0),(0,${yInt})`
            };
            hint="Enter as (x,0) and (0,y)";
            break;
        }
        case "equation_from_points":{
            let slope=(y2-y1)/(x2-x1);
            let intercept=y1-slope*x1;
            questionArea.innerHTML=`Find the equation of the line through (${x1},${y1}) and (${x2},${y2}).`;
            window.correctAnswer={
                correct: `y=${slope.toFixed(2)}x + ${intercept.toFixed(2)}`,
                alternate: `y=${slope.toFixed(2)}x+${intercept.toFixed(2)}`
            };
            hint="Enter as y=mx+b";
            break;
        }
        case "parallel_perpendicular":{
            let slope=a;
            questionArea.innerHTML=`Line L has slope ${slope}. What is the slope of a line parallel to L? Perpendicular?`;
            window.correctAnswer={
                correct: `parallel: ${slope}, perpendicular: ${-1/slope}`,
                alternate: `${slope}, ${-1/slope}`
            };
            hint="Enter as 'parallel, perpendicular'";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateNonLinearGraphing(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["parabola_vertex", "abs_value", "sqrt", "transform"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 5);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let h=Math.floor(Math.random()*maxVal)-2;
    let k=Math.floor(Math.random()*maxVal)-2;
    switch (type){
        case "parabola_vertex":{
            questionArea.innerHTML=`Find the vertex of \\( y=${a}(x - ${h})^2 + ${k} \\).`;
            window.correctAnswer={
                correct: `(${h}, ${k})`,
                alternate: `(${h},${k})`
            };
            hint="Enter as (h,k)";
            break;
        }
        case "abs_value":{
            questionArea.innerHTML=`Describe the transformation of \\( y=|x| \\) to \\( y=|x - ${h}| + ${k} \\).`;
            window.correctAnswer={
                correct: `right ${h}, up ${k}`,
                alternate: `right ${h}, up ${k}`
            };
            hint="Enter direction and amount";
            break;
        }
        case "sqrt":{
            questionArea.innerHTML=`Find the domain of \\( y=\\sqrt{x - ${a}} \\).`;
            window.correctAnswer={
                correct: `x ≥ ${a}`,
                alternate: `[${a},∞)`
            };
            hint="Enter as x ≥ a or [a,∞)";
            break;
        }
        case "transform":{
            questionArea.innerHTML=`If the graph of \\( y=x^2 \\) is shifted left ${h} and down ${k}, what is the new equation?`;
            let newH=-h;
            let newK=-k;
            window.correctAnswer={
                correct: `y=(x + ${newH})^2 - ${newK}`,
                alternate: `y=(x+${newH})^2-${newK}`
            };
            hint="Enter as y=(x-h)^2+k";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateVariation(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["direct", "inverse", "joint"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 10);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let x=Math.floor(Math.random()*maxVal)+1;
    let y=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "direct":{
            questionArea.innerHTML=`If y varies directly with x, and y=${a} when x=${b}, find y when x=${x}.`;
            let k=a/b;
            let result=k*x;
            window.correctAnswer={
                correct: result.toFixed(2),
                alternate: result.toString()
            };
            hint="Enter a number";
            break;
        }
        case "inverse":{
            questionArea.innerHTML=`If y varies inversely with x, and y=${a} when x=${b}, find y when x=${x}.`;
            let k=a*b;
            let result=k/x;
            window.correctAnswer={
                correct: result.toFixed(2),
                alternate: result.toString()
            };
            hint="Enter a number";
            break;
        }
        case "joint":{
            let c=Math.floor(Math.random()*maxVal)+1;
            questionArea.innerHTML=`If z varies jointly with x and y, and z=${a} when x=${b}, y=${c}, find z when x=${x}, y=${y}.`;
            let k=a/(b*c);
            let result=k*x*y;
            window.correctAnswer={
                correct: result.toFixed(2),
                alternate: result.toString()
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
export function generateRadicalSimplify(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["simplify", "add", "subtract", "multiply", "divide", "rationalize"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 20);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let c=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "simplify":{
            let radicand=a*a*b;
            questionArea.innerHTML=`Simplify: \\( \\sqrt{${radicand}} \\)`;
            window.correctAnswer={
                correct: `${a}\\sqrt{${b}}`,
                alternate: `${a}√${b}`
            };
            hint="Enter as a√b";
            break;
        }
        case "add":{
            questionArea.innerHTML=`Simplify: \\( ${a}\\sqrt{${b}} + ${c}\\sqrt{${b}} \\)`;
            let coeff=a+c;
            window.correctAnswer={
                correct: `${coeff}\\sqrt{${b}}`,
                alternate: `${coeff}√${b}`
            };
            hint="Enter as a√b";
            break;
        }
        case "subtract":{
            questionArea.innerHTML=`Simplify: \\( ${a}\\sqrt{${b}} - ${c}\\sqrt{${b}} \\)`;
            let coeff=a-c;
            window.correctAnswer={
                correct: `${coeff}\\sqrt{${b}}`,
                alternate: `${coeff}√${b}`
            };
            hint="Enter as a√b";
            break;
        }
        case "multiply":{
            questionArea.innerHTML=`Multiply: \\( \\sqrt{${a}} \\times \\sqrt{${b}} \\)`;
            let product=a*b;
            window.correctAnswer={
                correct: `\\sqrt{${product}}`,
                alternate: `√${product}`
            };
            hint="Enter as √n";
            break;
        }
        case "divide":{
            questionArea.innerHTML=`Divide: \\( \\frac{\\sqrt{${a}}}{\\sqrt{${b}}} \\)`;
            let quotient=a/b;
            window.correctAnswer={
                correct: `\\sqrt{${quotient}}`,
                alternate: `√${quotient}`
            };
            hint="Enter as √n";
            break;
        }
        case "rationalize":{
            questionArea.innerHTML=`Rationalize: \\( \\frac{1}{\\sqrt{${a}}} \\)`;
            window.correctAnswer={
                correct: `\\frac{\\sqrt{${a}}}{${a}}`,
                alternate: `√${a}/${a}`
            };
            hint="Enter as √a/a";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateRadicalEquation(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["one_radical", "two_radicals"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 10);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "one_radical":{
            let sol=b*b - a;
            questionArea.innerHTML=`Solve: \\( \\sqrt{x + ${a}}=${b} \\)`;
            window.correctAnswer={
                correct: sol.toString(),
                alternate: sol.toString()
            };
            hint="Enter a number";
            break;
        }
        case "two_radicals":{
            let sol=(b*b - a)/(2*b);
            sol=sol*sol;
            questionArea.innerHTML=`Solve: \\( \\sqrt{x + ${a}} - \\sqrt{x}=${b} \\) (Enter solution)`;
            window.correctAnswer={
                correct: sol.toFixed(2),
                alternate: sol.toString()
            };
            hint="Enter a decimal";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateRationalExponents(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["convert_to_radical", "convert_to_exponent", "evaluate"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 5);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+2;
    let m=Math.floor(Math.random()*2)+2;
    let n=Math.floor(Math.random()*2)+2;
    switch (type){
        case "convert_to_radical":{
            questionArea.innerHTML=`Write \\( x^{${m}/${n}} \\) in radical form.`;
            window.correctAnswer={
                correct: `\\sqrt[${n}]{x^{${m}}}`,
                alternate: `x^(${m}/${n})`
            };
            hint="Enter as n√(x^m)";
            break;
        }
        case "convert_to_exponent":{
            questionArea.innerHTML=`Write \\( \\sqrt[${n}]{x^{${m}}} \\) using a rational exponent.`;
            window.correctAnswer={
                correct: `x^{${m}/${n}}`,
                alternate: `x^(${m}/${n})`
            };
            hint="Enter as x^(m/n)";
            break;
        }
        case "evaluate":{
            let base=a;
            let exponent=m/n;
            let result=Math.pow(base, exponent).toFixed(2);
            questionArea.innerHTML=`Evaluate: \\( ${a}^{${m}/${n}} \\)`;
            window.correctAnswer={
                correct: result,
                alternate: result
            };
            hint="Enter a decimal";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateExponentRules(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["product", "quotient", "power", "negative", "zero"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxBase=getMaxForDifficulty(difficulty, 4);
    let base=Math.floor(Math.random()*maxBase)+2;
    let m=Math.floor(Math.random()*3)+1;
    let n=Math.floor(Math.random()*3)+1;
    let hint="";
    switch (type){
        case "product":{
            questionArea.innerHTML=`Simplify: \\( ${base}^{${m}} \\times ${base}^{${n}} \\)`;
            let exponent=m+n;
            window.correctAnswer={
                correct: `${base}^${exponent}`,
                alternate: `${base}^${exponent}`
            };
            hint="Enter as a^b";
            break;
        }
        case "quotient":{
            questionArea.innerHTML=`Simplify: \\( \\frac{${base}^{${m+n}}}{${base}^{${n}}} \\)`;
            window.correctAnswer={
                correct: `${base}^${m}`,
                alternate: `${base}^${m}`
            };
            hint="Enter as a^b";
            break;
        }
        case "power":{
            questionArea.innerHTML=`Simplify: \\( (${base}^{${m}})^{${n}} \\)`;
            window.correctAnswer={
                correct: `${base}^${m*n}`,
                alternate: `${base}^${m*n}`
            };
            hint="Enter as a^b";
            break;
        }
        case "negative":{
            questionArea.innerHTML=`Write with a positive exponent: \\( ${base}^{-${m}} \\)`;
            window.correctAnswer={
                correct: `\\frac{1}{${base}^{${m}}}`,
                alternate: `1/${base}^${m}`
            };
            hint="Enter as 1/a^b";
            break;
        }
        case "zero":{
            questionArea.innerHTML=`Evaluate: \\( ${base}^{0} \\)`;
            window.correctAnswer={
                correct: "1",
                alternate: "1"
            };
            hint="Enter 1";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateScientificNotation(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["to_standard", "to_scientific", "multiply", "divide"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 1000);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*3)+1;
    switch (type){
        case "to_standard":{
            let sci=`${a} \\times 10^{${b}}`;
            let std=a * Math.pow(10,b);
            questionArea.innerHTML=`Convert to standard notation: \\( ${sci} \\)`;
            window.correctAnswer={
                correct: std.toString(),
                alternate: std.toString()
            };
            hint="Enter a number";
            break;
        }
        case "to_scientific":{
            let std=a * 100;
            let sci=std.toExponential(1).replace('e+','×10^');
            questionArea.innerHTML=`Write in scientific notation: \\( ${std} \\)`;
            window.correctAnswer={
                correct: sci,
                alternate: sci
            };
            hint="Enter as a×10^b";
            break;
        }
        case "multiply":{
            let sci1=`(${a} \\times 10^{${b}})`;
            let sci2=`(${a} \\times 10^{${b+1}})`;
            let product=a*a * Math.pow(10, 2*b+1);
            questionArea.innerHTML=`Multiply: \\( ${sci1} \\times ${sci2} \\)`;
            window.correctAnswer={
                correct: product.toExponential(2).replace('e+','×10^'),
                alternate: product.toString()
            };
            hint="Enter in scientific notation";
            break;
        }
        case "divide":{
            let sci1=`(${a} \\times 10^{${b+1}})`;
            let sci2=`(${a} \\times 10^{${b}})`;
            let quotient=10;
            questionArea.innerHTML=`Divide: \\( \\frac{${sci1}}{${sci2}} \\)`;
            window.correctAnswer={
                correct: quotient.toString(),
                alternate: quotient.toString()
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
export function generateComplex(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["add", "subtract", "multiply", "divide", "powers_i"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 5);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let c=Math.floor(Math.random()*maxVal)+1;
    let d=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "add":{
            questionArea.innerHTML=`Add: \\( (${a} + ${b}i) + (${c} + ${d}i) \\)`;
            let real=a+c;
            let imag=b+d;
            window.correctAnswer={
                correct: `${real} + ${imag}i`,
                alternate: `${real}+${imag}i`
            };
            hint="Enter as a+bi";
            break;
        }
        case "subtract":{
            questionArea.innerHTML=`Subtract: \\( (${a} + ${b}i) - (${c} + ${d}i) \\)`;
            let real=a-c;
            let imag=b-d;
            window.correctAnswer={
                correct: `${real} + ${imag}i`,
                alternate: `${real}+${imag}i`
            };
            hint="Enter as a+bi";
            break;
        }
        case "multiply":{
            questionArea.innerHTML=`Multiply: \\( (${a} + ${b}i)(${c} + ${d}i) \\)`;
            let real=a*c - b*d;
            let imag=a*d + b*c;
            window.correctAnswer={
                correct: `${real} + ${imag}i`,
                alternate: `${real}+${imag}i`
            };
            hint="Enter as a+bi";
            break;
        }
        case "divide":{
            questionArea.innerHTML=`Divide: \\( \\frac{${a} + ${b}i}{${c} + ${d}i} \\)`;
            let denom=c*c+d*d;
            let real=(a*c + b*d)/denom;
            let imag=(b*c - a*d)/denom;
            window.correctAnswer={
                correct: `${real.toFixed(2)} + ${imag.toFixed(2)}i`,
                alternate: `${real.toFixed(2)}+${imag.toFixed(2)}i`
            };
            hint="Enter as a+bi decimals";
            break;
        }
        case "powers_i":{
            let n=Math.floor(Math.random()*4)+1;
            let ans=["i","-1","-i","1"][(n-1)%4];
            questionArea.innerHTML=`Simplify: \\( i^{${n}} \\)`;
            window.correctAnswer={
                correct: ans,
                alternate: ans
            };
            hint="Enter i, -1, -i, or 1";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateNumberSets(_difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["identify", "classify", "compare"];
    let type=types[Math.floor(Math.random()*types.length)];
    let hint="";
    switch (type){
        case "identify":{
            let num=Math.random()*10;
            let desc="";
            if (Number.isInteger(num)&&num>0) desc="natural, whole, integer, rational, real";
            else if (Number.isInteger(num)&&num<0) desc="integer, rational, real";
            else if (num===Math.floor(num)) desc="rational, real";
            else desc="irrational, real";
            questionArea.innerHTML=`Identify all number sets for \\( ${num.toFixed(2)} \\) (natural, whole, integer, rational, irrational, real).`;
            window.correctAnswer={
                correct: desc,
                alternate: desc
            };
            hint="Enter sets separated by commas";
            break;
        }
        case "classify":{
            let num=Math.floor(Math.random()*10)-5;
            questionArea.innerHTML=`Classify \\( ${num} \\) as natural, whole, integer, rational, irrational, or real.`;
            let desc= num>0?"natural, whole, integer, rational, real" : "integer, rational, real";
            window.correctAnswer={
                correct: desc,
                alternate: desc
            };
            hint="Enter sets";
            break;
        }
        case "compare":{
            let a=Math.random()*10;
            let b=Math.random()*10;
            questionArea.innerHTML=`Compare: \\( ${a.toFixed(2)} \\) ___ \\( ${b.toFixed(2)} \\) (enter <, >, or =)`;
            let comp=a<b ? "<" : a>b ? ">" : "=";
            window.correctAnswer={
                correct: comp,
                alternate: comp
            };
            hint="Enter <, >, or =";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateProperties(_difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["commutative", "associative", "distributive", "identity", "inverse"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(_difficulty, 5);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let c=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "commutative":{
            questionArea.innerHTML=`Which property is illustrated? \\( ${a} + ${b}=${b} + ${a} \\)`;
            window.correctAnswer={
                correct: "commutative property of addition",
                alternate: "commutative"
            };
            hint="Enter the property name";
            break;
        }
        case "associative":{
            questionArea.innerHTML=`Which property is illustrated? \\( (${a} + ${b}) + ${c}=${a} + (${b} + ${c}) \\)`;
            window.correctAnswer={
                correct: "associative property of addition",
                alternate: "associative"
            };
            hint="Enter the property name";
            break;
        }
        case "distributive":{
            questionArea.innerHTML=`Which property is illustrated? \\( ${a}(${b} + ${c})=${a}${b} + ${a}${c} \\)`;
            window.correctAnswer={
                correct: "distributive property",
                alternate: "distributive"
            };
            hint="Enter the property name";
            break;
        }
        case "identity":{
            questionArea.innerHTML=`Which property is illustrated? \\( ${a} + 0=${a} \\)`;
            window.correctAnswer={
                correct: "identity property of addition",
                alternate: "identity"
            };
            hint="Enter the property name";
            break;
        }
        case "inverse":{
            questionArea.innerHTML=`Which property is illustrated? \\( ${a} + (-${a})=0 \\)`;
            window.correctAnswer={
                correct: "inverse property of addition",
                alternate: "inverse"
            };
            hint="Enter the property name";
            break;
        }
    }
    window.expectedFormat=hint;
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateOrderOfOperations(difficulty?: string): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["basic", "with_exponents", "with_parentheses"];
    let type=types[Math.floor(Math.random()*types.length)];
    let maxVal=getMaxForDifficulty(difficulty, 5);
    let hint="";
    let a=Math.floor(Math.random()*maxVal)+1;
    let b=Math.floor(Math.random()*maxVal)+1;
    let c=Math.floor(Math.random()*maxVal)+1;
    switch (type){
        case "basic":{
            let expr=`${a} + ${b} \\times ${c}`;
            let result=a + b*c;
            questionArea.innerHTML=`Evaluate: \\( ${expr} \\)`;
            window.correctAnswer={
                correct: result.toString(),
                alternate: result.toString()
            };
            hint="Enter a number";
            break;
        }
        case "with_exponents":{
            let expr=`${a} + ${b}^2`;
            let result=a + b*b;
            questionArea.innerHTML=`Evaluate: \\( ${expr} \\)`;
            window.correctAnswer={
                correct: result.toString(),
                alternate: result.toString()
            };
            hint="Enter a number";
            break;
        }
        case "with_parentheses":{
            let expr=`(${a} + ${b}) \\times ${c}`;
            let result=(a+b)*c;
            questionArea.innerHTML=`Evaluate: \\( ${expr} \\)`;
            window.correctAnswer={
                correct: result.toString(),
                alternate: result.toString()
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