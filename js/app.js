
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
  	var randomNumber = 0;
  	var amountOfGuesses = 0;
  	var guessCorrect = false;
  	var passValidation;
    var coolWords = ['Awww Yeah!', 'Boomshakalalah!', '(^.^)', '٩(◔‿◔)۶', '(≧◡≦)', 'ヽ(´▽｀)ノ', 'Wicked!', 'Dude!!', 'Niiiiice!', 'Fo shizzle!', 'Booyah!'];
    var bummerWords = ['Darn..', 'Oh no..', 'Aw snap :(', 'Bummer..', '(┛◉Д◉)┛彡┻━┻', '(⊙︿⊙)', 'Oh man..', 'Oh man..', 'Brrrr..', '(>.<)' ];

  	/*-- Initialise New Game --*/
  	newGame();


 	/*-- New Game Function to encompass all code--*/
	function newGame () {
		setFocus();
		clearPrevInput();
		resetGuessCount();
		clearPrevGuesses();
		randomNumber = pickRandomNumber();
		setFeedback('Make your Guess!');
		guessCorrect = false;

	} // End New Game
	

	/*--Restarting the game by clicking '+New Game'--*/
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


  	/*-- Set Feedback function --*/
  	function setFeedback (feedback) {
  		$('#feedback').html(feedback);
  	}

  	/*-- Accepting user input and providing feedback --*/
	  	
	  	//Method to get user's guess through clicking 'guess' button
	  	$('#guessForm').submit(function(event){
	  		event.preventDefault();

  			if(!guessCorrect) {
	  			$userGuess = Number($('#userGuess').val());
	  			passValidation = validateUserInput($userGuess);
	  			if(passValidation) {
		  			console.log("User Guess: " + $userGuess);
		  			//After user guesses, remove input val and put focus on input
		  			clearPrevInput();
		  			setFocus();
		  			compare();	
		  		} //End nested if statement
		  } else {
		  	setFeedback("You've already guessed correctly. Click '+New Game' to play again");
		  } //End if statement
	}); //End Submit on form


  	/*-- Validation functions --*/
  	function validateUserInput (input) {
  		/*If the user doesn't input a number or  
  		  inputs anything higher than 100 or below or equal to 0 */
  		if(isNaN(input)) {
  			setFeedback('Woops! I only accept numbers');
  			clearPrevInput();
  			setFocus();
  			return false;
  		} else if (input > 100 || input < 1) {
  			setFeedback('Uh oh.. I can only look at numbers between 1 and 100');
  			clearPrevInput();
  			setFocus();
  			return false;
  		} else if($.trim(input) == ' ') {
  			setFeedback("Looks like you didn't add your guess");
  			clearPrevInput();
  			setFocus();
  			return false;
  		} else {
  			//Only after validation do we add to guess count
  			addToGuessCount()
  			return true;
  		}; //end if statement
  	} //End validateForNaN


  	/*-- Guess count function --*/
  	function addToGuessCount () {
  			//We add to the amount of guesses and show it
	  		amountOfGuesses++;
	  		$('span#count').html(amountOfGuesses);
	  		//List numbers guessed so far
	  		$('#guessList').append('<li>' + $userGuess + '</li>');
  	}

	/*-- Function to check whether userGuess is equal to randomNumber --*/
	function compare () {
      var $prevUserGuess = parseInt($('#guessList').find("li:last").prev().text());
			var currentGuessDifference = randomNumber - $userGuess;
      var previousGuessDifference = randomNumber - $prevUserGuess;
			currentGuessDifference = Math.abs(currentGuessDifference);
      previousGuessDifference = Math.abs(previousGuessDifference);
			console.log('currentdifference: ' + currentGuessDifference);
      console.log('previousdifference: ' + previousGuessDifference);

      //if currentGuessDifference < previousGuessDifference, we're getting closer to the answer
      //if currentGuessDifference > previousGuessDifference, we're getting farther away from the answer

			if (isNaN(previousGuessDifference)) {		
  			if (currentGuessDifference == 0) {
  				setFeedback('Yeah baby!! You got it!');
  				guessCorrect = true;

  			} else if (currentGuessDifference <= 5) {
  				setFeedback('Your guess is really hot!');
  			
  			} else if (currentGuessDifference <=10) {
  				setFeedback('Your guess is hot!');
  			
  			} else if (currentGuessDifference > 10 && currentGuessDifference <= 20) {
  				setFeedback('Your guess is warm!');

  			} else if (currentGuessDifference > 20 && currentGuessDifference <= 30) {
  				setFeedback('Your guess is cold!');

  			} else if (currentGuessDifference > 30 && currentGuessDifference <= 40) {
  				setFeedback('Your guess is very cold!');
  			
  			} else  if (currentGuessDifference > 40) {
  				setFeedback('Your guess is freezing over!');
  			
  			} return false;//End nested if statement
      
      } else if (currentGuessDifference == 0) {
          setFeedback('Yeah baby!! You got it!');
          guessCorrect = true;

      } else if (currentGuessDifference < previousGuessDifference) {
        setFeedback( coolWords[Math.floor(Math.random()*coolWords.length)] + " Your guess is getting warmer!");

      } else if (currentGuessDifference > previousGuessDifference) {
        setFeedback( bummerWords[Math.floor(Math.random()*bummerWords.length)] + " Your guess is getting colder");

      } return false; //End if statement
	}//End compare function


}); //End ready


