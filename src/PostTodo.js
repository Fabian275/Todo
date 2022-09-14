

function PostTodo() {

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

}




  return (
    <>
    <input type="text" id="newtask"></input>
    <button type="submit" onClick={postnew}>Hello</button>

    </>
  );
}

export default PostTodo;
