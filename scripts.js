let mission = 1;
let xp = 0;
let rank = "Beginner";
let difficulty = "easy";

let site = { launched:false };

const codeArea = document.getElementById("code");
const highlight = document.getElementById("highlight");

codeArea.addEventListener("input", ()=>{
highlight.textContent = codeArea.value;
Prism.highlightElement(highlight);
});

document.getElementById("difficulty").onchange = e=>{
difficulty = e.target.value;
};

function gainXP(amount){
xp += amount;
if(xp>500) rank="Developer";
if(xp>1500) rank="Senior Dev";
if(xp>3000) rank="Architect";
document.getElementById("xp").innerText=xp;
document.getElementById("rank").innerText=rank;
}

function showAchievement(text){
let box=document.getElementById("achievement");
box.innerText=text;
box.classList.remove("hidden");
setTimeout(()=>box.classList.add("hidden"),3000);
}

function deploymentAnimation(){
let bar=document.getElementById("deployBar");
bar.classList.remove("hidden");
bar.style.width="100%";
setTimeout(()=>{
bar.style.width="0%";
bar.classList.add("hidden");
},2500);
}

function aiDuel(){
let duel=document.getElementById("duelBox");
duel.classList.remove("hidden");
let aiScore=Math.floor(Math.random()*100);
let playerScore=Math.floor(Math.random()*100);
duel.innerHTML=`AI Score: ${aiScore}<br>Your Score: ${playerScore}`;
if(playerScore>aiScore){
showAchievement("You won the coding duel!");
gainXP(200);
}
}

function runCode(){

let code = codeArea.value;

if(code.includes("launch_site()")){
deploymentAnimation();
showAchievement("Site Launched!");
gainXP(300);
site.launched=true;
}

if(code.includes("add_listing")){
gainXP(50);
}

if(code.length>20){
mission++;
gainXP(100);
}

if(mission%10===0){
showAchievement("Level Milestone!");
}

if(mission%15===0){
aiDuel();
}

document.getElementById("missionNum").innerText=mission;
}

function toggleTheme(){
if(document.body.classList.contains("neon")){
document.body.classList.remove("neon");
document.body.classList.add("dark");
}else{
document.body.classList.remove("dark");
document.body.classList.add("neon");
}
}

document.getElementById("xp").innerText=xp;
document.getElementById("rank").innerText=rank;
document.getElementById("missionNum").innerText=mission;
