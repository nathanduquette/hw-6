$(document).ready(function() {


    var gifs = ["DEVO", "corn", "wird", "fail", "ham", "ginger",
        "segway", "random", "jeff goldblum", "block head", "shaka", "tim gunn"
    ];

    var name = "data-name";

    initializeBtn();

    function initializeBtn() {

        $("#gif-input").val("");

        for (var i = 0; i < gifs.length; i++) {
            addBtn(gifs[i]);
        };
    };

    function newBtn(gif) {
        addBtn(gif);
    }

    function addBtn(gifText) {
        var button = $("<button>");
        button.addClass("gif");
        button.attr("data-name", gifText);
        button.text(gifText);
        $("#btn-dump").append(button);
        
    };
    // =====================================================================begin api shit
    function displayGif() {
        var gifName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function(response) {
            var results = response.data;
            $("#gif-dump").empty();
            console.log(response);


            

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("animate");
                    gifDiv.append(p);
                    gifDiv.append(gifImage);
                    $("#gif-dump").prepend(gifDiv);
                };
            };
        });
    };
    //========================================================================end api shit
    $(document).on("click", ".animate", function() {

        var boring = $(this).attr("data-state");

        if (boring === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        } else {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        };

    });
    
    $(document).on("click", ".gif", displayGif);
  



    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        gif = $("#gif-input").val().trim();
        if (gif === "") {
            return
        }
        // erase the input
        $("#gif-input").val("");
        gifs.push(gif);
        newBtn(gif);

    });
});
