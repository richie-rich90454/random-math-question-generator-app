import * as Algebra from "./modules/algebra";
import * as Arithmetic from "./modules/arithmetic";
import * as Calculus from "./modules/calculus";
import * as DiscreteMathematics from "./modules/discreteMathematics";
import * as LinearAlgebra from "./modules/linearAlgebra";
import * as Trigonometry from "./modules/trigonometry";
import type {Topic} from "./types/global";
import * as math from "mathjs";
import {getCurrentWindow, type Window} from "@tauri-apps/api/window";
import {invoke} from "@tauri-apps/api/core";

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
let modeSingleBtn: HTMLButtonElement | null=document.getElementById("mode-single") as HTMLButtonElement | null;
let modeMentalBtn: HTMLButtonElement | null=document.getElementById("mode-mental") as HTMLButtonElement | null;
let mentalControls: HTMLElement | null=document.getElementById("mental-controls");
let singleControls: HTMLElement | null=document.getElementById("single-controls");
let difficultySelect: HTMLSelectElement | null=document.getElementById("difficulty-select") as HTMLSelectElement | null;
let timerDisplay: HTMLElement | null=document.getElementById("timer-display");
let scoreDisplay: HTMLElement | null=document.getElementById("score-display");
let startSessionBtn: HTMLButtonElement | null=document.getElementById("start-session") as HTMLButtonElement | null;

window.correctAnswer={correct: ""};
window.expectedFormat="";
let selectedTopic: string | null=null;
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

