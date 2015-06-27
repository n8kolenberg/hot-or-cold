
$(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});


	/*-- Variables --*/
  	var $userGuess;
  	var $feedback = $('#feedback');
  	var randomNumber = 0;
  	var amountOfGuesses = 0;
  	var guessCorrect = false;

  	/*-- Initialise New Game --*/
  	newGame();

 	/*-- New Game Function to encompass all code--*/
	function newGame () {
		setFocus();
		clearPrevInput();
		resetGuessCount();
		clearPrevGuesses();
		randomNumber = pickRandomNumber();
		$feedback.html('Make your Guess!');
		guessCorrect = false;

	} // End New Game
	

	$('#newGame').on('click', function(event){
		event.preventDefault();
		newGame();
	}); //End on Click New Game



   	/*-- Select a random numer --*/
  	function pickRandomNumber () {
  		randomNumber= Math.floor(Math.random()*100)+1;
  		console.log("Random Number Generated: " + randomNumber);
  		return randomNumber;
  	};

  	/*--Function to set focus on input--*/
  	function setFocus () {
  		$('#userGuess').focus();
  	}

  	/*--Function to clear the userGuess input field--*/
  	function clearPrevInput () {
  		$('#userGuess').val('');
  	}

	/*--Function to reset the amount of user guesses--*/
  	function resetGuessCount () {
  		$('#count').html('0');
  	}

	/*--Function to clear the previous user guesses--*/
  	function clearPrevGuesses () {
  		$('ul#guessList li').remove();
  	}

  	/*-- Accepting user input and providing feedback --*/
	  	
	  	//Method to get user's guess through clicking 'guess' button
	  	$('#guessForm').submit(function(event){
	  		event.preventDefault();

  			if(!guessCorrect) {
	  			$userGuess = Number($('#userGuess').val());
	  			validateUserInput($userGuess);
	  			//After user guesses, remove input val and put focus on input
	  			clearPrevInput();
	  			setFocus();
	  			return compare();  	
		  } else {
		  	$feedback.html("You've already guessed correctly. Click '+New Game' to play again");
		  } //End if statement

	}); //End Submit on form


  	/*-- Validation functions --*/
  	function validateUserInput (input) {
  		/*If the user doesn't input a number or  
  		  inputs anything higher than 100 or below or equal to 0 */
  		if( isNaN(input) || input > 100 || input <= 0) {
  			$feedback.html('Please enter a number between 1 and 100');
  		} else {
	  		//If user successfully inputs number, we add to the amount of guesses and show it
	  		amountOfGuesses++;
	  		$('span#count').html(amountOfGuesses);
	  		//List numbers guessed so far
	  		$('#guessList').append('<li>' + input + '</li>');
  		}
  	} //End validateForNaN


	//To check whether userGuess is equal to randomNumber
	function compare () {
		if ($userGuess > randomNumber) {
			$feedback.html("Your number is too high");
		} else if ($userGuess < randomNumber) {
			$feedback.html("Your number is too low");
		} else {
			$feedback.html('You got it');
			guessCorrect = true;
		}

	};//End compare function

}); //End ready


