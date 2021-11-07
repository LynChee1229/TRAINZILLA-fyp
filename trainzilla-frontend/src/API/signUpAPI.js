import $ from 'jquery'

export async function signUp(username, email, contact, dob, password) {
    let item = {
        userName: username,
        userEmail: email,
        userContact: contact,
        userDOB: dob,
        userPassword: password
    };

    let result = await fetch("http://localhost:8000/api/register", {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    });

    result = await result.json();

    let err = "";
    if (result.userName === "Username") {
        err = err.concat("Existing " + result.userName + " ");
    }
    if (result.email) {
        err = err === '' ? err.concat("Existing " + result.email + " ")
            : err.concat('and ' + result.email + " ");
    }
    if (result.contact) {
        err = err === '' ? err.concat("Existing " + result.contact + " ")
            : err.concat('and ' + result.contact + " ");
    }

    if (err !== "") {
        $(".dangerMsg").removeClass("d-none");
        $(".dangerMsg").html(err + ". Please try again.");
    } else if (result.exception) {
        $(".dangerMsg").removeClass("d-none");
        $(".dangerMsg").html("Sorry, an unexpected error occurred. Please contact the development team.");
    } else {
        localStorage.setItem("user-info", JSON.stringify(result));
    }

}
