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

database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function (snapshot) {
    createButtons(snapshot.val().searchTerm);
});


$("#banner").on("submit", function (e) {
    e.preventDefault();
    $(".intro").removeClass("shown");
    $(".intro").addClass("hide");
    console.log("submitted!");

    var searchTerm = $("#gameNameSearch").val();

    database.ref().push({
        searchTerm: searchTerm
    });

    makeThingsDryYo(searchTerm);

});

$("#find-button").on("click", function (event) {
    event.preventDefault();

    $(".intro").removeClass("hide");
    $(".foo").removeClass("hide");
    //$(".intro").addClass("hide");

    var searchTerm = $("#gameNameSearch").val();
    console.log(searchTerm);

    database.ref().push({
        searchTerm: searchTerm
    });

    makeThingsDryYo(searchTerm);

});

$(document).on("click", ".btn-search", function () {

    $(".intro").removeClass("shown");
    $(".intro").addClass("hide");
    $(".foo").removeClass("hide");

})

$(document).on("click", ".searchTerm", function (event) {

    event.preventDefault();

    $(".intro").removeClass("shown");
    $(".intro").addClass("hide");
    $(".foo").removeClass("hide");

    console.log($(this).val());
    var searchTerm = $(this).val();

    makeThingsDryYo(searchTerm);
});

function renderGameInfo(response) {

    $(".articleTitle").text(response.title);
    $(".publishDate").text(response.publishedAt);
    $(".articleAuthor").text(response.author);
    $(".actualSnippet").text(response.description);

    $(".linkButton").attr("href", response.url);
    $(".linkButton").attr("target", "_blank");
}



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

    divRow.append("<h4> Publish Date: <span class='publishDate'>" +response.publishedAt);
    divRow.append("<h4>Article Author: <span class='articleAuthor'>"+response.author);
    divRow.append("<h4>Description:");
    divRow.append("<p class='actualSnippet'>" + response.description);
    divRow.append("<a class='btn btn-primary linkButton' href='"+ response.url +"' target='_blank' role='button'>Continue Reading");

    $newDiv.append("<hr>")


    $newDiv.append(divRow);
    $renderSpot.prepend($newDiv);

}

function makeThingsDryYo(searchTerm) {
    var queryURL = "https://newsapi.org/v2/everything?sources=ign&q=" + searchTerm + "&pageSize=3&apiKey=777df2480edd4e6fb87cb0ce9a5ba5bb";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        $(".putArticlesHere").empty();

        for (var i = 0; i < response.articles.length; i++) {
            createDiv(response.articles[i], i);
        }

    });
}

function createButtons(value) {
    var $divSpot = $("#buttonRender");

    var $button = $("<button>");

    $button.attr("href", "#");
    $button.attr("id", "searchTerm");
    $button.attr("class", "btn-large waves-effect waves-light teal lighten-1 searchTerm btn-search");
    $button.attr("value", value);
    $button.text(value);

    $divSpot.append($button);

}