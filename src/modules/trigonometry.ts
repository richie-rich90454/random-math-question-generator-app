import {questionArea} from "../script.js";

export function generateSin(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["evaluate", "solve", "amplitude", "period", "phase_shift", "law_sines", "unit_circle", "identity"];
    let type=types[Math.floor(Math.random()*types.length)];
    switch (type){
        case "evaluate":{
            let isDegree=Math.random()<0.5;
            if (isDegree){
                let commonAngles=[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
                let angle=commonAngles[Math.floor(Math.random()*commonAngles.length)];
                let value=Math.sin(angle*Math.PI/180).toFixed(2);
                questionArea.innerHTML=`Evaluate \$\\sin(${angle}^\\circ)\$`;
                window.correctAnswer={ correct: value, alternate: value };
            }
            else{
                let radianAngles=[
                {value: 0, label: "0"},
                {value: Math.PI/6, label: "\\frac{\\pi}{6}"},
                {value: Math.PI/4, label: "\\frac{\\pi}{4}"},
                {value: Math.PI/3, label: "\\frac{\\pi}{3}"},
                {value: Math.PI/2, label: "\\frac{\\pi}{2}"},
                {value: 2*Math.PI/3, label: "\\frac{2\\pi}{3}"},
                {value: 3*Math.PI/4, label: "\\frac{3\\pi}{4}"},
                {value: 5*Math.PI/6, label: "\\frac{5\\pi}{6}"},
                {value: Math.PI, label: "\\pi"},
                {value: 7*Math.PI/6, label: "\\frac{7\\pi}{6}"},
                {value: 5*Math.PI/4, label: "\\frac{5\\pi}{4}"},
                {value: 4*Math.PI/3, label: "\\frac{4\\pi}{3}"},
                {value: 3*Math.PI/2, label: "\\frac{3\\pi}{2}"},
                {value: 5*Math.PI/3, label: "\\frac{5\\pi}{3}"},
                {value: 7*Math.PI/4, label: "\\frac{7\\pi}{4}"},
                {value: 11*Math.PI/6, label: "\\frac{11\\pi}{6}"}
                ];
                let obj=radianAngles[Math.floor(Math.random()*radianAngles.length)];
                let value=Math.sin(obj.value).toFixed(2);
                questionArea.innerHTML=`Evaluate \$\\sin(${obj.label})\$`;
                window.correctAnswer={ correct: value, alternate: value };
            }
            break;
        }
        case "solve":{
            let k=(Math.random()*2-1).toFixed(2);
            let isDegree=Math.random()<0.5;
            let solutions: string[]=[];
            let principal=Math.asin(parseFloat(k));
            if (isDegree){
                let principalDeg=principal*180/Math.PI;
                let sol1=principalDeg;
                let sol2=180-principalDeg;
                [sol1, sol2].forEach(sol =>{
                    if (sol>=0&&sol<360) solutions.push(`${sol.toFixed(0)}deg`);
                });
                questionArea.innerHTML=`Solve \$\\sin\\theta=${k}\$ (in degrees)`;
            }
            else{
                let sol1=principal;
                let sol2=Math.PI-principal;
                [sol1, sol2].forEach(sol =>{
                    if (sol>=0&&sol<2*Math.PI) solutions.push(sol.toFixed(2));
                });
                questionArea.innerHTML=`Solve \$\\sin\\theta=${k}\$ (in radians)`;
            }
            window.correctAnswer={ correct: solutions.join(", "), alternate: solutions.join(", ") };
            break;
        }
        case "amplitude":{
            let A=(Math.random()*4+1).toFixed(1);
            questionArea.innerHTML=`Find the amplitude of \$y=${A}\\sin(3x+\\pi/4)\$`;
            window.correctAnswer={ correct: A, alternate: A };
            break;
        }
        case "period":{
            let B=Math.floor(Math.random()*4+1);
            questionArea.innerHTML=`What is the period of \$y=\\sin(${B}x)\$?`;
            window.correctAnswer={
                correct: (2*Math.PI/B).toFixed(2)+" radians",
                alternate: `\\frac{2\\pi}{${B}}`
            };
            break;
        }
        case "phase_shift":{
            let C=(Math.random()*Math.PI).toFixed(2);
            let shiftDirection=(parseFloat(C) > 0)?"left":"right";
            let shiftText=(parseFloat(C)==0)?"0":`${C} units ${shiftDirection}`;
            questionArea.innerHTML=`Identify the phase shift of \$y=\\sin(x+${C})\$`;
            window.correctAnswer={
                correct: shiftText,
                alternate: (parseFloat(C)==0)?"0":`-${C}`
            };
            break;
        }
        case "law_sines":{
            let angleA=Math.floor(Math.random()*50+30);
            let angleB=Math.floor(Math.random()*50+30);
            let sideA=Math.floor(Math.random()*10+5);
            let sideB=(sideA*Math.sin(angleB*Math.PI/180)/Math.sin(angleA*Math.PI/180)).toFixed(1);
            questionArea.innerHTML=`Using the Law of Sines:<br>
                In triangle ABC, ∠A=${angleA}deg, ∠B=${angleB}deg, and side a=${sideA}.<br>
                Find side b.`;
            window.correctAnswer={ correct: sideB, alternate: sideB };
            break;
        }
        case "unit_circle":{
            let angles=[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let cosVal=Math.cos(angle*Math.PI/180).toFixed(2);
            let sinVal=Math.sin(angle*Math.PI/180).toFixed(2);
            questionArea.innerHTML=`Find the coordinates on the unit circle for an angle of ${angle}deg (format: (cos, sin))`;
            window.correctAnswer={ correct: `(${cosVal}, ${sinVal})`, alternate: `(${cosVal}, ${sinVal})` };
            break;
        }
        case "identity":{
            questionArea.innerHTML=`Complete the identity: \$\\sin^2\\theta+\\cos^2\\theta=\\; ?\$`;
            window.correctAnswer={ correct: "1", alternate: "one"};
            break;
        }
        default:
            questionArea.innerHTML="Unknown sine question type";
    }
    window.MathJax?.typeset();
}
export function generateCosine(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["evaluate", "solve", "amplitude", "period", "phase_shift", "law_cosines", "identity"];
    let type=types[Math.floor(Math.random()*types.length)];
    switch (type){
        case "evaluate":{
            let isDegree=Math.random()<0.5;
            if (isDegree){
                let angles=[0, 60, 90, 120, 180, 240, 270, 300];
                let angle=angles[Math.floor(Math.random()*angles.length)];
                let value=Math.cos(angle*Math.PI/180).toFixed(2);
                questionArea.innerHTML=`Evaluate \$\\cos(${angle}^\\circ)\$`;
                window.correctAnswer={ correct: value, alternate: value };
            }
            else{
                let radianAngles=[
                {value: 0, label: "0"},
                {value: Math.PI/3, label: "\\frac{\\pi}{3}"},
                {value: Math.PI/2, label: "\\frac{\\pi}{2}"},
                {value: 2*Math.PI/3, label: "\\frac{2\\pi}{3}"},
                {value: Math.PI, label: "\\pi"},
                {value: 4*Math.PI/3, label: "\\frac{4\\pi}{3}"},
                {value: 3*Math.PI/2, label: "\\frac{3\\pi}{2}"},
                {value: 5*Math.PI/3, label: "\\frac{5\\pi}{3}"}
                ];
                let obj=radianAngles[Math.floor(Math.random()*radianAngles.length)];
                let value=Math.cos(obj.value).toFixed(2);
                questionArea.innerHTML=`Evaluate \$\\cos(${obj.label})\$`;
                window.correctAnswer={ correct: value, alternate: value };
            }
            break;
        }
        case "solve":{
            let k=(Math.random()*2-1).toFixed(2);
            let isDegree=Math.random()<0.5;
            let solutions: string[]=[];
            let principal=Math.acos(parseFloat(k));
            if (isDegree){
                let principalDeg=principal*180/Math.PI;
                let sol1=principalDeg;
                let sol2=360-principalDeg;
                [sol1, sol2].forEach(sol =>{
                    if (sol>=0&&sol<360) solutions.push(`${sol.toFixed(0)}deg`);
                });
                questionArea.innerHTML=`Solve \$\\cos\\theta=${k}\$ (in degrees)`;
            }
            else{
                let sol1=principal;
                let sol2=2*Math.PI-principal;
                [sol1, sol2].forEach(sol =>{
                    if (sol>=0&&sol<2*Math.PI) solutions.push(sol.toFixed(2));
                });
                questionArea.innerHTML=`Solve \$\\cos\\theta=${k}\$ (in radians)`;
            }
            window.correctAnswer={ correct: solutions.join(", "), alternate: solutions.join(", ") };
            break;
        }
        case "amplitude":{
            let A=(Math.random()*4+1).toFixed(1);
            questionArea.innerHTML=`Find the amplitude of \$y=${A}\\cos(2x-\\pi/3)\$`;
            window.correctAnswer={ correct: A, alternate: A };
            break;
        }
        case "period":{
            let B=Math.floor(Math.random()*4+1);
            questionArea.innerHTML=`What is the period of \$y=\\cos(${B}x)\$?`;
            window.correctAnswer={
                correct: (2*Math.PI/B).toFixed(2)+" radians",
                alternate: `\\frac{2\\pi}{${B}}`
            };
            break;
        }
        case "phase_shift":{
            let C=(Math.random()*Math.PI).toFixed(2);
            let shiftDirection=(parseFloat(C) > 0)?"left":"right";
            let shiftText=(parseFloat(C)==0)?"0":`${C} units ${shiftDirection}`;
            questionArea.innerHTML=`Identify the phase shift of \$y=\\cos(x+${C})\$`;
            window.correctAnswer={
                correct: shiftText,
                alternate: (parseFloat(C)==0)?"0":`-${C}`
            };
            break;
        }
        case "law_cosines":{
            let a=Math.floor(Math.random()*10+5);
            let b=Math.floor(Math.random()*10+5);
            let angleC=Math.floor(Math.random()*50+30);
            let c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(angleC*Math.PI/180)).toFixed(1);

            questionArea.innerHTML=`Using the Law of Cosines:<br>
                In triangle ABC, sides a=${a}, b=${b}, and ∠C=${angleC}deg.<br>
                Find side c.`;
            window.correctAnswer={ correct: c, alternate: c };
            break;
        }
        case "identity":{
            questionArea.innerHTML=`Complete the identity: \$\\cos^2\\theta+\\sin^2\\theta=\\; ?\$`;
            window.correctAnswer={ correct: "1", alternate: "one"};
            break;
        }
        default:
            questionArea.innerHTML="Unknown cosine question type";
    }
    window.MathJax?.typeset();
}
export function generateTangent(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["evaluate", "solve", "period", "asymptote", "identity"];
    let type=types[Math.floor(Math.random()*types.length)];
    switch (type){
        case "evaluate":{
            let angles=[0, 45, 135, 225, 315];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let value=Math.tan(angle*Math.PI/180).toFixed(2);
            questionArea.innerHTML=`Evaluate \$\\tan(${angle}^\\circ)\$`;
            window.correctAnswer={ correct: value, alternate: value };
            break;
        }
        case "solve":{
            let k=(Math.random()*10-5).toFixed(2);
            let isDegree=Math.random()<0.5;
            let principal=Math.atan(parseFloat(k));
            if (isDegree){
                let principalDeg=principal*180/Math.PI;
                questionArea.innerHTML=`Solve \$\\tan\\theta=${k}\$ (in degrees, give the principal solution)`;
                window.correctAnswer={ correct: `${principalDeg.toFixed(0)}deg+180degn`, alternate: `${principalDeg.toFixed(0)}deg+180degn` };
            }
            else{
                questionArea.innerHTML=`Solve \$\\tan\\theta=${k}\$ (in radians, give the principal solution)`;
                window.correctAnswer={ correct: `${principal.toFixed(2)}+\\pi n`, alternate: `${principal.toFixed(2)}+\\pi n` };
            }
            break;
        }
        case "period":{
            let B=Math.floor(Math.random()*3+1);
            questionArea.innerHTML=`What is the period of \$y=\\tan(${B}x)\$?`;
            window.correctAnswer={
                correct: (Math.PI/B).toFixed(2)+" radians",
                alternate: `\\frac{\\pi}{${B}}`
            };
            break;
        }
        case "asymptote":{
            let B=Math.floor(Math.random()*2+1);
            let asymptotes: string[]=[];
            for (let k=-1; k <= 0; k++){
                asymptotes.push(`x=\\frac{(2*${k}+1)\\pi}{2\\cdot${B}}`);
            }
            questionArea.innerHTML=`Find the vertical asymptotes of \$y=\\tan(${B}x)\$`;
            window.correctAnswer={
                correct: asymptotes.join(", "),
                alternate: `x=\\frac{\\pi}{2\\cdot${B}}+\\frac{\\pi k}{${B}}`
            };
            break;
        }
        case "identity":{
            questionArea.innerHTML=`Complete the identity: \$1+\\tan^2\\theta=\\; ?\$`;
            window.correctAnswer={ correct: "sec^2theta", alternate: "\\sec^2\\theta"};
            break;
        }
        default:
            questionArea.innerHTML="Unknown tangent question type";
    }
    window.MathJax?.typeset();
}
export function generateCosecant(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["evaluate", "relationship", "asymptote"];
    let type=types[Math.floor(Math.random()*types.length)];
    switch (type){
        case "evaluate":{
            let angles=[30, 150, 210, 330];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let value=(1/Math.sin(angle*Math.PI/180)).toFixed(2);
            questionArea.innerHTML=`Evaluate \$\\csc(${angle}^\\circ)\$`;
            window.correctAnswer={ correct: value, alternate: value };
            break;
        }
        case "relationship":{
            let angle=Math.floor(Math.random()*360);
            questionArea.innerHTML=`Express \$\\csc(${angle}^\\circ)\$ in terms of sine.`;
            window.correctAnswer={
                correct: `\\frac{1}{\\sin(${angle}^\\circ)}`,
                alternate: "1/sin("+angle+"deg)"
            };
            break;
        }
        case "asymptote":{
            questionArea.innerHTML=`Find the vertical asymptotes of \$y=\\csc(x)\$ (in radians).`;
            window.correctAnswer={ correct: "x=n\\pi", alternate: "nπ"};
            break;
        }
        default:
            questionArea.innerHTML="Unknown cosecant question type";
    }
    window.MathJax?.typeset();
}
export function generateSecant(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let type=Math.random()<0.5?"evaluate":"identity";
    switch (type){
        case "evaluate":{
            let angles=[0, 60, 180, 300];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let value=(1/Math.cos(angle*Math.PI/180)).toFixed(2);
            questionArea.innerHTML=`Evaluate \$\\sec(${angle}^\\circ)\$`;
            window.correctAnswer={ correct: value, alternate: value };
            break;
        }
        case "identity":{
            questionArea.innerHTML=`Complete the identity: \$\\sec^2\\theta-\\tan^2\\theta=?\$`;
            window.correctAnswer={ correct: "1", alternate: "one"};
            break;
        }
        default:
            questionArea.innerHTML="Unknown secant question type";
    }
    window.MathJax?.typeset();
}
export function generateCotangent(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let type=Math.random()<0.5?"evaluate":"relationship";
    switch (type){
        case "evaluate":{
            let angles=[45, 135, 225, 315];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let value=(1/Math.tan(angle*Math.PI/180)).toFixed(2);
            questionArea.innerHTML=`Evaluate \$\\cot(${angle}^\\circ)\$`;
            window.correctAnswer={ correct: value, alternate: value };
            break;
        }
        case "relationship":{
            questionArea.innerHTML=`Express \$\\cot\\theta\$ in terms of tangent.`;
            window.correctAnswer={
                correct: `\\frac{1}{\\tan\\theta}`,
                alternate: "1/tantheta"
            };
            break;
        }
        default:
            questionArea.innerHTML="Unknown cotangent question type";
    }
    window.MathJax?.typeset();
}