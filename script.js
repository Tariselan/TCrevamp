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
    0: new Material(0, "Coins", 1, 0),
    1: new Material(1, "Wood", 0, 0),
    2: new Material(2, "Stone", 0, 0)
}

// the rest ig lol
var player = {
    name: "Freya",
    attacks: [attacks.punch],
    inventory: [],
    totHP: 100,
    curHP: 100,
    has_played: false,
    first_played: 0
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
    ["has_played", false],
    ["gotten_up", false],
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

const getup = () => {
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
    document.getElementById("getupbutton").remove();
    unlockables.set("gotten_up", true);
    animation0();
    PlayMusic();
}
document.getElementById("getupbutton").addEventListener("click", function run() {
    getup()
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
        player_attributes: {
            name: player.name,
            has_played: player.has_played,
            first_played: player.first_played
        },
        unlockables: {
            gotten_up: unlockables.get("gotten_up"),
            basic_resources: unlockables.get("basic_resources"),
            battle: unlockables.get("battle")
        }
    }
    try {
        // if successful, converts save variable into a JSON file and saves it to local storage as 'save'
        localStorage.setItem("save",JSON.stringify(save));
        alert("Saved Game")
        console.log("Saved game:");
        console.log(JSON.parse(localStorage.save));
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
        console.log("Loaded game:");
        console.log(savegame)
        // changes player name to saved name :)
        if (typeof savegame.player_attributes.name !== "undefined"){
            player.name = savegame.player_attributes.name;
            document.querySelectorAll(".playerName").forEach(span => {
                span.innerText = savegame.player_attributes.name;
            });
        }
        player.first_played = savegame.player_attributes.first_played;
        player.has_played = savegame.player_attributes.has_played;
        unlockables.forEach (function(key) {
            unlockables.set(key, savegame.unlockables[key])
        })
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
        - "g" => getup function
        - "A" => accessibility mode ON
        - "s" => save
        - "n" => next lol
    */
    if (event.key === "A") {
        ACCESSIBILY_MODE();
    }
    if (event.key === "s") {
        save();
    }
    if (event.key === "g") {
        getup();
    }
    if (event.key === "n") {
        NEXT();
    }
})


/*
Text imports around story and 
*/
import Texts from './JSON/text.json' assert {type: 'json'};
const story = Texts.story_entries;

/*
story_entry_number stores which story entry the player is up to, 0 is the introduction

entry_part_number stores which part of the story entry they're up to, the intro being split into 3 parts (0,1,2) respectively
*/

var story_entry_number = 0;
var entry_part_number = 0;

var story_location = [story_entry_number, entry_part_number];

function NEXT() {
    let amount_of_parts = story[story_entry_number].length - 1;
    if (entry_part_number < amount_of_parts) {
        entry_part_number++;
        story_location = [story_entry_number, entry_part_number];
        document.getElementById("storytext_p").innerText = story[story_location[0]][story_location[1]];
        if (entry_part_number == (amount_of_parts)) {
            /*
            listen, i know this conditional is here in two locations. but if
            i move it down into the block with the other conditional, the code
            just fucking breaks :((
            */
            document.getElementById("getupbutton").style.visibility = "visible";
            document.getElementById("next_part_button").style.visibility = "hidden";
        }
    }   
    else if (entry_part_number == amount_of_parts) {
        entry_part_number = 0;
        story_entry_number++;
        story_location = [story_entry_number, entry_part_number];
        document.getElementById("storytext_p").innerText = story[story_location[0]][story_location[1]];
    }
    narration.src = narration_story_PATH + story_entry_number.toString() + "/" + narration_story[entry_part_number];
    narration.play();
    console.log(narration_story_PATH + story_entry_number.toString() + "/" + narration_story[entry_part_number]);
}

document.getElementById("next_part_button").addEventListener("click", function(){
    NEXT();
})


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

    
    load();

    // check if player has gotten up
    if (unlockables.get("gotten_up")) {
        getup();
        
    }
    else if (!unlockables.get("gotten_up")) {
        document.getElementById("storytext_p").innerText = story[story_location[0]][story_location[1]];
    }

    if(!player.has_played) {
        player.has_played = true;
    }
}
var narration_story = ["0.mp3", "1.mp3", "2.mp3"];
const narration_story_PATH = "/narration/story_entries/"
let narration = new Audio();
narration.src = narration_story_PATH + story_entry_number.toString() + "/" + narration_story[0];

window.addEventListener("focus", function() {
    narration.play();
})
const music = document.getElementById("music");
music.volume = 0.05;
function PlayMusic() {
    music.play();
}


/*

DEFAULT FOR RESETTING PURPOSES

*/

const reset = () => {
    let save = {
        materials_amount: {
            coins: 1,
            wood: 0,
            stone: 0
        },
        materials_amountPS: {
            coins: 0,
            wood: 0,
            stone: 0
        },
        // saves name of player
        player_attributes: {
            name: "Freya",
            has_played: false,
            first_played: 0
        },
        unlockables: {
            gotten_up: false,
            basic_resources: true,
            battle: false
        }
    }
    try {
        localStorage.setItem("save",JSON.stringify(save));
        alert("Game has been reset");
        location.reload();
        console.log(save);
	} catch(err) {
		console.log('Cannot access localStorage - browser may be old or storage may be corrupt')
	}
}
