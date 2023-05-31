import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useGlobalContext } from "./context";

const SignIn = () => {
    const { email, setEmail, setPassword, submitLogin, setUsername, username, password, submitRegistration} = useGlobalContext();

    

    function handleCallBack(response, event) {
        console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        let user_email = userObject.email;
        setEmail(user_email);
        console.log(email)
        let user_name = userObject.name;
        setUsername(user_name);
        console.log(username)
        const password_ = response.credential.slice(0, 8);
        setPassword(password_);
        console.log(password)

        fetch('http://localhost:8000/check_email?email=' + user_email)
        .then(response => response.json())
        .then(data => {
            console.log(data.email_exists); // true if email exists in the database
            // You can use the email exists information here or call submitLogin function based on your requirement
            if (data.email_exists) {
                submitLogin(event); // Call the submitLogin function if the email exists
            }
            else {
                submitRegistration(event);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        document.getElementById("signIndiv").hidden = true;
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "400096200976-8a5jsv00o9pnijg0mq64hh3oer3nnbab.apps.googleusercontent.com",
            callback: (response) => handleCallBack(response, null)
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        );
    }, []);

    return (
        <div className='App'>
            <div id="signInDiv"></div>
        </div>
    )
}

export default SignIn;
