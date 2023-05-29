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
    punch: new Attack(1, "Punch", 2, 0.9),
    bite: new Attack(2, "Bite", 4, 0.5),
    kick: new Attack(3, "Kick", 3, 0.8)
}

var enemies = {
    test: new Enemy(0, "Test Enemy", 20, [attacks.punch]),
    drunk: new Enemy(1, "Drunk Man", 45, [attacks.punch, attacks.bite])
}

// the rest ig lol
var player = {
    name: "Player",
    attacks: [attacks.punch],
    totHP: 100,
    curHP: 100
}


// Loading + listeners
document.body.onload = function bodyLoad() {
    document.getElementsByClassName("playerName")[0].innerText = player.name;
}

document.getElementsByClassName("playerName")[0].addEventListener("click", function changeName() {
    let newName = prompt("Choose your new name, player:", "Player");
    if (newName == "") {
        newName = "Player";
    }
    document.getElementsByClassName("playerName")[0].innerText = newName;
})