
// chance to hit based on enemy AC and any player modifiers (t/f)

function toHit (AC, modifier){
	var hitChance = Math.random().toFixed(1) * 20;
	return (hitChance + modifier) > AC;


}

/*
/ Potion constructor template


var Potion = function () {
	var privateMembers = {
		init : function (){

		},
		durability : 1
	};

	var publicMembers = {
		HPeffectMAX : 0,
		HPeffectMIN : 0,
		weight : 0,
		itemSlots : 0,
		modifier : 0
	};

	privateMembers.init();
	return publicMembers;

};

*/
var PoisonPotion = function (level){
	var publicMembers = {
		name: "Poison potion",
		doses: 1,
		used: 0,
		remaining : function(){
			return publicMembers.doses - publicMembers.used;
		},
			drink : function(){
				if (publicMembers.remaining){
					publicMembers.used ++;
					return HPCalc(publicMembers.HPeffectMIN, publicMembers.HPeffectMAX, publicMembers.modifier, publicMembers.level);
				}
				else {
					return false;
				}
			},
			HPeffectMAX : -10,
			HPeffectMIN : -2,
			weight : 1,
			itemSlots : 1,
			modifier : 0,
			level : level || 1
	};

	return publicMembers;
};

var TestItem = function (level){
	var publicMembers = {
		name: "Test Item",
		doses: 1,
		};

	return publicMembers;
};

var testItem1 = new TestItem();
var testItem2 = {
	name: "monkey"
};

function HPCalc (min, max, modifier, level){
	if (max < min){
		var swap = min;
		min = max;
		max = swap;
	}

	var points = Math.round((Math.random().toFixed(1) * (max - min) ) + min);
     if (points > min){
		return (points * level) + modifier;

		}
	else {
	return (min * level) + modifier;
	}

}



/*
// health Potion
var healthPotion = new Potion();
healthPotion.weight = 1;
healthPotion.itemSlots = 1;
healthPotion.HPeffectMAX = 10;
healthPotion.HPeffectMIN = 2;

*/

// subtract HPCalc from HP to represent damage, add to HP to represent healing



// loot generator
//calcLoot determines the amount of general loot per chest

function calcAmount (level, size, modifier){

	var amount = Math.round((Math.random().toFixed(1)) * level * size * modifier);
	return amount;
}

// the calcAmount is called each time to not have results be as uniform as 100, 10, 1
function calcLoot (level, size, modifier){


	var gold = calcAmount(level, size, modifier) * 10;
	var items = calcAmount(level, size, modifier);
	var itemsRare = Math.round(calcAmount(level, size, modifier) * 0.05);

  	var loot = [gold, items, itemsRare];

	return loot;
}


// select items to add to inventory
function lootSelect (loot, Character){

var items = loot[1];
var itemsRare = loot[2];

	Character.goldAdd(loot[0]);

	while (items > 0, items --){
		// define itemSelector -- somehting to randomly select items from a matrix and return them by name
		Character.inventoryAdd(itemSelector(items));
	}

	while (itemsRare > 0, itemsRare --){
		// define itemSelector -- somehting to randomly select items from a matrix and return them by name
		Character.inventoryAdd(itemSelector(itemsRare));
	}
};


// Character prototype
var Character = function (options){
	var privateMembers = {
		inventory : []
	};
	var publicMembers = {
		name : name || "Default",
		id : 0,
		race : human,
		type : fighter,
		exp: 0,
      	level : function (exp){
          	exp = settings.exp;
			level = settings.level = Math.floor(exp/100) + 1;
          	return level;
		},
		gold: 0,
		goldAdd : function(qty){
				settings.gold = settings.gold + qty;


		},
		HitPoints : 10,
		HitPointsMax : 10,
		TemporaryHitPoints : 0,
		itemSlotsAvail : 100,
		weight : 200,
		inventoryFull : function(){
			if (settings.itemSlotsAvail <= 0){
				return ("inventory full");
			}
		},

		inventoryShow : function(){

					return privateMembers.inventory.slice(0);
		},

		inventoryAdd : function(item) {
				if (item === undefined) {
					return privateMembers.inventory.slice(0);
				}
				if (privateMembers.inventory.length < settings.itemSlotsAvail){
					privateMembers.inventory.push(item);
					settings.itemSlotsAvail = settings.itemSlotsAvail - 1;
					return true;
				}
				else {
					// create some way for extra items to be sold
					return false;
				}
		},
		inventoryRemove : function(item) {
				if (item === undefined) {
					return privateMembers.inventory.slice(0);
				}
				var index = privateMembers.inventory.indexOf(item);
				// -1 is not found, inverser (~) -1 = 0; 0 = false; anything else is true. Not makes the opposite
				// if true that we did not find anything, proceed with the below
				if (!~index){
					return false;
				}

				settings.itemSlotsAvail = settings.itemSlotsAvail + 1;
				//privateMembers.inventory = privateMembers.inventory.splice(index, 1);
				return privateMembers.inventory.splice(index, 1);
					//return item;
				},

	};
var settings = Object.assign({},publicMembers, options);

return settings;


};


// what about if max items are exceeded?
// what about if you try to sell more than you have


var Bob = new Character(Bob, 1);
Bob.gold = 1.2;

var potion1 = new PoisonPotion (1);
Bob.inventoryAdd (potion1);
Bob.inventoryAdd (testItem1);
Bob.inventoryAdd (testItem2);

console.log(Bob.inventoryShow().map(item => item.name));

Bob.inventoryRemove (testItem1);

console.log(Bob.inventoryShow().map(item => item.name));

