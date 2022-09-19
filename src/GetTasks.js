import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';


function GetTasks() {

    const postnew = () => {

        let newtask = document.getElementById("newtask").value;
        const data = { title: newtask };

        fetch('http://localhost:3000/tasks', {
            method: 'POST',
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
    }

    const [tasks, setTasks] = useState("");
    const [get, setGet] = useState(0);




    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then((response) => response.json())
            .then((data) => {
                setTasks(data)


            });
    }, [get]);

    const removeTasks = (event) => {
        console.log(event.currentTarget.parentElement.id)


        fetch(`http://localhost:3000/task/${event.currentTarget.parentElement.id}`, {
            method: 'delete',
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


        console.log(currentID)

        fetch('http://localhost:3000/tasks', {
            method: 'PUT',
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

    const changeCompleted = (event) => {
        const completed = event.currentTarget.completed;
        
    }


    return (
        <>
            <div id="addNewtask">
                <input type="text" id="newtask" placeholder="add new Task"></input>
                <button type="submit" onClick={postnew}>post</button>
            </div>


            {tasks !== "" ?
                <ul>
                    {console.log(tasks)}
                    {tasks.map((tasks) => (
                        <li className="points" id={tasks.id}>
                            <button onClick={removeTasks}><DeleteIcon /></button>
                            <span className="todoText">{tasks.title}</span>
                            
                            <button className="editField" onClick={updateTasks}><SaveIcon /></button>
                            <input className="editField" id={`input${tasks.id}`} placeholder="edit..."></input>
                            {tasks.completed == "true"  ? <button onClick={changeCompleted} className="editField">✅</button> : <button onClick={changeCompleted} className="editField">❌</button>}</li>))}
                    <p id="sucsess"><Alert severity="success">Successfully deleted</Alert></p>
                </ul>
                : ""}

        </>
    );
}

export default GetTasks;
