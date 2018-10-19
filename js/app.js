var config = {
    apiKey: "AIzaSyB8Eza7nSWdUNHJobfNN6tQcmXzYklpIlc",
    authDomain: "project1-group.firebaseapp.com",
    databaseURL: "https://project1-group.firebaseio.com",
    projectId: "project1-group",
    storageBucket: "project1-group.appspot.com",
    messagingSenderId: "760934787211"
};
firebase.initializeApp(config);

var database = firebase.database();

var apiKey = "777df2480edd4e6fb87cb0ce9a5ba5bb"
var queryURL = "https://newsapi.org/v2/everything?sources=ign&q=overwatch&pageSize=3&apiKey=777df2480edd4e6fb87cb0ce9a5ba5bb"


function createButtons(value) {
    var $divSpot = $("#buttonRender");

    var $button = $("<button>");

    $button.attr("href", "#");
    $button.attr("id", "searchTerm");
    $button.attr("class", "btn-large waves-effect waves-light teal lighten-1");
    $button.attr("value", value);
    $button.text(value);

    $divSpot.append($button);

}

database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function (snapshot) {
    createButtons(snapshot.val().searchTerm);
});


$("#banner").on("submit", function (e) {
    e.preventDefault();
    $(".row-artist").removeClass("hide");
    console.log("submitted!");

    var searchTerm = $("#gameNameSearch").val();


    var queryURL = "https://newsapi.org/v2/everything?sources=ign&q=" + searchTerm + "&pageSize=3&apiKey=777df2480edd4e6fb87cb0ce9a5ba5bb";

    database.ref().push({
        searchTerm: searchTerm
    });

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
        var i;
        for (i = 0; i < response.articles.length; i++)
            renderGameInfo(response.articles[i]);

    })

});

$("#find-button").on("click", function (event) {
    event.preventDefault();

    var searchTerm = $("#gameNameSearch").val();
    console.log(searchTerm);

    var queryURL = "https://newsapi.org/v2/everything?sources=ign&q=" + searchTerm + "&pageSize=3&apiKey=777df2480edd4e6fb87cb0ce9a5ba5bb";

    database.ref().push({
        searchTerm: searchTerm
    });

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
        var i;
        for (i = 0; i < response.articles.length; i++)
            renderGameInfo(response.articles[i]);

    })


});

$(document).on("click", ".btn-search", function () {
    $(".row-artist").removeClass("hide");
})

$(document).on("click", ".searchTerm", function (event) {

    event.preventDefault();

    console.log($(this).val());
    var searchTerm = $(this).val();
    var queryURL = "https://newsapi.org/v2/everything?sources=ign&q=" + searchTerm + "&pageSize=3&apiKey=777df2480edd4e6fb87cb0ce9a5ba5bb";

    // populate screen
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
        var i;
        for (i = 0; i < response.articles.length; i++)
            renderGameInfo(response.articles[i]);

    })
});

function renderGameInfo(response) {
    console.log(response.description);

    $(".articleTitle").text(response.title);
    $("#publishDate").text(response.publishedAt);
    $("#articleAuthor").text(response.author);
    $(".actualSnippet").text(response.description);
    $(".img-responsive").attr("src", response.urlToImage);

    $(".linkButton").attr("href", response.url);
    $(".linkButton").attr("target", "_blank");
}

function createButtons(value) {
    var $divSpot = $("#buttonRender");

    var $button = $("<button>");

    $button.attr("href", "#");
    $button.attr("class", "btn-large waves-effect waves-light teal lighten-1 searchTerm btn-search");
    $button.attr("value", value);
    $button.text(value);

    $divSpot.append($button);

}
