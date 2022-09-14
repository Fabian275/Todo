import { useState } from "react";


function GetTasks() {


    const [text, setText] = useState("");
    const [status, setStatus] = useState(false);


    const get = () => {
        fetch('http://localhost:3000/tasks')
            .then((response) => response.json())
            .then((data) => {
                setText(data)
                setStatus(true)

            });
    }

    const removeTasks = (event) => {
        console.log(event.currentTarget.id)


        fetch(`http://localhost:3000/task/${event.currentTarget.id}`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(""),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            get()
    }

    


    return (
        <>
            <button onClick={get}>get</button>
            {status == true ?
                <ul>
                    {console.log(text)}
                    {text.map((text) => (
                        <li >
                            <button id={text.id} onClick={removeTasks}>x</button>
                            {text.title} </li>))}

                </ul>
                : ""}
        </>
    );
}

export default GetTasks;
