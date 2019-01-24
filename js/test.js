$("#newpost").on("click", function (event) {
    console.log("working")
    event.preventDefault();

    var newPost = {
        Name: $("#name").val().trim(),
        City: $("#city").val().trim(),
        State: $("#state").val().trim(),
        BedroomNumber: $("#bedroom").val().trim(), 
        BathroomNumber: $("#bathroom").val().trim(), 
        Description: $("#description").val().trim(), 
        PricePerNight: $("#price").val().trim(),
        Img1: $("#img1").val().trim(),
        Img2: $("#img2").val().trim(),
        Img3: $("#img3").val().trim(),

    }

     $("#hiding").css("display", "none")

    

     $.post("/api/listings", newPost)
        .then(function (data) {

            console.log(data)

            var $div = $("<div>")
                $div.addClass("card")

                var $div2 = $("<div>")
                $div2.addClass("card-body")

                var $message = $("<h5>")
                $message.addClass("card-title")
                $message.text("Name: " +  data.Name)

                $div2.append($message)

                var $location = $("<p>")
                $location.addClass("card-title")
                $location.text("Location: " + data.City, data.State)

                $div2.append($location)

                 var $description = $("<p>")
                $description.addClass("card-title")
                $description.text("Description: " + data.Description)

                $div2.append($description)

                var $price = $("<p>")
                $price.addClass("card-title")
                $price.text("Price: " + data.PricePerNight)

                $div2.append($price)

                var $updateButton = $("<button>")
                $updateButton.addClass("updateBtn btn btn-primary")
                $updateButton.text("Edit")
                $updateButton.attr("value", data.id)
                $updateButton.attr("type", "submit")

                $div2.append($updateButton)





                var $form = $("<form>")
                  $form.addClass("hiding")
                var $div3 = $("<div>")
                $div3.addClass("form-group")

                var $label1 = $("<label>")
                $label1.text("Name")
                var $input1 = $("<input>")
                $input1.addClass("form-control name1")

                var $label2 = $("<label>")
                $label2.text("Date")

                var $input2 = $("<input>")
                $input2.addClass("form-control date1")

               var $label3 = $("<label>")
                $label3.text("Review")

                var $input3 = $("<input>")
                $input3.addClass("form-control review1")

                var $ratingButton = $("<button>")
                $ratingButton.attr("type", "submit")
                $ratingButton.addClass("ratingBtn btn btn-primary")


                
                $div3.append($label1)
                $div3.append($input1)

                $div3.append($label2)
                $div3.append($input2)

                $div3.append($label3)
                $div3.append($input3)

                $form.append($ratingButton)

                $form.append($div3)


                $div.append($div2)
                $div.append($form)

                $("#airbnb").append($div)

        })

})

function Rating (){
console.log("working")

event.preventDefault();

    var newRating = {
        Name: $(".name1").val().trim(),
        Date: $(".date1").val().trim(),
        Review: $(".review1").val().trim(),

    }


      $(".hiding").css("display", "none")

     $.post("/api/ratings", newRating)
        .then(function (data) {

          console.log(data)

                var $div = $("<div>")
                $div.addClass("card")

                var $div2 = $("<div>")
                $div2.addClass("card-body")


                var $nameRating = $("<p>")
                $nameRating.addClass("card-title")
                $nameRating.text("Name: " + data.Name)


                $div2.append($nameRating)

                 var $DateRating = $("<p>")
                $DateRating.addClass("card-title")
                $DateRating.text("Date: " + data.Date)

                $div2.append($DateRating)

                var $reviewRating = $("<p>")
                $reviewRating.addClass("card-title")
                $reviewRating.text("Review: " + data.Review)

                $div2.append($reviewRating)

                $div.append($div2)

                
                $("#airbnb1").append($div)



})


}

$(document).on("click", ".ratingBtn", Rating);