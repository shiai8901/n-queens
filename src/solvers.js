/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];

  
  //make a move (put piece on 1st square) - 64 possible
  //loop through possible choices
  // for (var i = 0; i < n; i++) {
  //   for (var j = 0; j < n; j++) {
  //     //set first piece     
  //     board.rows()[i][j] = 1;
  //     for (var k = 0; k < n; k++) {
  //       for (var m = 0; m < n; m++) {
  //         //makign sure second piece doesn't share row or column with 1st piece
  //         if (!(k !== i || m !== j)) {
  //           //set second piece;
  //           board.rows()[k][m] = 1;  
  //         }
  //       }   
  //     }
  //     //make next move recursively
  //   }
  // }

  // var rows = [];
  // var cols = [];

  var board = new Board({n: n});

  // we need to pass the matrix in to board instantation
 
  var Node = function(board) {
    this.board = board;
    this.children = [];
  };
  

    //basecase n = num of pieces of board
    
    //create root
  var emptyBoard = new Node(board);
  //console.log(emptyBoard);
 
  var helper = function(node) {
    //populate children nodes
    var matrix = JSON.parse(JSON.stringify(node.board.attributes));
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        var tempBoard = new Board(matrix);
        var tmp = new Node(tempBoard);
        tmp.board.togglePiece(i, j); 
        //console.log(node.board.attributes);
        if ( (JSON.stringify(tmp.board.attributes) !== JSON.stringify(node.board.attributes)) && !tmp.board.hasAnyRowConflicts() && !tmp.board.hasAnyColConflicts() ) {
          node.children.push(tmp);
        }
      }
    }

    for (var i = 0; i < node.children.length; i++) {
      helper(node.children[i]);
    }


      //go through each child node and eliminate conflicts
      // for (var i = 0; i < node.children.length; i++) {
      //   if (!node.children[i].hasAnyRowConflicts && !node.children[i].hasAnyColConflicts) {
      //     helper(node.children[i]);
      //   }  
      // }

      //add to rows and cols
  };

  helper(emptyBoard);

  // set second piece by recusions with updated row and cols arrays


  //helper function

  //remove conflicts - keep going on non-conflict moves
    //remove conflicts via tagging with null
    // find conflict in rows/colums/minor and major diagonal
    // for each movve we have to check with thse functions
  //generate all possible next steps
  //recurse/repeat

  //returns matrix

  // return any leaf
  // iterate over tree and find a leaf


  var result;
  
  var iterateOverTree = function(node) {
    //check if node has children
    if (node.children.length === 0) {
    //if not return node
      result = node.board;
      return; 
    } else {
     //if so recursively call over root.children
      for (var i = 0; i < node.children.length; i++) {
        iterateOverTree(node.children[i]);
      }
    }
  };
  
 // debugger;
  iterateOverTree(emptyBoard);
 
  // for (var key in result.attributes) {
  //   if (!(key === 'n')) {
  //     solution.push(result.attributes[key]);
  //   }
  // }

  //console.log(emptyBoard);  
 // solution.push(iterateOverTree(emptyBoard).attributes);
  
 // console.log(solution);


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(result.rows()));
  return result.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
