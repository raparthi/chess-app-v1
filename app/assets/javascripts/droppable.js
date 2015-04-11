function checkForBlockingWhite(xAxis, yAxis) {
  var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return $('.col-md-1').children('div[id*='+ letterArray[xAxis-1] + yAxis+']').children('span[class*=white]').length;
};

// check for blocking black piece before or after incrementing piece //
function checkForBlockingBlack(xAxis, yAxis) {
  var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return $('.col-md-1').children('div[id*=' + letterArray[xAxis-1] + yAxis+']').children('span[class*=black]').length;
};

// set forward movement for pawns //
if (pieceType.match(/glyphicon-pawn black/)) {
 $('.droppable').droppable("disable");
 var yAxis = parseInt(startingPoint[5]);
 var xAxis = letterArray.indexOf(letterVar) + 1;
 var divArray = []
 if (checkForBlockingWhite(xAxis, (yAxis + 1)) === 0) {
   $(this).parent().next().droppable('enable');
 }
 if (yAxis === 2 && checkForBlockingWhite(xAxis, (yAxis + 2)) === 0 ) {
   $(this).parent().next().next().droppable('enable');
 }
 if (checkForBlockingWhite((xAxis + 1), (yAxis + 1)) !== 0) {
   pushElementToArray(divArray, (xAxis + 1), (yAxis + 1));
 }
 if (checkForBlockingWhite((xAxis - 1), (yAxis + 1)) !== 0) {
   pushElementToArray(divArray, (xAxis - 1), (yAxis + 1));
 }
 divArray.forEach(enableElements);
}
