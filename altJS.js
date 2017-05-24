$(document).ready(function(){


  var gifs = ["DEVO", "corn", "wird", "fail", "ham", "ginger",
           "segway", "random", "jeff goldblum", "block head", "shaka", "tim gunn"];
      // gifs.splice(12,1,gif);
  var name = "data-name";

//cache
  var button = $("<button>"),
      gif = $("#gif-input").val().trim()
      
  // function alertgifName() {
  //   var gifName = $(this).attr("data-name");
  //     }
     
      function newBtn() {
        // empty input
        $("#btn-dump").empty();

        for (var i = 0; i < gifs.length; i++) {

          button = $("<button>");
          button.addClass("gif");
          button.attr("data-name", gifs[i]);
          button.attr("src", $(this).attr("animate"));
          button.attr("data-gif"), $(this).attr("data-gif", "animate");
          button.text(gifs[i]);
          $("#btn-dump").append(button);     
          };



          $("#add-gif").on("click", function(event) {
            event.preventDefault();
            gif = $("#gif-input").val().trim();
            gifs.push(gif);
            newBtn();
            return false;

});

newBtn();
// =====================================================================begin api shit
 $(document).on("click",".gif", function displayGif() {
        var gifName = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax(
          {url: queryURL,
            method: "GET"
          })

        .done(function(response){
          var results = response.data;  
          console.log(response);
//replace the 10 gifs
         // $("#gif-dump").empty();    

          for (var i = 0; i < results.length; i++) {
//for rating restriction
           if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              var gifDiv = $("<div class='item'>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: XXX or " + rating + " ?!");
              var gifImage = $("<img>"); 
                  gifImage.attr("src", results[i].images.fixed_height_still.url);
                  // gifImage.attr("src", results[i].images.fixed_height.url);
                  // added in
                // gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                // gifImage.attr("data-animate", results[i].images.fixed_height.url);
                // gifImage.attr("data-state", "still");
                // gifImage.addClass("animate");
              gifDiv.append(p);
              gifDiv.append(gifImage);
              $("#gif-dump").prepend(gifDiv);
            };

            $(document).on("click", ".gif" function() {

              var boring = $(this).attr("data-boring");
              if(boring === "animate"){
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-boring", "still");
              }
              else{
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-boring", "animate");
              }
            });
          };
        });
      });
    };