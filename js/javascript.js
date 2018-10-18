
// FireBase Info

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


$("#find-button").on("click", function (event) {
    // event.preventDefault();

    var searchTerm = $("#gameNameSearch").val();

    // createButtons(searchTerm);

    // create buttons for searches. Then store that in the firebase database, use fire base data base to make the buttons and render them onto the screen.

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
            console.log(response.articles[i].description);

    })

});

// gonna pass this over to the firebase area but for now just test on the click
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

database.ref().on("child_added", function(snapshot){
    createButtons(snapshot.val().searchTerm);
});

$(document).on("click", "#searchTerm", function(event){
    
    event.preventDefault();

    console.log($("#searchTerm").val()); 
    var searchTerm = $("#searchTerm").val();
    var queryURL = "https://newsapi.org/v2/everything?sources=ign&q=" + searchTerm + "&pageSize=3&apiKey=777df2480edd4e6fb87cb0ce9a5ba5bb";
    
    
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
        var i;
        for (i = 0; i < response.articles.length; i++)
            console.log(response.articles[i].description);

    })
})