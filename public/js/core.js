$(document).ready(function() {
    $("#register").on("submit", function(e) {
        e.preventDefault()

        var username = $("#register_username").val()
        var password = $("#register_password").val()

        console.log("Username is: " + username + "\nPassword is: " + password)

        var registrationData = {
            "username": username,
            "password": password
        }

        $.ajax({
            url: "/userRegistration",
            type: 'POST',
            timeout: 0,
            data: registrationData,
            success: function(result, status) {
                if (!result.error){
                    location.replace(`${username}?token=${result.token}`)
                } else {
                    console.log(result.error)
                }
            }
        })
    })
})