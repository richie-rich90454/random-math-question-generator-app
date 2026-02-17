import {questionArea} from "../script.js";

interface TrigFunction{
    func: string;
    deriv: string;
    plainDeriv: string;
}
interface ExpFunction{
    func: string;
    deriv: string;
    plainDeriv: string;
}
interface LogFunction{
    func: string;
    deriv: string;
    plainDeriv: string;
}
interface TrigIntegral{
    func: string;
    integral: string;
    plain: string;
}

export function generateDerivative(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let trigFunctions: TrigFunction[]=[{func: "\\sin(x)", deriv: "\\cos(x)", plainDeriv: "cos(x)"}, {func: "\\cos(x)", deriv: "-\\sin(x)", plainDeriv: "-sin(x)"}, {func: "\\tan(x)", deriv: "\\sec^{2}(x)", plainDeriv: "sec^2(x)"}, {func: "\\csc(x)", deriv: "-\\csc(x)\\cot(x)", plainDeriv: "-csc(x)cot(x)"}, {func: "\\sec(x)", deriv: "\\sec(x)\\tan(x)", plainDeriv: "sec(x)tan(x)"}, {func: "\\cot(x)", deriv: "-\\csc^{2}(x)", plainDeriv: "-csc^2(x)"} ];
    let expFunctions: ExpFunction[]=[{func: "e^{x}", deriv: "e^{x}", plainDeriv: "e^x"}, {func: "2^{x}", deriv: "2^{x}\\ln(2)", plainDeriv: "2^x*ln(2)"}];
    let logFunctions: LogFunction[]=[{func: "\\ln(x)", deriv: "\\frac{1}{x}", plainDeriv: "1/x"}, {func: "\\log_{2}(x)", deriv: "\\frac{1}{x\\ln(2)}", plainDeriv: "1/(x*ln(2))"}];
    let questionTypes=["polynomial", "trigonometric", "exponential", "logarithmic", "product", "quotient", "chain", "implicit", "higherOrder", "motion"];
    let questionType=questionTypes[Math.floor(Math.random()*questionTypes.length)];
    let polynomial="";
    // @ts-ignore-variable is used in complex logic
    let correctDerivative=""; // used for potential future display
    let plainCorrectDerivative="";
    let mathExpression="";
    let latexToPlain=(str: string): string=>{
        return str.replace(/\\/g, "").replace(/{/g, "").replace(/}/g, "").replace(/cdot/g, "*").replace(/frac\(([^)]+)\)\(([^)]+)\)/g, "($1)/($2)").replace(/frac{([^}]+)}{([^}]+)}/g, "($1)/($2)");
    };
    switch (questionType){
        case "polynomial":{
            let numTerms=Math.floor(Math.random()*4)+2;
            let exponents=new Set<number>();
            while (exponents.size<numTerms){
                exponents.add(Math.floor(Math.random()*11));
            }
            let exponentsArray=Array.from(exponents).sort((a, b)=>b-a);
            let coefficients: number[]=[];
            for (let exponent of exponentsArray){
                let coeff=exponent===0?Math.floor(Math.random()*100)+1 :
                    exponent===1?Math.floor(Math.random()*20)+1 :
                        Math.floor(Math.random()*30)+1;
                coefficients.push(coeff);
            }
            let terms: string[]=[];
            let plainTerms: string[]=[];
            for (let i=0; i<exponentsArray.length; i++){
                let term=exponentsArray[i]===0?`${coefficients[i]}` :
                    exponentsArray[i]===1?`${coefficients[i]}x` :
                        `${coefficients[i]}x^{${exponentsArray[i]}}`;
                let plainTerm=exponentsArray[i]===0?`${coefficients[i]}` :
                    exponentsArray[i]===1?`${coefficients[i]}x` :
                        `${coefficients[i]}x^${exponentsArray[i]}`;
                terms.push(term);
                plainTerms.push(plainTerm);
            }
            polynomial=`(${terms.join("+")})`;
            let derivativeTerms: string[]=[];
            let plainDerivativeTerms: string[]=[];
            for (let i=0; i<exponentsArray.length; i++){
                if (exponentsArray[i]===0) continue;
                let newCoeff=coefficients[i]*exponentsArray[i];
                let newExponent=exponentsArray[i]-1;
                let term=newExponent===0?`${newCoeff}` :
                    newExponent===1?`${newCoeff}x` :
                        `${newCoeff}x^{${newExponent}}`;
                let plainTerm=newExponent===0?`${newCoeff}` :
                    newExponent===1?`${newCoeff}x` :
                        `${newCoeff}x^${newExponent}`;
                derivativeTerms.push(term);
                plainDerivativeTerms.push(plainTerm);
            }
            correctDerivative=derivativeTerms.join("+")||"0";
            plainCorrectDerivative=plainDerivativeTerms.join("+")||"0";
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "trigonometric":{
            let trig=trigFunctions[Math.floor(Math.random()*trigFunctions.length)];
            let coeff=Math.floor(Math.random()*5)+1;
            polynomial=`${coeff} ${trig.func}`;
            correctDerivative=`${coeff} \\cdot ${trig.deriv}`;
            plainCorrectDerivative=`${coeff}*${trig.plainDeriv}`;
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "exponential":{
            let exp=expFunctions[Math.floor(Math.random()*expFunctions.length)];
            let coeff=Math.floor(Math.random()*5)+1;
            polynomial=`${coeff} ${exp.func}`;
            correctDerivative=`${coeff} \\cdot ${exp.deriv}`;
            plainCorrectDerivative=`${coeff}*${exp.plainDeriv}`;
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "logarithmic":{
            let log=logFunctions[Math.floor(Math.random()*logFunctions.length)];
            polynomial=log.func;
            correctDerivative=log.deriv;
            plainCorrectDerivative=log.plainDeriv;
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "product":{
            let a=Math.floor(Math.random()*5)+1;
            let linear=`${a}x`;
            let trigProd=trigFunctions[Math.floor(Math.random()*trigFunctions.length)];
            polynomial=`(${linear}) \\cdot (${trigProd.func})`;
            correctDerivative=`${a} \\cdot ${trigProd.func}+(${linear}) \\cdot (${trigProd.deriv})`;
            plainCorrectDerivative=`${a}*${latexToPlain(trigProd.func)}+(${linear})*${trigProd.plainDeriv}`;
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "quotient":{
            let b=Math.floor(Math.random()*5)+1;
            let c=Math.floor(Math.random()*6);
            let trigQuot=trigFunctions[Math.floor(Math.random()*trigFunctions.length)];
            let num=`${b}x+${c}`;
            polynomial=`\\frac{${num}}{${trigQuot.func}}`;
            correctDerivative=`\\frac{${b} \\cdot ${trigQuot.func}-(${num}) \\cdot ${trigQuot.deriv}}{(${trigQuot.func})^{2}}`;
            plainCorrectDerivative=`(${b}*${latexToPlain(trigQuot.func)}-(${num})*${trigQuot.plainDeriv})/(${latexToPlain(trigQuot.func)})^2`;
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "chain":{
            let chainType=Math.floor(Math.random()*3);
            let a=Math.floor(Math.random()*3)+1;
            let b=Math.floor(Math.random()*3);
            let inner=`${a}x+${b}`;
            let plainInner=`${a}x+${b}`;
            if (chainType===0){
                let trigFunc=trigFunctions[Math.floor(Math.random()*2)];
                polynomial=`${trigFunc.func.replace("x", inner)}`;
                correctDerivative=`${trigFunc.deriv.replace("x", inner)} \\cdot ${a}`;
                plainCorrectDerivative=`${trigFunc.plainDeriv.replace("x", plainInner)}*${a}`;
            }
            else if (chainType===1){
                polynomial=`e^{${inner}}`;
                correctDerivative=`e^{${inner}} \\cdot ${a}`;
                plainCorrectDerivative=`e^(${plainInner})*${a}`;
            }
            else{
                let k=Math.floor(Math.random()*3)+2;
                polynomial=`(${inner})^{${k}}`;
                correctDerivative=`${k} (${inner})^{${k-1}} \\cdot ${a}`;
                plainCorrectDerivative=`${k}*(${plainInner})^${k-1}*${a}`;
            }
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "implicit":{
            let a=Math.floor(Math.random()*3)+1;
            let b=Math.floor(Math.random()*3)+1;
            polynomial=`${a}x^{2}+${b}y^{2}=1`;
            correctDerivative=`-\\frac{${a}x}{${b}y}`;
            plainCorrectDerivative=`-(${a}x)/(${b}y)`;
            mathExpression=`\\[ \\text{Find } \\frac{dy}{dx} \\text{ given } ${polynomial} \\]`;
            break;
        }
        case "higherOrder":{
            let coeff=Math.floor(Math.random()*10)+1;
            let exp=Math.floor(Math.random()*4)+2;
            polynomial=`${coeff}x^{${exp}}`;
            let order=Math.floor(Math.random()*2)+2;
            let deriv=coeff;
            let currExp=exp;
            for (let i=0; i<order; i++){
                deriv *= currExp;
                currExp--;
            }
            correctDerivative=currExp<0?"0" :
                currExp===0?`${deriv}` :
                    currExp===1?`${deriv}x` :
                        `${deriv}x^{${currExp}}`;
            plainCorrectDerivative=currExp<0?"0" :
                currExp===0?`${deriv}` :
                    currExp===1?`${deriv}x` :
                        `${deriv}x^${currExp}`;
            mathExpression=`\\[ \\frac{d^{${order}}}{dx^{${order}}} ${polynomial}=? \\]`;
            break;
        }
        case "motion":{
            let a=Math.floor(Math.random()*5)+1;
            let b=Math.floor(Math.random()*5)+1;
            polynomial=`${a}t^{2}+${b}t`;
            correctDerivative=`${2*a}t+${b}`;
            plainCorrectDerivative=`${2*a}t+${b}`;
            mathExpression=`\\[ \\text{If position } s(t)=${polynomial}, \\text{ find velocity } v(t)=? \\]`;
            break;
        }
    }
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=mathExpression;
    questionArea.appendChild(mathContainer);
    if (window.MathJax&&window.MathJax.typesetPromise){
        window.MathJax.typesetPromise([mathContainer]).catch((err: any)=>
            console.log("MathJax typeset error:", err)
        );
    }
    window.correctAnswer={
        correct: plainCorrectDerivative.replace(/\s+/g, "").toLowerCase(),
        alternate: plainCorrectDerivative
    };
    window.expectedFormat="Enter the derivative as an expression, e.g., 2x+3, cos(x), etc.";
}
export function generateIntegral(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let questionTypes=["polynomial", "trigonometric", "exponential", "logarithmic", "substitution", "definite", "initialValue", "area", "motion"];
    let questionType=questionTypes[Math.floor(Math.random()*questionTypes.length)];
    let polynomial="";
    // @ts-ignore-variable is used in complex logic
    let correctIntegral="";
    let plainCorrectIntegral="";
    let mathExpression="";
    // @ts-ignore-function is used in complex logic
    let latexToPlain=(str: string): string=>{
        return str.replace(/\\/g, "").replace(/{/g, "").replace(/}/g, "").replace(/cdot/g, "*").replace(/frac\(([^)]+)\)\(([^)]+)\)/g, "($1)/($2)").replace(/frac{([^}]+)}{([^}]+)}/g, "($1)/($2)");
    };
    switch (questionType){
        case "polynomial":{
            let numTerms=Math.floor(Math.random()*4)+2;
            let exponents=new Set<number>();
            while (exponents.size<numTerms){
                exponents.add(Math.floor(Math.random()*11));
            }
            let exponentsArray=Array.from(exponents).sort((a, b)=>b-a);
            let coefficients: number[]=[];
            for (let exponent of exponentsArray){
                let coeff=exponent===0?Math.floor(Math.random()*100)+1 :
                    exponent===1?Math.floor(Math.random()*20)+1 :
                        Math.floor(Math.random()*30)+1;
                coefficients.push(coeff);
            }
            let terms: string[]=[];
            let plainTerms: string[]=[];
            for (let i=0; i<exponentsArray.length; i++){
                let term=exponentsArray[i]===0?`${coefficients[i]}` :
                    exponentsArray[i]===1?`${coefficients[i]}x` :
                        `${coefficients[i]}x^{${exponentsArray[i]}}`;
                let plainTerm=term.replace(/[{}]/g, "");
                terms.push(term);
                plainTerms.push(plainTerm);
            }
            polynomial=`(${terms.join("+")})`;
            let integralTerms: string[]=[];
            let plainIntegralTerms: string[]=[];
            for (let i=0; i<exponentsArray.length; i++){
                let newExponent=exponentsArray[i]+1;
                let newCoeff=coefficients[i]/newExponent;
                let term=`${newCoeff.toFixed(2)}x^{${newExponent}}`;
                let plainTerm=`${newCoeff.toFixed(2)}x^${newExponent}`;
                integralTerms.push(term);
                plainIntegralTerms.push(plainTerm);
            }
            integralTerms.push("C");
            plainIntegralTerms.push("C");
            correctIntegral=integralTerms.join("+");
            plainCorrectIntegral=plainIntegralTerms.join("+");
            mathExpression=`\\[ \\int ${polynomial} \\,dx=? \\]`;
            break;
        }
        case "trigonometric":{
            let trigIntegrals: TrigIntegral[]=[
            {func: "\\sin(ax)", integral: "-\\frac{1}{a}\\cos(ax)", plain: "-1/a cos(ax)"},
            {func: "\\cos(ax)", integral: "\\frac{1}{a}\\sin(ax)", plain: "1/a sin(ax)"},
            {func: "\\sec^{2}(ax)", integral: "\\frac{1}{a}\\tan(ax)", plain: "1/a tan(ax)"}
            ];
            let chosen=trigIntegrals[Math.floor(Math.random()*trigIntegrals.length)];
            let a=Math.floor(Math.random()*3)+1;
            let coeff=Math.floor(Math.random()*4)+1;
            polynomial=`${coeff}${chosen.func.replace("a", a.toString())}`;
            correctIntegral=`${coeff}${chosen.integral.replace(/a/g, a.toString())}+C`;
            plainCorrectIntegral=`${(coeff/a).toFixed(2)}${chosen.plain.replace("a", a.toString()).replace("1/a", "1/"+a)}+C`.replace(/(\.00|0+)$/, "");
            mathExpression=`\\[ \\int ${polynomial} \\,dx=? \\]`;
            break;
        }
        case "exponential":{
            let base=Math.random()<0.5?"e" : Math.floor(Math.random()*3)+2;
            let a=Math.floor(Math.random()*3)+1;
            let coeff=Math.floor(Math.random()*4)+1;
            if (base==="e"){
                polynomial=`${coeff}e^{${a}x}`;
                plainCorrectIntegral=`${(coeff/a).toFixed(2)}e^(${a}x)+C`;
            }
            else{
                polynomial=`${coeff}${base}^{x}`;
                plainCorrectIntegral=`${(coeff/Math.log(base as number)).toFixed(2)}${base}^x+C`;
            }
            mathExpression=`\\[ \\int ${polynomial} \\,dx=? \\]`;
            break;
        }
        case "logarithmic":{
            let coeff=Math.floor(Math.random()*5)+1;
            polynomial=`${coeff}/x`;
            plainCorrectIntegral=`${coeff}ln|x|+C`;
            mathExpression=`\\[ \\int ${polynomial} \\,dx=? \\]`;
            break;
        }
        case "substitution":{
            let a=Math.floor(Math.random()*3)+1;
            let b=Math.floor(Math.random()*5);
            let power=Math.floor(Math.random()*3)+2;
            let coeff=Math.floor(Math.random()*4)+1;
            polynomial=`${coeff}(${a}x+${b})^{${power}}`;
            let newPower=power+1;
            plainCorrectIntegral=`${(coeff/(a*newPower)).toFixed(2)}(${a}x+${b})^${newPower}+C`.replace(/\.00/g, "");
            mathExpression=`\\[ \\int ${polynomial} \\,dx=? \\]`;
            break;
        }
        case "definite":{
            let exponents=Array.from({ length: 3 }, ()=>Math.floor(Math.random()*4));
            let coefficients=exponents.map(()=>Math.floor(Math.random()*5)+1);
            let [lower, upper]=[1, Math.floor(Math.random()*5)+2];
            polynomial=coefficients.map((c, i)=>`${c}x^${exponents[i]}`).join("+");
            let integral=coefficients.map((c, i)=>c/(exponents[i]+1)).reduce((a, b)=>a+b, 0);
            let result=(Math.pow(upper, exponents[0]+1)-Math.pow(lower, exponents[0]+1))*integral;
            plainCorrectIntegral=result.toFixed(2);
            mathExpression=`\\[ \\int_{${lower}}^{${upper}} ${polynomial} \\,dx=? \\]`;
            break;
        }
        case "initialValue":{
            let coeff=Math.floor(Math.random()*5)+1;
            let exponent=Math.floor(Math.random()*3)+1;
            let xVal=Math.floor(Math.random()*3)+1;
            let yVal=Math.floor(Math.random()*20)+5;
            polynomial=`${coeff}x^${exponent}`;
            let c=yVal-(coeff/(exponent+1))*Math.pow(xVal, exponent+1);
            plainCorrectIntegral=`${(coeff/(exponent+1)).toFixed(2)}x^${exponent+1}+${c.toFixed(2)}`;
            mathExpression=`\\[ \\text{Find } f(x) \\text{ where } f'(${xVal})=${yVal} \\text{ and } f'(x)=${polynomial} \\]`;
            break;
        }
        case "area":{
            let funcs=["x^2", "sin(x)", "sqrt(x)", "2^x"];
            let func=funcs[Math.floor(Math.random()*funcs.length)];
            let [a, b]=[0, Math.floor(Math.random()*4)+1];
            plainCorrectIntegral=`∫${a}^${b} ${func} dx`;
            mathExpression=`\\[ \\text{Set up the integral for the area under } ${func} \\text{ from } ${a} \\text{ to } ${b} \\]`;
            break;
        }
        case "motion":{
            let coeff=Math.floor(Math.random()*4)+1;
            let type=Math.random()<0.5?"velocity" : "acceleration";
            if (type==="velocity"){
                polynomial=`${coeff}t^2`;
                plainCorrectIntegral=`${(coeff/3).toFixed(2)}t^3+C`;
            }
            else{
                polynomial=`${coeff}t`;
                plainCorrectIntegral=`${(coeff/2).toFixed(2)}t^2+C`;
            }
            mathExpression=`\\[ \\text{Find position from } ${type} \\ a(t)=${polynomial} \\]`;
            break;
        }
    }
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=mathExpression||`\\[ \\int ${polynomial} \\,dx=? \\]`;
    questionArea.appendChild(mathContainer);
    if (window.MathJax&&window.MathJax.typesetPromise){
        window.MathJax.typesetPromise([mathContainer]).catch((err: any)=>
            console.log("MathJax typeset error:", err)
        );
    }
    window.correctAnswer={
        correct: plainCorrectIntegral.replace(/\s+/g, "").replace(/\^{/g, "^").replace(/}/g, "").replace(/{/g, "").toLowerCase(),
        alternate: plainCorrectIntegral
    };
    window.expectedFormat="Enter the integral as an expression, e.g., 2x^3/3+5x^2/2+C, 1/3 sin(3x)+C, etc.";
}
export function generateLimit(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["polynomial", "rational", "infinity", "trig"];
    let type=types[Math.floor(Math.random()*types.length)];
    let mathExpression="";
    let plainCorrectAnswer="";
    switch (type){
        case "polynomial":{
            let a=Math.floor(Math.random()*5)+1;
            let c=Math.floor(Math.random()*10)-5;
            let x0=Math.floor(Math.random()*5);
            let limit=a*x0*x0+c;
            mathExpression=`\\[ \\lim_{x \\to ${x0}} (${a}x^2+${c}) \\]`;
            plainCorrectAnswer=limit.toString();
            window.correctAnswer={ correct: plainCorrectAnswer, alternate: plainCorrectAnswer };
            window.expectedFormat="Enter a number";
            break;
        }
        case "rational":{
            let a=Math.floor(Math.random()*5)+1;
            let b=Math.floor(Math.random()*5)+1;
            let x0=Math.floor(Math.random()*5)+1;
            let limit=(a*x0+1)/(b*x0-1);
            mathExpression=`\\[ \\lim_{x \\to ${x0}} \\frac{${a}x+1}{${b}x-1} \\]`;
            plainCorrectAnswer=limit.toFixed(2);
            window.correctAnswer={
                correct: plainCorrectAnswer,
                alternate: `${a*x0+1}/${b*x0-1}`
            };
            window.expectedFormat="Enter a decimal number (e.g., 2.5) or a fraction (e.g., 7/3)";
            break;
        }
        case "infinity":{
            let a=Math.floor(Math.random()*3)+1;
            // @ts-ignore-variable is defined for conceptual clarity
            let limit=a;
            mathExpression=`\\[ \\lim_{x \\to \\infty} \\frac{${a}x^2+x}{x^2-1} \\]`;
            plainCorrectAnswer=a.toString();
            window.correctAnswer={ correct: plainCorrectAnswer, alternate: plainCorrectAnswer };
            window.expectedFormat="Enter a number";
            break;
        }
        case "trig":{
            // @ts-ignore-variable is defined for conceptual clarity
            let limit=1;
            mathExpression=`\\[ \\lim_{x \\to 0} \\frac{\\sin(x)}{x} \\]`;
            plainCorrectAnswer="1";
            window.correctAnswer={ correct: plainCorrectAnswer, alternate: plainCorrectAnswer };
            window.expectedFormat="Enter 1";
            break;
        }
    }
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=mathExpression;
    questionArea.appendChild(mathContainer);
    if (window.MathJax&&window.MathJax.typesetPromise){
        window.MathJax.typesetPromise([mathContainer]).catch((err: any)=>
            console.log("MathJax typeset error:", err)
        );
    }
}
export function generateRelatedRates(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["ladder", "cone"];
    let type=types[Math.floor(Math.random()*types.length)];
    let mathExpression="";
    let plainCorrectAnswer="";
    let problemText="";
    switch (type){
        case "ladder":{
            let ladder=10;
            let x=6;
            let dx_dt=2;
            let y=Math.sqrt(ladder*ladder-x*x);
            let dy_dt=-(x/y)*dx_dt;
            problemText=`A ${ladder}-ft ladder leans against a wall. The bottom is ${x} ft from the wall, moving away at ${dx_dt} ft/s. Find the rate at which the top is sliding down.`;
            mathExpression=`\\[ \\frac{dy}{dt}=? \\]`;
            plainCorrectAnswer=dy_dt.toFixed(2);
            window.correctAnswer={ correct: plainCorrectAnswer, alternate: plainCorrectAnswer };
            window.expectedFormat="Enter a number (ft/s, e.g., -1.5)";
            break;
        }
        case "cone":{
            let r=3;
            let h=9;
            let dr_dt=0.5;
            // @ts-ignore-variable is defined for conceptual clarity
            let V=(1/3)*Math.PI*r*r*h;
            let dV_dt=Math.PI*r*h*dr_dt;
            problemText=`A conical tank has radius ${r} ft and height ${h} ft. The radius increases at ${dr_dt} ft/s. Find the rate of change of volume.`;
            mathExpression=`\\[ \\frac{dV}{dt}=? \\]`;
            plainCorrectAnswer=dV_dt.toFixed(2);
            window.correctAnswer={ correct: plainCorrectAnswer, alternate: plainCorrectAnswer };
            window.expectedFormat="Enter a number (ft³/s, e.g., 42.41)";
            break;
        }
    }
    let textContainer=document.createElement("div");
    textContainer.textContent=problemText;
    textContainer.classList.add("problem-text");
    questionArea.appendChild(textContainer);
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=mathExpression;
    questionArea.appendChild(mathContainer);
    if (window.MathJax&&window.MathJax.typesetPromise){
        window.MathJax.typesetPromise([mathContainer]).catch((err: any)=>
            console.log("MathJax typeset error:", err)
        );
    }
}