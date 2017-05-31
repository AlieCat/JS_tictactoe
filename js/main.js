

var player1 = true,
	turn = true, //should toggle between true and false
 	counter = 0,
 	active = true, // Is the game active or not

 	board = $("#board"),
 	start_game_button = $("#start_game"),
 	sideboard = $("#sideboard"),
 	container = $("#container"),
 	winner_container = $("#winner-container"),
 	reset_button = $("#reset");


// Load up our game upon clicking then hide button
start_game_button.click(function(){
	load_Game()
	start_game_button.hide()
})

// Empty the previous board, reset vars and create a 3x3 grid. Last call is a function that checks
// which player's turn it is and displays the correct image (cat!).
function load_Game(){

board.empty()
winner_container.empty()
reset_button.hide()
active = true
player1 = true
createBoard(9)
current_player_show()


function createBoard(v){
  // Create a div for our current player image
  var current_player_div = $("<div></div>").addClass("current_player")
  	// Create 3 rows
    for (var i = 0; i < v; i++){
       row = document.createElement("div");
       row.className = "row " + "row" + i;
       row.setAttribute("data-row", i)

       // Create 9 cells
       for(var j=0; j < v; j++){

        cell = document.createElement("div");
     	token = document.createElement("div");
        cell.className = "cell " + "cell" + j;
        cell.setAttribute("data-cell", j)
        token.className = "token";
        row.appendChild(cell);
        cell.appendChild(token);

        //for adding a number system to the macro board
        // where V is the total number of rows/columns 
        // right now v=9 but v could be 27
        // 
        // looks like:
        //   1 2 3
        // 1 x x x
        // 2 x x x
        // 3 x x x
        //
        // I should add some code that says divide by 3 until
        // there are 3 squares added to each class?


            if(i< (v/3)) {
            	cell.className += " BR1";
    		}
    		else if(i>=(v/3) && i<(2*(v/3))){
    			cell.className += " BR2";	
			}else{
				cell.className += " BR3";
			}

            if(j< (v/3)) {
            	cell.className += " BC1";
    		}
    		else if(j>=(v/3) && j<(2*(v/3))){
    			cell.className += " BC2";	
			}else{
				cell.className += " BC3";
			}

       }

       board.append(row)
    }
    // Create the matrix - Our "back-end" logic that connects to the front-end grid we created above.
    // We work with the matrix to deal wth the computations and conditional logic that allows our
    // game to come alive.
    matrix = new Array(9);
	for (var i = 0; i < matrix.length; i++) {
		matrix[i] = new Array(9);
	}
	//create big matrix
		
	//create little matrix
	//for storing win conditions
	littlematrix = new Array(3);
	for (var i = 0; i < littlematrix.length; i++) {
		littlematrix[i] = new Array(3);
	}


// Append the div we created at the very start of this function to the HTML generated div.
// Add the "my turn" content that sits next to the image of the cat

 winner_container.append(current_player_div)
 current_player = $(".current_player")/*
 current_player.html("<span>My Turn!</span>")
*/
} //createBoard END

// Check which player's turn it is, then show the relevant image
function current_player_show(){
	
	if ( player1 === true ) {
		current_player.removeClass("sox")
		current_player.addClass("snowy")
	} else if ( player1 === false ) {
		current_player.removeClass("snowy")
		current_player.addClass("sox")
	  }

}

//create a function that returns a little row or little collumn value
function little(dataRow,dataCell){
	var LR = (dataRow)%3;
	var LC = (dataCell)%3;
	//console.log(dataCell);
	var LRLC=[LR,LC]
	return LRLC;
}

//create a function that checks if little row, little collumn is full
function full(dataRow,dataCell){
	var LR = (dataRow)%3;
	var LC = (dataCell)%3;
	for (var i=0; i<=2;i++){
	if (typeof  matrix[3*LR+i][3*LC] === 'undefined' || typeof matrix[3*LR][3*LC+i] === 'undefined' || typeof matrix[3*LR+i][3*LC+i] === 'undefined'){
		return false;
	}
	
	}
	console.log('true?')

	

}



// When a user clicks on a cell
$( ".cell" ).click(function() {

	
	clickedRow = $(this).parent().attr('data-row') 
	clickedCell = $(this).attr("data-cell")
	token = $(this).find('div')
	
	valid = true;
	

	// Check first if that square is already occupied, in this case alert the user to try another cell
	if ( $(this).find('div').hasClass( "snowy" ) || $(this).find('div').hasClass( "sox" ) ){
		alert("Hey! Stop poking me")
	} 

	//create logic that only allows user to place in bc & br
	if(player1 == true || player1 === 'undefined'){
		//if BRBC is not already full
		//console.log(full(clickedRow,clickedCell))
		if (full(clickedRow,clickedCell)== false){
		//console.log('p1 bc '+clickedCell);
		P1BRBC= little(clickedRow, clickedCell);
		//console.log(P1BRBC[0]);


		}
		else{
		console.log('you can go anywhere')
		P1BRBC=undefined	
		}


		//console.log('player1 '+'row '+P1BRBC[0]+'column '+P1BRBC[1])
	}else if(player1 == false){
		if (full(clickedRow,clickedCell)== false){

		//console.log("why "+clickedCell);	
		P2BRBC= little(clickedRow, clickedCell);

		}
		else{
		console.log('you can go anywhere')
		P2BRBC=undefined	
		}
		//console.log('player2')	
	}else{console.log('Too many players?')}

	if (typeof P2BRBC === 'undefined'){
		//console.log('first round you can go anywhere');
		//highlight
		function highlight1(classNameBRBC){
			var x = document.getElementsByClassName(classNameBRBC);
			var i;
			for (i = 0; i < x.length; i++) {
			x[i].style.background = "#ea7cf4";}
		}
		if(P1BRBC[0]==0 && P1BRBC[1]==0)
		{ highlight1("BR1 BC1");}
		else if(P1BRBC[0]==1 && P1BRBC[1]==0)
		{ highlight1("BR2 BC1");}
		else if(P1BRBC[0]==2 && P1BRBC[1]==0)
		{ highlight1("BR3 BC1");}
		else if(P1BRBC[0]==0 && P1BRBC[1]==1)
		{ highlight1("BR1 BC2");}
		else if(P1BRBC[0]==1 && P1BRBC[1]==1)
		{ highlight1("BR2 BC2");}
		else if(P1BRBC[0]==2 && P1BRBC[1]==1)
		{ highlight1("BR3 BC2");}
		else if(P1BRBC[0]==0 && P1BRBC[1]==2)
		{ highlight1("BR1 BC3");}
		else if(P1BRBC[0]==1 && P1BRBC[1]==2)
		{ highlight1("BR2 BC3");}
		else if(P1BRBC[0]==2 && P1BRBC[1]==2)
		{ highlight1("BR3 BC3");}
	}//else if(filled()){ you can go anywhere}
	else{
		//reset board background
		function reset(){
			var x = document.getElementsByClassName("cell");
			var i;
			for (i = 0; i < x.length; i++) {
			x[i].style.background = "#42a7f4";}
		}
		if(player1==true && P2BRBC !== undefined){

				//console.log('player2 '+'row '+P2BRBC[0]+'column '+P2BRBC[1]);
				if(P2BRBC[0] == 0 && clickedRow>2){
					//console.log("Hey! Stop poking me you chose big row 2 or 3 and p2 chose little row 1");
					valid=false;
				}else if(P2BRBC[0] == 1 && (clickedRow<3  ||  clickedRow>5)){
					//console.log("Hey! Stop poking me you clicked big Row 1 or 3 and p1 chose little row 1");
					valid=false;
				}else if(P2BRBC[0] == 2 && clickedRow<6){
					//console.log("Hey! Stop poking me");
					valid=false;
				}else if(P2BRBC[1] == 0 && clickedCell>3){
					//console.log("Hey! Stop poking me");
					valid=false;
				}else if(P2BRBC[1] == 1 && (clickedCell<3  ||  clickedCell>5)){
					//console.log("Hey! Stop poking me");
					valid=false
				}else if(P2BRBC[1] == 2 && clickedCell<6){
					//console.log("Hey! Stop poking me");
					valid=false;
				}
				else{
					//console.log(P2BRBC[0]);
					//console.log(P2BRBC[1]);
					valid=true;
					reset();
					function highlight1(classNameBRBC){
						var x = document.getElementsByClassName(classNameBRBC);
						var i;
						for (i = 0; i < x.length; i++) {
						x[i].style.background = "#ea7cf4";}
					}
					if(P1BRBC[0]==0 && P1BRBC[1]==0)
					{ highlight1("BR1 BC1");}
					else if(P1BRBC[0]==1 && P1BRBC[1]==0)
					{ highlight1("BR2 BC1");}
					else if(P1BRBC[0]==2 && P1BRBC[1]==0)
					{ highlight1("BR3 BC1");}
					else if(P1BRBC[0]==0 && P1BRBC[1]==1)
					{ highlight1("BR1 BC2");}
					else if(P1BRBC[0]==1 && P1BRBC[1]==1)
					{ highlight1("BR2 BC2");}
					else if(P1BRBC[0]==2 && P1BRBC[1]==1)
					{ highlight1("BR3 BC2");}
					else if(P1BRBC[0]==0 && P1BRBC[1]==2)
					{ highlight1("BR1 BC3");}
					else if(P1BRBC[0]==1 && P1BRBC[1]==2)
					{ highlight1("BR2 BC3");}
					else if(P1BRBC[0]==2 && P1BRBC[1]==2)
					{ highlight1("BR3 BC3");}
					//console.log('valid entry');
				}
		}
		else if(player1==false && P1BRBC !== undefined){
				
				//console.log('player1 '+'row '+P1BRBC[0]+'column '+P1BRBC[1])
				if(P1BRBC[0] == 0 && clickedRow>2){
					//console.log("Hey! Stop poking me p1 chose little row 0");
					valid=false;
				}else if(P1BRBC[0] == 1 && (clickedRow<3  ||  clickedRow>5)){
					//console.log("Hey! Stop poking me p1 chose little row 1");
					valid=false;
				}else if(P1BRBC[0] == 2 && clickedRow<6){
					//console.log("Hey! Stop poking me p1 chose little row 2");
					valid=false;
				}else if(P1BRBC[1] == 0 && clickedCell>2){
					//console.log("Hey! Stop poking me little collumn " + P1BRBC[1]);
					valid=false;
				}else if(P1BRBC[1] == 1 && (clickedCell<3  ||  clickedCell>5)){
					//console.log("Hey! Stop poking me lc2");
					valid=false;
				}else if(P1BRBC[1] == 2 && clickedCell<6){
					//console.log("Hey! Stop poking me lc3");
					valid=false;
				}
				else{
					//console.log('row '+ P1BRBC[0]);
					//console.log('column '+P1BRBC[1]);
					valid=true;
					reset();
					//highlight where you can go
					function highlight(classNameBRBC){
						var x = document.getElementsByClassName(classNameBRBC);
	    				var i;
	    				for (i = 0; i < x.length; i++) {
	        			x[i].style.background = "#a67cf4";}
					}
					if(P2BRBC[0]==0 && P2BRBC[1]==0)
					{ highlight("BR1 BC1");
	        		}
					else if(P2BRBC[0]==1 && P2BRBC[1]==0)
					{ highlight("BR2 BC1");}
					else if(P2BRBC[0]==2 && P2BRBC[1]==0)
					{ highlight("BR3 BC1");}
					else if(P2BRBC[0]==0 && P2BRBC[1]==1)
					{ highlight("BR1 BC2");}
					else if(P2BRBC[0]==1 && P2BRBC[1]==1)
					{ highlight("BR2 BC2");}
					else if(P2BRBC[0]==2 && P2BRBC[1]==1)
					{ highlight("BR3 BC2");}
					else if(P2BRBC[0]==0 && P2BRBC[1]==2)
					{ highlight("BR1 BC3");}
					else if(P2BRBC[0]==1 && P2BRBC[1]==2)
					{ highlight("BR2 BC3");}
					else if(P2BRBC[0]==2 && P2BRBC[1]==2)
					{ highlight("BR3 BC3");}
					//console.log('valid entry');
				}
		}
	}



	if (active === true && valid===true){ // user clicks an empty cell

		if (player1 === true) {  // I'm breaking the DRY rule here (dont repeat yourself) sorry!
			//retreive some data?
			token.css("display", "block") // CSS and classes for occupied cell styles
	  		token.addClass("snowy")
	  		token.css("border", "none")
	  		token.addClass("expandOpen")
	  		matrix[clickedRow][clickedCell] = "p1" // to show this matrix cell is now occupied
	  		//send this variable to the websocket
	  		

	  		counter++ // add one to the turn counter
	  		if (typeof P2BRBC !== 'undefined'){
	  			//console.log("BR "+P2BRBC[0]+"BC "+P2BRBC[1])
	  			//check if other player has already won the square
	  			if (littlematrix[P2BRBC[0]][P2BRBC[1]] !== "p2") {
	  			//console.log(littlematrix)
	  			win_condition_check((P2BRBC[0]+1),(P2BRBC[1]+1)); // check if our player has won
	  			}
	  			else{
	  			//check if player overturns square
	  			console.log("overturn check p1")
	  			overturn_check(P2BRBC[0],P2BRBC[1],"p1")
	  			}	

	  		}
	  		
	  		
	  		player1 = false; // Set variable to player 2
	  		
		}

	  	else if (player1 === false) { 
			token.css("display", "block")
	  		token.addClass("sox")
	  		token.addClass("expandOpen")

	  		//console.log(clickedRow)
	  		//console.log(clickedCell)
	  		matrix[clickedRow][clickedCell] = "p2"
	  		
	  		counter++
	  		if (typeof P1BRBC !== 'undefined'){
	  			//console.log("BR "+P1BRBC[0]+"BC "+P1BRBC[1])
	  			if (littlematrix[P1BRBC[0]][P1BRBC[1]] !== "p1") {
	  				//console.log(littlematrix);
	  				win_condition_check((P1BRBC[0]+1),(P1BRBC[1]+1)) // check if our player has won
	  			}else{
	  			//check if player overturns square
	  			console.log("overturn check p2")
	  			overturn_check(P1BRBC[0],P1BRBC[1],"p2")
	  			}
	  		}
	  		player1 = true

	  		
	  	}
	  	
	  	current_player_show() 

	}




}); // End click_cell event listener

// A button that appears to reload the game
$("#reset").click(function(){ 
	
	current_player.removeClass("snowy sox")
	load_Game()
	counter = 0
	start_game_button.hide()


})




function win_condition_check(BR,BC){ //tion, sorry again. I've used a lot of conditional logic, attempting to scale it down only met with errors and tears.
	//console.log("big row "+BR+" big column "+BC)
	// Check the console.logs for the intended results.
	if ((counter%2)===1) { // If it's player one's turn
		//Check in only BR,BC
		//Check in all the Bigger squares
		little_check(((BR-1)*3),((BC-1)*3));
		//little_check(0,3);
		//little_check(0,6);
		//little_check(3,0);
		//little_check(3,3);
		//little_check(3,6);
		//little_check(6,0);
		//little_check(6,3);
		//little_check(6,6);

		//
		function little_check(count,count2){
			
			//console.log("count "+ count+"count2 "+count2);			
  	  		for ( var x=count; x <= (count+2); x++) { // cycle the matrix rows...
  	  			for (var y=count2; y <= (count2+2); y++) { // ...and cycle the matrix cells
					//var BR=1;

					//console.log("matrx[x] "+ x+"martix[y] "+y);
					if ((matrix[x][(count2+0)]) === "p1" && (matrix[x][(count2+1)]) === "p1" && (matrix[x][(count2+2)]) === "p1") { // If our cell has been 'tagged' p1 given x is (e.g 0) then: x0y0, x0y1, x0y2 would mean player one has 3 horizontal cells in a line = victory!
						if (player1 === true){
						//console.log("horizontal victory")
						//console.log("player1 wins square row "+BR+ "column "+BC )
						winner_show(BR,BC)
						littlematrix[(BR-1)][(BC-1)]="p1";
						return;

						}
					} 
					else if	(   (matrix[(count+0)][y]) === "p1" && (matrix[(count+1)][y]) === "p1" && (matrix[(count+2)][y]) === "p1") { // Repeated for other conditions
						if (player1 === true){
						//console.log("vertical victory")
						//console.log("player1 wins")
						winner_show(BR,BC)
						littlematrix[(BR-1)][(BC-1)]="p1";
						return;
						}
					}
					else if ((matrix[(count+0)][(count2+0)]) === "p1" && (matrix[(count+1)][(count2+1)]) === "p1" && (matrix[(count+2)][(count2+2)]) === "p1") {
						if (player1 === true){
						console.log("LtopRdown diagonal")
						console.log("player1 wins")
						winner_show(BR,BC)
						littlematrix[(BR-1)][(BC-1)]="p1";
						return;
						}
					} 
					else if	(  (matrix[(count+0)][(count2+2)]) === "p1" && (matrix[(count+1)][(count2+1)]) === "p1" && (matrix[(count+2)][(count2+0)]) === "p1") {	
						if (player1 === true){
						console.log("Rtop Ldown diagonal")
						console.log("player1 wins")
						winner_show(BR,BC)
						littlematrix[(BR-1)][(BC-1)]="p1";
						return;
						}
					}
				}
			}
	
	  	}  
	} // End player one check


	if ((counter%2)===0) {	// Now for player 2

		little_check1(((BR-1)*3),((BC-1)*3));
		//little_check1(0,3);
		//little_check1(0,6);
		//little_check1(3,0);
		//little_check1(3,3);
		//little_check1(3,6);
		//little_check1(6,0);
		//little_check1(6,3);
		//little_check1(6,6);

		//
		function little_check1(count,count2){


	  	  for (var x = count; x <= (count+2); x++) {
			for (var y = count2; y <= (count2+2); y++) {

				if ((matrix[x][(count2+0)]) === "p2" && (matrix[x][(count2+1)]) === "p2" && (matrix[x][(count2+2)]) === "p2") {
				
				//console.log(player1)

				if (player1== false) {
					console.log("horizontal victory")
					console.log("player2 wins")
					winner_show(BR,BC)
					littlematrix[(BR-1)][(BC-1)]="p2";
					return;
					}
				}

				else if	((matrix[(count+0)][y]) === "p2" && (matrix[(count+1)][y]) === "p2" && (matrix[(count+2)][y]) === "p2") {
				if (player1== false) {
					console.log("vertical victory")
					console.log("player2 wins")
					winner_show(BR,BC)
					littlematrix[(BR-1)][(BC-1)]="p2";
					return;
					}
				}
				else if ((matrix[(count+0)][(count2+0)]) === "p2" && (matrix[(count+1)][(count2+1)]) === "p2" && (matrix[(count+2)][(count2+2)]) === "p2") {
				if (player1== false) {	
					console.log("LtopRdown diagonal")
					console.log("player2 wins")
					winner_show(BR,BC)
					littlematrix[(BR-1)][(BC-1)]="p2";
					return;
					}	
				}
			
				else if	((matrix[(count+0)][(count2+2)]) === "p2" && (matrix[(count+1)][(count2+1)]) === "p2" && (matrix[(count+2)][(count2+0)]) === "p2") {	
					if (player1== false) {
					console.log("Rtop Ldown diagonal")
					console.log("player2 wins")
					winner_show(BR,BC)
					littlematrix[(BR-1)][(BC-1)]="p2";
					return;
					}
				}
				
				
			}
	
		}
		}	
	} // End player 2 check

	

	// In the case of a DRAW. We announce this and allow the users to play again
	// check all 9 space



} // Function win_condition_check END

function overturn_check(BR,BC,P){
		
		var overturn_counter=0;
		for (var x = 3*BR; x <= (3*BR+2); x++) {
				//console.log("BR "+BR+"BC "+BC+"P "+P)

				if ((matrix[x][(3*BC+0)]) == P && (matrix[x][(3*BC+1)]) == P && (matrix[x][(3*BC+2)]) == P) {
					overturn_counter+=1;
					console.log("BR "+BR+"BC "+BC);
					console.log(overturn_counter);
					if (overturn_counter>1) {
						console.log(P +" overturned the square")
						//winner_show(BR,BC)
						littlematrix[BR][BC]= P;
						win_condition_check((BR+1),(BC+1));
						return;
						}
				}
		}
		for (var y = 3*BC; y <= (3*BC+2); y++) {
				if	((matrix[(3*BR+0)][y]) == P && (matrix[(3*BR+1)][y]) == P && (matrix[(3*BR+2)][y]) == P) {
					overturn_counter+=1;
					console.log("BR "+BR+"BC "+BC);
					console.log(overturn_counter);
					if (overturn_counter>1) {
					console.log(P + " overturned the square")
					//winner_show(BR,BC)
					littlematrix[BR][BC]= P;
					win_condition_check((BR+1),(BC+1));
					return;
					}
				}

		}

}


function winner_show(BR,BC){ 
	
	if (player1 == true) { // a bit confusing, but basically, if the game has finished player 2 has finished 
		winner_snowy_div = document.createElement("div");
		winner_snowy_div.setAttribute("id", "winner_snowy")
	    winner_snowy_div.setAttribute("class", "winner snowy")
	    //change the background color in all cells BC, BR
	    $( ".BC"+BC+".BR"+BR ).css( "background", "pink" );

	    winner_container.append(winner_snowy_div)
		
		//reset_button.show()
		//active = false
		//current_player.hide()
	}

	if (player1 == false) {
		winner_sox_div = document.createElement("div");
		winner_sox_div.setAttribute("id", "winner_sox")
	    winner_sox_div.setAttribute("class", "winner sox")
	    winner_sox_div.innerHTML = "<span>" + 'I Win!' + "</span>"
	    winner_container.append(winner_sox_div)
		
		$( ".BC"+BC+".BR"+BR ).css( "background", "sandybrown" );
		//reset_button.show()
		//active = false	
		//current_player.hide()	
	}
}


 }// Load Game end


