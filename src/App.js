import './App.css';
import Login from './Login';
import GetTasks from './GetTasks';
import SinglePage from './SinglePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {



  return (

    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/TodoList" element={<GetTasks />} />
        <Route path="/TodoList/:id" element={<SinglePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
