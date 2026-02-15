const canvas = document.getElementById("bakuMap");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let step = 0;
const story = [
    { title: "Son Zəng", desc: "SF90-ı Rentacardan götür.", char: "İşçi", text: "Bu maşın xüsusidir, loqosuzdur. İmzala və çıx.", money: 5000 },
    { title: "Məktəb Yolu", desc: "Ağ Şəhər (White City) tərəfə sür.", char: "Yusif", text: "Leyla, maşına bax! Bu gün bizim günümüzdür.", money: 5000 },
    { title: "TƏLƏ!", desc: "Qara maşınlar yolu kəsdi!", char: "Maskalı Adam", text: "Maşından düş! Qız bizimlə gəlir!", money: 5000 },
    { title: "Ata Oyanır", desc: "Hakerin yanına get.", char: "Ata", text: "Oğlumu tapmalıyam... Haker, haradadırlar?!", money: 4500 }
];

function nextStep() {
    step++;
    if(step < story.length) {
        updateUI();
    } else {
        alert("Böyük Seçim Vaxtı: POLİS yoxsa BANK? (Tezliklə...)");
        location.reload();
    }
}

function updateUI() {
    document.getElementById("mission-title").innerText = story[step].title;
    document.getElementById("mission-desc").innerText = story[step].desc;
    document.getElementById("char-name").innerText = story[step].char + ":";
    document.getElementById("char-text").innerText = story[step].text;
    document.getElementById("money").innerText = story[step].money;
}

// Bakı küçələrini simulyasiya edən sadə vizual effekt (Cyberpunk vibe)
function drawBaku() {
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i<20; i++) {
        ctx.strokeStyle = "#00f2ff";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(Math.random()*canvas.width, Math.random()*canvas.height, 100, 200);
    }
    requestAnimationFrame(drawBaku);
}
drawBaku();
