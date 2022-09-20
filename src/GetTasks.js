import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';


function GetTasks() {

    const [tasks, setTasks] = useState("");
    const [get, setGet] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3000/auth/cookie/status', {
            credentials: 'include',
        })
            .then((response) => {
                console.log(response)
                if (response.ok == false && response.status !== 200) {
                    window.location = 'http://localhost:3001/Login'
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [get]);

    const logout = () => {
        fetch('http://localhost:3000/auth/cookie/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then((response) => {
                if (response.status === 200) {
                    window.location = 'http://localhost:3001/Login'
                } else { }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const postnew = () => {

        let newtask = document.getElementById("newtask").value;
        const data = { title: newtask };
        if (newtask !== "") {
            fetch('http://localhost:3000/auth/cookie/tasks', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            setGet(get + 1)
        } else { document.getElementById("newWarning").style.visibility = 'visible'; }
    }






    useEffect(() => {
        fetch('http://localhost:3000/auth/cookie/tasks', {
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setTasks(data)


            });
    }, [get]);

    const removeTasks = (event) => {
        console.log(event.currentTarget.parentElement.id)


        fetch(`http://localhost:3000/auth/cookie/task/${event.currentTarget.parentElement.id}`, {
            method: 'delete',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        document.getElementById("sucsess").style.visibility = 'visible';

        setGet(get + 1)

    }




    const updateTasks = (event) => {
        const currentID = event.currentTarget.parentElement.id;
        const currentText = document.getElementById(`input${currentID}`).value;



        if (currentText !== "") {
            fetch('http://localhost:3000/auth/cookie/tasks', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": currentID,
                    "title": currentText,
                    "completed": false
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            setGet(get + 1)
        }
    }

    const changeCompleted = (event) => {
        const currentID = event.currentTarget.parentElement.id;
        const completed = tasks;

        for (let i = 0; i < tasks.length; i++) {
            if (currentID == tasks[i].id) {
                console.log()
                if (tasks[i].completed === false || tasks[i].completed === "false") {

                    fetch('http://localhost:3000/auth/cookie/tasks', {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "title": tasks[i].title,
                            "id": currentID,
                            "completed": true
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });

                    setGet(get + 1)
                }
                else if (tasks[i].completed == true || tasks[i].completed === "true") {
                    fetch('http://localhost:3000/auth/cookie/tasks', {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "title": tasks[i].title,
                            "id": currentID,
                            "completed": false
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });

                    setGet(get + 1)
                }
            }
        }


    }




    return (
        <><div id="todoPage">
            <div><button id="logout" onClick={logout}>Logout</button></div>
            <div id="addNewtask">
                <input type="text" id="newtask" placeholder="add new Task"></input>
                <button type="submit" onClick={postnew}>post</button>
                <form id="newWarning"><Alert severity="info">Please write a todo</Alert></form>
            </div>


            {tasks !== "" ?
                <ul>
                    {console.log(tasks)}
                    {tasks.map((tasks) => (
                        <li className="points" id={tasks.id} key={tasks.id}>
                            <button onClick={removeTasks}><DeleteIcon /></button>
                            <span className="todoText">{tasks.title}</span>

                            <button className="editField" onClick={updateTasks}><SaveIcon /></button>
                            <input className="editField" id={`input${tasks.id}`} placeholder="edit..."></input>
                            {tasks.completed == "true" ? <button className="editField" onClick={changeCompleted}>✅</button> : <button className="editField" onClick={changeCompleted}>❌</button>}</li>))}
                    <form id="sucsess"><Alert severity="success">Successfully deleted</Alert></form>
                </ul>
                : ""}
        </div>

        </>
    );
}

export default GetTasks;
