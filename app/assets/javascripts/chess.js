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

  // variables for check //
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
      console.log(cleanArray(whitePosition));
      console.log(cleanArray(blackPosition));
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

       // check for blocking white piece on space //
       function checkForBlockingWhite(xAxis, yAxis) {
         var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
         return $('.col-md-1').children('div[id*='+ letterArray[xAxis-1] + yAxis+']').children('span[class*=white]').length;
       };

       // check for blocking black piece on space //
       function checkForBlockingBlack(xAxis, yAxis) {
         var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
         return $('.col-md-1').children('div[id*=' + letterArray[xAxis-1] + yAxis+']').children('span[class*=black]').length;
       };

       // tests whether one move is found in an array of moves //
       function testKingMoves(array, location) {
       for (var i=0; i< array.length; i++) {
         if (array[i] == location) {
           return true;
         }
       }};

       // check for check and board position //
      //  console.log(pieceType);
      //  console.log(attackPiecesBlack.length);
      //  console.log(attackPiecesBlack);
      //  console.log(cleanArray(blackPosition));

       // check for check from two separate pieces -  if so, only king can move out of check //
       if (pieceType.match(/white/) && attackPiecesBlack.length === 2) {
         $('.droppable').droppable("disable");
         var yAxis = parseInt(startingPoint[5]);
         var xAxis = letterArray.indexOf(letterVar) + 1;
         var divArray = [];

         if (pieceType.match(/w-king/)) {

           // tests whether king move is targeted, then pushes move to divArray //
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

          // if king doesn't have any moves, then game over //
          if (divArray.length === 0) {
            alert('Game Over');
            window.location = '/';
          }
          divArray.forEach(enableElements);
       }

       // same function for black, if two attack pieces, must move king //
       else if (pieceType.match(/black/) && attackPiecesWhite.length === 2) {
         $('.droppable').droppable("disable");
         var yAxis = parseInt(startingPoint[5]);
         var xAxis = letterArray.indexOf(letterVar) + 1;
         var divArray = [];

         if (pieceType.match(/b-king/)) {
           // test if king move is in opponent's target, if not, push to array //
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

          // if no king moves, game over //
          if (divArray.length === 0) {
            alert('Game Over');
            window.location = '/';
          }
          divArray.forEach(enableElements);
       }

       // check for single piece check on white's turn //
       else if (pieceType.match(/white/) && attackPiecesBlack.length === 1) {
          // console.log($('.w-king').parent().attr('id'));
          // console.log(attackPiecesBlack[0][1]);
          var attackPieceType = attackPiecesBlack[0][0];
          var kingLocation = $('.w-king').parent().attr('id');
          var kingXAxis = letterArray.indexOf(kingLocation[4]) + 1;
          var kingYAxis = kingLocation[5];
          var attackXAxis = letterArray.indexOf(attackPiecesBlack[0][1][4]) + 1;
          var attackYAxis = attackPiecesBlack[0][1][5];
          var divArrayCheck = [];
          var divArray = [];

          // create a new array, divArrayCheck, that tests for spaces in between attack piece and king //
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
          // console.log(divArrayCheck);

          // now check each individual piece for moves in blocking / ending check - the six pieces are king, pawn, bishop, rook, queen, and knight //
          if (pieceType.match(/glyphicon-king/)) {
            $('.droppable').droppable("disable");

            // if king's moves not in black target, push move to divArray //
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
           divArray.forEach(enableElements);  // enable droppability on saved elements //

           // test if attack piece is bishop, queen, or rook - if so, you can block the check with an in-between space //
          if (pieceType.match(/glyphicon-pawn/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
            $('.droppable').droppable("disable");
            var yAxis = parseInt(startingPoint[5]);
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var divArray = [];

            if (checkForBlockingBlack(xAxis, (yAxis -1)) === 0 && testKingMoves(divArrayCheck, letterArray[xAxis -1] + (yAxis - 1))) {
              $(this).parent().prev().droppable('enable');
            }
            if (yAxis === 7 && checkForBlockingBlack(xAxis, (yAxis -2)) === 0 && testKingMoves(divArrayCheck, letterArray[xAxis - 1] + (yAxis - 2))) {
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

          // if attack piece is knight or pawn, you can only capture the piece //
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

          // same thing for other pieces - if attack piece is knight or pawn, only capture move is enabled - else, blocking moves enabled as well //
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

          // check for blocking moves for check //
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

          // checks for capture moves for check //
          if (pieceType.match(/glyphicon-bishop/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
            $('.droppable').droppable("disable");
            var yAxis = parseInt(startingPoint[5]);
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var divArray = [];

            // check x+ y+ axis //
            while (yAxis <= 8 && xAxis <= 8) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
              pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
              yAxis += 1;
              xAxis += 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check x- y- axis //
            while (yAxis >= 1 && xAxis >= 1) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis -= 1;
              xAxis -= 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check y- x+ axis //
            while (yAxis >= 1 && xAxis <= 8) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0 ) { break; };
              yAxis -= 1;
              xAxis += 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0 ) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check y+ x- axis //
            while (yAxis <= 8 && xAxis >= 1) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0 ) { break; };
              yAxis += 1;
              xAxis -= 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0 ) { break; };
            }
            divArray.forEach(enableElements);

          }

          // check for blocking moves for check //
          if (pieceType.match(/glyphicon-bishop/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
            $('.droppable').droppable("disable");
            var yAxis = parseInt(startingPoint[5]);
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var divArray = [];

            // check y+ x+ axis //
            while (yAxis <= 8 && xAxis <= 8) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis += 1;
              xAxis += 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check y- x- axis //
            while (yAxis >= 1 && xAxis >= 1) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis -= 1;
              xAxis -= 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check y- x+ axis //
            while (yAxis >= 1 && xAxis <= 8) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis -= 1;
              xAxis += 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check y+ x- axis //
            while ( yAxis <= 8 && xAxis >= 1) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis += 1;
              xAxis -= 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);
          }

          // checks for capture moves for check //
          if (pieceType.match(/glyphicon-queen/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
            $('.droppable').droppable("disable");
            var yAxis = parseInt(startingPoint[5]);
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var divArray = [];

            // check x+ y+ axis //
            while (xAxis <= 8 && yAxis <= 8) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis += 1;
              xAxis += 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check x- y- axis //
            while (xAxis >= 1 && yAxis >= 1) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis -= 1;
              xAxis -= 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check x- y+ axis //
            while (xAxis >= 1 && yAxis <= 8) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              xAxis -= 1;
              yAxis += 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check x+ y- axis //
            while (xAxis <= 8 && yAxis >= 1) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              xAxis += 1;
              yAxis -= 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check x+ axis //
            while (xAxis <= 8) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              xAxis += 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check x- axis //
            while (xAxis >= 1 ) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              xAxis -= 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check y+ axis //
            while (yAxis <= 8) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis += 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check y- axis //
            while (yAxis >= 1) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis -= 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);
          }

          // check for queen blocking moves in check //
          if (pieceType.match(/glyphicon-queen/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphiocn-tower/)) {
            $('.droppable').droppable("disable");
            var yAxis = parseInt(startingPoint[5]);
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var divArray = [];

            // check x+ y+ axis //
            while (xAxis <= 8 && yAxis <= 8) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis += 1;
              xAxis += 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check x- y- axis //
            while (xAxis >= 1 && yAxis >= 1) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis -= 1;
              xAxis -= 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check x- y+ axis //
            while (xAxis >= 1 && yAxis <= 8) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              xAxis -= 1;
              yAxis += 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check x+ y- axis //
            while (xAxis <= 8 && yAxis >= 1) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              xAxis += 1;
              yAxis -= 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check x+ axis //
            while (xAxis <= 8) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              xAxis += 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check x- axis //
            while (xAxis >= 1 ) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              xAxis -= 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check y+ axis //
            while (yAxis <= 8) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis += 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;

            // check y- axis //
            while (yAxis >= 1) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
              yAxis -= 1;
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
            }
            divArray.forEach(enableElements);

          }

          // check knight moves for capture in check //
          if (pieceType.match(/glyphicon-knight/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
            $('.droppable').droppable("disable");
            var yAxis = parseInt(startingPoint[5]);
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var divArray = [];

            if ((xAxis - 1) + "" + (yAxis - 2) === attackXAxis + "" + attackYAxis) {
              divArray.push(letterArray[xAxis -2] + (yAxis-2));
            }
            if ((xAxis - 1) + "" + (yAxis + 2) === attackXAxis + "" + attackYAxis) {
              divArray.push(letterArray[xAxis -2] + (yAxis+2));
            }
            if ((xAxis - 2) + "" + (yAxis - 1) === attackXAxis + "" + attackYAxis) {
              divArray.push(letterArray[xAxis -3] + (yAxis-1));
            }
            if ((xAxis - 2) + "" + (yAxis + 1) === attackXAxis + "" + attackYAxis) {
              divArray.push(letterArray[xAxis -3] + (yAxis+1));
            }
            if ((xAxis + 1) + "" + (yAxis + 2) === attackXAxis + "" + attackYAxis) {
              divArray.push(letterArray[xAxis] + (yAxis+2));
            }
            if ((xAxis + 1) + "" + (yAxis - 2) === attackXAxis + "" + attackYAxis) {
              divArray.push(letterArray[xAxis] + (yAxis-2));
            }
            if ((xAxis + 2) + "" + (yAxis + 1) === attackXAxis + "" + attackYAxis) {
              divArray.push(letterArray[xAxis +1] + (yAxis+1));
            }
            if ((xAxis + 2) + "" + (yAxis - 1) === attackXAxis + "" + attackYAxis) {
              divArray.push(letterArray[xAxis +1] + (yAxis-1));
            }
            divArray.forEach(enableElements);
          }

          // check knight moves for blocking in check //
          if (pieceType.match(/glyphicon-knight/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
            $('.droppable').droppable("disable");
            var yAxis = parseInt(startingPoint[5]);
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var divArray = [];

            if (testKingMoves(divArrayCheck, letterArray[xAxis - 2] + (yAxis -2) ) ) {
              divArray.push(letterArray[xAxis -2] + (yAxis-2));
            }
            if (testKingMoves(divArrayCheck, letterArray[xAxis - 2] + (yAxis +2) ) ) {
              divArray.push(letterArray[xAxis -2] + (yAxis+2));
            }
            if (testKingMoves(divArrayCheck, letterArray[xAxis - 3] + (yAxis -1) ) ) {
              divArray.push(letterArray[xAxis -3] + (yAxis-1));
            }
            if (testKingMoves(divArrayCheck, letterArray[xAxis - 3] + (yAxis + 1) ) ) {
              divArray.push(letterArray[xAxis -3] + (yAxis + 1));
            }
            if (testKingMoves(divArrayCheck, letterArray[xAxis] + (yAxis +2) ) ) {
              divArray.push(letterArray[xAxis] + (yAxis + 2));
            }
            if (testKingMoves(divArrayCheck, letterArray[xAxis] + (yAxis -2) ) ) {
              divArray.push(letterArray[xAxis] + (yAxis-2));
            }
            if (testKingMoves(divArrayCheck, letterArray[xAxis + 1] + (yAxis +1) ) ) {
              divArray.push(letterArray[xAxis + 1] + (yAxis + 1));
            }
            if (testKingMoves(divArrayCheck, letterArray[xAxis + 1] + (yAxis -1) ) ) {
              divArray.push(letterArray[xAxis + 1] + (yAxis - 1));
            }
            divArray.forEach(enableElements);
          }
      }


      // Check for Black Pieces in check  ///
       else if (pieceType.match(/black/) && attackPiecesWhite.length === 1) {
         var kingLocation = $('.b-king').parent().attr('id');
         var kingXAxis = letterArray.indexOf(kingLocation[4]) + 1;
         var kingYAxis = kingLocation[5];
         var attackXAxis = letterArray.indexOf(attackPiecesWhite[0][1][4]) + 1;
         var attackYAxis = attackPiecesWhite[0][1][5];
         var divArrayCheck = [];

         // find spaces in between king and attack piece, then load to a new array, divArrayCheck //
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

         // check piece by piece for moves blocking / ending check //
         if (pieceType.match(/glyphicon-king/)) {
           $('.droppable').droppable("disable");
           var yAxis = parseInt(startingPoint[5]);
           var xAxis = letterArray.indexOf(letterVar) + 1;
           var divArray = [];

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
           divArray.forEach(enableElements);
          }

          // check pawn's moves for blocking / ending check with capture//
         if (pieceType.match(/glyphicon-pawn/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
           $('.droppable').droppable("disable");
           var yAxis = parseInt(startingPoint[5]);
           var xAxis = letterArray.indexOf(letterVar) + 1;
           var divArray = [];
           if (checkForBlockingWhite(xAxis, (yAxis -1)) === 0 && testKingMoves(divArrayCheck, letterArray[xAxis -1] + (yAxis - 1))) {
             $(this).parent().next().droppable('enable');
           }
           if (yAxis === 7 && checkForBlockingWhite(xAxis, (yAxis -2)) === 0 && testKingMoves(divArrayCheck, letterArray[xAxis - 1] + (yAxis - 2))) {
             $(this).parent().next().next().droppable('enable');
           }
           if (checkForBlockingWhite((xAxis + 1), (yAxis - 1)) !== 0 && (xAxis + 1) + "" + (yAxis -1) === attackXAxis + "" + attackYAxis) {
             pushElementToArray(divArray, (xAxis + 1), (yAxis - 1));
           }
           if (checkForBlockingWhite((xAxis - 1), (yAxis - 1)) !== 0 && (xAxis - 1) + "" +  (yAxis -1) === attackXAxis + "" + attackYAxis ) {
             pushElementToArray(divArray, (xAxis - 1), (yAxis - 1));
           }
           divArray.forEach(enableElements);
         }

         // check pawn's move for blocking check //
         if (pieceType.match(/glyphicon-pawn/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
           $('.droppable').droppable("disable");
           var yAxis = parseInt(startingPoint[5]);
           var xAxis = letterArray.indexOf(letterVar) + 1;
           var divArray = [];

           if (checkForBlockingWhite((xAxis + 1), (yAxis - 1)) !== 0 && (xAxis + 1) + "" + (yAxis -1) === attackXAxis + "" + attackYAxis) {
             pushElementToArray(divArray, (xAxis + 1), (yAxis - 1));
           }
           if (checkForBlockingWhite((xAxis - 1), (yAxis - 1)) !== 0 && (xAxis - 1) + "" +  (yAxis -1) === attackXAxis + "" + attackYAxis ) {
             pushElementToArray(divArray, (xAxis - 1), (yAxis - 1));
           }
           divArray.forEach(enableElements);
         }

         // check rook's moves for ending check with capture //
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
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
              yAxis += 1;
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
            }
            divArray.forEach(enableElements);

            // set -y vertical //
            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;
            while (yAxis >= 1 ) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
              pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
              yAxis -= 1;
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
            }
            divArray.forEach(enableElements);

            // set + x horizontal //
            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;
            while (xAxis <= 8 ) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
              pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
              xAxis += 1;
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
            }
            divArray.forEach(enableElements);

            // set - x horizontal //
            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;
            while (xAxis >= 1 ) {
              if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
              pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
              xAxis -= 1;
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
            }
            divArray.forEach(enableElements);
         }

         // check rook's moves for ending check with block //
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
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
              yAxis += 1;
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
            }
            divArray.forEach(enableElements);

            // set -y vertical //
            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;
            while (yAxis >= 1 ) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
              pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
              yAxis -= 1;
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
            }
            divArray.forEach(enableElements);

            // set + x horizontal //
            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;
            while (xAxis <= 8 ) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
              pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
              xAxis += 1;
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
            }
            divArray.forEach(enableElements);

            // set - x horizontal //
            yAxis = parseInt(startingPoint[5]);
            xAxis = letterArray.indexOf(letterVar) + 1;
            while (xAxis >= 1 ) {
              if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
              pushElementToArray(divArray, xAxis, yAxis);
              }
              if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
              xAxis -= 1;
              if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
            }
            divArray.forEach(enableElements);
         }

          // check bishop moves for ending check with capture //
         if (pieceType.match(/glyphicon-bishop/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
           $('.droppable').droppable("disable");
           var yAxis = parseInt(startingPoint[5]);
           var xAxis = letterArray.indexOf(letterVar) + 1;
           var divArray = [];

           // check x+ y+ axis //
           while (yAxis <= 8 && xAxis <= 8) {
             if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
             pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             yAxis += 1;
             xAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check y- x- axis //
           while (yAxis >= 1 && xAxis >= 1) {
             if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis -= 1;
             xAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check y- x+ axis //
           while (yAxis >= 1 && xAxis <= 8) {
             if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0 ) { break; };
             yAxis -= 1;
             xAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0 ) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check y+ x- axis //
           while (yAxis <= 8 && xAxis >= 1) {
             if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0 ) { break; };
             yAxis += 1;
             xAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0 ) { break; };
           }
           divArray.forEach(enableElements);

         }

         // check bishop moves for ending check with block //
         if (pieceType.match(/glyphicon-bishop/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
           $('.droppable').droppable("disable");
           var yAxis = parseInt(startingPoint[5]);
           var xAxis = letterArray.indexOf(letterVar) + 1;
           var divArray = [];

           // check y+ x+ axis //
           while (yAxis <= 8 && xAxis <= 8) {
             if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis += 1;
             xAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check y- x- axis //
           while (yAxis >= 1 && xAxis >= 1) {
             if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis -= 1;
             xAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check y- x+ axis //
           while (yAxis >= 1 && xAxis <= 8) {
             if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis -= 1;
             xAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check y- x+ axis //
           while ( yAxis <= 8 && xAxis >= 1) {
             if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis += 1;
             xAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);
         }

         // check queen's moves for ending check with capture //
         if (pieceType.match(/glyphicon-queen/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
           $('.droppable').droppable("disable");
           var yAxis = parseInt(startingPoint[5]);
           var xAxis = letterArray.indexOf(letterVar) + 1;
           var divArray = [];

           // check y+ x+ axis //
           while (xAxis <= 8 && yAxis <= 8) {
             if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis += 1;
             xAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check y- x- axis //
           while (xAxis >= 1 && yAxis >= 1) {
             if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis -= 1;
             xAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check x- y+ axis //
           while (xAxis >= 1 && yAxis <= 8) {
             if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             xAxis -= 1;
             yAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check x+ y- axis //
           while (xAxis <= 8 && yAxis >= 1) {
             if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             xAxis += 1;
             yAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check x+ axis //
           while (xAxis <= 8) {
             if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             xAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check x- axis //
           while (xAxis >= 1 ) {
             if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             xAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check y+ axis //
           while (yAxis <= 8) {
             if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check y- axis //
           while (yAxis >= 1) {
             if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);
         }

         // check queen's moves for ending check with block //
         if (pieceType.match(/glyphicon-queen/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphiocn-tower/)) {
           $('.droppable').droppable("disable");
           var yAxis = parseInt(startingPoint[5]);
           var xAxis = letterArray.indexOf(letterVar) + 1;
           var divArray = [];

           // check x+ y+ axis //
           while (xAxis <= 8 && yAxis <= 8) {
             if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis += 1;
             xAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check x- y- axis //
           while (xAxis >= 1 && yAxis >= 1) {
             if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis -= 1;
             xAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check x- y+ axis //
           while (xAxis >= 1 && yAxis <= 8) {
             if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             xAxis -= 1;
             yAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check x+ y- axis //
           while (xAxis <= 8 && yAxis >= 1) {
             if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             xAxis += 1;
             yAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check x+ axis //
           while (xAxis <= 8) {
             if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             xAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check x- axis //
           while (xAxis >= 1 ) {
             if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             xAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check y+ axis //
           while (yAxis <= 8) {
             if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;

           // check y- axis //
           while (yAxis >= 1) {
             if (testKingMoves(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
               pushElementToArray(divArray, xAxis, yAxis);
             }
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break; };
             yAxis -= 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break; };
           }
           divArray.forEach(enableElements);

         }

         // check knight moves for ending check with capture //
         if (pieceType.match(/glyphicon-knight/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
           $('.droppable').droppable("disable");
           var yAxis = parseInt(startingPoint[5]);
           var xAxis = letterArray.indexOf(letterVar) + 1;
           var divArray = [];

           if ((xAxis - 1) + "" + (yAxis - 2) === attackXAxis + "" + attackYAxis) {
             divArray.push(letterArray[xAxis -2] + (yAxis-2));
           }
           if ((xAxis - 1) + "" + (yAxis + 2) === attackXAxis + "" + attackYAxis) {
             divArray.push(letterArray[xAxis -2] + (yAxis+2));
           }
           if ((xAxis - 2) + "" + (yAxis - 1) === attackXAxis + "" + attackYAxis) {
             divArray.push(letterArray[xAxis -3] + (yAxis-1));
           }
           if ((xAxis - 2) + "" + (yAxis + 1) === attackXAxis + "" + attackYAxis) {
             divArray.push(letterArray[xAxis -3] + (yAxis+1));
           }
           if ((xAxis + 1) + "" + (yAxis + 2) === attackXAxis + "" + attackYAxis) {
             divArray.push(letterArray[xAxis] + (yAxis+2));
           }
           if ((xAxis + 1) + "" + (yAxis - 2) === attackXAxis + "" + attackYAxis) {
             divArray.push(letterArray[xAxis] + (yAxis-2));
           }
           if ((xAxis + 2) + "" + (yAxis + 1) === attackXAxis + "" + attackYAxis) {
             divArray.push(letterArray[xAxis +1] + (yAxis+1));
           }
           if ((xAxis + 2) + "" + (yAxis - 1) === attackXAxis + "" + attackYAxis) {
             divArray.push(letterArray[xAxis +1] + (yAxis-1));
           }
           divArray.forEach(enableElements);
         }

         // check knight moves for ending check with block //
         if (pieceType.match(/glyphicon-knight/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
           $('.droppable').droppable("disable");
           var yAxis = parseInt(startingPoint[5]);
           var xAxis = letterArray.indexOf(letterVar) + 1;
           var divArray = [];

           if (testKingMoves(divArrayCheck, letterArray[xAxis - 2] + (yAxis -2) ) ) {
             divArray.push(letterArray[xAxis -2] + (yAxis-2));
           }
           if (testKingMoves(divArrayCheck, letterArray[xAxis - 2] + (yAxis +2) ) ) {
             divArray.push(letterArray[xAxis -2] + (yAxis+2));
           }
           if (testKingMoves(divArrayCheck, letterArray[xAxis - 3] + (yAxis -1) ) ) {
             divArray.push(letterArray[xAxis -3] + (yAxis-1));
           }
           if (testKingMoves(divArrayCheck, letterArray[xAxis - 3] + (yAxis + 1) ) ) {
             divArray.push(letterArray[xAxis -3] + (yAxis + 1));
           }
           if (testKingMoves(divArrayCheck, letterArray[xAxis] + (yAxis +2) ) ) {
             divArray.push(letterArray[xAxis] + (yAxis + 2));
           }
           if (testKingMoves(divArrayCheck, letterArray[xAxis] + (yAxis -2) ) ) {
             divArray.push(letterArray[xAxis] + (yAxis-2));
           }
           if (testKingMoves(divArrayCheck, letterArray[xAxis + 1] + (yAxis +1) ) ) {
             divArray.push(letterArray[xAxis + 1] + (yAxis + 1));
           }
           if (testKingMoves(divArrayCheck, letterArray[xAxis + 1] + (yAxis -1) ) ) {
             divArray.push(letterArray[xAxis + 1] + (yAxis - 1));
           }
           divArray.forEach(enableElements);
         }
       }

       // And under regular circumstances ---- no check //
       else {

        // set forward movement for black pawns //
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

        // set movement for white pawns //
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

        // set movement for black rooks //
        else if (pieceType.match(/glyphicon-tower black/)) {
          $('.droppable').droppable("disable");
          var yAxis = parseInt(startingPoint[5]);
          var xAxis = letterArray.indexOf(letterVar) + 1;
          var divArray = [];

          // sets +y axis //
           while (yAxis <= 8 ) {
            pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;}
             yAxis += 1;
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;}
           }
           divArray.forEach(enableElements);

           // set -y axis //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (yAxis >= 1 ) {
             pushElementToArray(divArray, xAxis, yAxis);
            if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             yAxis -= 1;
            if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set + x axis //
           yAxis = parseInt(startingPoint[5]);
           xAxis = letterArray.indexOf(letterVar) + 1;
           while (xAxis <= 8 ) {
             pushElementToArray(divArray, xAxis, yAxis);
             if (checkForBlockingWhite(xAxis, yAxis) !== 0) { break;};
             xAxis += 1;
             if (checkForBlockingBlack(xAxis, yAxis) !== 0) { break;};
           }
           divArray.forEach(enableElements);

           // set - x axis //
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

        // set movements for white king, while avoiding check spaces //
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

        // set movements for black king, while avoiding check spaces //
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


  // start the game with white //
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

        // change timer when player's turn is over //
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

        // Here it is: the checkmate code!!!! After a player's turn, check the opponent player's board if they are in check and calculate their potential moves. If the moves equal 0, then mate!//

        var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];

        if (piece.match(/black/)) {
          var divArray = [];

          // these functions are basically copies of the ones used in the draggable closure. I couldn't get those to work, so now we have these ones! //

          function checkForBlocked(xAxis, yAxis) {
            return $('.col-md-1').children('div[id*=' + letterArray[xAxis - 1] + yAxis.toString() + ']').children().length;
          }

          function checkForBlockedColor(xAxis, yAxis, color) {
            return $('.col-md-1').children('div[id*=' + letterArray[xAxis - 1] + yAxis.toString() + ']').children('span[class*=' + color + ']').length;
          }

          function testBlockedKing(array, location) {
          for (var i=0; i< array.length; i++) {
            if (array[i] == location) {
              return true;
            }
          }};

          function pushToArray(array, xAxis, yAxis) {
            array.push(letterArray[xAxis - 1] + yAxis);
          };

          // function to find all black pieces and their moves, then save into the blackPosition array //
          $('.black').each(function(i) {
            var tempArray = [];
            var kingPosition = $('.w-king').parent().attr('id');
            var bKingPosition = $('.b-king').parent().attr('id');
            var piece = $(this).attr('class');
            var piecePosition = $(this).parent().attr('id');
            var letterVar = $(this).parent().attr('id')[4];
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var yAxis = parseInt($(this).parent().attr('id')[5]);

            // save all the pawn moves//
            if (piece.match(/glyphicon-pawn/)) {
                // check for each individual move //
                if (checkForBlocked(xAxis, (yAxis + 1)) === 0) {
                  pushToArray(tempArray, xAxis, (yAxis + 1));
                }
                if (checkForBlocked(xAxis, (yAxis + 2)) === 0 && yAxis === 2) {
                  pushToArray(tempArray, xAxis, (yAxis + 2));
                }
                if (checkForBlocked((xAxis -1), (yAxis + 1)) === 1) {
                  pushToArray(tempArray, (xAxis - 1), (yAxis + 1));
                }
                if (checkForBlocked((xAxis + 1), (yAxis + 1)) === 1) {
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
            // save all the knight moves//
            else if (piece.match(/glyphicon-knight/)) {

              pushToArray(tempArray, (xAxis + 1), (yAxis + 2));
              pushToArray(tempArray, (xAxis + 1), (yAxis - 2));
              pushToArray(tempArray, (xAxis - 1), (yAxis + 2));
              pushToArray(tempArray, (xAxis - 1), (yAxis - 2));
              pushToArray(tempArray, (xAxis + 2), (yAxis + 1));
              pushToArray(tempArray, (xAxis + 2), (yAxis - 1));
              pushToArray(tempArray, (xAxis - 2), (yAxis + 1));
              pushToArray(tempArray, (xAxis - 2), (yAxis - 1));

              tempArray.forEach(function(value) { divArray.push(value); });
              tempArray.forEach(function(value) {
                if ("box-" + value === kingPosition) {
                  attackPiecesBlack.push([piece, piecePosition]);
                }
              });
              tempArray.length = 0;
            }

            // save the king --- moves...//
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

          // save the rook moves //
          else if (piece.match(/glyphicon-tower/)) {
            var newY = yAxis + 1;
            while (newY <= 8 )  {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newY += 1;
            }
            newY = yAxis - 1;
            while (newY >= 1) {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newY -= 1;
            }
            var newX = xAxis + 1;
            while (newX <= 8) {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newX += 1;
              newY = yAxis;
            }
            newX = xAxis - 1;
            while (newX >= 1) {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newX -= 1;
              newY = yAxis;
            }
            tempArray.forEach(function(value) { divArray.push(value); });
            tempArray.forEach(function(value) {
              if ("box-" + value === kingPosition) {
                attackPiecesBlack.push([piece, piecePosition]);
              }
            })
            tempArray.length = 0;
          }

          // save the bishop moves //
          else if (piece.match(/glyphicon-bishop/)) {
            var newY = yAxis + 1;
            var newX = xAxis + 1
            while (newY <= 8 && newX <= 8)  {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newY += 1;
              newX += 1;
            }
            newY = yAxis - 1;
            newX = xAxis - 1;
            while (newY >= 1 && newX >= 1) {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newY -= 1;
              newX -= 1;
            }
            newX = xAxis + 1;
            newY = yAxis - 1;
            while (newX <= 8 && newY >= 1) {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newX += 1;
              newY -= 1;
            }
            newX = xAxis - 1;
            newY = yAxis + 1;
            while (newX >= 1 && newY <= 8) {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
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

          // save the queen moves //
          else if (piece.match(/glyphicon-queen/)) {
            var newY = yAxis + 1;
            var newX = xAxis + 1;
            while (newY <= 8 && newX <= 8)  {
              pushToArray(tempArray, newX, newY);
              if (checkForBlocked(newX, newY) !== 0) { break;};
              newY += 1;
              newX += 1;
            }
            newY = yAxis - 1;
            newX = xAxis - 1;
            while (newY >= 1 && newX >= 1) {
              pushToArray(tempArray, newX, newY);
              if (checkForBlocked(newX, newY) !== 0) { break;};
              newY -= 1;
              newX -= 1;
            }
            newX = xAxis + 1;
            newY = yAxis - 1;
            while (newX <= 8 && newX >= 1) {
              pushToArray(tempArray, newX, newY);
              if (checkForBlocked(newX, newY) !== 0) { break;};
              newX += 1;
              newY -= 1;
            }
            newX = xAxis - 1;
            newY = yAxis + 1;
            while (newX >= 1) {
              pushToArray(tempArray, newX, newY);
              if (checkForBlocked(newX, newY) !== 0) { break;};
              newX -= 1;
              newY += 1;
            }
            newY = yAxis + 1;
            while (newY <= 8 )  {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newY += 1;
            }
            newY = yAxis - 1;
            while (newY >= 1) {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newY -= 1;
            }
            newX = xAxis + 1;
            while (newX <= 8) {
              pushToArray(tempArray, newX, yAxis);
              if (checkForBlocked(newX, yAxis) !== 0) { break;};
              newX += 1;
            }
            newX = xAxis - 1;
            while (newX >= 1) {
              pushToArray(tempArray, newX, yAxis);
              if (checkForBlocked(newX, yAxis) !== 0) { break;};
              newX -= 1;
            }
            console.log(tempArray);
            tempArray.forEach(function(value) { divArray.push(value); });
            blackPosition = divArray;
            tempArray.forEach(function(value) {
              if ("box-" + value === kingPosition) {
                attackPiecesBlack.push([piece, piecePosition]);
              }
            });
            tempArray.length = 0;
          }
        });
        console.log(attackPiecesBlack);

        // check for check on white with two attack pieces, if so, only king can move //
        if (attackPiecesBlack.length === 2) {
          console.log("2 attack pieces");
          $('.white').each(function(i) {
            var tempArray = [];
            var kingPosition = $('.b-king').parent().attr('id');
            var piece = $(this).attr('class');
            var piecePosition = $(this).parent().attr('id');
            var letterVar = $(this).parent().attr('id')[4];
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var yAxis = parseInt($(this).parent().attr('id')[5]);

            if (piece.match(/glyphicon-king/)) {
              if (checkForBlockedColor((xAxis + 1), (yAxis + 1), "white") === 0 && !testBlockedKing(blackPosition, letterArray[xAxis] + (yAxis+1))) {
                pushToArray(tempArray, (xAxis + 1), (yAxis + 1));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis - 1), "white") === 0 && !testBlockedKing(blackPosition, letterArray[xAxis - 2] + (yAxis - 1))) {
                pushToArray(tempArray, (xAxis - 1), (yAxis - 1));
              }
              if (checkForBlockedColor((xAxis + 1), (yAxis - 1), "white") === 0 && !testBlockedKing(blackPosition, letterArray[xAxis] + (yAxis - 1))) {
                pushToArray(tempArray, (xAxis + 1), (yAxis - 1));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis + 1), "white") === 0 && !testBlockedKing(blackPosition, letterArray[xAxis - 2] + (yAxis + 1))) {
                pushToArray(tempArray, (xAxis - 1), (yAxis + 1));
              }
              if (checkForBlockedColor((xAxis), (yAxis + 1), "white") === 0 && !testBlockedKing(blackPosition, letterArray[xAxis - 1] + (yAxis + 1))) {
                pushToArray(tempArray, (xAxis), (yAxis + 1));
              }
              if (checkForBlockedColor((xAxis), (yAxis - 1), "white") === 0 && !testBlockedKing(blackPosition, letterArray[xAxis - 1] + (yAxis - 1))) {
                pushToArray(tempArray, (xAxis), (yAxis - 1));
              }
              if (checkForBlockedColor((xAxis + 1), (yAxis), "white") === 0 && !testBlockedKing(blackPosition, letterArray[xAxis] + (yAxis))) {
                pushToArray(tempArray, (xAxis + 1), (yAxis));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis), "white") === 0 && !testBlockedKing(blackPosition, letterArray[xAxis - 2] + (yAxis))) {
                pushToArray(tempArray, (xAxis - 1), (yAxis));
              }

              // if no legal moves, then black wins //
              if (tempArray.length === 0) {
                alert("Game Over! Black Wins from two attack pieces");

                window.location = '/';
              }
            }
          });
        }

        // check moves in check with only one attack piece - more complicated //
        else if (attackPiecesBlack.length === 1) {

          var tempArray = [];
          var attackPieceType = attackPiecesBlack[0][0];
          var kingLocation = $('.w-king').parent().attr('id');
          var kingXAxis = letterArray.indexOf(kingLocation[4]) + 1;
          var kingYAxis = kingLocation[5];
          var attackXAxis = letterArray.indexOf(attackPiecesBlack[0][1][4]) + 1;
          var attackYAxis = attackPiecesBlack[0][1][5];
          var divArrayCheck = [];
          var divArray = [];

          console.log(attackXAxis);
          console.log(attackYAxis);
          console.log(kingXAxis);
          console.log(kingYAxis);
          console.log(whitePosition);

          // first, like before, check for spaces in between king and attack piece, then save to a new array, divArrayCheck //
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


          // then, iterate through all the white pieces and check if they can either capture or block to stop check //

          $('.white').each(function(i) {
            var piece = $(this).attr('class');
            var piecePosition = $(this).parent().attr('id');
            var startingPoint = $(this).parent().attr('id');
            var letterVar = $(this).parent().attr('id')[4];
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var yAxis = parseInt($(this).parent().attr('id')[5]);

            // first check the king moves //
            if (piece.match(/glyphicon-king/)) {

              if (!testBlockedKing(blackPosition, letterArray[xAxis - 1] + (yAxis + 1))) {
                 divArray.push(letterArray[xAxis - 1] + (yAxis + 1));
              }
              if (!testBlockedKing(blackPosition, letterArray[xAxis - 1] + (yAxis - 1))) {
                divArray.push(letterArray[xAxis - 1] + (yAxis - 1));
              }
              if (!testBlockedKing(blackPosition, letterArray[xAxis] + (yAxis))) {
                divArray.push(letterArray[xAxis] + (yAxis ));
              }
              if (!testBlockedKing(blackPosition, letterArray[xAxis - 2] + (yAxis))) {
                divArray.push(letterArray[xAxis - 2] + (yAxis));
              }
              if (!testBlockedKing(blackPosition, letterArray[xAxis] + (yAxis + 1))) {
                divArray.push(letterArray[xAxis] + (yAxis + 1));
              }
              if (!testBlockedKing(blackPosition, letterArray[xAxis] + (yAxis - 1))) {
                divArray.push(letterArray[xAxis] + (yAxis - 1));
              }
              if (!testBlockedKing(blackPosition, letterArray[xAxis - 2] + (yAxis + 1))) {
                divArray.push(letterArray[xAxis - 2] + (yAxis + 1));
              }
              if (!testBlockedKing(blackPosition, letterArray[xAxis - 2] + (yAxis - 1))) {
                divArray.push(letterArray[xAxis - 2] + (yAxis - 1));
              }
             }

             // then the pawn moves to block //
            if (piece.match(/glyphicon-pawn/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {

              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              if (checkForBlockedColor(xAxis, (yAxis -1), "black") === 0 && testBlockedKing(divArrayCheck, letterArray[xAxis -1] + (yAxis - 1))) {
                pushToArray(divArray, xAxis, (yAxis - 1));
              }
              if (yAxis === 7 && checkForBlockedColor(xAxis, (yAxis -2), "black") === 0 && testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + (yAxis - 2))) {
                pushToArray(divArray, xAxis, (yAxis - 2));
              }
              if (checkForBlockedColor((xAxis + 1), (yAxis - 1), "black") !== 0 && (xAxis + 1) + "" + (yAxis -1) === attackXAxis + "" + attackYAxis) {
                pushToArray(divArray, (xAxis + 1), (yAxis - 1));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis - 1), "black") !== 0 && (xAxis - 1) + "" +  (yAxis -1) === attackXAxis + "" + attackYAxis ) {
                pushToArray(divArray, (xAxis - 1), (yAxis - 1));
              }
            }
            // and the pawn moves to capture //
            if (piece.match(/glyphicon-pawn/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {

              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              if (checkForBlockedColor((xAxis + 1), (yAxis - 1), "black") !== 0 && (xAxis + 1) + "" + (yAxis -1) === attackXAxis + "" + attackYAxis) {
                pushToArray(divArray, (xAxis + 1), (yAxis - 1));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis - 1), "black") !== 0 && (xAxis - 1) + "" +  (yAxis -1) === attackXAxis + "" + attackYAxis ) {
                pushToArray(divArray, (xAxis - 1), (yAxis - 1));
              }
              divArray.forEach(enableElements);
            }
            // check rook moves to capture //
            if (piece.match(/glyphicon-tower/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              // set +y vertical //
               while (yAxis <= 8 ) {
                 if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
                 yAxis += 1;
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
               }

               // set -y vertical //
               yAxis = parseInt(startingPoint[5]);
               xAxis = letterArray.indexOf(letterVar) + 1;
               while (yAxis >= 1 ) {
                 if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
                 yAxis -= 1;
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
               }

               // set + x horizontal //
               yAxis = parseInt(startingPoint[5]);
               xAxis = letterArray.indexOf(letterVar) + 1;
               while (xAxis <= 8 ) {
                 if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
                 xAxis += 1;
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
               }

               // set - x horizontal //
               yAxis = parseInt(startingPoint[5]);
               xAxis = letterArray.indexOf(letterVar) + 1;
               while (xAxis >= 1 ) {
                 if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
                 xAxis -= 1;
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
               }
            }
            // check rook moves to block //
            if (piece.match(/glyphicon-tower/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              // set +y vertical //
               while (yAxis <= 8 ) {
                 if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
                 yAxis += 1;
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
               }

               // set -y vertical //
               yAxis = parseInt(startingPoint[5]);
               xAxis = letterArray.indexOf(letterVar) + 1;
               while (yAxis >= 1 ) {
                 if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
                 yAxis -= 1;
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
               }

               // set + x horizontal //
               yAxis = parseInt(startingPoint[5]);
               xAxis = letterArray.indexOf(letterVar) + 1;
               while (xAxis <= 8 ) {
                 if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
                 xAxis += 1;
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
               }

               // set - x horizontal //
               yAxis = parseInt(startingPoint[5]);
               xAxis = letterArray.indexOf(letterVar) + 1;
               while (xAxis >= 1 ) {
                 if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
                 xAxis -= 1;
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
               }
            }

            // check bishop moves to capture //
            if (piece.match(/glyphicon-bishop/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              // check y+ x+ axis //
              while (yAxis <= 8 && xAxis <= 8) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
                yAxis += 1;
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check y- x- axis //
              while (yAxis >= 1 && xAxis >= 1) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis -= 1;
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check y- x+ axis //
              while (yAxis >= 1 && xAxis <= 8) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0 ) { break; };
                yAxis -= 1;
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0 ) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check y+ x- axis //
              while (yAxis <= 8 && xAxis >= 1) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0 ) { break; };
                yAxis += 1;
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0 ) { break; };
              }
            }

            // check bishop for blocking moves to stop check //
            if (piece.match(/glyphicon-bishop/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              // check y+ x+ axis //
              while (yAxis <= 8 && xAxis <= 8) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis += 1;
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }


              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check y- x- axis //
              while (yAxis >= 1 && xAxis >= 1) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis -= 1;
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }


              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check y- x+ axis //
              while (yAxis >= 1 && xAxis <= 8) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis -= 1;
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check y+ x- axis //
              while ( yAxis <= 8 && xAxis >= 1) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis += 1;
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }
            }

            // check queen moves to capture to stop check //
            if (piece.match(/glyphicon-queen/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              // check x+ y+ axis //
              while (xAxis <= 8 && yAxis <= 8) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis += 1;
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check x- y- axis //
              while (xAxis >= 1 && yAxis >= 1) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis -= 1;
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check x- y+ axis //
              while (xAxis >= 1 && yAxis <= 8) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                xAxis -= 1;
                yAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check x+ y- axis //
              while (xAxis <= 8 && yAxis >= 1) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                xAxis += 1;
                yAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check x+ axis //
              while (xAxis <= 8) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }


              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check x- axis //
              while (xAxis >= 1 ) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }


              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check y+ axis //
              while (yAxis <= 8) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }


              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check y- axis //
              while (yAxis >= 1) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }
            }

            // check queen moves to stop check by blocking //
            if (piece.match(/glyphicon-queen/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphiocn-tower/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              // check x+ y+ axis //
              while (xAxis <= 8 && yAxis <= 8) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis += 1;
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }


              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check x- y- axis //
              while (xAxis >= 1 && yAxis >= 1) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis -= 1;
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }


              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check x- y+ axis //
              while (xAxis >= 1 && yAxis <= 8) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                xAxis -= 1;
                yAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }


              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check x+ y- axis //
              while (xAxis <= 8 && yAxis >= 1) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                xAxis += 1;
                yAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }


              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check x+ axis //
              while (xAxis <= 8) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }


              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check x- axis //
              while (xAxis >= 1 ) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }


              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check y+ axis //
              while (yAxis <= 8) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }


              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;

              // check y- axis //
              while (yAxis >= 1) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
                yAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
              }
            }

            // check knight moves to stop check by capture //
            if (piece.match(/glyphicon-knight/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              if ((xAxis - 1) + "" + (yAxis - 2) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis -2] + (yAxis-2));
              }
              if ((xAxis - 1) + "" + (yAxis + 2) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis -2] + (yAxis+2));
              }
              if ((xAxis - 2) + "" + (yAxis - 1) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis -3] + (yAxis-1));
              }
              if ((xAxis - 2) + "" + (yAxis + 1) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis -3] + (yAxis+1));
              }
              if ((xAxis + 1) + "" + (yAxis + 2) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis] + (yAxis+2));
              }
              if ((xAxis + 1) + "" + (yAxis - 2) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis] + (yAxis-2));
              }
              if ((xAxis + 2) + "" + (yAxis + 1) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis +1] + (yAxis+1));
              }
              if ((xAxis + 2) + "" + (yAxis - 1) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis +1] + (yAxis-1));
              }
            }

            // check knight moves to stop check by blocking //
            if (piece.match(/glyphicon-knight/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              if (testBlockedKing(divArrayCheck, letterArray[xAxis - 2] + (yAxis -2) ) ) {
                divArray.push(letterArray[xAxis -2] + (yAxis-2));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis - 2] + (yAxis +2) ) ) {
                divArray.push(letterArray[xAxis -2] + (yAxis+2));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis - 3] + (yAxis -1) ) ) {
                divArray.push(letterArray[xAxis -3] + (yAxis-1));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis - 3] + (yAxis + 1) ) ) {
                divArray.push(letterArray[xAxis -3] + (yAxis + 1));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis] + (yAxis +2) ) ) {
                divArray.push(letterArray[xAxis] + (yAxis + 2));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis] + (yAxis -2) ) ) {
                divArray.push(letterArray[xAxis] + (yAxis-2));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis + 1] + (yAxis +1) ) ) {
                divArray.push(letterArray[xAxis + 1] + (yAxis + 1));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis + 1] + (yAxis -1) ) ) {
                divArray.push(letterArray[xAxis + 1] + (yAxis - 1));
              }
            }
          })
          // if no available moves to stop check, mate declared //
          console.log("Hello");
          if (divArray.length === 0 ) {
            alert("Game Over");
            window.location = "/";
          }
        }

        /// next is the same thing as above, but for white. I would refactor the two of them together if I knew how :) ///

        }
        else if (piece.match(/white/)) {
          var divArray = [];
          // function to find all white pieces //
          $('.white').each(function(i) {
            var tempArray = [];
            var kingPosition = $('.b-king').parent().attr('id');
            var piece = $(this).attr('class');
            var piecePosition = $(this).parent().attr('id');
            var startingPoint = $(this).parent().attr('id');
            var letterVar = $(this).parent().attr('id')[4];
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var yAxis = parseInt($(this).parent().attr('id')[5]);

            // iterate through each white piece, and collect available moves to whitePosition array //
            if (piece.match(/glyphicon-pawn/)) {
                // check for each individual move //
                if (checkForBlocked(xAxis, (yAxis - 1)) === 0) {
                  pushToArray(tempArray, xAxis, (yAxis - 1));
                }
                if (checkForBlocked(xAxis, (yAxis - 2)) === 0 && yAxis === 7) {
                  pushToArray(tempArray, xAxis, (yAxis - 2));
                }
                if (checkForBlocked((xAxis -1), (yAxis - 1)) === 1) {
                  pushToArray(tempArray, (xAxis - 1), (yAxis - 1));
                }
                if (checkForBlocked((xAxis + 1), (yAxis - 1)) === 1) {
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

            // save all the white knight moves //
            else if (piece.match(/glyphicon-knight/)) {

              pushToArray(tempArray, (xAxis + 1), (yAxis + 2));
              pushToArray(tempArray, (xAxis + 1), (yAxis - 2));
              pushToArray(tempArray, (xAxis - 1), (yAxis + 2));
              pushToArray(tempArray, (xAxis - 1), (yAxis - 2));
              pushToArray(tempArray, (xAxis + 2), (yAxis + 1));
              pushToArray(tempArray, (xAxis + 2), (yAxis - 1));
              pushToArray(tempArray, (xAxis - 2), (yAxis + 1));
              pushToArray(tempArray, (xAxis - 2), (yAxis - 1));

              tempArray.forEach(function(value) { divArray.push(value); });
              tempArray.forEach(function(value) {
                if ("box-" + value === kingPosition) {
                  attackPiecesWhite.push([piece, piecePosition]);
                }
              })
              tempArray.length = 0;

            }

            // save all the white king moves //
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

          // save all the white rook moves //
          else if (piece.match(/glyphicon-tower/)) {
            var newY = yAxis + 1;
            while (newY <= 8 )  {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newY += 1;
            }
            newY = yAxis - 1;
            while (newY >= 1) {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newY -= 1;
            }
            var newX = xAxis + 1;
            while (newX <= 8) {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newX += 1;
            }
            newX = xAxis - 1;
            while (newX >= 1) {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
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

          // save all the white bishop moves //
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

          // save all the white queen moves //
          else if (piece.match(/glyphicon-queen/)) {
            var newY = yAxis + 1;
            var newX = xAxis + 1
            while (newY <= 8 && newX <= 8)  {
              pushToArray(tempArray, newX, newY);
              if (checkForBlocked(newX, newY) !== 0) { break;};
              newY += 1;
              newX += 1;
            }
            newY = yAxis - 1;
            newX = xAxis - 1;
            while (newY >= 1 && newX >= 1) {
              pushToArray(tempArray, newX, newY);
              if (checkForBlocked(newX, newY) !== 0) { break;};
              newY -= 1;
              newX -= 1;
            }
            newX = xAxis + 1;
            newY = yAxis - 1;
            while (newX <= 8 && newX >= 1) {
              pushToArray(tempArray, newX, newY);
              if (checkForBlocked(newX, newY) !== 0) { break;};
              newX += 1;
              newY -= 1;
            }
            newX = xAxis - 1;
            newY = yAxis + 1;
            while (newX >= 1) {
              pushToArray(tempArray, newX, newY);
              if (checkForBlocked(newX, newY) !== 0) { break;};
              newX -= 1;
              newY += 1;
            }
            newY = yAxis + 1;
            while (newY <= 8 )  {
              pushToArray(tempArray, newX, newY);
              if (checkForBlocked(newX, newY) !== 0) { break;};
              newY += 1;
            }
            newY = yAxis - 1;
            while (newY >= 1) {
              pushToArray(tempArray, newX, newY);
              if (checkForBlocked(newX, newY) !== 0) { break;};
              newY -= 1;
            }
            newX = xAxis + 1;
            while (newX <= 8) {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newX += 1;
            }
            newX = xAxis - 1;
            while (newX >= 1) {
              pushToArray(tempArray, xAxis, newY);
              if (checkForBlocked(xAxis, newY) !== 0) { break;};
              newX -= 1;
            }
            tempArray.forEach(function(value) { divArray.push(value); });
            whitePosition = divArray;
            tempArray.forEach(function(value) {
              if ("box-" + value === kingPosition) {
                attackPiecesWhite.push([piece, piecePosition]);
              }
            });
            tempArray.length = 0;
          }
        });

        //  Now again, the check mate code. It's very long and redundant, but it's what we got right now. First check for check with two attack pieces ///
        if (attackPiecesWhite.length === 2) {
          var tempArray = [];

          $('.black').each(function(i) {
            var kingPosition = $('.b-king').parent().attr('id');
            var piece = $(this).attr('class');
            var piecePosition = $(this).parent().attr('id');
            var letterVar = $(this).parent().attr('id')[4];
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var yAxis = parseInt($(this).parent().attr('id')[5]);

            // check if king can escape the check. If not, declare mate //
            if (piece.match(/glyphicon-king/)) {
              if (checkForBlockedColor((xAxis + 1), (yAxis + 1), "black") === 0 && !testBlockedKing(whitePosition, letterArray[xAxis] + (yAxis+1))) {
                pushToArray(tempArray, (xAxis + 1), (yAxis + 1));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis - 1), "black") === 0 && !testBlockedKing(whitePosition, letterArray[xAxis - 2] + (yAxis - 1))) {
                pushToArray(tempArray, (xAxis - 1), (yAxis - 1));
              }
              if (checkForBlockedColor((xAxis + 1), (yAxis - 1), "black") === 0 && !testBlockedKing(whitePosition, letterArray[xAxis] + (yAxis - 1))) {
                pushToArray(tempArray, (xAxis + 1), (yAxis - 1));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis + 1), "black") === 0 && !testBlockedKing(whitePosition, letterArray[xAxis - 2] + (yAxis + 1))) {
                pushToArray(tempArray, (xAxis - 1), (yAxis + 1));
              }
              if (checkForBlockedColor((xAxis), (yAxis + 1), "black") === 0 && !testBlockedKing(whitePosition, letterArray[xAxis - 1] + (yAxis + 1))) {
                pushToArray(tempArray, (xAxis), (yAxis + 1));
              }
              if (checkForBlockedColor((xAxis), (yAxis - 1), "black") === 0 && !testBlockedKing(whitePosition, letterArray[xAxis - 1] + (yAxis - 1))) {
                pushToArray(tempArray, (xAxis), (yAxis - 1));
              }
              if (checkForBlockedColor((xAxis + 1), (yAxis), "black") === 0 && !testBlockedKing(whitePosition, letterArray[xAxis] + (yAxis))) {
                pushToArray(tempArray, (xAxis + 1), (yAxis));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis), "black") === 0 && !testBlockedKing(whitePosition, letterArray[xAxis - 2] + (yAxis))) {
                pushToArray(tempArray, (xAxis - 1), (yAxis));
              }

            }
          });
          if (tempArray.length === 0) {
            alert("Game Over! White Wins!");
            window.location = '/';

          }
          tempArray.length = 0;
        }

        // Now, trickier... Check for check with only one attack piece. Iterate through all black pieces to see if any moves escape check //
        else if (attackPiecesWhite.length === 1) {
          console.log(attackPiecesWhite);
          console.log(whitePosition);
          var attackPieceType = attackPiecesWhite[0][0];
          var kingLocation = $('.b-king').parent().attr('id');
          var kingXAxis = letterArray.indexOf(kingLocation[4]) + 1;
          var kingYAxis = kingLocation[5];
          var attackXAxis = letterArray.indexOf(attackPiecesWhite[0][1][4]) + 1;
          var attackYAxis = attackPiecesWhite[0][1][5];
          var divArrayCheck = [];
          var divArray = [];

          // first find spaces in between attack piece and the black king, and save to divArrayCheck //
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

          // Next, iterate through all black pieces and test moves to see if they escape check. If they do, save to the divArray //
          $('.black').each(function(i) {
            var piece = $(this).attr('class');
            var piecePosition = $(this).parent().attr('id');
            var startingPoint = $(this).parent().attr('id');
            var letterVar = $(this).parent().attr('id')[4];
            var xAxis = letterArray.indexOf(letterVar) + 1;
            var yAxis = parseInt($(this).parent().attr('id')[5]);

            // check the black king's moves //
            if (piece.match(/glyphicon-king/)) {

              if (!testBlockedKing(whitePosition, letterArray[xAxis - 1] + (yAxis + 1))) {
                 divArray.push(letterArray[xAxis - 1] + (yAxis + 1));
              }
              if (!testBlockedKing(whitePosition, letterArray[xAxis - 1] + (yAxis - 1))) {
                divArray.push(letterArray[xAxis - 1] + (yAxis - 1));
              }
              if (!testBlockedKing(whitePosition, letterArray[xAxis] + (yAxis))) {
                divArray.push(letterArray[xAxis] + (yAxis ));
              }
              if (!testBlockedKing(whitePosition, letterArray[xAxis - 2] + (yAxis))) {
                divArray.push(letterArray[xAxis - 2] + (yAxis));
              }
              if (!testBlockedKing(whitePosition, letterArray[xAxis] + (yAxis + 1))) {
                divArray.push(letterArray[xAxis] + (yAxis + 1));
              }
              if (!testBlockedKing(whitePosition, letterArray[xAxis] + (yAxis - 1))) {
                divArray.push(letterArray[xAxis] + (yAxis - 1));
              }
              if (!testBlockedKing(whitePosition, letterArray[xAxis - 2] + (yAxis + 1))) {
                divArray.push(letterArray[xAxis - 2] + (yAxis + 1));
              }
              if (!testBlockedKing(whitePosition, letterArray[xAxis - 2] + (yAxis - 1))) {
                divArray.push(letterArray[xAxis - 2] + (yAxis - 1));
              }
             }

             // check the black pawn's moves to block check //
            if (piece.match(/glyphicon-pawn/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {

              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              if (checkForBlockedColor(xAxis, (yAxis +1), "white") === 0 && testBlockedKing(divArrayCheck, letterArray[xAxis -1] + (yAxis + 1))) {
                pushToArray(divArray, xAxis, (yAxis + 1));
              }
              if (yAxis === 7 && checkForBlockedColor(xAxis, (yAxis +2), "white") === 0 && testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + (yAxis + 2))) {
                pushToArray(divArray, xAxis, (yAxis + 2));
              }
              if (checkForBlockedColor((xAxis + 1), (yAxis + 1), "white") !== 0 && (xAxis + 1) + "" + (yAxis +1) === attackXAxis + "" + attackYAxis) {
                pushToArray(divArray, (xAxis + 1), (yAxis + 1));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis + 1), "white") !== 0 && (xAxis - 1) + "" +  (yAxis +1) === attackXAxis + "" + attackYAxis ) {
                pushToArray(divArray, (xAxis - 1), (yAxis + 1));
              }
            }

            // check the black pawn's moves to escape check by capture //
            if (piece.match(/glyphicon-pawn/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {

              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              if (checkForBlockedColor((xAxis + 1), (yAxis + 1), "white") !== 0 && (xAxis + 1) + "" + (yAxis +1) === attackXAxis + "" + attackYAxis) {
                pushToArray(divArray, (xAxis + 1), (yAxis + 1));
              }
              if (checkForBlockedColor((xAxis - 1), (yAxis + 1), "white") !== 0 && (xAxis - 1) + "" +  (yAxis +1) === attackXAxis + "" + attackYAxis ) {
                pushToArray(divArray, (xAxis - 1), (yAxis + 1));
              }
            }

            // check the rook's moves to escape check with capture //
            if (piece.match(/glyphicon-tower/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              // set +y vertical //
               while (yAxis <= 8 ) {
                 if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
                 yAxis += 1;
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
               }

               // set -y vertical //
               yAxis = parseInt(startingPoint[5]);
               xAxis = letterArray.indexOf(letterVar) + 1;
               while (yAxis >= 1 ) {
                 if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
                 yAxis -= 1;
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
               }

               // set + x horizontal //
               yAxis = parseInt(startingPoint[5]);
               xAxis = letterArray.indexOf(letterVar) + 1;
               while (xAxis <= 8 ) {
                 if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
                 xAxis += 1;
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
               }

               // set - x horizontal //
               yAxis = parseInt(startingPoint[5]);
               xAxis = letterArray.indexOf(letterVar) + 1;
               while (xAxis >= 1 ) {
                 if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
                 xAxis -= 1;
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
               }
            }

            // check the rook's moves to escape check by blocking //
            if (piece.match(/glyphicon-tower/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              // set +y vertical //
               while (yAxis <= 8 ) {
                 if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
                 yAxis += 1;
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
               }

               // set -y vertical //
               yAxis = parseInt(startingPoint[5]);
               xAxis = letterArray.indexOf(letterVar) + 1;
               while (yAxis >= 1 ) {
                 if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
                 yAxis -= 1;
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
               }

               // set + x horizontal //
               yAxis = parseInt(startingPoint[5]);
               xAxis = letterArray.indexOf(letterVar) + 1;
               while (xAxis <= 8 ) {
                 if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
                 xAxis += 1;
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
               }

               // set - x horizontal //
               yAxis = parseInt(startingPoint[5]);
               xAxis = letterArray.indexOf(letterVar) + 1;
               while (xAxis >= 1 ) {
                 if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                 pushToArray(divArray, xAxis, yAxis);
                 }
                 if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
                 xAxis -= 1;
                 if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
               }
            }

            // check the black bishop's moves to escape check by capture //
            if (piece.match(/glyphicon-bishop/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;
              while (yAxis <= 8 && xAxis <= 8) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break;};
                yAxis += 1;
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break;};
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (yAxis >= 1 && xAxis >= 1) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis -= 1;
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (yAxis >= 1 && xAxis <= 8) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0 ) { break; };
                yAxis -= 1;
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0 ) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (yAxis <= 8 && xAxis >= 1) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0 ) { break; };
                yAxis += 1;
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0 ) { break; };
              }
            }

            // check the black bishop's moves to escape check by blocking//
            if (piece.match(/glyphicon-bishop/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              while (yAxis <= 8 && xAxis <= 8) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis += 1;
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (yAxis >= 1 && xAxis >= 1) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis -= 1;
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (yAxis >= 1 && xAxis <= 8) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis -= 1;
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while ( yAxis <= 8 && xAxis >= 1) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis += 1;
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }
            }

            // check queen's moves to escape by capture //
            if (piece.match(/glyphicon-queen/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              while (xAxis <= 8 && yAxis <= 8) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis += 1;
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (xAxis >= 1 && yAxis >= 1) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis -= 1;
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (xAxis >= 1 && yAxis <= 8) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                xAxis -= 1;
                yAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (xAxis <= 8 && yAxis >= 1) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                xAxis += 1;
                yAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (xAxis <= 8) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (xAxis >= 1 ) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (yAxis <= 8) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (yAxis >= 1) {
                if (xAxis + "" + yAxis === attackXAxis + "" + attackYAxis) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }
            }

            // check queen's moves to escape by blocking //
            if (piece.match(/glyphicon-queen/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphiocn-tower/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              while (xAxis <= 8 && yAxis <= 8) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis += 1;
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (xAxis >= 1 && yAxis >= 1) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis -= 1;
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (xAxis >= 1 && yAxis <= 8) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                xAxis -= 1;
                yAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (xAxis <= 8 && yAxis >= 1) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                xAxis += 1;
                yAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (xAxis <= 8) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                xAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (xAxis >= 1 ) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                xAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (yAxis <= 8) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis += 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }

              yAxis = parseInt(startingPoint[5]);
              xAxis = letterArray.indexOf(letterVar) + 1;
              while (yAxis >= 1) {
                if (testBlockedKing(divArrayCheck, letterArray[xAxis - 1] + yAxis)) {
                  pushToArray(divArray, xAxis, yAxis);
                }
                if (checkForBlockedColor(xAxis, yAxis, "white") !== 0) { break; };
                yAxis -= 1;
                if (checkForBlockedColor(xAxis, yAxis, "black") !== 0) { break; };
              }
            }

            // check knight moves to escape check by capture //
            if (piece.match(/glyphicon-knight/) && attackPieceType.match(/glyphicon-knight | glyphicon-pawn/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              if ((xAxis - 1) + "" + (yAxis - 2) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis -2] + (yAxis-2));
              }
              if ((xAxis - 1) + "" + (yAxis + 2) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis -2] + (yAxis+2));
              }
              if ((xAxis - 2) + "" + (yAxis - 1) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis -3] + (yAxis-1));
              }
              if ((xAxis - 2) + "" + (yAxis + 1) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis -3] + (yAxis+1));
              }
              if ((xAxis + 1) + "" + (yAxis + 2) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis] + (yAxis+2));
              }
              if ((xAxis + 1) + "" + (yAxis - 2) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis] + (yAxis-2));
              }
              if ((xAxis + 2) + "" + (yAxis + 1) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis +1] + (yAxis+1));
              }
              if ((xAxis + 2) + "" + (yAxis - 1) === attackXAxis + "" + attackYAxis) {
                divArray.push(letterArray[xAxis +1] + (yAxis-1));
              }
            }

            // check knight moves to escape by blocking //
            if (piece.match(/glyphicon-knight/) && attackPieceType.match(/glyphicon-queen | glyphicon-bishop | glyphicon-tower/)) {
              var yAxis = parseInt(startingPoint[5]);
              var xAxis = letterArray.indexOf(letterVar) + 1;

              if (testBlockedKing(divArrayCheck, letterArray[xAxis - 2] + (yAxis -2) ) ) {
                divArray.push(letterArray[xAxis -2] + (yAxis-2));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis - 2] + (yAxis +2) ) ) {
                divArray.push(letterArray[xAxis -2] + (yAxis+2));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis - 3] + (yAxis -1) ) ) {
                divArray.push(letterArray[xAxis -3] + (yAxis-1));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis - 3] + (yAxis + 1) ) ) {
                divArray.push(letterArray[xAxis -3] + (yAxis + 1));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis] + (yAxis +2) ) ) {
                divArray.push(letterArray[xAxis] + (yAxis + 2));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis] + (yAxis -2) ) ) {
                divArray.push(letterArray[xAxis] + (yAxis-2));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis + 1] + (yAxis +1) ) ) {
                divArray.push(letterArray[xAxis + 1] + (yAxis + 1));
              }
              if (testBlockedKing(divArrayCheck, letterArray[xAxis + 1] + (yAxis -1) ) ) {
                divArray.push(letterArray[xAxis + 1] + (yAxis - 1));
              }
            }
          });

          if (divArray.length === 0 ) {
            alert("Game Over - White Wins!");
            window.location = "/";
          }
        }
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
        alert('Game Over');
        window.location = '/';
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
