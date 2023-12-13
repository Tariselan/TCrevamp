// Classes
class Enemy {
    constructor(id, name, totHP, attacks) {
        this.id = id;
        this.name = name;
        this.totHP = totHP; // total
        this.curHP = totHP; // current
        this.attacks = attacks;
    }
}

class Attack {
    constructor(id, name, damage, accuracy) {
        this.id = id;
        this.name = name;
        this.damage = damage;
        this.accuracy = accuracy;
    }
}

class Material {
    constructor(id, name, amount, amount_per_second) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.amount_per_second = amount_per_second;
    }
}

// lists of things
var attacks = {
    0: new Attack(0, "Punch", 2, 0.9),
    1: new Attack(1, "Bite", 4, 0.5),
    2: new Attack(2, "Kick", 3, 0.8),
    3: new Attack(3, "Scratch", 1, 1)
}

var enemies = {
    0: new Enemy(0, "Test Enemy", 20, [attacks.punch]),
    1: new Enemy(1, "Drunk Man", 45, [attacks.punch, attacks.bite]),
    2: new Enemy(2, "Wild Dog", 10, [attacks.bite, attacks.scratch])
}

var materials = {
    0: new Material(0, "Coins", 0, 0),
    1: new Material(1, "Wood", 0, 0),
    2: new Material(2, "Stone", 0, 0)
}

// the rest ig lol
var player = {
    name: "Player",
    attacks: [attacks.punch],
    totHP: 100,
    curHP: 100
}
var unlockables = new Map([
    ["basic_resources", true],
    ["battle", false]
]);

var modes = new Map([
    ["devtools", false],
    ["battle", false]
])

var currentEnemy = {
    "id": 0,
    "totHP": 100,
    "curHP": 100
}
var turn = 1;
// loading functions
function loadEnemy(enemyId) {
    let placeholder = enemies[enemyId];
    for (let i = 0; i < document.getElementsByClassName("enemyName").length; i++) {
        document.getElementsByClassName("enemyName")[i].innerHTML = placeholder.name;
    }
    document.getElementsByClassName("EtotHP")[0].innerHTML = placeholder.totHP;
    document.getElementsByClassName("EcurHP")[0].innerHTML = placeholder.totHP;
}

function loadBattle() {
    currentEnemy.id = Math.round(Math.random()*(Object.keys(enemies).length-2)+1);
    loadEnemy(currentEnemy.id);
}

// functions

function playerattack(attackId) {
    let currentAttack = attacks[attackId];

    
}

function enemyattack(attackId) {
    let currentAttack = attacks[attackId];
}


function Battlemode() {
    if (!modes.get("battle") && unlockables.get("battle")) {
        loadBattle();
        modes.set("battle", true);
        document.getElementById("Battlemode").innerText = "Exit Battle";
        document.getElementsByClassName("Battlemode")[0].style.opacity = 1;
    }
    else {
        modes.set("battle", false);
        document.getElementById("Battlemode").innerText = "Enter Battle";
        document.getElementsByClassName("Battlemode")[0].style.opacity = 0;
    }
}


// Loading + listeners
document.body.onload = function bodyLoad() {
    document.getElementsByClassName("playerName")[0].innerText = player.name;
    document.getElementsByClassName("PcurHP")[0].innerHTML = player.totHP;
    document.getElementsByClassName("PtotHP")[0].innerHTML = player.totHP;

    function PlayMusic() {
        var play = document.getElementById("music");
        play.play();
    }
    document.body.addEventListener("click", function () {
        PlayMusic();
    });

    load();
}

document.querySelectorAll(".playerName").forEach(span => {
    span.addEventListener("click", function changeName() {
        let newName = prompt("Choose your new name, player:", "Player");
        player.name = newName;
        if (newName == "") {
            newName = "Player";
        };
        document.querySelectorAll(".playerName").forEach(span => {
            span.innerText = newName;
        });
    });
});


// Saving and loading

function save() {
    var save = {
        materials_amount: {
            coins: materials[0].amount,
            wood: materials[1].amount,
            stone: materials[2].amount
        },
        materials_amountPS: {
            coins: materials[0].amount_per_second,
            wood: materials[1].amount_per_second,
            stone: materials[2].amount_per_second
        },
        name: player.name,
    };
    localStorage.setItem("save",JSON.stringify(save));
    console.log("Game saved: ", save);
    alert('Game saved');
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.name !== "undefined") player.name = savegame.name;
    if (typeof savegame.name !== "undefined") document.querySelectorAll(".playerName").forEach(span => {
        span.innerText = savegame.name;
    });
}


// DEV TOOLS
document.body.addEventListener('keypress', function(event) {
    if (event.key === '~') {
        modes.set("devtools", true);
        alert("dev mode on");
    }
    if (modes.get("devtools")) {
        if (event.key === 'X') {
            loadBattle();
        }
        if (event.key === 'B') {
            document.getElementsByClassName("fight")[0].style.opacity = 1;
            unlockables.set("battle", true);
            document.getElementById("Battlemode").title = "Battle";
            console.log("updated map:\n(Enabled battling)\n ");
            console.info(unlockables);
            console.log("\n======================================================")
        }
        if (event.key === "M") {
            document.getElementById("materialstats").style.opacity = 1;
            document.getElementById("materialstats").style.height = "fit-content";
        }
    }
})
