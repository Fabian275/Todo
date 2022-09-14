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

    const removeTasks = () => {


    }




    return (
        <>
            <button onClick={get}>get</button>
            {status == true ?
                <ul>

                    {text.map((text) => (
                        <li >
                            <button id={text.id}>x</button>
                            {text.title}</li>))}
                </ul>
                : ""}
        </>
    );
}

export default GetTasks;
