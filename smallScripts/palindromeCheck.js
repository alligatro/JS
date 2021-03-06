// palindrome checker - example "racecar" is the same forwards and backwards


function palindromeChecker (string) {
  
string = string.toLowerCase();
	
  var revStr = string.split("").reverse().join("");

  return revStr == string;


  
}

// this function allows palindromeChecker to pass true/false values into this and other functions if necessary

function palindromeReport (string) {
   if (typeof(string) != "string"){
      return null;
   }
  
  else if (palindromeChecker(string)){
    return string + " is a palindrome";
  }
  else {
    return string + " is NOT a palindrome";
  }
}  

console.log(palindromeReport("Racecar")); // palindrome
console.log(palindromeReport("testcar")); // not a palindrome
console.log(palindromeReport(1234)); // null