import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';

function Login() {



    fetch('http://localhost:3000/auth/cookie/status', {
        credentials: 'include',
    })
        .then((response) => {
            console.log(response)
            if(response.ok == true && response.status == 200){
                document.getElementById("allreadyLoggedIn").style.visibility = 'visible';
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });
  

    const checkLogin = () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        console.log(window.location.hostname + ":3001/TodoList")

        fetch('http://localhost:3000/auth/cookie/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email":username,
                "password":password
            }),
        })
            .then((response) => {
                if (response.status === 200){
                    window.location = 'http://localhost:3001/TodoList' 
                } else {
                    document.getElementById("falseLogin").style.visibility = 'visible';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    



    return (
        <>
           
                <h1>Login</h1>
                <input type="text" id="username" value="hello"></input><br />
                <input type="password" id="password" value="m294"></input><br />
                <button onClick={checkLogin}>Login</button>
                <Alert severity="error" id="falseLogin">Login is wrong</Alert>
                <Alert severity="info" id="allreadyLoggedIn">Allready Logged in <a href='http://localhost:3001/TodoList'>Go to your todo List</a></Alert>
            
        </>
    );
}

export default Login;
