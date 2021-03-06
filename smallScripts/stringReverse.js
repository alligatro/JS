//this function takes a string and reverses it without using .reverse() 

function stringReverse (string) {
  
  // validates input type
  
  	if (typeof(string) != "string"){
      return null;
    }
	
  // splits string into an array, starts with last digit of array and works backwards
  
	var letters = string.toString().split("")
  	var i = letters.length - 1;
	var newString = letters[i];
  
	do {
      	i--;
        newString = (newString + letters[i]).toString();
     	}	while(i > 0);
return newString;
}

console.log(stringReverse("1234567")) // returns "7654321"
console.log(stringReverse(123.4567)) // returns null
console.log(stringReverse(12/22/8219)) // returns null
console.log(stringReverse("2/2?9")) // returns "9?2/2"