
$(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});


  	/*-- New Game Function --*/
  	// function newGame () {
  	// 	pickRandomNumber();
  	// 	catchUserGuess();
  	// }


  	/*-- Variables --*/
  	var $userGuess;
  	var $feedback = $('#feedback');
  	var randomNumber = 0;
  	var amountOfGuesses = 0;


  	/*-- Select a random numer --*/
  	function pickRandomNumber () {
  		randomNumber= Math.floor(Math.random()*100)+1;
  		return randomNumber;
  	}

  	/*-- Accepting user input and providing feedback --*/

  	(function catchUserGuess () {
	  	$('#guessForm').on('keydown', '#userGuess', function(event){
	  		if(event.keyCode == 13) {
	  			$userGuess = Number($('#userGuess').val());
	  			validateForNaN($userGuess);
	  			event.preventDefault();
	  			
	  			return console.log($userGuess);
	  		} //End if statment
	  	
	  	}); //End on keydown
	})(); //End catchUserGuess


  	/*-- Validation functions --*/
  	function validateForNaN (input) {
  		// $('#feedback').html('');
  		if( isNaN(input) ) {
  			$feedback.html('Please enter a number between 1 and 100');
  		} else {
	  		//If user successfully inputs number, we add to the amount of guesses and show it
	  		amountOfGuesses++;
	  		$('span#count').html(amountOfGuesses);
	  		//List numbers guessed so far
	  		$('#guessList').append('<li>' + input + '</li>');
  		}
  	} //End validateForNaN

});


