import {  Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './modules/Dashboard';
import Form from './modules/Form';

function App() {
  return (
    <div className="bg-[#edf3fc] h-screen flex justify-center items-center">
     <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/users/sign-in" element={<Form isSignPage={true}/>}></Route>
      <Route path="/users/sign-up" element={<Form isSignPage={false}/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
