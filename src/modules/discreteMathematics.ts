import {questionArea} from "../script.js";

function factorial(n: number): number{
    if (n<0) return NaN;
    let res=1;
    for (let i=2; i<=n; i++) res *= i;
    return res;
}
export function nPr(n: number, r: number): number{
    return r>n?0:factorial(n)/factorial(n-r);
}
export function nCr(n: number, r: number): number{
    return r>n?0:factorial(n)/(factorial(r)*factorial(n-r));
}
export function generatePermutation(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["basic", "equation", "word", "circular", "identical", "withReplacement"];
    let type=types[Math.floor(Math.random()*types.length)];
    let n=Math.floor(Math.random()*8)+5;
    let r=Math.floor(Math.random()*(n-1))+1;
    switch (type){
        case "basic":
            questionArea.innerHTML=`\\( P(${n}, ${r}) \\)`;
            window.correctAnswer={
                correct: nPr(n, r).toString(),
                alternate: `nPr(${n},${r})`
            };
            break;
        case "equation":{
            let val=nPr(n, r);
            questionArea.innerHTML=`Find \\( n \\) if \\( P(n, ${r})=${val} \\)`;
            window.correctAnswer={
                correct: n.toString(),
                alternate: `${n}`
            };
            break;
        }
        case "word":{
            let objs=["books", "cars", "students", "colors"];
            let obj=objs[Math.floor(Math.random()*objs.length)];
            questionArea.innerHTML=`In how many ways can you arrange \\( ${r} \\) ${obj} chosen from \\( ${n} \\)?`;
            window.correctAnswer={
                correct: nPr(n, r).toString(),
                alternate: `P(${n},${r})`
            };
            break;
        }
        case "circular":
            questionArea.innerHTML=`How many circular arrangements of \\( ${n} \\) distinct objects?`;
            window.correctAnswer={
                correct: factorial(n-1).toString(),
                alternate: `(${n}-1)!`
            };
            break;
        case "identical":{
            let k=Math.floor(Math.random()*(n-1))+1;
            questionArea.innerHTML=`Permutations of \\( ${n} \\) items when \\( ${k} \\) are identical`;
            window.correctAnswer={
                correct: (factorial(n)/factorial(k)).toString(),
                alternate: `${n}!/${k}!`
            };
            break;
        }
        case "withReplacement":
            questionArea.innerHTML=`How many ordered selections of \\( ${r} \\) items from \\( ${n} \\) types if repetition is allowed?`;
            window.correctAnswer={
                correct: Math.pow(n, r).toString(),
                alternate: `${n}^${r}`
            };
            break;
    }
    window.MathJax?.typeset();
}
export function generateCombination(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["basic", "equation", "word", "complement", "paths", "multiset"];
    let type=types[Math.floor(Math.random()*types.length)];
    let n=Math.floor(Math.random()*8)+5;
    let r=Math.floor(Math.random()*(n-1))+1;
    switch (type){
        case "basic":
            questionArea.innerHTML=`\\( C(${n}, ${r}) \\)`;
            window.correctAnswer={
                correct: nCr(n, r).toString(),
                alternate: `nCr(${n},${r})`
            };
            break;
        case "equation":{
            let val=nCr(n, r);
            questionArea.innerHTML=`Find \\( n \\) if \\( C(n, ${r})=${val} \\)`;
            window.correctAnswer={
                correct: n.toString(),
                alternate: `${n}`
            };
            break;
        }
        case "word":{
            let items=["fruits", "committee members", "pizzas"];
            let item=items[Math.floor(Math.random()*items.length)];
            questionArea.innerHTML=`How many ways to choose \\( ${r} \\) ${item} from \\( ${n} \\)?`;
            window.correctAnswer={
                correct: nCr(n, r).toString(),
                alternate: `C(${n},${r})`
            };
            break;
        }
        case "complement":
            questionArea.innerHTML=`Show that \\( C(${n}, ${n-r})=C(${n}, ${r}) \\). What is its value?`;
            window.correctAnswer={
                correct: nCr(n, r).toString(),
                alternate: `C(${n},${r})`
            };
            break;
        case "paths":{
            let g=Math.floor(Math.random()*4)+3;
            questionArea.innerHTML=`Number of shortest paths in a \\( ${g} \\times ${g} \\) grid (right & up moves)?`;
            window.correctAnswer={
                correct: nCr(2*g, g).toString(),
                alternate: `C(${2*g},${g})`
            };
            break;
        }
        case "multiset":
            questionArea.innerHTML=`Ways to choose \\( ${r} \\) items from \\( ${n} \\) types if repeats allowed?`;
            window.correctAnswer={
                correct: nCr(n+r-1, r).toString(),
                alternate: `C(${n+r-1},${r})`
            };
            break;
    }
    window.MathJax?.typeset();
}
export function generateProbability(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let questionTypes=["basic", "conditional", "independent", "mutually_exclusive", "bayes", "binomial", "expected_value", "complement", "permutation_combination", "geometric"];
    let questionType=questionTypes[Math.floor(Math.random()*questionTypes.length)];
    let plainCorrectAnswer: string;
    let content: string[]=[];
    switch (questionType){
        case "basic":{
            let total=Math.floor(Math.random()*50)+10;
            let favorable=Math.floor(Math.random()*(total-1))+1;
            let prob=(favorable/total).toFixed(2);
            content.push(`A bag contains <span class="math">\\(${total}\\)</span> marbles, <span class="math">\\(${favorable}\\)</span> of which are red. What is the probability of drawing a red marble?`);
            plainCorrectAnswer=prob;
            window.correctAnswer={ correct: prob, alternate: `${favorable}/${total}` };
            break;
        }
        case "conditional":{
            let total=Math.floor(Math.random()*100)+50;
            let eventA=Math.floor(Math.random()*(total-10))+10;
            let eventB=Math.floor(Math.random()*(eventA-5))+5;
            let probB=(eventB/eventA).toFixed(2);
            content.push(`Given <span class="math">\\(${total}\\)</span> items, <span class="math">\\(${eventA}\\)</span> are type A, and <span class="math">\\(${eventB}\\)</span> of those are also type B. Find the probability of type B given type A.`);
            plainCorrectAnswer=probB;
            window.correctAnswer={ correct: probB, alternate: `${eventB}/${eventA}` };
            break;
        }
        case "independent":{
            let probA=(Math.random()*0.8+0.1).toFixed(2);
            let probB=(Math.random()*0.8+0.1).toFixed(2);
            let probBoth=(parseFloat(probA)*parseFloat(probB)).toFixed(2);
            content.push(`The probability of event A is <span class="math">\\(${probA}\\)</span>, and event B is <span class="math">\\(${probB}\\)</span>. If A and B are independent, find the probability of both occurring.`);
            plainCorrectAnswer=probBoth;
            window.correctAnswer={ correct: probBoth, alternate: `${probA} \\times ${probB}` };
            break;
        }
        case "mutually_exclusive":{
            let probA=(Math.random()*0.5+0.2).toFixed(2);
            let probB=(Math.random()*(0.9-parseFloat(probA))+0.1).toFixed(2);
            let probEither=(parseFloat(probA)+parseFloat(probB)).toFixed(2);
            content.push(`Events A and B are mutually exclusive with <span class="math">\\(P(A)=${probA}\\)</span> and <span class="math">\\(P(B)=${probB}\\)</span>. Find the probability of A or B occurring.`);
            plainCorrectAnswer=probEither;
            window.correctAnswer={ correct: probEither, alternate: `${probA}+${probB}` };
            break;
        }
        case "bayes":{
            let probA=(Math.random()*0.5+0.2).toFixed(2);
            let probB=(Math.random()*0.5+0.2).toFixed(2);
            let probBgivenA=(Math.random()*0.8+0.1).toFixed(2);
            let probAgivenB=(parseFloat(probBgivenA)*parseFloat(probA)/parseFloat(probB)).toFixed(2);
            content.push(`Given <span class="math">\\(P(A)=${probA}\\)</span>, <span class="math">\\(P(B)=${probB}\\)</span>, and <span class="math">\\(P(B|A)=${probBgivenA}\\)</span>, find <span class="math">\\(P(A|B)\\)</span>.`);
            plainCorrectAnswer=probAgivenB;
            window.correctAnswer={ correct: probAgivenB, alternate: `\\frac{${probBgivenA} \\cdot ${probA}}{${probB}}` };
            break;
        }
        case "binomial":{
            let n=Math.floor(Math.random()*5)+5;
            let k=Math.floor(Math.random()*(n-1))+1;
            let p=(Math.random()*0.7+0.1).toFixed(2);
            let q=(1-parseFloat(p)).toFixed(2);
            let prob=(nCr(n, k)*Math.pow(parseFloat(p), k)*Math.pow(parseFloat(q), n-k)).toFixed(2);
            content.push(`A trial has a success probability of <span class="math">\\(${p}\\)</span>. In <span class="math">\\(${n}\\)</span> trials, find the probability of exactly <span class="math">\\(${k}\\)</span> successes.`);
            plainCorrectAnswer=prob;
            window.correctAnswer={ correct: prob, alternate: `C(${n},${k}) \\cdot ${p}^{${k}} \\cdot ${q}^{${n-k}}` };
            break;
        }
        case "expected_value":{
            let values=Array.from({ length: 3 }, ()=>Math.floor(Math.random()*10)+1);
            let probs=Array.from({ length: 3 }, ()=>(Math.random()*0.3+0.1).toFixed(2));
            let sumProbs=parseFloat(probs[0])+parseFloat(probs[1])+parseFloat(probs[2]);
            probs=probs.map(p=>(parseFloat(p)/sumProbs).toFixed(2));
            let expected=(values[0]*parseFloat(probs[0])+values[1]*parseFloat(probs[1])+values[2]*parseFloat(probs[2])).toFixed(2);
            content.push(`A random variable takes values <span class="math">\\(${values.join(", ")}\\)</span> with probabilities <span class="math">\\(${probs.join(", ")}\\)</span>. Find the expected value.`);
            plainCorrectAnswer=expected;
            window.correctAnswer={ correct: expected, alternate: expected };
            break;
        }
        case "complement":{
            let probA=(Math.random()*0.8+0.1).toFixed(2);
            let probNotA=(1-parseFloat(probA)).toFixed(2);
            content.push(`If <span class="math">\\(P(A)=${probA}\\)</span>, find <span class="math">\\(P(\\text{not } A)\\)</span>.`);
            plainCorrectAnswer=probNotA;
            window.correctAnswer={ correct: probNotA, alternate: `1-${probA}` };
            break;
        }
        case "permutation_combination":{
            let n=Math.floor(Math.random()*8)+5;
            let r=Math.floor(Math.random()*(n-1))+1;
            let isPerm=Math.random()<0.5;
            let answer=isPerm?nPr(n, r):nCr(n, r);
            let symbol=isPerm?"P":"C";
            content.push(`Calculate <div class="math display">\\[${symbol}(${n}, ${r})\\]</div>`);
            plainCorrectAnswer=answer.toString();
            window.correctAnswer={ correct: answer.toString(), alternate: `${symbol}(${n},${r})` };
            break;
        }
        case "geometric":{
            let p=(Math.random()*0.7+0.2).toFixed(2);
            let k=Math.floor(Math.random()*5)+1;
            let prob=(Math.pow(1-parseFloat(p), k-1)*parseFloat(p)).toFixed(2);
            content.push(`A trial has success probability <span class="math">\\(${p}\\)</span>. Find the probability of the first success on the <span class="math">\\(${k}${getOrdinal(k)}\\)</span> trial.`);
            plainCorrectAnswer=prob;
            window.correctAnswer={ correct: prob, alternate: `${p} \\cdot ${(1-parseFloat(p)).toFixed(2)}^{${k-1}}` };
            break;
        }
    }
    let container=document.createElement("div");
    container.innerHTML=content.join("<br>");
    questionArea.appendChild(container);
    window.MathJax?.typesetPromise?.([container]).then(()=>{
        if (window.correctAnswer){
            window.correctAnswer.correct=plainCorrectAnswer.replace(/\s+/g, "").toLowerCase();
        }
    });
}

function getOrdinal(n: number): string{
    let s=["th", "st", "nd", "rd"];
    let v=n%100;
    return s[(v - 20)%10]||s[v]||s[0];
}