Bob.inventoryRemove ();

console.log(Bob.inventoryShow().map(item => item.name));

console.log(Bob.itemSlotsAvail);
// race selecter


var raceSelect = function(selection) {
		var sel = numberGen(selection);
		
		(sel <= 25) ? return "human";
		(sel <= 35) ? return "elf";
		(sel <= 45) ? return "dwarf";
		(sel <= 65) ? return "orc";
		(sel <= 70) ? return "dire wolf";
		(sel <= 75) ? return "orc";
		(sel <= 65) ? return "orc";
		(sel <= 65) ? return "orc";
	}


//Character Generator function
// enter 0 for no options
// copy object function from Character prototype
// name database https://gist.github.com/tkon99/4c98af713acc73bed74c

// create prototypes for classes, races, etc -- ie generic orc, generic human, etc 
//above repurposed as number gen (1-100)

var numberGen = function(number){
 
  	if (number >= 1){
		return number;
      	}
	
  	else{
		number = Math.round((Math.random().toFixed(2) * (100 - 1) ) + 1);
		return number;
  		}
};


// pass in number from numberGen plus modifer - 0 for default, 1 for low level (sub 34), 2 for mid (34 - 66), 4 for high (66+) 
var charGen = function(options){
	
	var publicMembers = {
		
	exp : numberGen(), //base
	expM : 0, // modifier
	
	weight : numberGen(),
	weightM : 2,
	
	gold : numberGen(),
	goldM : 2,
	
	HitPointsMax : numberGen(),
	HitPointsMaxM : 2,
	
	race : numberGen(),
	raceM : 0
	
	
	};
	
	var settings = Object.assign({},publicMembers, options);
	
	switch (settings.expM){
		case 0 : settings.exp = settings.exp * 100; //all range
		break;
		case 1 : settings.exp = Math.round(settings.exp * 34); // low level 
		break;
		case 2 : settings.exp = Math.round((settings.exp * 34) + 3300); // mid level 
		break;
		case 3 : settings.exp = Math.round((settings.exp * 34) + 6600);// high level
		break;
		case 99 : settings.exp = settings.exp; 
	
	}
	

	switch (settings.weightM){
		case 0 : settings.weight = settings.weight * 10; //all range
		break;
		case 1 : settings.weight = Math.round(settings.weight * 0.01 * 100) + 20; // super light
		break;
		case 2 : settings.weight = Math.round(settings.weight * 0.01 * 200) + 100; // mid
		break;
		case 3 : settings.weight = (settings.weight * 7) + 300;// heavy
		break;
		case 4 : settings.weight = (settings.weight * 50) + 1000;// super heavy
		break;
		case 99 : settings.weight = settings.weight; 
	
	}
	
	switch (settings.goldM){
		case 0 : settings.gold = Math.round(settings.gold * 0.01 * 990) + 10 ; //all range
		break;
		case 1 : settings.gold = settings.gold + 2; // minimum
		break;
		case 2 : settings.gold = Math.round(settings.gold * 0.01 * 450) + 70; // mid
		break;
		case 3 : settings.gold = (settings.gold * 10) + 300;// rich
		break;
		case 4 : settings.gold = (settings.gold * 50) + 1000;// super rich
		break;
		case 99 : settings.gold = settings.gold; 
	
	}
	
	switch (settings.HitPointsMaxM){
		case 0 : settings.HitPointsMax = Math.round(settings.HitPointsMax * 0.01 * 990) + 10 ; //all range
		break;
		case 1 : settings.HitPointsMax = Math.round(settings.HitPointsMax * 0.01 * 50) + 1; // minimum
		break;
		case 2 : settings.HitPointsMax = Math.round(settings.HitPointsMax * 0.01 * 500) + 50; // mid
		break;
		case 3 : settings.HitPointsMax = (settings.HitPointsMax * 10) + 300;// high
		break;
		case 4 : settings.HitPointsMax = (settings.HitPointsMax * 50) + 1000;// super high
		break;
		case 99 : settings.HitPointsMax = settings.HitPointsMax; 
	
	}
	
	
	
	switch (settings.raceM) {
		case 0: settings.race = 
			if ()
	}

  
  return {exp: settings.exp, weight : settings.weight, gold : settings.gold, HitPointsMax : settings.HitPointsMax, HitPoints : settings.HitPointsMax} ;
  
};


console.log(charGen());
console.log(charGen({expM : 1, weightM : 2, goldM : 2}));
console.log(charGen({exp : 1000, expM : 99, weightM : 4, goldM : 4}));


 
 
 // below does not work
 var characterGen = function(x){
  var value = function(x){
  	/*if (x >= 1){
		return x;
      	}
	
  	else{*/
		var result = Math.round((Math.random().toFixed(2) * (100 - 1) ) + 1);
		return result;
  		//}
  var json = ({"name" : value, "exp" : value, "gold" : value, "weight" : value});
    JSON.stringify(json);
    return json;
            };
};

console.log(characterGen(0));

/*

console.log("breeak");
console.log(lootSelect(calcLoot(10,5,1), Bob));
console.log(Bob.gold);

Bob.goldAdd(10.7);

console.log(Bob.gold);
*/

// prototype constructor with input for new objects

/*
var Character = function(options){
var defaultSettings = {
age : 20,
weight : 200,
level : 20
};
var settings = Object.assign({},defaultSettings, options);

return settings;
};

var p = new Character();

var janet = new Character({ weight: 125, level: 2 });



console.log(p.age);
console.log(janet.age);
console.log(janet.weight);

*/