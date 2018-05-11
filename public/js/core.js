$(document).ready(function() {
    $("#register").on("submit", function(e) {
        e.preventDefault()

        var username = $("#register_username").val()
        var password = $("#register_password").val()
        var cPassword = $("#register_Cpassword").val()

        console.log("Username is: " + username + "\nPassword is: " + password)

        var registrationData = {
            "username": username,
            "password": password,
            "confirmPassword": cPassword
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
                    console.error(result.error)
                }
            }
        })
    })

    $("#login").on("submit", function(e) {
        e.preventDefault()

        var username = $("#login_username").val()
        var password = $("#login_password").val()

        console.log("Username is: " + username + "\nPassword is: " + password)

        var loginData = {
            "username": username,
            "password": password
        }

        $.ajax({
            url: "/loginRequest",
            type: 'POST',
            timeout: 0,
            data: loginData,
            success: function(result, status) {
                if (!result.error) {
                    location.replace(`${username}?token=${result.token}`)
                } else {
                    console.error(result.error)
                }
            }
        })
    })
})