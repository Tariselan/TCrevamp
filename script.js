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
const attacks = {
    0: new Attack(0, "Punch", 2, 0.9),
    1: new Attack(1, "Bite", 4, 0.5),
    2: new Attack(2, "Kick", 3, 0.8),
    3: new Attack(3, "Scratch", 1, 1)
}

const enemies = {
    0: new Enemy(0, "Test Enemy", 20, [attacks.punch]),
    1: new Enemy(1, "Drunk Man", 45, [attacks.punch, attacks.bite]),
    2: new Enemy(2, "Wild Dog", 10, [attacks.bite, attacks.scratch])
}

const materials = {
    0: new Material(0, "Coins", 0, 0),
    1: new Material(1, "Wood", 0, 0),
    2: new Material(2, "Stone", 0, 0)
}

// the rest ig lol
var player = {
    name: "Freya",
    attacks: [attacks.punch],
    inventory: [],
    totHP: 100,
    curHP: 100
}

const pronouns = [
    "(she/her)",
    "(he/him)",
    "(they/them)"
];

let currentpronouns = 0; // 0 == she/her, 1 = they/them, 2 = 
document.getElementById("playerpronouns").addEventListener("click", function changepronouns() {
    currentpronouns = (currentpronouns + 1) % pronouns.length;
    document.getElementById("playerpronouns").innerText = pronouns[currentpronouns];
})

let unlockables = new Map([
    ["woken_up?", false],
    ["basic_resources", true],
    ["battle", false]
]);

let modes = new Map([
    ["devtools", false],
    ["ACCESSIBILITY_MODE", false],
    ["battle", false]
])

let currentEnemy = {
    "id": 0,
    "totHP": 100,
    "curHP": 100
}
// loading functions

const loadEnemy = (enemyId) => {
    let placeholder = enemies[enemyId];
    for (let i = 0; i < document.getElementsByClassName("enemyName").length; i++) {
        document.getElementsByClassName("enemyName")[i].innerHTML = placeholder.name;
    }
    document.getElementsByClassName("EtotHP")[0].innerHTML = placeholder.totHP;
    document.getElementsByClassName("EcurHP")[0].innerHTML = placeholder.totHP;
}


const loadBattle = () => {
    currentEnemy.id = Math.round(Math.random()*(Object.keys(enemies).length-2)+1);
    loadEnemy(currentEnemy.id);
}

// functions

const playerattack = (attackId) => {
    let currentAttack = attacks[attackId];
}

const enemyattack = (attackId) => {
    let currentAttack = attacks[attackId];
}

const wakeup = () => {
    function animation0() {
        document.getElementById("storytext_div").style.opacity = 0;
        setTimeout(animation1, 1200)
    }
    
    function animation1() {
        document.getElementById("actions").style.opacity = 1;
        document.getElementById("stats").style.opacity = 1;
        setTimeout(animation2(), 2400);
    }
    function animation2() {
        document.getElementById("materialstats").style.opacity = 1;
        document.getElementById("materialstats").style.height = "160px";
    }
    document.getElementById("wakeupbutton").remove();
    unlockables.set("woken_up?", true);
    animation0();
}
document.getElementById("wakeupbutton").addEventListener("click", function run() {
    wakeup()
})

const ACCESSIBILY_MODE = () => {
    if (!modes.get("ACCESSIBILITY_MODE")){
        document.body.style.fontFamily = "'Courier New', Courier, monospace";
        document.querySelectorAll('.button').forEach(button => {
            button.style.fontFamily = "'Courier New', Courier, monospace";
            modes.set("ACCESSIBILITY_MODE", true);
        })
    }
    else{
        document.body.style.fontFamily = "'Times New Roman', Times, serif";
        document.querySelectorAll('.button').forEach(button => {
            button.style.fontFamily = "Arial, Helvetica, sans-serif";
            modes.set("ACCESSIBILITY_MODE", false);
        })
    }
}

document.getElementById("Battlemode").addEventListener("click", function Battlemode() {
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
})

// Saving and loading
function save() {
    let save = {
        // saves amount of materials and how much per second
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
        // saves name of player
        name: player.name,
        unlockables: {
            woken_up: unlockables.get("woken_up?"),
            basic_resources: unlockables.get("basic_resources"),
            battle: unlockables.get("battle")
        }
    }
    try {
        // if successful, converts save variable into a JSON file and saves it to local storage as 'save'
        localStorage.setItem("save",JSON.stringify(save));
        alert("Saved Game")
        console.log("Saved game:");
        console.log(localStorage.save)
	} catch(err) {
		console.log('Cannot access localStorage - browser may be old or storage may be corrupt')
	}
}
document.getElementById("save_button").addEventListener("click", function run() {
    save();
})