// Mental math state
let currentMode: 'single' | 'mental'='single';
let sessionActive: boolean=false;
let sessionScore={correct: 0, total: 0};
let sessionTimer: ReturnType<typeof setInterval> | null=null;
let timeLeft: number=30;
let maxQuestions: number=5;
let currentDifficulty: string='medium';

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
    // Generate immediately, no setTimeout
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
    if (!generateQuestionButton||!checkAnswerButton||!userAnswer||!themeToggle||!helpButton||!modeSingleBtn||!modeMentalBtn||!mentalControls||!singleControls||!difficultySelect||!timerDisplay||!scoreDisplay||!startSessionBtn) return;
    generateQuestionButton.addEventListener("click", generateQuestion);
    checkAnswerButton.addEventListener("click", checkAnswer);
    userAnswer.addEventListener("keyup", function (e: KeyboardEvent){
        if (e.shiftKey&&e.key==="Enter"){
            if (currentMode==='single') checkAnswer();
            else handleMentalAnswer();
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

    // Mode switching
    modeSingleBtn.addEventListener("click", function(){
        modeSingleBtn!.classList.add("active");
        modeMentalBtn!.classList.remove("active");
        currentMode='single';
        mentalControls!.style.display='none';
        singleControls!.style.display='flex';
        if (sessionActive) endMentalSession();
        updateUIState();
    });
    modeMentalBtn.addEventListener("click", function(){
        modeMentalBtn!.classList.add("active");
        modeSingleBtn!.classList.remove("active");
        currentMode='mental';
        mentalControls!.style.display='flex';
        singleControls!.style.display='none';
        updateUIState();
    });

    difficultySelect.addEventListener("change", function(e: Event){
        currentDifficulty=(e.target as HTMLSelectElement).value;
    });

    startSessionBtn.addEventListener("click", startMentalSession);
}
function updateMathJaxColors(): void{
    if (window.MathJax&&window.MathJax.typesetPromise){
        window.MathJax.typesetPromise().catch((_err: any)=>console.log("MathJax re-render error:", _err));
    }
}

// Mental math functions
function startMentalSession(): void{
    if (!selectedTopic){
        showNotification("Please select a topic first", "warning");
        return;
    }
    sessionActive=true;
    sessionScore={correct: 0, total: 0};
    timeLeft=30;
    updateScoreDisplay();
    startTimer();
    disableTopicSelection(true);
    generateNextMentalQuestion();
}
function generateNextMentalQuestion(): void{
    if (!selectedTopic) return;
    if (!questionArea||!userAnswer||!checkAnswerButton) return;
    if (answerResults){
        answerResults.innerHTML=`<div class="empty-state">...</div>`;
    }
    questionArea.innerHTML=`
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Generating...</p>
    </div>
  `;
    switch (selectedTopic){
        case "add": Arithmetic.generateAddition(currentDifficulty); break;
        case "subtrt": Arithmetic.generateSubtraction(currentDifficulty); break;
        case "mult": Arithmetic.generateMultiplication(currentDifficulty); break;
        case "divid": Arithmetic.generateDivision(currentDifficulty); break;
        case "root": Algebra.generateRoot(currentDifficulty); break;
        case "deri": Calculus.generateDerivative(currentDifficulty); break;
        case "inte": Calculus.generateIntegral(currentDifficulty); break;
        case "mtrx": LinearAlgebra.generateMatrix(currentDifficulty); break;
        case "vctr": LinearAlgebra.generateVector(currentDifficulty); break;
        case "sin": Trigonometry.generateSin(currentDifficulty); break;
        case "cos": Trigonometry.generateCosine(currentDifficulty); break;
        case "tan": Trigonometry.generateTangent(currentDifficulty); break;
        case "cosec": Trigonometry.generateCosecant(currentDifficulty); break;
        case "sec": Trigonometry.generateSecant(currentDifficulty); break;
        case "cot": Trigonometry.generateCotangent(currentDifficulty); break;
        case "log": Algebra.generateLogarithm(currentDifficulty); break;
        case "exp": Algebra.generateExponent(currentDifficulty); break;
        case "fact": Algebra.generateFactorial(currentDifficulty); break;
        case "perm": DiscreteMathematics.generatePermutation(currentDifficulty); break;
        case "comb": DiscreteMathematics.generateCombination(currentDifficulty); break;
        case "prob": DiscreteMathematics.generateProbability(currentDifficulty); break;
        case "ser": Algebra.generateSeries(currentDifficulty); break;
        case "lim": Calculus.generateLimit(currentDifficulty); break;
        case "relRates": Calculus.generateRelatedRates(currentDifficulty); break;
        default: questionArea.innerHTML=`<div class="empty-state"><p>Unknown topic</p></div>`; return;
    }
    if (expectedFormatDiv&&window.expectedFormat){
        expectedFormatDiv.textContent="Expected format: "+window.expectedFormat;
    }
    userAnswer.disabled=false;
    userAnswer.focus();
    if (window.MathJax&&window.MathJax.typesetPromise){
        window.MathJax.typesetPromise([questionArea]).catch((err: any)=>console.log("MathJax typeset error:", err));
    }
}
function handleMentalAnswer(): void{
    if (!sessionActive) return;
    if (!userAnswer||!answerResults) return;
    let userInput=userAnswer.value.trim();
    if (!userInput){
        showNotification("Please enter an answer", "warning");
        return;
    }
    let correct=window.correctAnswer.correct;
    let alternate=window.correctAnswer.alternate;
    checkAnswerFast(userInput, correct, alternate).then(isCorrect=>{
        if (isCorrect) sessionScore.correct++;
        sessionScore.total++;
        updateScoreDisplay();
        if (answerResults){
            answerResults.innerHTML=isCorrect
                ? `<div class="result-success">✅ Correct!</div>`
                : `<div class="result-error">❌ Incorrect. The answer was ${correct}</div>`;
        }
        if (userAnswer) userAnswer.value="";
        if (sessionScore.total>=maxQuestions){
            endMentalSession();
        }
        else{
            timeLeft=30;
            updateTimerDisplay();
            generateNextMentalQuestion();
        }
    });
}
async function checkAnswerFast(userInput: string, correct: string, alternate?: string): Promise<boolean>{
    if (window.__TAURI__){
        try{
            return await invoke('check_math', {userExpr: userInput, correctExpr: correct});
        }
        catch (e){
            console.warn("Rust check failed, falling back to JS", e);
        }
    }
    return isAnswerCorrect(userInput, correct, alternate);
}
function endMentalSession(): void{
    sessionActive=false;
    if (sessionTimer) clearInterval(sessionTimer);
    disableTopicSelection(false);
    if (userAnswer) userAnswer.disabled=true;
    if (checkAnswerButton) checkAnswerButton.disabled=true;
    showNotification(`Session finished! Score: ${sessionScore.correct}/${sessionScore.total}`, 'info');
    promptSaveScore();
}
function promptSaveScore(): void{
    if (!window.__TAURI__){
        let scores=JSON.parse(localStorage.getItem('leaderboard')||'[]');
        scores.push({
            topic: selectedTopic,
            score: sessionScore.correct,
            total: sessionScore.total,
            difficulty: currentDifficulty,
            date: new Date().toISOString()
        });
        localStorage.setItem('leaderboard', JSON.stringify(scores));
        showNotification('Score saved locally!', 'info');
    }
    else{
        invoke('save_score', {
            entry: {
                topic: selectedTopic,
                score: sessionScore.correct,
                total: sessionScore.total,
                difficulty: currentDifficulty,
                date: new Date().toISOString()
            }
        }).then(()=>showNotification('Score saved!', 'info'))
          .catch(_err=>showNotification('Failed to save score', 'warning'));
    }
}
function startTimer(): void{
    if (sessionTimer) clearInterval(sessionTimer);
    sessionTimer=setInterval(()=>{
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft<=0){
            if (sessionActive){
                sessionScore.total++;
                updateScoreDisplay();
                showNotification('Time is up!', 'warning');
                if (sessionScore.total>=maxQuestions){
                    endMentalSession();
                }
                else{
                    timeLeft=30;
                    updateTimerDisplay();
                    generateNextMentalQuestion();
                }
            }
        }
    }, 1000);
}
function updateTimerDisplay(): void{
    if (!timerDisplay) return;
    let mins=Math.floor(timeLeft/60);
    let secs=timeLeft%60;
    timerDisplay.textContent=`⏱️ ${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}
function updateScoreDisplay(): void{
    if (!scoreDisplay) return;
    scoreDisplay.textContent=`✅ ${sessionScore.correct} / ${sessionScore.total}`;
}
function disableTopicSelection(disabled: boolean): void{
    document.querySelectorAll(".topic-pill").forEach(el=>{
        (el as HTMLButtonElement).disabled=disabled;
    });
}
if (document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", initApp);
}
else{
    initApp();
}