// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  //let word =  input.question(`Let's play some scrabble!\nEnter a word to score:`);
  //let score = oldScrabbleScorer(word);
  //console.log(score);
  //return score;
  
  };

let newPointStructure = transform(oldPointStructure);
//console.log (newPointStructure);

let simpleScorer = function(word){
   let letter = word.toUpperCase();
	let score = 0;
   for (let i = 0; i < word.length; i++) {
      let char = letter[i];
      if (char >= 'A' && char <= 'Z')
         score += 1;
    
   }
   return score;
}

let vowelBonusScorer = function(word){
   let vowels = "AEIOUaeiou";
  let score = 0;
  for (let letter of word) {
    if (vowels.includes(letter)) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
   
}

let scrabbleScorer = function(word){
   
   let score = 0;
   for (let i = 0; i < word.length; i++) {
     let letter = word[i].toLowerCase();
     score += newPointStructure[letter];
   }
 
   return score;
}

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point",
      scorerFunction: simpleScorer,
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer, 
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer,
   },   
   
];

function scorerPrompt() {
   let userWord =  input.question(`Let's play some scrabble!\nEnter a word to score:`);
   let userInput = input.question(`Which scoring algorithm would you like to use?
   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system
   Enter 0, 1, or 2: `);
   let selectedAlgorithm = scoringAlgorithms[userInput];
   //return selectedAlgorithm;  

let score = selectedAlgorithm.scorerFunction(userWord);
console.log(`Score for "${userWord}": ${score}`); 



}

function transform (oldPointStructure) {
   let newPointStructure = {};
   
   for (let points in oldPointStructure){
      let lettersArray = oldPointStructure[points];
         for (i=0; i<lettersArray.length; i++ ) {
     newPointStructure[lettersArray[i].toLowerCase()]= Number(points);
      }
   
   }
   return newPointStructure;

};

   
function runProgram() {
   initialPrompt();
   scorerPrompt();
      
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
