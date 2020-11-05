//Selectors
const nameInput = document.querySelector('#name');
const ageInput = document.querySelector('#age');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const gradeTypeInput = document.querySelectorAll('.grade-type-checked');
const gradeTypeInputArr = Array.from(gradeTypeInput);
const rateCommentInput = document.getElementById('rate-comment');
const submitButton = document.querySelector('#submit-button');
const errorList = document.querySelector('.error-list');


var onlyNumbers = /^[0-9]+$/;
var onlyLetters = /^[A-Za-z]+$/;
var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

var submittedRatings = [];

$(function () {

    $('#name-error-message').hide();
    $('#age-error-message').hide();
    $('#email-error-message').hide();
    $('#phone-error-message').hide();

    $('#name').focusout(function () {
        checkValidName();
    })

    $('#age').focusout(function () {
        checkValidAge();
    })

    $('#email').focusout(function () {
        checkValidEmail();
    })
    $('#phone').focusout(function () {
        checkValidPhoneNumber();
    })

    function checkValidName() {
        if (!nameInput.value.match(onlyLetters) || nameInput == "") {
            $("#name-error-message").html("Names should only be letters and not empty!");
            $("#name-error-message").show();
        }
        else {
            $('#name-error-message').hide();
        }
    }

    function checkValidAge() {
        if (!ageInput.value.match(onlyNumbers) || ageInput == "") {
            $("#age-error-message").html("Age should be only number and not empty!");
            $("#age-error-message").show();
        }
        else{
            $('#age-error-message').hide();
        }
    }

    function checkValidEmail() {
        if (!validEmail.test(emailInput.value || emailInput == "")) {
            $("#email-error-message").html("Please provide valid Email!");
            $("#email-error-message").show();
        }
        else{
            $('#email-error-message').hide();
        }
    }

    function checkValidPhoneNumber() {
        if (phoneInput.value.match(onlyNumbers) && !(phoneInput == "")) {
            if (phoneInput.value.length < 7 || phoneInput.value.length > 15) {
                $('#phone-error-message').html("phone Number should be between 7 and 15 digits");
                $('#phone-error-message').show();
            }
            else{
                $('#phone-error-message').hide();
            }
        }
        else {
            $('#phone-error-message').html("Phone number field shouldnt be empty and only contains numbers!");
            $('#phone-error-message').show();
        }
    
    }

})

submitButton.addEventListener('click', function (e) {

    $(".error-list").empty();
    e.preventDefault();
    var listOfErrors = [];
    var nameInputValue = nameInput.value;
    var ageInputValue = ageInput.value;
    var emailInputValue = emailInput.value;
    var phoneInputValue = phoneInput.value;
    var ratingType;
    var ratingCommentInput = rateCommentInput.value;

    if (!nameInput.value.match(onlyLetters) || nameInput == "") {
        // alert("Name is required. Only letters are allowed!");
        // return;
        listOfErrors.push("Name input should be only letters and not empty(required)");
    }


    if (!ageInput.value.match(onlyNumbers) || ageInput == "") {
        // alert("Age is required. Only numbers are allowed!");
        // return;
        listOfErrors.push("Age input should only be numbers and not empty(required)")
    }

    if (!validEmail.test(emailInput.value || emailInput == "")) {
        // alert("Email field is required. Only valid emails are allowed!");
        // return;
        listOfErrors.push("You should provide valid Email(required)");
    }

    if (phoneInput.value.match(onlyNumbers) && !(phoneInput == "")) {
        if (phoneInput.value.length < 7 || phoneInput.value.length > 15) {
            // alert("Phone numbers should be between 7 and 15");
            // return;
            listOfErrors.push("Your phone number should be between 7 and 15 digits!")
        }
    }
    else {
        // alert("Phone is required. Only numbers are allowed");
        // return;
        listOfErrors.push("Phone number input should be only numbers and not empty(required)")
    }


    // gradeTypeInput.forEach(function (element) {
    //     if (element.checked == true) {
    //         ratingType = element.defaultValue;
    //     }
    // });

    if (!(listOfErrors.length > 0)) {
        ratingType = findChecked(gradeTypeInputArr);
        console.log(ratingType);
        var newRating = new RatingModel(nameInputValue, ageInputValue, emailInputValue, phoneInputValue, ratingType, ratingCommentInput);
        submittedRatings.push(newRating);
        console.log(submittedRatings);
    }
    else {
        var ul = $("<ul></ul>");

        $.each(listOfErrors, function (i, value) {
            var li = $("<li>" + value + "</li>");
            ul.append(li);
        })

        $(".error-list").append(ul);
    }
})


function RatingModel(name, age, email, phone, rating, ratingComment) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.phone = phone;
    this.rating = rating;
    this.ratingComment = ratingComment;
}

// function findChecked(arr){
//     var x;
//     arr.filter(function (element){
//         if(element.checked == true){
//             x = element.defaultValue;
//             return;
//         }
//     })
//     return x;


function findChecked(arr){
    arr.filter(function(element){
        return element.checked == true;
    })
}
