// Classes
class Enemy {

    constructor(id
, name, totHP, attacks) {
        this.id = 
id;
        this.name 
= name;
        this.totHP
 = totHP; // total
        this.curHP
 = totHP; // current
        this.attac
ks = attacks;
    }

}

class Attack {

    constructor(id
, name, damage, accuracy) {
        this.id = 
id;
        this.name 
= name;
        this.damag
e = damage;
        this.accur
acy = accuracy;
    }

}

class Material {

    constructor(id
, name, amount, amount_per_second) {
        this.id = 
id;
        this.name 
= name;
        this.amoun
t = amount;
        this.amoun
t_per_second = amount_per_second;
    }

}

// lists of things
export var attacks = {
    0: new Attack(0, "Punch", 2, 0.9),
    1: new Attack(1, "Bite", 4, 0.5),
    2: new Attack(2, "Kick", 3, 0.8),
    3: new Attack(3, "Scratch", 1, 1)
}

export var enemies = {
    0: new Enemy(0, "Test Enemy", 20, [attacks.punch]),
    1: new Enemy(1, "Drunk Man", 45, [attacks.punch, attacks.bite]),
    2: new Enemy(2, "Wild Dog", 10, [attacks.bite, attacks.scratch])
}
