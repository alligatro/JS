
// chance to hit based on enemy AC and any player modifiers (t/f)

function toHit (AC, modifier){
	var hitChance = Math.random().toFixed(1) * 20;
	return (hitChance + modifier) > AC;


}

// Potion
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

var PoisonPotion = function (level){
	var publicMembers = {
		doses: 1,
		used: 0,
		remaining : function(){
			return publicMembers.doses - publicMembers.used;
		},
			drink : function(){
				if (remaining){
					publicMembers.used ++;
					return HPCalc(publicMembers.HPeffectMIN, publicMembers.HPeffectMAX, publicMembers.modifier, publicMembers.level);
				}
				else {
					false;
				}
			}
			HPeffectMAX : -10,
			HPeffectMIN : -2,
			weight : 1,
			itemSlots : 1,
			modifier : 0,
			level : level || 1
	};

	return publicMembers;
};
// look into drink
//var poisonPotionInThatChestOverThere = new PoisonPotion();
//poisonPotionInThatChestOverThere.modifier = 5

// health Potion
var healthPotion = new Potion();
healthPotion.weight = 1;
healthPotion.itemSlots = 1;
healthPotion.HPeffectMAX = 10;
healthPotion.HPeffectMIN = 2;


// poison Potion
var poisonPotion = new Potion();
poisonPotion.weight = 1;
poisonPotion.itemSlots = 1;
poisonPotion.HPeffectMAX = -10;
poisonPotion.HPeffectMIN = -2;


// subtract HPCalc from HP to represent damage, add to HP to represent healing

// add level
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


HPCalc (poisonPotion.HPeffectMIN, poisonPotion.HPeffectMAX, poisonPotion.modifier);



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
	var itemsRare = Math.round(calcAmount(level, size, modifier) * 0.1);

  	var loot = [gold, items, itemsRare]

	return loot;
}


console.log(calcLoot(2,5,2));
