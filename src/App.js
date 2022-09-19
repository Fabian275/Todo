import './App.css';
import Login from './Login';
import GetTasks from './GetTasks';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {



  return (

    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/TodoList" element={<GetTasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
