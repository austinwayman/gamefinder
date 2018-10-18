(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

var searchTerm = $("#findButton").val().trim();

var apiKey = "777df2480edd4e6fb87cb0ce9a5ba5bb"
var queryURL = "https://newsapi.org/v2/everything?sources=ign&q=" + "&pageSize=3&apiKey=777df2480edd4e6fb87cb0ce9a5ba5bb"

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function(response) {
  console.log(response)
  var i;
  for (i = 0; i < 2; i++){

  var snippet = $("<h2>").text(response.articles[i].description);

  var articleImg = $("<img>").attr("src", response.articles[i].urlToImage);

  var articleLink = $("<a>").attr("href", response.articles[i].url);

  var articleAuthor = $("<h2>").text(response.articles[i].author);

  var articleTitle = $("<h2>").text(response.articles[i].title);

  console.log(snippet);
  console.log(articleImg);
  console.log(articleLink);
  console.log(articleAuthor);
  console.log(articleTitle);
  
var $row = $("<div row>")
  
  $("$row").append(articleTitle, articleAuthor, snippet, articleLink);
  $("main-div").append($row);
  }
})
