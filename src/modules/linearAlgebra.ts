import {questionArea} from "../script.js";

interface Matrix2x2{
    a: number;
    b: number;
    c: number;
    d: number;
}
interface Vector2D{
    x: number;
    y: number;
}
export function generateMatrix(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["add", "subtract", "multiply", "inverse", "system", "transpose", "scalar_mult", "power", "row_echelon"];
    let type=types[Math.floor(Math.random()*types.length)];
    let generate2x2=(): Matrix2x2=>({
        a: +(Math.random()*10-5).toFixed(2),
        b: +(Math.random()*10-5).toFixed(2),
        c: +(Math.random()*10-5).toFixed(2),
        d: +(Math.random()*10-5).toFixed(2)
    });
    let matrixToString=(m: Matrix2x2, style="bmatrix"): string=>
        `\\begin{${style}} ${m.a} & ${m.b} \\\\ ${m.c} & ${m.d} \\end{${style}}`;
    switch (type){
        case "add":{
            let A=generate2x2();
            let B=generate2x2();
            let result: Matrix2x2={
                a: +(A.a+B.a).toFixed(2),
                b: +(A.b+B.b).toFixed(2),
                c: +(A.c+B.c).toFixed(2),
                d: +(A.d+B.d).toFixed(2)
            };
            questionArea.innerHTML=`Add: \$${matrixToString(A)}+${matrixToString(B)}\$`;
            window.correctAnswer={
                correct: `[${result.a},${result.b},${result.c},${result.d}]`,
                alternate: matrixToString(result),
            };
            break;
        }
        case "subtract":{
            let A=generate2x2();
            let B=generate2x2();
            let result: Matrix2x2={
                a: +(A.a-B.a).toFixed(2),
                b: +(A.b-B.b).toFixed(2),
                c: +(A.c-B.c).toFixed(2),
                d: +(A.d-B.d).toFixed(2)
            };
            questionArea.innerHTML=`Subtract: \$${matrixToString(A)}-${matrixToString(B)}\$`;
            window.correctAnswer={
                correct: `(${result.a},${result.b},${result.c},${result.d})`,
                alternate: matrixToString(result),
            };
            break;
        }
        case "multiply":{
            let A=generate2x2();
            let B=generate2x2();
            let result: Matrix2x2={
                a: +(A.a*B.a+A.b*B.c).toFixed(2),
                b: +(A.a*B.b+A.b*B.d).toFixed(2),
                c: +(A.c*B.a+A.d*B.c).toFixed(2),
                d: +(A.c*B.b+A.d*B.d).toFixed(2)
            };
            questionArea.innerHTML=`Multiply: \$${matrixToString(A)} \\times ${matrixToString(B)}\$`;
            window.correctAnswer={
                correct: `[${result.a},${result.b},${result.c},${result.d}]`,
                alternate: matrixToString(result),
            };
            break;
        }
        case "inverse":{
            let A: Matrix2x2;
            let det: number;
            do{
                A=generate2x2();
                det=A.a*A.d-A.b*A.c;
            } while (Math.abs(det)<0.1);
            let invDet=1/det;
            let inv: Matrix2x2={
                a: +(A.d*invDet).toFixed(2),
                b: +(-A.b*invDet).toFixed(2),
                c: +(-A.c*invDet).toFixed(2),
                d: +(A.a*invDet).toFixed(2)
            };
            questionArea.innerHTML=`Find inverse of \$${matrixToString(A)}\$`;
            window.correctAnswer={
                correct: `inv(${inv.a},${inv.b},${inv.c},${inv.d})`,
                alternate: matrixToString(inv),
            };
            break;
        }
        case "system":{
            let A=generate2x2();
            let x=+(Math.random()*5+1).toFixed(2);
            let y=+(Math.random()*5+1).toFixed(2);
            let B={
                a: +(A.a*x+A.b*y).toFixed(2),
                b: +(A.c*x+A.d*y).toFixed(2)
            };
            questionArea.innerHTML=`Solve:<br>
        \$${A.a}x+${A.b}y=${B.a}\$<br>
        \$${A.c}x+${A.d}y=${B.b}\$`;
            window.correctAnswer={
                correct: `x=${x}, y=${y}`,
                alternate: `(${x},${y})`,
            };
            break;
        }
        case "transpose":{
            let A=generate2x2();
            let result: Matrix2x2={ a: A.a, b: A.c, c: A.b, d: A.d };
            questionArea.innerHTML=`Find transpose of \$${matrixToString(A)}\$`;
            window.correctAnswer={
                correct: `tr(${result.a},${result.b},${result.c},${result.d})`,
                alternate: matrixToString(result),
            };
            break;
        }
        case "scalar_mult":{
            let A=generate2x2();
            let k=+(Math.random()*10-5).toFixed(1);
            let result: Matrix2x2={
                a: +(k*A.a).toFixed(2),
                b: +(k*A.b).toFixed(2),
                c: +(k*A.c).toFixed(2),
                d: +(k*A.d).toFixed(2)
            };
            questionArea.innerHTML=`Multiply \$${matrixToString(A)}\$ by ${k}`;
            window.correctAnswer={
                correct: `scl(${result.a},${result.b},${result.c},${result.d})`,
                alternate: matrixToString(result),
            };
            break;
        }
        case "power":{
            let A=generate2x2();
            let result: Matrix2x2={
                a: +(A.a*A.a+A.b*A.c).toFixed(2),
                b: +(A.a*A.b+A.b*A.d).toFixed(2),
                c: +(A.c*A.a+A.d*A.c).toFixed(2),
                d: +(A.c*A.b+A.d*A.d).toFixed(2)
            };
            questionArea.innerHTML=`Compute \$${matrixToString(A)}^2\$`;
            window.correctAnswer={
                correct: `pow(${result.a},${result.b},${result.c},${result.d})`,
                alternate: matrixToString(result),
            };
            break;
        }
        case "row_echelon":{
            let A: Matrix2x2;
            do{
                A=generate2x2();
            } while (Math.abs(A.a)<0.1);
            let factor=+(A.c/A.a).toFixed(2);
            let result: Matrix2x2={
                a: A.a,
                b: A.b,
                c: 0,
                d: +(A.d-factor*A.b).toFixed(2)
            };
            questionArea.innerHTML=`Find row-echelon form of \$${matrixToString(A)}\$`;
            window.correctAnswer={
                correct: `ref(${result.a},${result.b},${result.c},${result.d})`,
                alternate: matrixToString(result),
            };
            break;
        }
    }
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}
export function generateVector(): void{
    if (!questionArea) return;
    questionArea.innerHTML="";
    let types=["magnitude", "direction", "unit", "dot", "angle", "projection", "parametric", "polar_convert", "cartesian_convert", "polar_graph", "motion", "de_moivre", "add", "subtract", "parametric_to_cartesian"];
    let type=types[Math.floor(Math.random()*types.length)];
    let generateNonZeroVector=(): Vector2D=>{
        let x: number, y: number;
        do{
            x=Math.random()*10-5;
            y=Math.random()*10-5;
        } while (Math.abs(x)<0.1&&Math.abs(y)<0.1);
        return{ x, y };
    };
    let generateNonZeroXVector=(): Vector2D=>{
        let vec: Vector2D;
        do{
            vec=generateNonZeroVector();
        } while (Math.abs(vec.x)<0.1);
        return vec;
    };
    switch (type){
        case "magnitude":{
            const{ x, y }=generateNonZeroVector();
            let mag=Math.sqrt(x**2+y**2).toFixed(2);
            questionArea.innerHTML=`Find the magnitude of \\(\\langle ${x.toFixed(1)}, ${y.toFixed(1)} \\rangle\\).`;
            window.correctAnswer={
                correct: mag,
                alternate: mag,
            };
            break;
        }
        case "direction":{
            const{ x, y }=generateNonZeroVector();
            let angle=(Math.atan2(y, x)*180/Math.PI).toFixed(1);
            questionArea.innerHTML=`Find the direction angle (in degrees) of \\(\\langle ${x.toFixed(1)}, ${y.toFixed(1)} \\rangle\\).`;
            window.correctAnswer={
                correct: angle,
                alternate: angle,
            };
            break;
        }
        case "unit":{
            const{ x, y }=generateNonZeroVector();
            let mag=Math.sqrt(x**2+y**2);
            let ux=(x/mag).toFixed(2);
            let uy=(y/mag).toFixed(2);
            questionArea.innerHTML=`Find the unit vector in the direction of \\(\\langle ${x.toFixed(1)}, ${y.toFixed(1)} \\rangle\\).`;
            window.correctAnswer={
                correct: `<${ux}, ${uy}>`,
                alternate: `\\langle ${ux}, ${uy} \\rangle`,
            };
            break;
        }
        case "dot":{
            let v1=generateNonZeroVector();
            let v2=generateNonZeroVector();
            let product=(v1.x*v2.x+v1.y*v2.y).toFixed(2);
            questionArea.innerHTML=`Calculate \\(\\langle ${v1.x.toFixed(1)}, ${v1.y.toFixed(1)} \\rangle \\cdot \\langle ${v2.x.toFixed(1)}, ${v2.y.toFixed(1)} \\rangle\\).`;
            window.correctAnswer={
                correct: product,
                alternate: product,
            };
            break;
        }
        case "angle":{
            let v1=generateNonZeroVector();
            let v2=generateNonZeroVector();
            let dot=v1.x*v2.x+v1.y*v2.y;
            let mag1=Math.sqrt(v1.x**2+v1.y**2);
            let mag2=Math.sqrt(v2.x**2+v2.y**2);
            let angle=(Math.acos(dot/(mag1*mag2))*180/Math.PI).toFixed(1);
            questionArea.innerHTML=`Find the angle (in degrees) between \\(\\langle ${v1.x.toFixed(1)}, ${v1.y.toFixed(1)} \\rangle\\) and \\(\\langle ${v2.x.toFixed(1)}, ${v2.y.toFixed(1)} \\rangle\\).`;
            window.correctAnswer={
                correct: angle,
                alternate: angle,
            };
            break;
        }
        case "projection":{
            let v1=generateNonZeroVector();
            let v2=generateNonZeroVector();
            let dot=v1.x*v2.x+v1.y*v2.y;
            let magV2Sq=v2.x**2+v2.y**2;
            let projX=(dot/magV2Sq*v2.x).toFixed(2);
            let projY=(dot/magV2Sq*v2.y).toFixed(2);
            questionArea.innerHTML=`Find the projection of \\(\\langle ${v1.x.toFixed(1)}, ${v1.y.toFixed(1)} \\rangle\\) onto \\(\\langle ${v2.x.toFixed(1)}, ${v2.y.toFixed(1)} \\rangle\\).`;
            window.correctAnswer={
                correct: `<${projX}, ${projY}>`,
                alternate: `\\langle ${projX}, ${projY} \\rangle`,
            };
            break;
        }
        case "parametric":{
            let pointX=(Math.random()*10-5).toFixed(1);
            let pointY=(Math.random()*10-5).toFixed(1);
            let dir=generateNonZeroVector();
            questionArea.innerHTML=`Write the parametric equations for the line that passes through \\((${pointX}, ${pointY})\\) and has direction vector \\(\\langle ${dir.x.toFixed(1)}, ${dir.y.toFixed(1)} \\rangle\\).`;
            window.correctAnswer={
                correct: `x=${pointX}+${dir.x.toFixed(1)}t, y=${pointY}+${dir.y.toFixed(1)}t`,
                alternate: `x=${pointX}+${dir.x.toFixed(1)}t, y=${pointY}+${dir.y.toFixed(1)}t`,
            };
            break;
        }
        case "polar_convert":{
            let r=(Math.random()*10).toFixed(1);
            let theta=(Math.random()*360-180).toFixed(0);
            let x=(parseFloat(r)*Math.cos(parseFloat(theta)*Math.PI/180)).toFixed(2);
            let y=(parseFloat(r)*Math.sin(parseFloat(theta)*Math.PI/180)).toFixed(2);
            questionArea.innerHTML=`Convert the polar coordinate \\((${r}, ${theta}^{\\circ})\\) to Cartesian coordinates.`;
            window.correctAnswer={
                correct: `(${x}, ${y})`,
                alternate: `(${x}, ${y})`,
            };
            break;
        }
        case "cartesian_convert":{
            const{ x, y }=generateNonZeroVector();
            let r=Math.sqrt(x**2+y**2).toFixed(2);
            let theta=(Math.atan2(y, x)*180/Math.PI).toFixed(1);
            questionArea.innerHTML=`Convert the Cartesian coordinate \\((${x.toFixed(1)}, ${y.toFixed(1)})\\) to polar coordinates. Answer with (r, degrees), no need to add deg.`;
            window.correctAnswer={
                correct: `(${r}, ${theta})`,
                alternate: `(${r}, ${theta}^{\\circ})`,
            };
            break;
        }
        case "polar_graph":{
            let a=(Math.random()*4+1).toFixed(1);
            let useSin=Math.random()<0.5;
            if (useSin){
                questionArea.innerHTML=`Describe the graph of the polar equation \\(r=${a}\\sin\\theta\\). Use the format "A circle with center at (x, y) and radius (radius)" Use two decimal places.`;
                let center=(parseFloat(a)/2).toFixed(2);
                window.correctAnswer={
                    correct: `A circle with center at (0, ${center}) and radius ${center}`,
                    alternate: `Circle: center (0, ${center}), radius ${center}`,
                };
            }
            else{
                questionArea.innerHTML=`Describe the graph of the polar equation \\(r=${a}\\cos\\theta\\). Use the format "A circle with center at (x, y) and radius (radius)" Use two decimal places.`;
                let center=(parseFloat(a)/2).toFixed(2);
                window.correctAnswer={
                    correct: `A circle with center at (${center}, 0) and radius ${center}`,
                    alternate: `Circle: center (${center}, 0), radius ${center}`,
                };
            }
            break;
        }
        case "motion":{
            let posX=(Math.random()*10-5).toFixed(1);
            let posY=(Math.random()*10-5).toFixed(1);
            let v=generateNonZeroVector();
            questionArea.innerHTML=`A particle starts at \\((${posX}, ${posY})\\) and moves with constant velocity \\(\\langle ${v.x.toFixed(1)}, ${v.y.toFixed(1)} \\rangle\\). Write the position vector as a function of time \\(t\\).`;
            window.correctAnswer={
                correct: `<${posX}+${v.x.toFixed(1)}t, ${posY}+${v.y.toFixed(1)}t>`,
                alternate: `\\langle ${posX}+${v.x.toFixed(1)}t, ${posY}+${v.y.toFixed(1)}t \\rangle`,
            };
            break;
        }
        case "de_moivre":{
            let r=(Math.random()*5+1).toFixed(1);
            let theta=Math.floor(Math.random()*360);
            let n=Math.floor(Math.random()*3+2);
            let newR=(Math.pow(parseFloat(r), n)).toFixed(2);
            let newTheta=(theta*n) % 360;
            questionArea.innerHTML=`Compute \\((${r}(\\cos ${theta}^{\\circ}+i\\sin ${theta}^{\\circ}))^{${n}}\\) using De Moivre's Theorem. Answer with degrees (no need to add deg).`;
            window.correctAnswer={
                correct: `${newR} cis ${newTheta}`,
                alternate: `${newR}(\\cos ${newTheta}^{\\circ}+i\\sin ${newTheta}^{\\circ})`,
            };
            break;
        }
        case "add":{
            let v1=generateNonZeroVector();
            let v2=generateNonZeroVector();
            let sumX=(v1.x+v2.x).toFixed(2);
            let sumY=(v1.y+v2.y).toFixed(2);
            questionArea.innerHTML=`Find the sum of the vectors \\(\\langle ${v1.x.toFixed(1)}, ${v1.y.toFixed(1)} \\rangle\\) and \\(\\langle ${v2.x.toFixed(1)}, ${v2.y.toFixed(1)} \\rangle\\).`;
            window.correctAnswer={
                correct: `<${sumX}, ${sumY}>`,
                alternate: `\\langle ${sumX}, ${sumY} \\rangle`,
            };
            break;
        }
        case "subtract":{
            let v1=generateNonZeroVector();
            let v2=generateNonZeroVector();
            let diffX=(v1.x-v2.x).toFixed(2);
            let diffY=(v1.y-v2.y).toFixed(2);
            questionArea.innerHTML=`Subtract \\(\\langle ${v2.x.toFixed(1)}, ${v2.y.toFixed(1)} \\rangle\\) from \\(\\langle ${v1.x.toFixed(1)}, ${v1.y.toFixed(1)} \\rangle\\).`;
            window.correctAnswer={
                correct: `<${diffX}, ${diffY}>`,
                alternate: `\\langle ${diffX}, ${diffY} \\rangle`,
            };
            break;
        }
        case "parametric_to_cartesian":{
            let x0=(Math.random()*10-5).toFixed(1);
            let y0=(Math.random()*10-5).toFixed(1);
            let dir=generateNonZeroXVector();
            let slope=(dir.y/dir.x).toFixed(2);
            questionArea.innerHTML=`The line is given by the parametric equations \\(x=${x0}+${dir.x.toFixed(1)}t\\) and \\(y=${y0}+${dir.y.toFixed(1)}t\\). Convert these into a single Cartesian equation.`;
            let yIntercept=(parseFloat(y0)-parseFloat(slope)*parseFloat(x0)).toFixed(2);
            window.correctAnswer={
                correct: `y=${slope}x+${yIntercept}`,
                alternate: `y=${slope}(x-${x0})+${y0}`,
            };
            break;
        }
        default:
            questionArea.innerHTML="Unknown question type.";
    }
    if (window.MathJax&&window.MathJax.typeset){
        window.MathJax.typeset();
    }
}