$(function(){

 // function for clean arrays without NaN //
  function cleanArray(actual){
    var newArray = new Array();
    for(var i = 0; i<actual.length; i++){
        if (actual[i]){
          newArray.push(actual[i]);
      }
    }
    return newArray;
  };

  // variables for castling //
  var bKingMoves = 0;
  var wKingMoves = 0;
  var wRook1Moves = 0;
  var wRook2Moves = 0;
  var bRook1Moves = 0;
  var bRook2Moves = 0;
  var attackPiecesBlack = [];
  var attackPiecesWhite = [];
  var blackPosition = [];
  var whitePosition = [];

  // initialize drag and drop elements with Jquery plugin //
  $('.draggable').draggable({
    snap: ".droppable",
    snapTolerance: 10,

    // revert pieces to original position if not valid move //
    stop: function(event, ui) {
      var piece = $(this);
      var pieceStyle = $(this).css('top');
      if (pieceStyle !== '0px') {
        piece.animate({
          top: 0,
          left: 0,
        }, 500);
      }
    },

    start: function(event, ui) {
      // initialize starting point axis variables //
      var startingPoint = $(this).closest('div').attr('id');
      var startingPosition = $(this).closest('div');
      var pieceType = $(this).attr('class');
      var letterVar = startingPoint[4];
      var numberVar = startingPoint[5];
      var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
      var yAxis = parseInt(startingPoint[5]);
      var xAxis = letterArray.indexOf(letterVar) + 1;


      // creates the droppable elements for each piece per turn //
       function enableElements(entry) {
         $('.chess-holder').children('div[class*=col]').children('div[id*='+ entry +']').droppable('enable');
       }

       // push the current x-y axis to an array of droppable boxes //
       function pushElementToArray(array, xAxis, yAxis) {
         array.push(letterArray[xAxis - 1] + yAxis);
       };

       // check for blocking white piece before or after incrementing piece //
       function checkForBlockingWhite(xAxis, yAxis) {
         var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
         return $('.col-md-1').children('div[id*='+ letterArray[xAxis-1] + yAxis+']').children('span[class*=white]').length;
       };

       // check for blocking black piece before or after incrementing piece //
       function checkForBlockingBlack(xAxis, yAxis) {
         var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
         return $('.col-md-1').children('div[id*=' + letterArray[xAxis-1] + yAxis+']').children('span[class*=black]').length;
       };

       function testKingMoves(array, location) {
       for (var i=0; i< array.length; i++) {
         if (array[i] === location) {
           return true;
         }
       }};

       // check for check //
       console.log(pieceType);
       console.log(attackPiecesBlack.length);
       console.log(attackPiecesBlack);
       console.log(cleanArray(blackPosition));

       // check for check from two separate pieces; if so, only king can move out of check //
       if (pieceType.match(/white/) && attackPiecesBlack.length === 2) {
         $('.droppable').droppable("disable");
         var yAxis = parseInt(startingPoint[5]);
         var xAxis = letterArray.indexOf(letterVar) + 1;
         var divArray = [];

         if (pieceType.match(/w-king/)) {
           if (!testKingMoves(blackPosition, letterArray[xAxis - 1] + (yAxis + 1))) {
              divArray.push(letterArray[xAxis - 1] + (yAxis + 1));
           }
           if (!testKingMoves(blackPosition, letterArray[xAxis - 1] + (yAxis - 1))) {
             divArray.push(letterArray[xAxis - 1] + (yAxis - 1));
           }
           if (!testKingMoves(blackPosition, letterArray[xAxis] + (yAxis))) {
             divArray.push(letterArray[xAxis] + (yAxis ));
           }
           if (!testKingMoves(blackPosition, letterArray[xAxis - 2] + (yAxis))) {
             divArray.push(letterArray[xAxis - 2] + (yAxis));
           }
           if (!testKingMoves(blackPosition, letterArray[xAxis] + (yAxis + 1))) {
             divArray.push(letterArray[xAxis] + (yAxis + 1));
           }
           if (!testKingMoves(blackPosition, letterArray[xAxis] + (yAxis - 1))) {
             divArray.push(letterArray[xAxis] + (yAxis - 1));
           }
           if (!testKingMoves(blackPosition, letterArray[xAxis - 2] + (yAxis + 1))) {
             divArray.push(letterArray[xAxis - 2] + (yAxis + 1));
           }
           if (!testKingMoves(blackPosition, letterArray[xAxis - 2] + (yAxis - 1))) {
             divArray.push(letterArray[xAxis - 2] + (yAxis - 1));
           }
          }
          divArray.forEach(enableElements);
       }
       else if (pieceType.match(/black/) && attackPiecesWhite.length === 2) {
         $('.droppable').droppable("disable");
         var yAxis = parseInt(startingPoint[5]);
         var xAxis = letterArray.indexOf(letterVar) + 1;
         var divArray = [];

         if (pieceType.match(/b-king/)) {
           if (!testKingMoves(whitePosition, letterArray[xAxis - 1] + (yAxis + 1))) {
              divArray.push(letterArray[xAxis - 1] + (yAxis + 1));
           }
           if (!testKingMoves(whitePosition, letterArray[xAxis - 1] + (yAxis - 1))) {
             divArray.push(letterArray[xAxis - 1] + (yAxis - 1));
           }
           if (!testKingMoves(whitePosition, letterArray[xAxis] + (yAxis))) {
             divArray.push(letterArray[xAxis] + (yAxis ));
           }
           if (!testKingMoves(whitePosition, letterArray[xAxis - 2] + (yAxis))) {
             divArray.push(letterArray[xAxis - 2] + (yAxis));
           }
           if (!testKingMoves(whitePosition, letterArray[xAxis] + (yAxis + 1))) {
             divArray.push(letterArray[xAxis] + (yAxis + 1));
           }
           if (!testKingMoves(whitePosition, letterArray[xAxis] + (yAxis - 1))) {
             divArray.push(letterArray[xAxis] + (yAxis - 1));
           }
           if (!testKingMoves(whitePosition, letterArray[xAxis - 2] + (yAxis + 1))) {
             divArray.push(letterArray[xAxis - 2] + (yAxis + 1));
           }
           if (!testKingMoves(whitePosition, letterArray[xAxis - 2] + (yAxis - 1))) {
             divArray.push(letterArray[xAxis - 2] + (yAxis - 1));
           }
          }
          divArray.forEach(enableElements);
       }

       // check for single piece check on white's turn //
       else if (pieceType.match(/white/) && attackPiecesBlack.length === 1) {
          console.log($('.w-king').parent().attr('id'));
          console.log(attackPiecesBlack[0][1]);
          var attackPieceType = attackPiecesBlack[0][0];
          var kingLocation = $('.w-king').parent().attr('id');
          var kingXAxis = letterArray.indexOf(kingLocation[4]) + 1;
          var kingYAxis = kingLocation[5];
          var attackXAxis = letterArray.indexOf(attackPiecesBlack[0][1][4]) + 1;
          var attackYAxis = attackPiecesBlack[0][1][5];
          var divArrayCheck = [];
          var divArray = [];

          if (kingXAxis === attackXAxis && kingYAxis < attackYAxis) {
            var diff = attackYAxis - kingYAxis;
            for(var i=1; i<=diff; i++) {
              divArrayCheck.push(letterArray[kingXAxis - 1] + (kingYAxis + i));
            }
          }
          if (kingXAxis === attackXAxis && kingYAxis > attackYAxis) {
            var diff = kingYAxis - attackYAxis;
            for(var i=1; i<=diff; i ++) {
              divArrayCheck.push(letterArray[kingXAxis - 1] + (attackYAxis + i));
            }
          }
          if (kingXAxis < attackXAxis && kingYAxis === attackYAxis) {
            var diff = attackXAxis - kingXAxis;
            for(var i=1; i<=diff; i++) {
              divArrayCheck.push(letterArray[kingXAxis + i - 1] + attackYAxis);
            }
          }
          if (kingXAxis > attackXAxis && kingYAxis === attackYAxis) {
            var diff = kingXAxis - attackXAxis;
            for(var i=1; i<=diff; i++) {
              divArrayCheck.push(letterArray[attackXAxis + i - 1] + attackYAxis);
            }
          }
          if (kingXAxis < attackXAxis && kingYAxis < attackYAxis) {
            var diff = attackXAxis - kingXAxis;
            for(var i=1; i<=diff; i++) {
              divArrayCheck.push(letterArray[kingXAxis + i -1] + (kingYAxis + i))
            }
          }
          if (kingXAxis > attackXAxis && kingYAxis < attackYAxis) {
            var diff = kingXAxis - attackXAxis;
            for(var i=1; i<=diff; i++) {
              divArrayCheck.push(letterArray[attackXAxis + i -1] + (attackYAxis - i))
            }
          }
          if (kingXAxis > attackXAxis && kingYAxis > attackYAxis) {
            var diff = kingXAxis - attackXAxis;
            for(var i=1; i<=diff; i++) {
              divArrayCheck.push(letterArray[kingXAxis - i -1] + (kingYAxis - i))
            }
          }
          if (kingXAxis < attackYAxis && kingYAxis > attackYAxis) {
            var diff = kingXAxis - attackXAxis;
            for(var i=1; i<=diff; i++) {
              divArrayCheck.push(letterArray[kingXAxis + i -1] + (kingYAxis - i))
            }
          }
          console.log(divArrayCheck);

          if (pieceType.match(/glyphicon-king/)) {
            $('.droppable').droppable("disable");

            if (!testKingMoves(blackPosition, letterArray[xAxis - 1] + (yAxis + 1))) {
               divArray.push(letterArray[xAxis - 1] + (yAxis + 1));
            }
            if (!testKingMoves(blackPosition, letterArray[xAxis - 1] + (yAxis - 1))) {
              divArray.push(letterArray[xAxis - 1] + (yAxis - 1));
            }
            if (!testKingMoves(blackPosition, letterArray[xAxis] + (yAxis))) {
              divArray.push(letterArray[xAxis] + (yAxis ));
            }
            if (!testKingMoves(blackPosition, letterArray[xAxis - 2] + (yAxis))) {
              divArray.push(letterArray[xAxis - 2] + (yAxis));
            }
            if (!testKingMoves(blackPosition, letterArray[xAxis] + (yAxis + 1))) {
              divArray.push(letterArray[xAxis] + (yAxis + 1));
            }
            if (!testKingMoves(blackPosition, letterArray[xAxis] + (yAxis - 1))) {
              divArray.push(letterArray[xAxis] + (yAxis - 1));
            }
            if (!testKingMoves(blackPosition, letterArray[xAxis - 2] + (yAxis + 1))) {
              divArray.push(letterArray[xAxis - 2] + (yAxis + 1));
            }
            if (!testKingMoves(blackPosition, letterArray[xAxis - 2] + (yAxis - 1))) {
              divArray.push(letterArray[xAxis - 2] + (yAxis - 1));
            }
           }
           divArray.forEach(enableElements);

          if (pieceType.match(/glyphicon-pawn/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
            $('.droppable').droppable("disable");
            var yAxis = parseInt(startingPoint[5]);
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var divArray = [];
            if (checkForBlockingBlack(xAxis, (yAxis -1)) === 0 && testKingMoves(divArrayCheck, letterArray[xAxis] + (yAxis - 1))) {
              $(this).parent().prev().droppable('enable');
            }
            if (yAxis === 7 && checkForBlockingBlack(xAxis, (yAxis -2)) === 0 && testKingMoves(divArrayCheck, letterArray[xAxis] + (yAxis - 2))) {
              $(this).parent().prev().prev().droppable('enable');
            }
            if (checkForBlockingBlack((xAxis + 1), (yAxis - 1)) !== 0 && (xAxis + 1) + "" + (yAxis -1) === attackXAxis + "" + attackYAxis) {
              pushElementToArray(divArray, (xAxis + 1), (yAxis - 1));
            }
            if (checkForBlockingBlack((xAxis - 1), (yAxis - 1)) !== 0 && (xAxis - 1) + "" +  (yAxis -1) === attackXAxis + "" + attackYAxis ) {
              pushElementToArray(divArray, (xAxis - 1), (yAxis - 1));
            }
            divArray.forEach(enableElements);
          }

          if (pieceType.match(/glyphicon-pawn/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
            $('.droppable').droppable("disable");
            var yAxis = parseInt(startingPoint[5]);
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var divArray = [];

            if (checkForBlockingBlack((xAxis + 1), (yAxis - 1)) !== 0 && (xAxis + 1) + "" + (yAxis -1) === attackXAxis + "" + attackYAxis) {
              pushElementToArray(divArray, (xAxis + 1), (yAxis - 1));
            }
            if (checkForBlockingBlack((xAxis - 1), (yAxis - 1)) !== 0 && (xAxis - 1) + "" +  (yAxis -1) === attackXAxis + "" + attackYAxis ) {
              pushElementToArray(divArray, (xAxis - 1), (yAxis - 1));
            }
            divArray.forEach(enableElements);
          }

          if (pieceType.match(/glyphicon-tower/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
            $('.droppable').droppable("disable");
            var yAxis = parseInt(startingPoint[5]);
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var divArray = [];

            // set +y vertical //
             while (yAxis <= 8 ) {
               if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
               }
               if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
               yAxis += 1;
               if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             }
             divArray.forEach(enableElements);

             // set -y vertical //
             yAxis = parseInt(startingPoint[5]);
             xAxis = letterArray.indexOf(letterVar) + 1;
             while (yAxis >= 1 ) {
               if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
               }
               if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
               yAxis -= 1;
               if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             }
             divArray.forEach(enableElements);

             // set + x horizontal //
             yAxis = parseInt(startingPoint[5]);
             xAxis = letterArray.indexOf(letterVar) + 1;
             while (xAxis <= 8 ) {
               if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
               }
               if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
               xAxis += 1;
               if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             }
             divArray.forEach(enableElements);

             // set - x horizontal //
             yAxis = parseInt(startingPoint[5]);
             xAxis = letterArray.indexOf(letterVar) + 1;
             while (xAxis >= 1 ) {
               if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
               }
               if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
               xAxis -= 1;
               if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             }
             divArray.forEach(enableElements);
          }

          if (pieceType.match(/glyphicon-tower/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
            $('.droppable').droppable("disable");
            var yAxis = parseInt(startingPoint[5]);
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var divArray = [];

            // set +y vertical //
             while (yAxis <= 8 ) {
               if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
               }
               if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
               yAxis += 1;
               if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             }
             divArray.forEach(enableElements);

             // set -y vertical //
             yAxis = parseInt(startingPoint[5]);
             xAxis = letterArray.indexOf(letterVar) + 1;
             while (yAxis >= 1 ) {
               if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
               }
               if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
               yAxis -= 1;
               if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             }
             divArray.forEach(enableElements);

             // set + x horizontal //
             yAxis = parseInt(startingPoint[5]);
             xAxis = letterArray.indexOf(letterVar) + 1;
             while (xAxis <= 8 ) {
               if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
               }
               if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
               xAxis += 1;
               if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             }
             divArray.forEach(enableElements);

             // set - x horizontal //
             yAxis = parseInt(startingPoint[5]);
             xAxis = letterArray.indexOf(letterVar) + 1;
             while (xAxis >= 1 ) {
               if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
               }
               if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
               xAxis -= 1;
               if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             }
             divArray.forEach(enableElements);
          }
          if (pieceType.match(/glyphicon-bishop/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {

          }
          if (pieceType.match(/glyphicon-bishop/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {

          }
          if (pieceType.match(/glyphicon-queen/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {

          }
          if (pieceType.match(/glyphicon-queen/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphiocn-tower/)) {

          }
          if (pieceType.match(/glyphicon-knight/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {

          }
          if (pieceType.match(/glyphicon-knight/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {

          }


      }

       else if (pieceType.match(/black/) && attackPiecesWhite.length === 1) {
         var kingLocation = $('.b-king').parent().attr('id');
         var kingXAxis = letterArray.indexOf(kingLocation[4]) + 1;
         var kingYAxis = kingLocation[5];
         var attackXAxis = letterArray.indexOf(attackPiecesWhite[0][1][4]) + 1;
         var attackYAxis = attackPiecesWhite[0][1][5];
         var divArrayCheck = [];

         if (kingXAxis === attackXAxis && kingYAxis < attackYAxis) {
           var diff = attackYAxis - kingYAxis;
           for(var i=1; i<=diff; i++) {
             divArrayCheck.push(letterArray[kingXAxis - 1] + (kingYAxis + i));
           }
         }
         else if (kingXAxis === attackXAxis && kingYAxis > attackYAxis) {
           var diff = kingYAxis - attackYAxis;
           for(var i=1; i<=diff; i ++) {
             divArrayCheck.push(letterArray[kingXAxis - 1] + (attackYAxis + i));
           }

         }
         else if (kingXAxis < attackXAxis && kingYAxis === attackYAxis) {
           var diff = attackXAxis - kingXAxis;
           for(var i=1; i<=diff; i++) {
             divArrayCheck.push(letterArray[kingXAxis + i - 1] + attackYAxis);
           }
         }
         else if (kingXAxis > attackXAxis && kingYAxis === attackYAxis) {
           var diff = kingXAxis - attackXAxis;
           for(var i=1; i<=diff; i++) {
             divArrayCheck.push(letterArray[attackXAxis + i - 1] + attackYAxis);
           }
         }
         else if (kingXAxis < attackXAxis && kingYAxis < attackYAxis) {
           var diff = attackXAxis - kingXAxis;
           for(var i=1; i<=diff; i++) {
             divArrayCheck.push(letterArray[kingXAxis + i -1] + (kingYAxis + i))
           }
         }
         else if (kingXAxis > attackXAxis && kingYAxis < attackYAxis) {
           var diff = kingXAxis - attackXAxis;
           for(var i=1; i<=diff; i++) {
             divArrayCheck.push(letterArray[attackXAxis + i -1] + (attackYAxis - i))
           }
         }
         else if (kingXAxis > attackXAxis && kingYAxis > attackYAxis) {
           var diff = kingXAxis - attackXAxis;
           for(var i=1; i<=diff; i++) {
             divArrayCheck.push(letterArray[kingXAxis - i -1] + (kingYAxis - i))
           }
         }
         else if (kingXAxis < attackYAxis && kingYAxis > attackYAxis) {
           var diff = kingXAxis - attackXAxis;
           for(var i=1; i<=diff; i++) {
             divArrayCheck.push(letterArray[kingXAxis + i -1] + (kingYAxis - i))
           }
         }
       }

       else {
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
        else if (pieceType.match(/glyphicon-pawn white/)) {
          $('.droppable').droppable("disable");
          var yAxis = parseInt(startingPoint[5]);
          var xAxis = letterArray.indexOf(letterVar) + 1;
          var divArray = [];

          if (checkForBlockingBlack(xAxis, (yAxis -1)) === 0) {
            $(this).parent().prev().droppable('enable');
          }
          if (yAxis === 7 && checkForBlockingBlack(xAxis, (yAxis -2)) === 0) {
            $(this).parent().prev().prev().droppable('enable');
          }
          if (checkForBlockingBlack((xAxis + 1), (yAxis - 1)) !== 0) {
            pushElementToArray(divArray, (xAxis + 1), (yAxis - 1));
          }
          if (checkForBlockingBlack((xAxis - 1), (yAxis - 1)) !== 0) {
            pushElementToArray(divArray, (xAxis - 1), (yAxis - 1));
          }
          divArray.forEach(enableElements);
        }

        // set vertical and horizontal movement for black rook //
        else if (pieceType.match(/glyphicon-tower black/)) {
          $('.droppable').droppable("disable");
          var yAxis = parseInt(startingPoint[5]);
          var xAxis = letterArray.indexOf(letterVar) + 1;
          var divArray = [];
           while (yAxis <= 8 ) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;}
             yAxis += 1;
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;}
           }
           divArray.forEach(enableElements);

           // set -y vertical for black rook //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (yAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             yAxis -= 1;
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set + x horizontal for black rook //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis <= 8 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             xAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set - x horizontal for black rook //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             xAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);
        }

        // set movements for white rook //
        else if (pieceType.match(/glyphicon-tower white/)) {

          $('.droppable').droppable("disable");
          var yAxis = parseInt(startingPoint[5]);
          var xAxis = letterArray.indexOf(letterVar) + 1;
          var divArray = [];

          // set +y vertical //
           while (yAxis <= 8 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
             yAxis += 1;
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set -y vertical //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (yAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
             yAxis -= 1;
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set + x horizontal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis <= 8 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
             xAxis += 1;
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set - x horizontal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
             xAxis -= 1;
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);
        }

        // set diagonal movement for black bishop //
        else if (pieceType.match(/glyphicon-bishop black/)) {
          $('.droppable').droppable("disable");
          var yAxis = parseInt(startingPoint[5]);
          var xAxis = letterArray.indexOf(letterVar) + 1;
          var divArray = [];

          // set +x+y diagonal //
           while (xAxis <= 8 && yAxis <= 8 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             xAxis += 1;
             yAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set -x-y diagonal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis >= 1 && yAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             xAxis -= 1;
             yAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set +x-y diagonal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis <= 8 && yAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             xAxis += 1;
             yAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set -x+y diagonal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis >= 1 && yAxis <= 8) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
            xAxis -= 1;
            yAxis += 1;
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);
         }

        // set diagonal movement for white bishop //
        else if (pieceType.match(/glyphicon-bishop white/)) {
          $('.droppable').droppable("disable");
          var yAxis = parseInt(startingPoint[5]);
          var xAxis = letterArray.indexOf(letterVar) + 1;
          var divArray = [];

          // set +x+y diagonal //
           while (xAxis <= 8 && yAxis <= 8 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
             xAxis += 1;
             yAxis += 1;
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set -x-y diagonal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis >= 1 && yAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
             xAxis -= 1;
             yAxis -= 1;
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set +x-y diagonal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis <= 8 && yAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
             xAxis += 1;
             yAxis -= 1;
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set -x+y diagonal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis >= 1 && yAxis <= 8) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
             xAxis -= 1;
             yAxis += 1;
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);
         }

        // set movement for knights //
        else if (pieceType.match(/glyphicon-knight/)) {
          $('.droppable').droppable("disable");
          var yAxis = parseInt(startingPoint[5]);
          var xAxis = letterArray.indexOf(letterVar) + 1;
          var divArray = [];

          divArray.push(letterArray[xAxis -2] + (yAxis-2));
          divArray.push(letterArray[xAxis -2] + (yAxis+2));
          divArray.push(letterArray[xAxis -3] + (yAxis-1));
          divArray.push(letterArray[xAxis -3] + (yAxis+1));
          divArray.push(letterArray[xAxis] + (yAxis+2));
          divArray.push(letterArray[xAxis] + (yAxis-2));
          divArray.push(letterArray[xAxis +1] + (yAxis+1));
          divArray.push(letterArray[xAxis +1] + (yAxis-1));

          divArray.forEach(enableElements);
        }

        // set movements for white queen //
        else if (pieceType.match(/glyphicon-queen white/)) {
          $('.droppable').droppable("disable");
          var yAxis = parseInt(startingPoint[5]);
          var xAxis = letterArray.indexOf(letterVar) + 1;
          var divArray = [];

          // set +x+y diagonal //
           while (xAxis <= 8 && yAxis <= 8 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
             xAxis += 1;
             yAxis += 1;
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set -x-y diagonal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis >= 1 && yAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
             xAxis -= 1;
             yAxis -= 1;
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set +x-y diagonal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis <= 8 && yAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
             xAxis += 1;
             yAxis -= 1;
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set -x+y diagonal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis >= 1 && yAxis <= 8) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
             xAxis -= 1;
             yAxis += 1;
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set y+ vertical for white queen //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (yAxis <= 8) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
             yAxis += 1;
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set y- vertical for white queen //

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (yAxis >= 1) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
             yAxis -= 1;
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set x+ horizontal for white queen  //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis <= 8 ) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
             xAxis += 1;
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set x- horizontal for white Queen //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis >= 1 ) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
             xAxis -= 1;
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);
        }

        // set movements for black queen //
        else if (pieceType.match(/glyphicon-queen black/)) {
          $('.droppable').droppable("disable");
          var yAxis = parseInt(startingPoint[5]);
          var xAxis = letterArray.indexOf(letterVar) + 1;
          var divArray = [];

          // set +x+y diagonal //
           while (xAxis <= 8 && yAxis <= 8 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
             xAxis += 1;
             yAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set -x-y diagonal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis >= 1 && yAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
             xAxis -= 1;
             yAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set +x-y diagonal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis <= 8 && yAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
             xAxis += 1;
             yAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set -x+y diagonal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis >= 1 && yAxis <= 8) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
             xAxis -= 1;
             yAxis += 1;
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set x+ horizontal //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis <= 8) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
             xAxis += 1;
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set x- horizontal for Queen //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis >= 1 ) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
             xAxis -= 1;
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set y+ vertical for Queen //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while ( yAxis <= 8) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
             yAxis += 1;
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);

           // set y- vertical for Queen //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while ( yAxis >= 1) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) {break;};
             yAxis -= 1;
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) {break;};
           }
           divArray.forEach(enableElements);
        }

        else if (pieceType.match(/glyphicon-king white/)) {
          $('.droppable').droppable("disable");
          var yAxis = parseInt(startingPoint[5]);
          var xAxis = letterArray.indexOf(letterVar) + 1;
          var divArray = [];

          if (!testKingMoves(blackPosition, letterArray[xAxis - 1] + (yAxis + 1))) {
             divArray.push(letterArray[xAxis - 1] + (yAxis + 1));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis - 1] + (yAxis - 1))) {
            divArray.push(letterArray[xAxis - 1] + (yAxis - 1));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis] + (yAxis))) {
            divArray.push(letterArray[xAxis] + (yAxis ));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis - 2] + (yAxis))) {
            divArray.push(letterArray[xAxis - 2] + (yAxis));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis] + (yAxis + 1))) {
            divArray.push(letterArray[xAxis] + (yAxis + 1));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis] + (yAxis - 1))) {
            divArray.push(letterArray[xAxis] + (yAxis - 1));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis - 2] + (yAxis + 1))) {
            divArray.push(letterArray[xAxis - 2] + (yAxis + 1));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis - 2] + (yAxis - 1))) {
            divArray.push(letterArray[xAxis - 2] + (yAxis - 1));
          }

          divArray.forEach(enableElements);
          if ( wKingMoves === 0 && wRook1Moves === 0 && $('#box-b8').children().length === 0 && $('#box-c8').children().length === 0 && $('#box-d8').children().length === 0) {
            divArray.push(letterArray[xAxis - 3] + (yAxis));
          }
          else if ( wKingMoves === 0 && wRook2Moves === 0 && $('#box-f8').children().length === 0 && $('#box-g8').children().length === 0) {
            divArray.push(letterArray[xAxis + 1] + (yAxis));
          }
          divArray.forEach(enableElements);
        }
        else if (pieceType.match(/b-king/)) {
          $('.droppable').droppable("disable");
          var yAxis = parseInt(startingPoint[5]);
          var xAxis = letterArray.indexOf(letterVar) + 1;
          var divArray = [];

          if (!testKingMoves(blackPosition, letterArray[xAxis - 1] + (yAxis + 1))) {
             divArray.push(letterArray[xAxis - 1] + (yAxis + 1));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis - 1] + (yAxis - 1))) {
            divArray.push(letterArray[xAxis - 1] + (yAxis - 1));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis] + (yAxis))) {
            divArray.push(letterArray[xAxis] + (yAxis ));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis - 2] + (yAxis))) {
            divArray.push(letterArray[xAxis - 2] + (yAxis));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis] + (yAxis + 1))) {
            divArray.push(letterArray[xAxis] + (yAxis + 1));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis] + (yAxis - 1))) {
            divArray.push(letterArray[xAxis] + (yAxis - 1));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis - 2] + (yAxis + 1))) {
            divArray.push(letterArray[xAxis - 2] + (yAxis + 1));
          }
          if (!testKingMoves(blackPosition, letterArray[xAxis - 2] + (yAxis - 1))) {
            divArray.push(letterArray[xAxis - 2] + (yAxis - 1));
          }

          divArray.forEach(enableElements);
          if ( bKingMoves === 0 && bRook1Moves === 0 && $('#box-b1').children().length === 0 && $('#box-c1').children().length === 0 && $('#box-d1').children().length === 0) {
            divArray.push(letterArray[xAxis - 3] + (yAxis));
          }
          else if ( bKingMoves === 0 && bRook2Moves === 0 && $('#box-f1').children().length === 0 && $('#box-g1').children().length === 0) {
            divArray.push(letterArray[xAxis + 1] + (yAxis));
          }
          divArray.forEach(enableElements);
        }
      }

      // disable opponent side during turns //
      if (pieceType.match(/white/) !== null) {
        $('.white').parent().droppable("disable");
      }
      else if (pieceType.match(/black/) !== null) {
        $('.black').parent().droppable("disable");
      }
    }
  });


  // start with white //
  $('.black').draggable('disable');

  // disable opponent pieces when player's turn //
    $('.droppable').droppable({
      revert: "invalid",
      drop: function(event, ui) {
        var newBox = $(this).attr('id');
        var stationBox = $(this);
        var piece = ui.draggable.attr('class');
        var oldBox = ui.draggable.parent().attr('id');
        var classCheck = stationBox.children().attr('class');
        var trNum = $('tbody').children().length + 1;
        switchTurn();

        var piece = ui.draggable.attr('class');
        if (piece.match(/white/)) {
          $('#time1').removeClass('turn');
          $('#time0').addClass('turn');
        }
        else if (piece.match(/black/)) {
          $('#time0').removeClass('turn');
          $('#time1').addClass('turn');
        }

        attackPiecesBlack.length = 0;
        attackPiecesWhite.length = 0;

        // increment counters for castling //
        if (piece.match(/black glyphicon-king/)) { bKingMoves += 1;}
        if (piece.match(/white glyphicon-king/)) { wKingMoves += 1;}
        if (piece.match(/b-rook-1/)) { bRook1Moves += 1;}
        if (piece.match(/b-rook-2/)) { bRook2Moves += 1;}
        if (piece.match(/w-rook-1/)) { wRook1Moves += 1;}
        if (piece.match(/w-rook-2/)) { wRook2Moves += 1;}

        $('.text-list').append('<tr><th><b>' + trNum + '</b> <div class="pipe">|</div> ' + oldBox.split("-")[1].toUpperCase() + " - " + newBox.split("-")[1].toUpperCase() + '</th></tr>');

        // change pawns to queen at end of board //
        if (piece.match(/pawn black/) !== null && newBox.match(/8/)) {
          ui.draggable.removeClass('glyphicon-pawn').addClass('glyphicon-queen');
        }
        if (piece.match(/pawn white/) !== null && newBox.match(/1/)) {
          ui.draggable.removeClass('glyphicon-pawn').addClass('glyphicon-queen');
        }
        // captured pieces go to side bar //
        if (stationBox.children().length > 0 && piece.match(/white/) !== null) {
          stationBox.children().detach().appendTo('.black-pieces').css('font-size', '25px');
        }
        else if (stationBox.children().length > 0 && piece.match(/black/) !== null) {
          stationBox.children().detach().appendTo('.white-pieces').css('font-size', '25px');
        }

        // eliminate jquery draggable position changes //
        ui.draggable.detach().appendTo($(this)).css({'top': '0', 'left': '0'});

        // castling moves //
        if (piece.match(/king black/) && newBox.match(/box-c1/) && oldBox.match(/box-e1/) ) {  $('.b-rook-1').detach().appendTo($('#box-d1'));}
        else if (piece.match(/king black/) && newBox.match(/box-g1/) && oldBox.match(/box-e1/) ) { $('.b-rook-2').detach().appendTo($('#box-f1'));}
        else if (piece.match(/king white/) && newBox.match(/box-c8/) && oldBox.match(/box-e8/)) { $('.w-rook-1').detach().appendTo($('#box-d8'));}
        else if (piece.match(/king white/) && newBox.match(/box-g8/) && oldBox.match(/box-e8/)) { $('.w-rook-2').detach().appendTo($('#box-f8'));}

        var newHome = ui.draggable.parent().attr('id');

        //check for Check - complicated //
        // CHECKMATE CODE !!!! //
        var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];

        if (piece.match(/black/)) {
          var divArray = [];


          function checkForBlocked(xAxis, yAxis) {
            return $('.col-md-1').children('div[id*=' + letterArray[xAxis - 1] + yAxis.toString() + ']').children().length;
          }

          function checkForBlockedColor(xAxis, yAxis, color) {
            return $('.col-md-1').children('div[id*=' + letterArray[xAxis - 1] + yAxis.toString() + ']').children('span[class*=' + color + ']').length;
          }

          function pushToArray(array, xAxis, yAxis) {
            array.push(letterArray[xAxis - 1] + yAxis);
          };

          // function to find all black pieces //
          $('.black').each(function(i) {
            var tempArray = [];
            var kingPosition = $('.w-king').parent().attr('id');
            var bKingPosition = $('.b-king').parent().attr('id');
            var piece = $(this).attr('class');
            var piecePosition = $(this).parent().attr('id');
            var letterVar = $(this).parent().attr('id')[4];
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var yAxis = parseInt($(this).parent().attr('id')[5]);


            if (piece.match(/glyphicon-pawn/)) {
                // check for each individual move //
                if (checkForBlocked(xAxis, (yAxis + 1)) === 0) {
                  pushToArray(tempArray, xAxis, (yAxis + 1));
                }
                if (checkForBlocked(xAxis, (yAxis + 2)) === 0 && yAxis === 2) {
                  pushToArray(tempArray, xAxis, (yAxis + 2));
                }
                if (checkForBlockedColor((xAxis -1), (yAxis + 1), "white") === 1) {
                  pushToArray(tempArray, (xAxis - 1), (yAxis + 1));
                }
                if (checkForBlockedColor((xAxis + 1), (yAxis + 1), "white") === 1) {
                  pushToArray(tempArray, (xAxis + 1), (yAxis + 1));
                }
                tempArray.forEach(function(value) { divArray.push(value); });
                tempArray.forEach(function(value) {
                  if ("box-" + value === kingPosition) {
                    attackPiecesBlack.push([piece, piecePosition]);
                  }
                })
                tempArray.length = 0;
            }
            else if (piece.match(/glyphicon-knight/)) {
              //check each knight move //
              if (checkForBlockedColor((xAxis + 1), (yAxis + 2), "black") === 0) {
                  pushToArray(tempArray, (xAxis + 1), (yAxis + 2));
              }
              if (checkForBlockedColor((xAxis + 1), (yAxis - 2), "black") === 0) {
                  pushToArray(tempArray, (xAxis + 1), (yAxis - 2));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis + 2), "black") === 0) {
                  pushToArray(tempArray, (xAxis - 1), (yAxis + 2));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis - 2), "black") === 0) {
                  pushToArray(tempArray, (xAxis - 1), (yAxis - 2));
              }
              if (checkForBlockedColor((xAxis + 2), (yAxis + 1), "black") === 0) {
                  pushToArray(tempArray, (xAxis + 2), (yAxis + 1));
              }
              if (checkForBlockedColor((xAxis + 2), (yAxis - 1), "black") === 0) {
                  pushToArray(tempArray, (xAxis + 2), (yAxis - 1));
              }
              if (checkForBlockedColor((xAxis - 2), (yAxis + 1), "black") === 0) {
                  pushToArray(tempArray, (xAxis - 2), (yAxis + 1));
              }
              if (checkForBlockedColor((xAxis - 2), (yAxis - 1), "black") === 0) {
                  pushToArray(tempArray, (xAxis - 2), (yAxis - 1));
              }
              tempArray.forEach(function(value) { divArray.push(value); });
              tempArray.forEach(function(value) {
                if ("box-" + value === kingPosition) {
                  attackPiecesBlack.push([piece, piecePosition]);
                }
              });
              tempArray.length = 0;
            }

          else if (piece.match(/glyphicon-king/)) {
            if (checkForBlockedColor((xAxis + 1), (yAxis + 1), "black") === 0) {
              pushToArray(tempArray, (xAxis + 1), (yAxis + 1));
            }
            if (checkForBlockedColor((xAxis - 1), (yAxis - 1), "black") === 0) {
              pushToArray(tempArray, (xAxis - 1), (yAxis - 1));
            }
            if (checkForBlockedColor((xAxis + 1), (yAxis - 1), "black") === 0) {
              pushToArray(tempArray, (xAxis + 1), (yAxis - 1));
            }
            if (checkForBlockedColor((xAxis - 1), (yAxis + 1), "black") === 0) {
              pushToArray(tempArray, (xAxis - 1), (yAxis + 1));
            }
            if (checkForBlockedColor((xAxis), (yAxis + 1), "black") === 0) {
              pushToArray(tempArray, (xAxis), (yAxis + 1));
            }
            if (checkForBlockedColor((xAxis), (yAxis - 1), "black") === 0) {
              pushToArray(tempArray, (xAxis), (yAxis - 1));
            }
            if (checkForBlockedColor((xAxis + 1), (yAxis), "black") === 0) {
              pushToArray(tempArray, (xAxis + 1), (yAxis));
            }
            if (checkForBlockedColor((xAxis - 1), (yAxis), "black") === 0) {
              pushToArray(tempArray, (xAxis - 1), (yAxis));
            }
            tempArray.forEach(function(value) { divArray.push(value); });
            tempArray.forEach(function(value) {
              if ("box-" + value === kingPosition) {
                attackPiecesBlack.push([piece, piecePosition]);
              }
            })
            tempArray.length = 0;
          }
          else if (piece.match(/glyphicon-tower/)) {
            var newY = yAxis + 1;
            while (newY <= 8 )  {
              if (checkForBlockedColor(xAxis, newY, "black") !== 0) { break;};
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlockedColor(xAxis, newY, "white") !== 0) { break;};
              newY += 1;
            }
            newY = yAxis - 1;
            while (newY >= 1) {
              if (checkForBlockedColor(xAxis, newY, "black") !== 0) { break;};
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlockedColor(xAxis, newY, "white") !== 0) { break;};
              newY -= 1;
            }
            var newX = xAxis + 1;
            while (newX <= 8) {
              if (checkForBlockedColor(newX, yAxis, "black") !== 0) {break;};
              pushToArray(tempArray, newX, yAxis);
              if (checkForBlockedColor(newX, yAxis, "white") !== 0) {break;};
              newX += 1;
            }
            newX = xAxis - 1;
            while (newX >= 1) {
              if (checkForBlockedColor(newX, yAxis, "black") !== 0) {break;};
              pushToArray(tempArray, newX, yAxis);
              if (checkForBlockedColor(newX, yAxis, "white") !== 0) {break;};
              newX -= 1;
            }
            tempArray.forEach(function(value) { divArray.push(value); });
            tempArray.forEach(function(value) {
              if ("box-" + value === kingPosition) {
                attackPiecesBlack.push([piece, piecePosition]);
              }
            })
            tempArray.length = 0;
          }
          else if (piece.match(/glyphicon-bishop/)) {
            var newY = yAxis + 1;
            var newX = xAxis + 1
            while (newY <= 8 && newX <= 8)  {
              if (checkForBlockedColor(newX, newY, "black") !== 0) { break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "white") !== 0) { break;};
              newY += 1;
              newX += 1;
            }
            newY = yAxis - 1;
            newX = xAxis - 1;
            while (newY >= 1 && newX >= 1) {
              if (checkForBlockedColor(newX, newY, "black") !== 0) { break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "white") !== 0) { break;};
              newY -= 1;
              newX -= 1;
            }
            newX = xAxis + 1;
            newY = yAxis - 1;
            while (newX <= 8 && newY >= 1) {
              if (checkForBlockedColor(newX, newY, "black") !== 0) {break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "white") !== 0) {break;};
              newX += 1;
              newY -= 1;
            }
            newX = xAxis - 1;
            newY = yAxis + 1;
            while (newX >= 1 && newY <= 8) {
              if (checkForBlockedColor(newX, newY, "black") !== 0) {break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "white") !== 0) {break;};
              newX -= 1;
              newY += 1;
            }
            tempArray.forEach(function(value) { divArray.push(value); });
            tempArray.forEach(function(value) {
              if ("box-" + value === kingPosition) {
                attackPiecesBlack.push([piece, piecePosition]);
              }
            })
            tempArray.length = 0;
          }
          else if (piece.match(/glyphicon-queen/)) {
            var newY = yAxis + 1;
            var newX = xAxis + 1
            while (newY <= 8 && newX <= 8)  {
              if (checkForBlockedColor(newX, newY, "black") !== 0) { break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "white") !== 0) { break;};
              newY += 1;
              newX += 1;
            }
            newY = yAxis - 1;
            newX = xAxis - 1;
            while (newY >= 1 && newX >= 1) {
              if (checkForBlockedColor(newX, newY, "black") !== 0) { break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "white") !== 0) { break;};
              newY -= 1;
              newX -= 1;
            }
            newX = xAxis + 1;
            newY = yAxis - 1;
            while (newX <= 8 && newX >= 1) {
              if (checkForBlockedColor(newX, newY, "black") !== 0) {break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "white") !== 0) {break;};
              newX += 1;
              newY -= 1;
            }
            newX = xAxis - 1;
            newY = yAxis + 1;
            while (newX >= 1) {
              if (checkForBlockedColor(newX, newY, "black") !== 0) {break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "white") !== 0) {break;};
              newX -= 1;
              newY += 1;
            }
            newY = yAxis + 1;
            while (newY <= 8 )  {
              if (checkForBlockedColor(xAxis, newY, "black") !== 0) { break;};
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlockedColor(xAxis, newY, "white") !== 0) { break;};
              newY += 1;
            }
            newY = yAxis - 1;
            while (newY >= 1) {
              if (checkForBlockedColor(xAxis, newY, "black") !== 0) { break;};
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlockedColor(xAxis, newY, "white") !== 0) { break;};
              newY -= 1;
            }
            newX = xAxis + 1;
            while (newX <= 8) {
              if (checkForBlockedColor(newX, yAxis, "black") !== 0) {break;};
              pushToArray(tempArray, newX, yAxis);
              if (checkForBlockedColor(newX, yAxis, "white") !== 0) {break;};
              newX += 1;
            }
            newX = xAxis - 1;
            while (newX >= 1) {
              if (checkForBlockedColor(newX, yAxis, "black") !== 0) {break;};
              pushToArray(tempArray, newX, yAxis);
              if (checkForBlockedColor(newX, yAxis, "white") !== 0) {break;};
              newX -= 1;
            }
            tempArray.forEach(function(value) { divArray.push(value); });
            blackPosition = divArray;
            tempArray.forEach(function(value) {
              if ("box-" + value === kingPosition) {
                attackPiecesBlack.push([piece, piecePosition]);
              }
            });
            tempArray.length = 0;
          }
        })
          // Psuedocode //
          // Then, if attackPiece is knight, king, or pawn, allow other moves that capture attackPiece (same box) //
          // If attackPiece is bishop, queen, or rook, test boxes in between king and attackPiece, and allow only those pieces or capture moves //
          // in Droppable, test for array of droppables of check-side, if none, declare game over / checkmate //

        }
        else if (piece.match(/white/)) {
          var divArray = [];
          // function to find all white pieces //
          $('.white').each(function(i) {
            var tempArray = [];
            var kingPosition = $('.b-king').parent().attr('id');
            var piece = $(this).attr('class');
            var piecePosition = $(this).parent().attr('id');
            var letterVar = $(this).parent().attr('id')[4];
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var yAxis = parseInt($(this).parent().attr('id')[5]);

            if (piece.match(/glyphicon-pawn/)) {
                // check for each individual move //
                if (checkForBlocked(xAxis, (yAxis - 1)) === 0) {
                  pushToArray(tempArray, xAxis, (yAxis - 1));
                }
                if (checkForBlocked(xAxis, (yAxis - 2)) === 0 && yAxis === 7) {
                  pushToArray(tempArray, xAxis, (yAxis - 2));
                }
                if (checkForBlockedColor((xAxis -1), (yAxis - 1), "black") === 1) {
                  pushToArray(tempArray, (xAxis - 1), (yAxis - 1));
                }
                if (checkForBlockedColor((xAxis + 1), (yAxis - 1), "black") === 1) {
                  pushToArray(tempArray, (xAxis + 1), (yAxis - 1));
                }
                tempArray.forEach(function(value) { divArray.push(value); });
                tempArray.forEach(function(value) {
                  if ("box-" + value === kingPosition) {
                    attackPiecesWhite.push([piece, piecePosition]);
                  }
                })
                tempArray.length = 0;
            }
            else if (piece.match(/glyphicon-knight/)) {
              //check each knight move //
              if (checkForBlockedColor((xAxis + 1), (yAxis + 2), "white") === 0) {
                  pushToArray(tempArray, (xAxis + 1), (yAxis + 2));
              }
              if (checkForBlockedColor((xAxis + 1), (yAxis - 2), "white") === 0) {
                  pushToArray(tempArray, (xAxis + 1), (yAxis - 2));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis + 2), "white") === 0) {
                  pushToArray(tempArray, (xAxis - 1), (yAxis + 2));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis - 2), "white") === 0) {
                  pushToArray(tempArray, (xAxis - 1), (yAxis - 2));
              }
              if (checkForBlockedColor((xAxis + 2), (yAxis + 1), "white") === 0) {
                  pushToArray(tempArray, (xAxis + 2), (yAxis + 1));
              }
              if (checkForBlockedColor((xAxis + 2), (yAxis - 1), "white") === 0) {
                  pushToArray(tempArray, (xAxis + 2), (yAxis - 1));
              }
              if (checkForBlockedColor((xAxis - 2), (yAxis + 1), "white") === 0) {
                  pushToArray(tempArray, (xAxis - 2), (yAxis + 1));
              }
              if (checkForBlockedColor((xAxis - 2), (yAxis - 1), "white") === 0) {
                  pushToArray(tempArray, (xAxis - 2), (yAxis - 1));
              }
              tempArray.forEach(function(value) { divArray.push(value); });
              tempArray.forEach(function(value) {
                if ("box-" + value === kingPosition) {
                  attackPiecesWhite.push([piece, piecePosition]);
                }
              })
              tempArray.length = 0;

            }
          else if (piece.match(/glyphicon-king/)) {
            if (checkForBlockedColor((xAxis + 1), (yAxis + 1), "white") === 0) {
              pushToArray(tempArray, (xAxis + 1), (yAxis + 1));
            }
            if (checkForBlockedColor((xAxis - 1), (yAxis - 1), "white") === 0) {
              pushToArray(tempArray, (xAxis - 1), (yAxis - 1));
            }
            if (checkForBlockedColor((xAxis + 1), (yAxis - 1), "white") === 0) {
              pushToArray(tempArray, (xAxis + 1), (yAxis - 1));
            }
            if (checkForBlockedColor((xAxis - 1), (yAxis + 1), "white") === 0) {
              pushToArray(tempArray, (xAxis - 1), (yAxis + 1));
            }
            if (checkForBlockedColor((xAxis), (yAxis + 1), "white") === 0) {
              pushToArray(tempArray, (xAxis), (yAxis + 1));
            }
            if (checkForBlockedColor((xAxis), (yAxis - 1), "white") === 0) {
              pushToArray(tempArray, (xAxis), (yAxis - 1));
            }
            if (checkForBlockedColor((xAxis + 1), (yAxis), "white") === 0) {
              pushToArray(tempArray, (xAxis + 1), (yAxis));
            }
            if (checkForBlockedColor((xAxis - 1), (yAxis), "white") === 0) {
              pushToArray(tempArray, (xAxis - 1), (yAxis));
            }
            tempArray.forEach(function(value) { divArray.push(value); });
            tempArray.forEach(function(value) {
              if ("box-" + value === kingPosition) {
                attackPiecesWhite.push([piece, piecePosition]);
              }
            })
            tempArray.length = 0;
          }
          else if (piece.match(/glyphicon-tower/)) {
            var newY = yAxis + 1;
            while (newY <= 8 )  {
              if (checkForBlockedColor(xAxis, newY, "white") !== 0) { break;};
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlockedColor(xAxis, newY, "black") !== 0) { break;};
              newY += 1;
            }
            newY = yAxis - 1;
            while (newY >= 1) {
              if (checkForBlockedColor(xAxis, newY, "white") !== 0) { break;};
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlockedColor(xAxis, newY, "black") !== 0) { break;};
              newY -= 1;
            }
            var newX = xAxis + 1;
            while (newX <= 8) {
              if (checkForBlockedColor(newX, yAxis, "white") !== 0) {break;};
              pushToArray(tempArray, newX, yAxis);
              if (checkForBlockedColor(newX, yAxis, "black") !== 0) {break;};
              newX += 1;
            }
            newX = xAxis - 1;
            while (newX >= 1) {
              if (checkForBlockedColor(newX, yAxis, "white") !== 0) {break;};
              pushToArray(tempArray, newX, yAxis);
              if (checkForBlockedColor(newX, yAxis, "black") !== 0) {break;};
              newX -= 1;
            }
            tempArray.forEach(function(value) { divArray.push(value); });
            tempArray.forEach(function(value) {
              if ("box-" + value === kingPosition) {
                attackPiecesWhite.push([piece, piecePosition]);
              }
            })
            tempArray.length = 0;
          }
          else if (piece.match(/glyphicon-bishop/)) {
            var newY = yAxis + 1;
            var newX = xAxis + 1
            while (newY <= 8 && newX <= 8)  {
              if (checkForBlockedColor(newX, newY, "white") !== 0) { break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "black") !== 0) { break;};
              newY += 1;
              newX += 1;
            }
            newY = yAxis - 1;
            newX = xAxis - 1;
            while (newY >= 1 && newX >= 1) {
              if (checkForBlockedColor(newX, newY, "white") !== 0) { break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "black") !== 0) { break;};
              newY -= 1;
              newX -= 1;
            }
            newX = xAxis + 1;
            newY = yAxis - 1;
            while (newX <= 8 && newY >= 1) {
              if (checkForBlockedColor(newX, newY, "white") !== 0) {break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "black") !== 0) {break;};
              newX += 1;
              newY -= 1;
            }
            newX = xAxis - 1;
            newY = yAxis + 1;
            while (newX >= 1 && newY <= 8) {
              if (checkForBlockedColor(newX, newY, "white") !== 0) {break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "black") !== 0) {break;};
              newX -= 1;
              newY += 1;
            }
            tempArray.forEach(function(value) { divArray.push(value); });
            tempArray.forEach(function(value) {
              if ("box-" + value === kingPosition) {
                attackPiecesWhite.push([piece, piecePosition]);
              }
            })
            tempArray.length = 0;
          }
          else if (piece.match(/glyphicon-queen/)) {
            var newY = yAxis + 1;
            var newX = xAxis + 1
            while (newY <= 8 && newX <= 8)  {
              if (checkForBlockedColor(newX, newY, "white") !== 0) { break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "black") !== 0) { break;};
              newY += 1;
              newX += 1;
            }
            newY = yAxis - 1;
            newX = xAxis - 1;
            while (newY >= 1 && newX >= 1) {
              if (checkForBlockedColor(newX, newY, "white") !== 0) { break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "black") !== 0) { break;};
              newY -= 1;
              newX -= 1;
            }
            newX = xAxis + 1;
            newY = yAxis - 1;
            while (newX <= 8 && newX >= 1) {
              if (checkForBlockedColor(newX, newY, "white") !== 0) {break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "black") !== 0) {break;};
              newX += 1;
              newY -= 1;
            }
            newX = xAxis - 1;
            newY = yAxis + 1;
            while (newX >= 1) {
              if (checkForBlockedColor(newX, newY, "white") !== 0) {break;};
              pushToArray(tempArray, newX, newY);
              if (checkForBlockedColor(newX, newY, "black") !== 0) {break;};
              newX -= 1;
              newY += 1;
            }
            newY = yAxis + 1;
            while (newY <= 8 )  {
              if (checkForBlockedColor(xAxis, newY, "white") !== 0) { break;};
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlockedColor(xAxis, newY, "black") !== 0) { break;};
              newY += 1;
            }
            newY = yAxis - 1;
            while (newY >= 1) {
              if (checkForBlockedColor(xAxis, newY, "white") !== 0) { break;};
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlockedColor(xAxis, newY, "black") !== 0) { break;};
              newY -= 1;
            }
            newX = xAxis + 1;
            while (newX <= 8) {
              if (checkForBlockedColor(newX, yAxis, "white") !== 0) {break;};
              pushToArray(tempArray, newX, yAxis);
              if (checkForBlockedColor(newX, yAxis, "black") !== 0) {break;};
              newX += 1;
            }
            newX = xAxis - 1;
            while (newX >= 1) {
              if (checkForBlockedColor(newX, yAxis, "white") !== 0) {break;};
              pushToArray(tempArray, newX, yAxis);
              if (checkForBlockedColor(newX, yAxis, "black") !== 0) {break;};
              newX -= 1;
            }
            tempArray.forEach(function(value) { divArray.push(value); });
            blackPosition = divArray;
            tempArray.forEach(function(value) {
              if ("box-" + value === kingPosition) {
                attackPiecesWhite.push([piece, piecePosition]);
              }
            });
            tempArray.length = 0;
          }
        });
      }

        var boolTest = $('.white').draggable("option", "disabled");

        // toggle turn for white and white //
        if (boolTest === false) {
          $('.white').draggable('disable');
          $('.black').draggable('enable');
        }
        else {
          $('.white').draggable('enable');
          $('.black').draggable('disable');
        }
      }
    });

    // set clock //
    var addedTimePerMove, formatTime, initialTime, intervalId, pad, remainingTime, switchTurn, turn, update;
    initialTime = 15 * 60;
    addedTimePerMove = 0;
    turn = 1;
    remainingTime = [initialTime, initialTime];
    pad = function(x) {
      return ('0' + x).slice(-2);
    };
    formatTime = function(t) {
      var hours, minutes, seconds;
      seconds = t % 60;
      minutes = Math.floor(t / 60) % 60;
      hours = Math.floor(t / 3600);
      if (hours) {
        return "" + hours + ":" + (pad(minutes)) + ":" + (pad(seconds));
      } else {
        return "" + minutes + ":" + (pad(seconds));
      }
    };
    update = function() {
      var i;
      remainingTime[turn]--;
      for (i = 0; i < 2; i++) {
        $("#time" + i).text(formatTime(remainingTime[i]));
      }
      if (remainingTime[turn] <= 0) {
        $("#time" + turn).removeClass('turn').addClass('loser');
        return clearInterval(intervalId);
      }
    };
    switchTurn = function() {
        $("#time" + turn).removeClass('turn');
        turn = 1 - turn;
        $("#time" + turn).addClass('turn');
        return remainingTime[turn] += addedTimePerMove;
    };

    $('#time0').addClass('turn');
    return intervalId = setInterval(update, 1000);

});
