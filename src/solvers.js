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

  var solutions = [];

  var board = new Board({n: n});
 
  var Node = function(board) {
    this.board = board;
    this.children = [];
  };

  var emptyBoard = new Node(board);
 
  var helper = function(node, rows) {
    if (rows === n) {
      return;  
    }

    var checkPieces = function(board) {
      var results = 0;
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          results += board.rows()[i][j];
        } 
      }   
      return results === n;
    };


    var inner = function(rowNum) {
      if (rowNum === n) {
        return;
      }
      for (var j = 0; j < n; j++) {
        var matrix = JSON.parse(JSON.stringify(node.board.rows()));
        //console.log(matrix);
        var tempBoard = new Board(matrix);
        var tmp = new Node(tempBoard);
        while (tmp.board.attributes[rowNum][j] === 1) {
          j++;
        }
        if (j < n) {          
          tmp.board.togglePiece(rowNum, j); 
          if (!tmp.board.hasAnyRooksConflicts()) {            
            node.children.push(tmp);  
            //console.log(rowNum, n);
            if (rowNum === n - 1 && checkPieces(tmp.board)) {
              //console.log('tmp board', tmp.board);
              var strings = JSON.stringify(tmp.board.rows());
              if (!_.contains(solutions, strings)) {
                solutions.push(strings);
              }
            }
          }  
        }
      }
    };

    for (var i = 0; i < n; i++) {
      inner(i);
    }
    
    for (var i = 0; i < node.children.length; i++) {
      helper(node.children[i], rows + 1);
    }

  };
  
  helper(emptyBoard, 0);

  // console.log(solutions);
  // console.log('Single solution for ' + n + ' rooks:', solutions[0]);
  return JSON.parse(solutions[0]);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = [];

  var board = new Board({n: n});
 
  var Node = function(board) {
    this.board = board;
    this.children = [];
  };

  var emptyBoard = new Node(board);
 
  var helper = function(node, rows) {
    if (rows === n) {
      return;  
    }

    var checkPieces = function(board) {
      var results = 0;
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          results += board.rows()[i][j];
        } 
      }   
      return results === n;
    };


    var inner = function(rowNum) {
      if (rowNum === n) {
        return;
      }
      for (var j = 0; j < n; j++) {
        var matrix = JSON.parse(JSON.stringify(node.board.rows()));
        //console.log(matrix);
        var tempBoard = new Board(matrix);
        var tmp = new Node(tempBoard);
        while (tmp.board.attributes[rowNum][j] === 1) {
          j++;
        }
        if (j < n) {          
          tmp.board.togglePiece(rowNum, j); 
          if (!tmp.board.hasAnyRooksConflicts()) {            
            node.children.push(tmp);  
            //console.log(rowNum, n);
            if (rowNum === n - 1 && checkPieces(tmp.board)) {
              //console.log('tmp board', tmp.board);
              var strings = JSON.stringify(tmp.board.rows());
              if (!_.contains(solutions, strings)) {
                solutions.push(strings);
              }
            }
          }  
        }
      }
    };

    for (var i = 0; i < n; i++) {
      inner(i);
    }
    
    for (var i = 0; i < node.children.length; i++) {
      helper(node.children[i], rows + 1);
    }

  };
  
  helper(emptyBoard, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutions.length);
  return solutions.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutions = [];

  var board = new Board({n: n});

  var Node = function(board) {
    this.board = board;
    this.children = [];
  };

  var emptyBoard = new Node(board);
 
  var helper = function(node, rows) {
    if (rows === n) {
      return;  
    }

    var checkPieces = function(board) {
      var results = 0;
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          results += board.rows()[i][j];
        } 
      }   
      return results === n;
    };

    var inner = function(rowNum) {
      if (rowNum === n) {
        return;
      }
      for (var j = 0; j < n; j++) {
        var matrix = JSON.parse(JSON.stringify(node.board.rows()));
        //console.log(matrix);
        var tempBoard = new Board(matrix);
        var tmp = new Node(tempBoard);
        while (tmp.board.attributes[rowNum][j] === 1) {
          j++;
        }
        if (j < n) {          
          tmp.board.togglePiece(rowNum, j); 
          if (!tmp.board.hasAnyQueensConflicts()) {            
            node.children.push(tmp);  
            console.log(rowNum, n);
            if (rowNum === n - 1 && checkPieces(tmp.board)) {
              console.log('tmp board', tmp.board);
              //eliminate duplicates
              var strings = JSON.stringify(tmp.board.rows());
              if (!_.contains(solutions, strings)) {
                solutions.push(strings);
              }  
            }
          }  
        } 
      }
    };
    //call inner for each row
    for (var i = 0; i < n; i++) {
      inner(i);
    }
    
    for (var i = 0; i < node.children.length; i++) {
      helper(node.children[i], rows + 1);
    }

  };

  helper(emptyBoard, 0);
  debugger;
  console.log('Single solution for ' + n + ' queens:', solutions[0]);
  if (solutions[0] === undefined) {
    return board.rows();
  }
  return JSON.parse(solutions[0]);

};




// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions = [];

  var board = new Board({n: n});

  var Node = function(board) {
    this.board = board;
    this.children = [];
  };

  var emptyBoard = new Node(board);
 
  var helper = function(node, rows) {
    if (rows === n) {
      return;  
    }

    var checkPieces = function(board) {
      var results = 0;
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          results += board.rows()[i][j];
        } 
      }   
      return results === n;
    };

    var inner = function(rowNum) {
      if (rowNum === n) {
        return;
      }
      for (var j = 0; j < n; j++) {
        var matrix = JSON.parse(JSON.stringify(node.board.rows()));
        //console.log(matrix);
        var tempBoard = new Board(matrix);
        var tmp = new Node(tempBoard);
        while (tmp.board.attributes[rowNum][j] === 1) {
          j++;
        }
        if (j < n) {          
          tmp.board.togglePiece(rowNum, j); 
          if (!tmp.board.hasAnyQueensConflicts()) {            
            node.children.push(tmp);  
            console.log(rowNum, n);
            if (rowNum === n - 1 && checkPieces(tmp.board)) {
              console.log('tmp board', tmp.board);
              //eliminate duplicates
              var strings = JSON.stringify(tmp.board.rows());
              if (!_.contains(solutions, strings)) {
                solutions.push(strings);
              }  
            }
          }  
        } 
      }
    };
    for (var i = 0; i < n; i++) {
      inner(i);
    }
    for (var i = 0; i < node.children.length; i++) {
      helper(node.children[i], rows + 1);
    }
  };

  helper(emptyBoard, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutions.length);
  return solutions.length;
};
