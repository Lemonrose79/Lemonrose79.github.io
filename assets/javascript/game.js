// Guessable words
var words =["london","prague","brussels","chicago","oslo","rotterdam","berlin","paris","venice","buenos aires","tokyo","new york","seoul","mumbai"] 
     
    
       
    
// Maximum # of Guesses player is allotted per game
maxGuesses = 10;           
// These letters have been guessed
var usedLetters = [];
// Index-->This will be the word we actually build to match the current word
 var wordIndex;         
 // User's remaining guesses
 var remainingGuesses = 0;
//  This is the word(starting as blanks) that User must guess
wordToGuess=[];
// Signal to start the game
var gameStart = false; 
// Signal to restart game, after win or loss 
var gameAgain = false; 
    //  Wins accumulated 
var wins = 0;                   
// Reset variables and do it all again
function resetGame() {
  remainingGuesses = maxGuesses;
  gameStart = false;

  // Let computer pick a random word from array
  wordIndex = Math.floor(Math.random() * (words.length));

  // Array empty
  usedLetters = [];
  wordTo = [];

  

  // Build the word to Guess and reset it
  for (var i = 0; i < words[wordIndex].length; i++) {
      wordToGuess.push("_");
  }
  //DO YOU EVEN WANT THIS HERE????
//   document.getElementById("tryAgain")= "display:block;
//   document.getElementById("tryAgain").style.opacity =" 2.0s linear 0s";
//   document.getElementById("tryAgain").style.opacity = 0;
  
  // Show display
  updateDisplay();
};

//  Updates the (HTML)display
function updateDisplay() {

  document.getElementById("totalWins").innerText = wins;
  document.getElementById("wordIndex").innerText = "";
  for (var i = 0; i < wordToGuess.length; i++) {
      document.getElementById("wordIndex").innerText += wordToGuess[i];
  }
  document.getElementById("remainingGuesses").innerText = remainingGuesses;
  document.getElementById("usedLetters").innerText = usedLetters;
  document.getElementById("usedLetters").style.cssText = "background: aqua";
  
  if(remainingGuesses <= 0) {
      
      document.getElementById("tryAgain").style.cssText = "display:block";
      document.getElementById("tryAgain").style.opacity ="opacity 3.0s linear 0s";
      document.getElementById("tryAgain").style.opacity = 1;
      gameAgain = true;
  }
};
document.onkeydown = function(event) {
  // If user completes game, reset to start over
  if(gameAgain) {
      resetGame();
      gameAgain = false;
  } else {
      // Found this solution online to avoid an alphabet array!
      if(event.keyCode >= 65 && event.keyCode <= 90) {
          guess(event.key.toLowerCase());
      }
  }
};
function guess(letter) {
  if (remainingGuesses > 0) {
      if (!gameStart) {
          gameStart = true;
      }

      // MAKE SURE THIS IS A NEW LETTER GUESS
      if (usedLetters.indexOf(letter) === -1) {
          usedLetters.push(letter);
          validateGuess(letter);
      }
  }
  
  updateDisplay();
  updateWin();
  resetGame();
    

};
// function to check that letter guess exists in our word and replaces each "_" with the letter for wordToGuess
function validateGuess(letter) {
  // Empty array to hold proper order of letters in our word
  var spelling = [];

  // Loop through word finding all instances of guessed letter, store the indices in an array.
  for (var i = 0; i < words[wordIndex].length; i++) {
      if(words[wordIndex][i] === letter) {
          spelling.push(i);
      }
  }

  // if not a match, decrement a guess 
  if (spelling.length <= 0) {
      remainingGuesses--;

    //if correct guess... 
  } else {
      // Replace "_"s with appropriate letters          
      for(var i = 0; i < spelling.length; i++) {
          wordToGuess[spelling[i]] = letter;
      }
  }
};
// Updates # of wins, CREATE ALERT THAT "YOU WIN!!!!"???
function updateWin() {
  if(wordToGuess.indexOf("_") === -1) {
      document.getElementById("tryAgain").style.cssText= "display: block";
      wins++;
      gameAgain = true;
  }
};