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
])


var battlemode = false;
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
    if (!battlemode && unlockables.get("battle")) {
        loadBattle();
        battlemode = true;
        document.getElementById("Battlemode").innerText = "Exit";
        document.getElementsByClassName("Battlemode")[0].style.opacity = 1;
    }
    else {
        battlemode = false;
        document.getElementById("Battlemode").innerText = "Enter";
        document.getElementsByClassName("Battlemode")[0].style.opacity = 0;
    }
}


// Loading + listeners
document.body.onload = function bodyLoad() {
    document.getElementsByClassName("playerName")[0].innerText = player.name;
    document.getElementsByClassName("PcurHP")[0].innerHTML = player.totHP;
    document.getElementsByClassName("PtotHP")[0].innerHTML = player.totHP;
}

document.getElementsByClassName("playerName")[0].addEventListener("click", function changeName() {
    let newName = prompt("Choose your new name, player:", "Player");
    if (newName == "") {
        newName = "Player";
    }
    document.getElementsByClassName("playerName")[0].innerText = newName;
})

document.addEventListener



// DEV TOOLS
document.body.addEventListener('keypress', function(event) {
    if (event.key === 'b') {
        loadBattle();
    }
    if (event.key === 'B') {
        unlockables.set("battle", true);
    }
})