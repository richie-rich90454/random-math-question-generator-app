import * as Algebra from "./modules/algebra";
import * as Arithmetic from "./modules/arithmetic";
import * as Calculus from "./modules/calculus";
import * as DiscreteMathematics from "./modules/discreteMathematics";
import * as LinearAlgebra from "./modules/linearAlgebra";
import * as Trigonometry from "./modules/trigonometry";
import type {Topic} from "./types/global";
import * as math from "mathjs";
import {getCurrentWindow, type Window} from "@tauri-apps/api/window";

export let questionArea: HTMLElement | null=document.getElementById("question-area");
let topicGrid: HTMLElement | null=document.getElementById("topic-grid");
let currentTopicDisplay: HTMLElement | null=document.getElementById("current-topic");
let generateQuestionButton: HTMLButtonElement | null=document.getElementById("genQ") as HTMLButtonElement | null;
let userAnswer: HTMLTextAreaElement | null=document.getElementById("answer-box") as HTMLTextAreaElement | null;
let answerResults: HTMLElement | null=document.getElementById("answer-results");
let checkAnswerButton: HTMLButtonElement | null=document.getElementById("check-answer") as HTMLButtonElement | null;
let themeToggle: HTMLButtonElement | null=document.getElementById("theme-toggle") as HTMLButtonElement | null;
let helpButton: HTMLButtonElement | null=document.getElementById("help-button") as HTMLButtonElement | null;
let expectedFormatDiv: HTMLElement | null=document.getElementById("expected-format");
window.correctAnswer={correct: ""};
window.expectedFormat="";
let selectedTopic: string | null=null;
let questionTimeout: ReturnType<typeof setTimeout>;
let topics: Topic[]=[
{id: "add", name: "Addition", icon: "+", category: "Arithmetic"},
{id: "subtrt", name: "Subtraction", icon: "-", category: "Arithmetic"},
{id: "mult", name: "Multiplication", icon: "×", category: "Arithmetic"},
{id: "divid", name: "Division", icon: "÷", category: "Arithmetic"},
{id: "root", name: "Roots", icon: "√", category: "Algebra"},
{id: "deri", name: "Differentiation", icon: "∂", category: "Calculus"},
{id: "inte", name: "Integration", icon: "∫", category: "Calculus"},
{id: "mtrx", name: "Matrix Operations", icon: "[ ]", category: "Linear Algebra"},
{id: "vctr", name: "Vector Operations", icon: "→", category: "Linear Algebra"},
{id: "sin", name: "Sine", icon: "sin", category: "Trigonometry"},
{id: "cos", name: "Cosine", icon: "cos", category: "Trigonometry"},
{id: "tan", name: "Tangent", icon: "tan", category: "Trigonometry"},
{id: "cosec", name: "Cosecant", icon: "csc", category: "Trigonometry"},
{id: "sec", name: "Secant", icon: "sec", category: "Trigonometry"},
{id: "cot", name: "Cotangent", icon: "cot", category: "Trigonometry"},
{id: "log", name: "Logarithm", icon: "log", category: "Algebra"},
{id: "exp", name: "Exponential", icon: "eˣ", category: "Algebra"},
{id: "fact", name: "Factorial", icon: "!", category: "Algebra"},
{id: "perm", name: "Permutation", icon: "P", category: "Discrete Math"},
{id: "comb", name: "Combination", icon: "C", category: "Discrete Math"},
{id: "prob", name: "Probability", icon: "%", category: "Discrete Math"},
{id: "ser", name: "Series", icon: "Σ", category: "Algebra"},
{id: "lim", name: "Limits", icon: "lim", category: "Calculus"},
{id: "relRates", name: "Related Rates", icon: "dx/dt", category: "Calculus"}
];
let appWindow: Window | null=null;
try{
    appWindow=getCurrentWindow();
}
catch (e){
    console.log("Not running in Tauri environment, theme sync disabled.");
}
function applyTheme(theme: "light" | "dark"): void{
    let root=document.documentElement;
    if (theme==="dark"){
        root.classList.add("dark");
        root.classList.remove("light");
    }
    else{
        root.classList.add("light");
        root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
    updateMathJaxColors();
    if (appWindow){
        appWindow.setTheme(theme).catch(err=>console.log("Failed to set window theme:", err));
    }
}
async function initializeTheme(): Promise<void>{
    if (appWindow){
        try{
            let tauriTheme=await appWindow.theme();
            applyTheme(tauriTheme ?? "light");
            return;
        }
        catch (e){
            console.log("Failed to get Tauri theme, falling back.");
        }
    }
    let savedTheme=localStorage.getItem("theme");
    let prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme==="dark"||(!savedTheme&&prefersDark)){
        applyTheme("dark");
    }
    else{
        applyTheme("light");
    }
}
function initApp(): void{
    renderTopicGrid();
    setupEventListeners();
    initializeTheme();
    updateUIState();
}
function renderTopicGrid(): void{
    if (!topicGrid) return;
    topicGrid.innerHTML="";
    topics.forEach(topic=>{
        let topicElement=document.createElement("button");
        topicElement.className="topic-pill";
        topicElement.dataset.topicId=topic.id;
        topicElement.innerHTML=`
      <span class="topic-pill-icon">${topic.icon}</span>
      <span class="topic-pill-name">${topic.name}</span>
    `;
        topicElement.addEventListener("click", ()=>selectTopic(topic.id));
        topicGrid.appendChild(topicElement);
    });
}
function selectTopic(topicId: string): void{
    document.querySelectorAll(".topic-pill").forEach(item=>{
        item.classList.remove("active");
    });
    let selectedElement=document.querySelector(`[data-topic-id="${topicId}"]`);
    if (selectedElement){
        selectedElement.classList.add("active");
    }
    selectedTopic=topicId;
    let topic=topics.find(t=>t.id===topicId);
    if (currentTopicDisplay){
        currentTopicDisplay.textContent=topic?topic.name:"Select a topic to begin";
    }
    if (generateQuestionButton){
        generateQuestionButton.disabled=false;
    }
    updateUIState();
}
function generateQuestion(): void{
    if (!selectedTopic){
        showNotification("Please select a topic first", "warning");
        return;
    }
    if (!answerResults||!userAnswer||!questionArea||!checkAnswerButton) return;
    clearTimeout(questionTimeout);
    answerResults.innerHTML=`
    <div class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
      </svg>
      <p>Your results will appear here after checking your answer</p>
    </div>
  `;
    answerResults.className="results-display";
    userAnswer.value="";
    if (expectedFormatDiv) expectedFormatDiv.textContent="";
    questionArea.innerHTML=`
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Generating question...</p>
    </div>
  `;
    questionTimeout=setTimeout(()=>{
        if (!questionArea||!userAnswer||!checkAnswerButton) return;
        switch (selectedTopic){
            case "add":
                Arithmetic.generateAddition();
                break;
            case "subtrt":
                Arithmetic.generateSubtraction();
                break;
            case "mult":
                Arithmetic.generateMultiplication();
                break;
            case "divid":
                Arithmetic.generateDivision();
                break;
            case "root":
                Algebra.generateRoot();
                break;
            case "deri":
                Calculus.generateDerivative();
                break;
            case "inte":
                Calculus.generateIntegral();
                break;
            case "mtrx":
                LinearAlgebra.generateMatrix();
                break;
            case "vctr":
                LinearAlgebra.generateVector();
                break;
            case "sin":
                Trigonometry.generateSin();
                break;
            case "cos":
                Trigonometry.generateCosine();
                break;
            case "tan":
                Trigonometry.generateTangent();
                break;
            case "cosec":
                Trigonometry.generateCosecant();
                break;
            case "sec":
                Trigonometry.generateSecant();
                break;
            case "cot":
                Trigonometry.generateCotangent();
                break;
            case "log":
                Algebra.generateLogarithm();
                break;
            case "exp":
                Algebra.generateExponent();
                break;
            case "fact":
                Algebra.generateFactorial();
                break;
            case "perm":
                DiscreteMathematics.generatePermutation();
                break;
            case "comb":
                DiscreteMathematics.generateCombination();
                break;
            case "prob":
                DiscreteMathematics.generateProbability();
                break;
            case "ser":
                Algebra.generateSeries();
                break;
            case "lim":
                Calculus.generateLimit();
                break;
            case "relRates":
                Calculus.generateRelatedRates();
                break;
            default:
                questionArea.innerHTML=`<div class="empty-state"><p>Please select a topic to generate a question</p></div>`;
                return;
        }
        if (expectedFormatDiv&&window.expectedFormat){
            expectedFormatDiv.textContent="Expected format: "+window.expectedFormat;
        }
        userAnswer.disabled=false;
        checkAnswerButton.disabled=false;
        userAnswer.focus();
        updateUIState();
        if (window.MathJax&&window.MathJax.typesetPromise){
            window.MathJax.typesetPromise([questionArea]).catch((err: any)=>console.log("MathJax typeset error:", err));
        }
    }, 100);
}
function isAnswerCorrect(userInput: string, correct: any, alternate: any): boolean{
    const trimmedInput=userInput.replace(/\s+/g, "");
    const isValidNumber=(s: string): boolean=>{
        return /^-?\d*\.?\d+(?:[eE][-+]?\d+)?$/.test(s);
    };
    if (isValidNumber(trimmedInput)){
        let userNum=parseFloat(userInput);
        if (!isNaN(userNum)){
            let correctNum=parseFloat(correct);
            if (!isNaN(correctNum)&&Math.abs(userNum - correctNum) < 1e-8) return true;
            let altNum=parseFloat(alternate);
            if (!isNaN(altNum)&&Math.abs(userNum - altNum) < 1e-8) return true;
        }
    }
    const normalize=(input: string): string | number=>{
        let cleaned=input.replace(/°/g, "");
        try{
            let simplified=math.simplify(cleaned);
            if ((simplified as any).isConstantNode&&(simplified as any).value!=null){
                return parseFloat((simplified as any).value);
            }
            return simplified.toString();
        }
        catch (e){
            return cleaned.replace(/\s+/g, "").toLowerCase();
        }
    };
    let userNorm=normalize(userInput);
    let possible=[correct, alternate].filter(v=>v!==undefined);
    for (let ans of possible){
        let ansNorm=normalize(ans);
        if (userNorm===ansNorm) return true;
        if (typeof userNorm==="number"&&typeof ansNorm==="number"&&Math.abs(userNorm - ansNorm) < 1e-8) return true;
        if (typeof ans==="string"&&userInput.replace(/\s+/g, "").toLowerCase()===ans.replace(/\s+/g, "").toLowerCase()) return true;
    }
    return false;
}
function checkAnswer(): void{
    if (!selectedTopic){
        showNotification("Please select a topic and generate a question first", "warning");
        return;
    }
    if (!userAnswer||!answerResults) return;
    let userInput=userAnswer.value.trim();
    if (!userInput){
        showNotification("Please enter an answer before checking", "warning");
        return;
    }
    let correct=window.correctAnswer.correct;
    let alternate=window.correctAnswer.alternate;
    let isCorrect=isAnswerCorrect(userInput, correct, alternate);
    if (isCorrect){
        answerResults.innerHTML=`
      <div class="result-success">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <div>
          <h3>Correct!</h3>
          <p>The answer is <strong>${window.correctAnswer.correct}</strong></p>
        </div>
      </div>
    `;
        answerResults.className="results-display correct";
    }
    else{
        answerResults.innerHTML=`
      <div class="result-error">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
        <div>
          <h3>Incorrect</h3>
          <p>The correct answer is <strong>${window.correctAnswer.correct}</strong></p>
        </div>
      </div>
    `;
        answerResults.className="results-display incorrect";
    }
    userAnswer.value="";
    userAnswer.focus();
}
function updateUIState(): void{
    if (!generateQuestionButton||!checkAnswerButton||!questionArea) return;
    let hasTopic=selectedTopic!==null;
    let hasQuestion=questionArea.innerHTML.includes("mjx-container")||!questionArea.innerHTML.includes("empty-state");
    generateQuestionButton.disabled=!hasTopic;
    checkAnswerButton.disabled=!hasTopic||!hasQuestion;
    if (hasTopic&&hasQuestion){
        generateQuestionButton.innerHTML=`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
      New Question
    `;
    }
    else{
        generateQuestionButton.innerHTML=`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
      Generate Question
    `;
    }
}
function showNotification(message: string, type: "info" | "warning"="info"): void{
    let notification=document.createElement("div");
    notification.className=`notification notification-${type}`;
    notification.textContent=message;
    document.body.appendChild(notification);
    setTimeout(()=>{
        notification.classList.add("fade-out");
        setTimeout(()=>{
            if (notification.parentNode){
                notification.parentNode.removeChild(notification);
            }
    }, 300);
}, 3000);
}
function setupEventListeners(): void{
    if (!generateQuestionButton||!checkAnswerButton||!userAnswer||!themeToggle||!helpButton) return;
    generateQuestionButton.addEventListener("click", generateQuestion);
    checkAnswerButton.addEventListener("click", checkAnswer);
    userAnswer.addEventListener("keyup", function (e: KeyboardEvent){
        if (e.shiftKey&&e.key==="Enter"){
            checkAnswer();
        }
    });
    themeToggle.addEventListener("click", function (){
        let isDark=document.documentElement.classList.contains("dark");
        if (isDark){
            applyTheme("light");
        }
        else{
            applyTheme("dark");
        }
    });
    helpButton.addEventListener("click", function (){
        showNotification("Select a topic, generate a question, enter your answer, and check it!", "info");
    });
}
function updateMathJaxColors(): void{
    if (window.MathJax&&window.MathJax.typesetPromise){
        window.MathJax.typesetPromise().catch((err: any)=>console.log("MathJax re-render error:", err));
    }
}
let additionalStyles=document.createElement("style");
additionalStyles.textContent=`
  .category-title{
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: var(--spacing-md) 0 var(--spacing-sm) 0;
    padding-left: var(--spacing-sm);
  }
  .loading-state{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    color: var(--text-tertiary);
  }
  .spinner{
    width: 40px;
    height: 40px;
    border: 3px solid var(--border);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin{
    to{
      transform: rotate(360deg);
    }
  }
  .result-success, .result-error{
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    text-align: left;
  }
  .result-success svg{
    color: var(--success);
  }
  .result-error svg{
    color: var(--error);
  }
  .result-success h3, .result-error h3{
    margin: 0 0 4px 0;
    font-size: 1rem;
  }
  .result-success p, .result-error p{
    margin: 0;
    font-size: 0.9375rem;
    opacity: 0.9;
  }
  .notification{
    position: fixed;
    top: 20px;
    right: 20px;
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    max-width: 300px;
    animation: slideIn 0.3s ease;
    font-size: 0.9375rem;
    background: var(--surface);
    border: 1px solid var(--border);
  }
  .notification-info{
    border-left: 4px solid var(--primary);
  }
  .notification-warning{
    border-left: 4px solid var(--warning);
  }
  .notification.fade-out{
    opacity: 0;
    transform: translateX(100%);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  @keyframes slideIn{
    from{
      opacity: 0;
      transform: translateX(100%);
    }
    to{
      opacity: 1;
      transform: translateX(0);
    }
  }
  .spinner{
    border: 3px solid var(--border);
    border-top-color: var(--primary);
  }
  .expected-format {
    margin-top: var(--spacing-xs);
    font-size: 0.8rem;
    color: var(--text-tertiary);
    font-style: italic;
  }
`;
document.head.appendChild(additionalStyles);
if (document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", initApp);
}
else{
    initApp();
}