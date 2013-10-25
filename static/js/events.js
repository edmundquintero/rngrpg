$(function(){

 $('#stats-link').on('click', function(){


    // $.get( "/stats", function( data ) {
    //   console.log(data);
    //   $( "#injectionSite" ).append("<h3>"+data.name +"</h3>");
    //   for(i=0; i<data.stats.length; i++){
    //     $( "#injectionSite" ).append( data.stats[i].name +" - "+ data.stats[i].ammount );
    //   }

    // })
    var jqxhr = $.get( "/stats", function(data) {})
      .done(function(data) {
        console.log(data);
        $( "#injectionSite" ).append("<h3>"+data.character.name +"</h3>");
        for(i=0; i<data.character.stats.length; i++){
          $( "#injectionSite" ).append( data.character.stats[i].name +" - "+ data.character.stats[i].ammount );
        }
      })
      .fail(function() {
        alert( "error" );
      });

  });







});