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
    increase_amount(n) {
        if (n === undefined) {
            n = 1;
        }
        this.amount = this.amount + n;
        document.getElementById(this.name.toString()).innerText = this.amount
        return this.amount;
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

var materials = {
    0: new Material(0, "Coins", 1, 0),
    1: new Material(1, "Wood", 0, 0),
    2: new Material(2, "Stone", 0, 0),
    99: new Material("", "Contemplations", 0, 0) 
}

const coin_button = document.getElementById("collect_coin");
coin_button.addEventListener("click", function(){
    materials[0].increase_amount();
})

console.log(Material.prototype) // testing :3

// the rest ig lol
var player = {
    name: "Freya",
    currentpronouns: 0, // 0 == she/her, 1 = they/them, 2 = he/him
    attacks: [attacks.punch],
    inventory: [],
    totHP: 100,
    curHP: 100,
    has_played: false,
    first_played: 0
}

const pronouns = [
    "(she/her)",
    "(they/them)",
    "(he/him)"
];

 
document.getElementById("playerpronouns").addEventListener("click", function changepronouns() {
    player.currentpronouns = (player.currentpronouns + 1) % pronouns.length;
    document.getElementById("playerpronouns").innerText = pronouns[player.currentpronouns];
})

let unlockables = new Map([
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
    const fadeIn = (elementId, opacity = 1) => {
        const element = document.getElementById(elementId);
        element.style.opacity = opacity;
    };

    const moveElement = (elementId, topValue) => {
        const element = document.getElementById(elementId);
        element.style.top = `${topValue}px`;
    };

    const increaseElementHeight = (elementId, heightValue) => {
        const element = document.getElementById(elementId);
        element.style.height = `${heightValue}px`;
    };

    const removeElement = (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.remove();
        }
    };

    const fadeInWithDelay = (elementId, opacity, delay) => {
        setTimeout(() => fadeIn(elementId, opacity), delay);
    };

    const moveElementWithDelay = (elementId, topValue, delay) => {
        setTimeout(() => moveElement(elementId, topValue), delay);
    };

    const increaseElementHeightWithDelay = (elementId, heightValue, delay) => {
        setTimeout(() => increaseElementHeight(elementId, heightValue), delay);
    };

    removeElement("getupbutton");

    unlockables.set("gotten_up", true);

    fadeInWithDelay("storytext_div", 0, 0);
    fadeInWithDelay("actions", 1, 1200);
    fadeInWithDelay("stats", 1, 1200);
    moveElementWithDelay("storytext_div", 100, 2400);
    fadeInWithDelay("materialstats", 1, 2400);
    increaseElementHeightWithDelay("materialstats", 160, 2400);
    fadeInWithDelay("inventory", 1, 4800);
    increaseElementHeightWithDelay("inventory", 70, 4800);

    PlayMusic();
    narration.pause();
};


function toggleDivOpacity(n) {
    let text_div = ['storytext_div', 'journaltext_div'];
    var div = document.getElementById(text_div[n]);
    div.style.opacity = (div.style.opacity === '0') ? '1' : '0';
    if (div.style.display === "visible") {
        setTimeout();
    }
}

document.getElementById("getupbutton").addEventListener("click", function run() {
    getup()
})

const ACCESSIBILITY_MODE  = () => {
    if (!modes.get("ACCESSIBILITY_MODE")){
        document.body.style.fontFamily = "'Helvetica', Sans-Serif";
        document.querySelectorAll('.button').forEach(button => {
            button.style.fontFamily = "'Helvetica', Sans-Serif";
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
            stone: materials[2].amount,
            contemplations: materials[99].amount
        },
        materials_amountPS: {
            coins: materials[0].amount_per_second,
            wood: materials[1].amount_per_second,
            stone: materials[2].amount_per_second,
            contemplations: materials[99].amount_per_second
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


document.getElementById("contemplate").addEventListener("click", function() {
    let sound = new Audio("sound_files/sound_effects/contemplate.mp3");
    sound.volume = 0.1;
    const contemplation = document.createElement("div");
    contemplation.id = "contemplation"
    document.getElementsByClassName("main")[0].appendChild(contemplation);
    contemplation.style.position = "relative";
    contemplation.style.left = "55px"
    contemplation.style.width = "300px";
    contemplation.style.height = "fit-content";
    contemplation.style.backgroundColor = "#333";
    contemplation.style.padding = "5px";
    contemplation.style.color = "#DDD";
    contemplation.style.border = "10px solid #222";
    contemplation.style.borderRadius = "5px";
    contemplation.style.textAlign = "center";
    const title = document.createElement("h3");
    title.innerText = "Contemplation";
    contemplation.appendChild(title);
    const innertext = document.createElement("p");

    innertext.innerHTML = Texts.contemplations[materials[99].amount];
    console.log(materials[99].amount);
    contemplation.addEventListener("mouseover", function() {
        sound.play();
        contemplation.remove();
    })
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
        //
        document.getElementById("Coins").innerText = savegame.materials_amount.coins;
        document.getElementById("Wood").innerText = savegame.materials_amount.wood;
        document.getElementById("Stone").innerText = savegame.materials_amount.stone;
        materials[""].amount = savegame.materials_amount.contemplations;
        //
        player.first_played = savegame.player_attributes.first_played;
        player.has_played = savegame.player_attributes.has_played;
        unlockables.set("gotten_up", savegame.unlockables.gotten_up);
        unlockables.set("basic_resources", savegame.unlockables.basic_resources);
        unlockables.set("battle", savegame.unlockables.battle);
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
        if (event.key === '$') {
            toggleDivOpacity(0);
        };
    }
    /*
    list of actions:
        - "g" => getup function
        - "A" => accessibility mode ON
        - "s" => save
        - "n" => next lol
    */
    if (event.key === "A") {
        ACCESSIBILITY_MODE ();
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
let story_location = [story_entry_number, entry_part_number];


function NEXT() {
    let page_turn = new Audio("sound_files/sound_effects/pageTurn.mp3");
    page_turn.volume = 1;
    page_turn.play();

    let amount_of_parts = story[story_entry_number].length - 1;

    if (entry_part_number < amount_of_parts) {
        entry_part_number++;
        story_location = [story_entry_number, entry_part_number];
        document.getElementById("storytext_p").innerText = story[story_location[0]][story_location[1]];
        if (entry_part_number == amount_of_parts) {
            /*
            listen, i know this conditional is here in two locations. but if
            i move it down into the block with the other conditional, the code
            just fucking breaks :((
            */

            document.getElementById("getupbutton").style.visibility = "visible";
            document.getElementById("next_part_button").style.visibility = "hidden";
        }
    } else if (entry_part_number == amount_of_parts) {
        entry_part_number = 0;
        story_entry_number++;
        story_location = [story_entry_number, entry_part_number];
        document.getElementById("storytext_p").innerText = story[story_location[0]][story_location[1]];
    }
}

function STORY_READ_ALOUD() {
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
    document.getElementById("playerpronouns").innerText = pronouns[player.currentpronouns];

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
const narration_story_PATH = "sound_files/narration/story_entries/"
let narration = new Audio();
narration.src = narration_story_PATH + story_entry_number.toString() + "/" + narration_story[0];
function playNarration() {
    narration.play();
    window.removeEventListener("focus", playNarration)
}
window.addEventListener("focus", playNarration)

const music = document.getElementById("music");
music.volume = 0.05;
function PlayMusic() {
    music.play();
}

// DEFAULT FOR RESETTING PURPOSES
const reset = () => {
    let save = {
        materials_amount: {
            coins: 1,
            wood: 0,
            stone: 0,
            contemplations: 0
        },
        materials_amountPS: {
            coins: 0,
            wood: 0,
            stone: 0,
            contemplations: 0
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
