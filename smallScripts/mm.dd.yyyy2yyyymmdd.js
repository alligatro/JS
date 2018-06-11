function formatDate(userDate) {
  
  // format from M/D/YYYY to YYYYMMDD
  
  //commented out code below is simpler but does not validate:
  //var x = userDate.split("/");
  //return (x[2] + x[0] + x[1]);
  
  var y = new Date (userDate);
  
  if (isNaN(y.getFullYear())){
    return NaN;
  }
  
  var month = (y.getMonth() + 1).toString();
  var day = y.getDate().toString();
  
  // ensures length of month or day is 2 digits
  
  var lengthCheck = function(x){
    if (x.length < 2){
      x = "0" + x;
    }
    
     return x;
   };
  
  return y.getFullYear().toString() + lengthCheck(month) + lengthCheck(day);
  

  
}


//tests

console.log(formatDate("12/31/2014")); // returns 20141231
console.log(formatDate("1eef")); // returns NaN
