
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
var Character = function (name, level){
	var privateMembers = {
		inventory : []
	};
	var publicMembers = {
		name : name || "Default",
		level : level || 1,
		exp: 0,
		gold: 0,
		goldAdd : function(qty){
				publicMembers.gold = publicMembers.gold + qty;


		},
		HitPoints : 10,
		MaxHitPoints : 10,
		TemporaryHitPoints : 0,
		itemSlotsAvail : 100,
		weight : 200,
		inventoryFull : function(){
			if (publicMembers.itemSlotsAvail <= 0){
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
				if (privateMembers.inventory.length < publicMembers.itemSlotsAvail){
					privateMembers.inventory.push(item);
					publicMembers.itemSlotsAvail = publicMembers.itemSlotsAvail - 1;
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

				publicMembers.itemSlotsAvail = publicMembers.itemSlotsAvail + 1;
				//privateMembers.inventory = privateMembers.inventory.splice(index, 1);
				return privateMembers.inventory.splice(index, 1);
					//return item;
				},

	};

	return publicMembers;
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



/*

console.log("breeak");
console.log(lootSelect(calcLoot(10,5,1), Bob));
console.log(Bob.gold);

Bob.goldAdd(10.7);

console.log(Bob.gold);
*/