function load() {
    // accesses localstorage and parses the save state
    let savegame = JSON.parse(localStorage.getItem("save"));
    try {
        localStorage.getItem("save");
        console.log("Loaded~ game:");
        console.log(localStorage.save)
        // changes player name to saved name :)
        if (typeof savegame.name !== "undefined"){
            player.name = savegame.name;
            document.querySelectorAll(".playerName").forEach(span => {
                span.innerText = savegame.name;
            });
        }
        unlockables.set("woken_up?", savegame.unlockables.woken_up)
	} catch(err) {
		console.log('Cannot access localStorage - browser may be old or storage may be corrupt')
	}
}

// DEV TOOLS

/*
   KEYBOARD NAVIGATION IN CODE
*/
document.body.addEventListener('keypress', function(event) {
    /*
    allows testers to quickly use certain functions via the keyboard
    note: letters are case sensitive, just to ensure it's intentional

    list of actions:
        - "~" => turns on dev mode
        - "B" => makes battle div visible and enables battling
        - "X" => loads battle
        - "!" => reset
    */
    if (event.key === '~') {
        modes.set("devtools", true);
        alert("dev mode on");
    }
    if (modes.get("devtools")) {
        if (event.key === 'B') {
            document.getElementsByClassName("fight")[0].style.opacity = 1;
            unlockables.set("battle", true);
            document.getElementById("Battlemode").title = "Battle";
            console.log("updated map:\n(Enabled battling)\n ");
            console.info(unlockables);
            console.log("\n======================================================")
        }
        if (event.key === 'X') {
            loadBattle();
        }
        if (event.key === '!') {
            let user_wants_to_reset = prompt("Are you sure you want to reset", "Yes");
            if (user_wants_to_reset == "Yes") {
                reset();
            }
        }
    }
    /*
    list of actions:
        - "w" => wakeup function
        - "A" => accessibility mode ON
        - "s" => save
    */
    if (event.key === "A") {
        ACCESSIBILY_MODE();
    }
    if (event.key === "s") {
        save();
    }
    if (event.key === "w") {
        wakeup();
    }
})


/*
Text imports around story and 
*/
import Texts from './JSON/text.json' assert {type: 'json'};
const story = Texts.story_entries;





// Loading + listeners

document.querySelectorAll(".playerName").forEach(span => {
    span.addEventListener("click", function changeName() {
        let newName = prompt("Choose your new name, player:", "Freya");
        player.name = newName;
        if (newName == "") {
            newName = "Freya";
        };
        document.querySelectorAll(".playerName").forEach(span => {
            span.innerText = newName;
        });
    });
});




document.body.onload = function bodyLoad() {
    document.getElementsByClassName("playerName")[0].innerText = player.name;
    document.getElementsByClassName("PcurHP")[0].innerHTML = player.totHP;
    document.getElementsByClassName("PtotHP")[0].innerHTML = player.totHP;
    document.getElementById("playerpronouns").innerText = pronouns[currentpronouns];

    function PlayMusic() {
        var play = document.getElementById("music");
        play.play();
    }
    document.body.addEventListener("click", function () {
        PlayMusic();
    });
    load();

    // check if player has woken up
    if (unlockables.get("woken_up?")) {
        wakeup()
    }
    // if player hasnt awoken
    if (!unlockables.get("woken_up?")) {
        document.getElementById("storytext_p").innerHTML = story[0];
    }
}



/*

DEFAULT FOR RESETTING PURPOSES

*/

const reset = () => {
    let save = {
        materials_amount: {
            coins: 0,
            wood: 0,
            stone: 0
        },
        materials_amountPS: {
            coins: 0,
            wood: 0,
            stone: 0
        },
        // saves name of player
        name: "Freya",
        unlockables: {
            woken_up: false,
            basic_resources: true,
            battle: false
        }
    }
    try {
        localStorage.setItem("save",JSON.stringify(save));
        alert("Game has been reset")
        console.log(save);
	} catch(err) {
		console.log('Cannot access localStorage - browser may be old or storage may be corrupt')
	}
}