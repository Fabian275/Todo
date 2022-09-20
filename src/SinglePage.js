import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';


function SinglePage() {

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






    useEffect(() => {
        fetch('http://localhost:3000/auth/cookie/tasks', {
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setTasks(data)


            });
    }, [get]);

    




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



    const url = window.location.pathname
    const num = url.substring(10)
    const [id, setID] = useState(0);
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    console.log(title)
    useEffect(() => {
        for (let xyz = 0; xyz < tasks.length; xyz++) {
            if (num == tasks[xyz].id) {
                setID(tasks[xyz].id)
                
                setCompleted(tasks[xyz].completed)
                setTitle(tasks[xyz].title)
                
            }
        }
    }, [get]);


    const goback = () => {
        window.location = `http://localhost:3001/todoList`
    }


    return (
        <><div id="todoPage">



            {tasks !== "" ?
                <ul>

                    {
                        <li className="points" id={id} key={id}>
                            <button className="backbutton" onClick={goback}>back</button>
                            <span className="todoText">{title}</span>

                            <button className="editField" onClick={updateTasks}><SaveIcon /></button>
                            <input className="editField" id={`input${id}`} placeholder="edit..."></input>
                            {completed == "true" ? <button className="editField" onClick={changeCompleted}>✅</button> : <button className="editField" onClick={changeCompleted}>❌</button>}</li>}
                    <form id="sucsess"><Alert severity="success">Successfully deleted</Alert></form>
                </ul>
                : ""}
        </div>

        </>
    );
}

export default SinglePage;
