
// Firebase start
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

// creates buttons based on new child added in fire base
database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function (snapshot) {
    createButtons(snapshot.val().searchTerm);
});
// fire base end



// event listeners
$("#banner").on("submit", function (e) {
    e.preventDefault();

    console.log("submitted!");

    var searchTerm = $("#gameNameSearch").val();
    
    database.ref().push({
        searchTerm: searchTerm
    });
    
    var queryURL = "https://api.twitch.tv/helix/games?name=" + searchTerm;

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: { "Client-ID": "4ankfq8lphigd442f20y4kro0bnoki" }

    }).then(function (response) {
        var id = response.data[0].id;
        makeThingsDryYoTwitch(id);
    });

    makeThingsDryYo(searchTerm);

});

$("#find-button").on("click", function (event) {
    event.preventDefault();

    var searchTerm = $("#gameNameSearch").val();
    console.log(searchTerm);

    database.ref().push({
        searchTerm: searchTerm
    });

    var queryURL = "https://api.twitch.tv/helix/games?name=" + searchTerm;

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: { "Client-ID": "4ankfq8lphigd442f20y4kro0bnoki" }

    }).then(function (response) {
        var id = response.data[0].id;
        makeThingsDryYoTwitch(id);
    });
    

    makeThingsDryYo(searchTerm);

});

$(document).on("click", ".searchTerm", function (event) {

    event.preventDefault();

    console.log($(this).val());
    var searchTerm = $(this).val();

    makeThingsDryYo(searchTerm);

    makeThingsDryYoTwitch($(this).attr("data-game-id"));

});


// Drys out the ign ajax calls with an error catcher incase no itemes returned
function makeThingsDryYo(searchTerm) {
    var queryURL = "https://newsapi.org/v2/everything?sources=ign&q=" + searchTerm + "&pageSize=3&apiKey=777df2480edd4e6fb87cb0ce9a5ba5bb";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        $(".putArticlesHere").empty();
        if (response.articles.length < 1) {
            $(".foo").addClass("hide");
            alert("NO RESULTS");
        }
        else {
            $(".foo").removeClass("hide");
            for (var i = 0; i < response.articles.length; i++) {
                createDiv(response.articles[i], i);
            }
        }

    });

}

function makeThingsDryYoTwitch(gameID) {

    var queryURL = "https://api.twitch.tv/helix/clips?game_id=" + gameID;
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: { "Client-ID": "4ankfq8lphigd442f20y4kro0bnoki" }
    }).then(function (response) {
        console.log(response);
        $(".putTwitchTopClips").empty();
        for (var i = 0; i < 5; i++) {
            createIframe(response.data[i]);
        }
    });
}


// function to render buttons.
function createButtons(value) {
    var $divSpot = $("#buttonRender");

    var $button = $("<button>");

    $button.attr("href", "#");
    $button.attr("class", "btn-large waves-effect waves-light teal lighten-1 searchTerm btn-search");
    $button.attr("value", value);
    $button.text(value);

    var queryURL = "https://api.twitch.tv/helix/games?name=" + value;

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: { "Client-ID": "4ankfq8lphigd442f20y4kro0bnoki" }

    }).then(function (response) {
        var id = response.data[0].id;
        $button.attr("data-game-id", id);
        $divSpot.append($button);

    });

}

// Functions to render
function createDiv(response, index) {

    var $renderSpot = $(".putArticlesHere");
    var $newDiv = $("<div class='row row-artist containerImg " + index + "' >");

    var divCol = $("<div class='col-md-4' style='padding-left: 0px;  padding-right: 0px;'>");
    var newImage = $("<img>");
    newImage.attr("src", response.urlToImage);
    console.log(response.urlToImage)
    newImage.attr("id", "articleImage");
    newImage.attr("class", "img-responsive");

    divCol.append(newImage);
    $newDiv.append(divCol);

    var divRow = $("<div class='textColumn col-md-8'>");
    var divPageHeader = $("<div class=page-header'>");
    var h3FrirstChild = $("<h3 class='newsTitle'>");
    var h3SpanFirstChild = $("<span class='articleTitle'>");

    h3FrirstChild.append(h3SpanFirstChild);
    divPageHeader.append(h3FrirstChild);
    divRow.append(divPageHeader);

    h3SpanFirstChild.text(response.title);

    divRow.append("<h4> Publish Date: <span class='publishDate'>" + getDate(response.publishedAt));
    divRow.append("<h4>Article Author: <span class='articleAuthor'>" + response.author);
    divRow.append("<h4>Description:");
    divRow.append("<p class='actualSnippet'>" + response.description);
    divRow.append("<a class='btn btn-primary linkButton' href='" + response.url + "' target='_blank' role='button'>Continue Reading");

    $newDiv.append("<hr>")


    $newDiv.append(divRow);
    $renderSpot.prepend($newDiv);

}

function createIframe(response, index) {
    var $renderSpot = $(".putTwitchTopClips");
    var $newDiv = $("<div class='row row-artist containerImg " + index + "' >");

    var divCol = $("<div class='col-md-6' style='padding-left: 0px;  padding-right: 0px;'>");
    var newImage = $("<iframe>");
    newImage.attr("title", "TwitchClip");
    newImage.attr("width", 520);
    newImage.attr("height", 340);
    newImage.attr("src", response.embed_url);
    newImage.attr("id", "twitchIfram");
    newImage.attr("class", "ifram-responsive");

    divCol.append(newImage);
    $newDiv.append(divCol);

    var divRow = $("<div class='textColumn col-md-6'>");
    var divPageHeader = $("<div class=page-header'>");
    var h3FrirstChild = $("<h3 class='newsTitle'>");
    var h3SpanFirstChild = $("<span class='clipTitle'>");

    h3FrirstChild.append(h3SpanFirstChild);
    divPageHeader.append(h3FrirstChild);
    divRow.append(divPageHeader);

    h3SpanFirstChild.text(response.title);

    divRow.append("<h4> Publish Date: <span class='publishDate'>" + getDate(response.created_at));
    divRow.append("<h4>Broadcaster: <span class='articleAuthor'>" + response.broadcaster_name)
    divRow.append("<h4>View Count: " + response.view_count);
    divRow.append("<a class='btn btn-primary linkButton' href='" + response.url + "' target='_blank' role='button'>Watch More");

    $newDiv.append("<hr>")


    $newDiv.append(divRow);
    $renderSpot.prepend($newDiv);
}

// Helper Functions
function getDate(date) {
    console.log("hedeeyyyy")
    var dateArr = date.split("")
    var index = dateArr.indexOf("T");
    return dateArr.slice(0, index).join("");
}