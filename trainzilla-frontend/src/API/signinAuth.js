import $ from 'jquery'

export async function Login(userKey, userPass) {

    if (userKey && userPass) {
        let item = { key: userKey, userPassword: userPass }
        let result = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(item),
        })

        result = await result.json()

        if (result.error) {
            $('.dangerMsg').removeClass('d-none')
            $('.dangerMsg').html(result.error)
        } else {
            localStorage.setItem('user-info', JSON.stringify(result))

        }
    } else {
        $('.dangerMsg').removeClass('d-none')
        $('.dangerMsg').html('Please fill in all the fields!')
    }
}