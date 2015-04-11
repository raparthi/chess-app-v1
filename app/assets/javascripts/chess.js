$(function(){

  // variables for castling //
  var bKingMoves = 0;
  var wKingMoves = 0;
  var wRook1Moves = 0;
  var wRook2Moves = 0;
  var bRook1Moves = 0;
  var bRook2Moves = 0;
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

        // set +x+y diagonal //
        divArray.push(letterArray[xAxis -1] + (yAxis + 1));
        divArray.push(letterArray[xAxis -1] + (yAxis - 1));
        divArray.push(letterArray[xAxis -2] + (yAxis));
        divArray.push(letterArray[xAxis] + (yAxis));
        divArray.push(letterArray[xAxis -2] + (yAxis + 1));
        divArray.push(letterArray[xAxis -2] + (yAxis - 1));
        divArray.push(letterArray[xAxis] + (yAxis + 1));
        divArray.push(letterArray[xAxis] + (yAxis - 1));

        if ( wKingMoves === 0 && wRook1Moves === 0 && $('#box-b8').children().length === 0 && $('#box-c8').children().length === 0 && $('#box-d8').children().length === 0) {
          divArray.push(letterArray[xAxis - 3] + (yAxis));
        }
        else if ( wKingMoves === 0 && wRook2Moves === 0 && $('#box-f8').children().length === 0 && $('#box-g8').children().length === 0) {
          divArray.push(letterArray[xAxis + 1] + (yAxis));
        }
        divArray.forEach(enableElements);
      }
      else if (pieceType.match(/glyphicon-king black/)) {
        $('.droppable').droppable("disable");
        var yAxis = parseInt(startingPoint[5]);
        var xAxis = letterArray.indexOf(letterVar) + 1;
        var divArray = [];

        // set +x+y diagonal //
        divArray.push(letterArray[xAxis -1] + (yAxis + 1));
        divArray.push(letterArray[xAxis -1] + (yAxis - 1));
        divArray.push(letterArray[xAxis -2] + (yAxis));
        divArray.push(letterArray[xAxis] + (yAxis));
        divArray.push(letterArray[xAxis -2] + (yAxis + 1));
        divArray.push(letterArray[xAxis -2] + (yAxis - 1));
        divArray.push(letterArray[xAxis] + (yAxis + 1));
        divArray.push(letterArray[xAxis] + (yAxis - 1));

        if ( bKingMoves === 0 && bRook1Moves === 0 && $('#box-b1').children().length === 0 && $('#box-c1').children().length === 0 && $('#box-d1').children().length === 0) {
          divArray.push(letterArray[xAxis - 3] + (yAxis));
        }
        else if ( bKingMoves === 0 && bRook2Moves === 0 && $('#box-f1').children().length === 0 && $('#box-g1').children().length === 0) {
          divArray.push(letterArray[xAxis + 1] + (yAxis));
        }

        divArray.forEach(enableElements);
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
      if (piece.match(/king black/) && newBox.match(/box-c1/) && oldBox.match(/box-e1/) ) {
        $('.b-rook-1').detach().appendTo($('#box-d1'));
      }
      else if (piece.match(/king black/) && newBox.match(/box-g1/) && oldBox.match(/box-e1/) ) {
        $('.b-rook-2').detach().appendTo($('#box-f1'));
      }
      else if (piece.match(/king white/) && newBox.match(/box-c8/) && oldBox.match(/box-e8/)) {
        $('.w-rook-1').detach().appendTo($('#box-d8'));
      }
      else if (piece.match(/king white/) && newBox.match(/box-g8/) && oldBox.match(/box-e8/)) {
        $('.w-rook-2').detach().appendTo($('#box-f8'));
      }


      var newHome = ui.draggable.parent().attr('id');

      var boolTest = $('.white').draggable("option", "disabled");

      // toggle turn for black and white //
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
});
