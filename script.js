var player = {
    name: "Player",
    actions: {

    }
}
var enemies = {
    test: Enemy("Test Enemy", 20, punch)
}

var attacks = {
    punch: Attack("Punch", 2, 0.75)
}

function Enemy(name, totHP, attack1) {
    this.name = name;
    this.totHP = totHP;
    this.attack1 = attack1;
}

function Attack(name, damage, accuracy) {
    this.name = name;
    this.damage = damage;
    this.accuracy = accuracy;
}