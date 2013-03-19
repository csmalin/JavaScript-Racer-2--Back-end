$(document).ready(function() {

  var counter_p1 = 0;   // p = 80
  var counter_p2 = 0; // q = 81
  var p1 = document.getElementById("player1_strip");
  var p2 = document.getElementById("player2_strip");
  var winner = document.getElementById("winner");
  var startTime;
  var endTime;
  var raceTime;
  var winner;

  function ajaxify_the_results(stuff){
    $.ajax({
      url: "/gameover",
      type: 'POST',
      data: stuff
    })
    .done(function (data) {
      window.location = '/gameover';
    })
  };

  function endGame(player){
      counter_p1++;
      counter_p2++; 
      var d = new Date();
      endTime = d.getTime();
      gameTime = (endTime - startTime)/1000;
      $(winner).text("Player " + player + " wins with a time of " + raceTime + " seconds!!!");
      winner = player;
      var results = {game_time: gameTime, winner: winner};
      ajaxify_the_results(results);

  };


  

  $(document).on('keyup', function(event) {
      
    if(counter_p1 == 0 && counter_p2 == 0 && (event.keyCode === 81 || event.keyCode === 80)){
      var d = new Date();
      startTime = d.getTime();
    };


    if (counter_p1 < p1.cells.length && counter_p2 < p2.cells.length){
      if (event.keyCode === 81) {
        
        $(p1.cells[counter_p1]).removeClass("active");
        $(p1.cells[counter_p1 + 1]).addClass( "active" );
        counter_p1++;
      };

      if (event.keyCode === 80) {
        
        $(p2.cells[counter_p2]).removeClass("active");
        $(p2.cells[counter_p2 + 1]).addClass( "active" );
        counter_p2++;
      };
    };
    
    if (counter_p1 == p1.cells.length){
      endGame("1");
    };

     if (counter_p2 == p2.cells.length){
      endGame("2");
    };
  });
});
