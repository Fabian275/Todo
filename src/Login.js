import Alert from '@mui/material/Alert';

function Login() {

    const checkLogin = () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        console.log(window.location.hostname + ":3001/TodoList")

        fetch('http://localhost:3000/auth/cookie/login', {
            method: 'POST',
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
                <input type="text" id="username"></input><br />
                <input type="password" id="password" value="m294"></input><br />
                <button onClick={checkLogin}>Login</button>
                <p id="falseLogin"><Alert severity="error">Login is wrong</Alert></p>
            
        </>
    );
}

export default Login;
