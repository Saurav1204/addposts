import './App.css';
import { createBrowserRouter, Routes, Route, Link, NavLink, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import Regform from './pages/Regform';
import Login from './pages/Login';
import Rootlayout from './pages/Rootlayout';
import Posts from './pages/Posts';
import '/Users/testuser/Desktop/Saurav/reactjs/task/taskapi/src/css/Regcss.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Rootlayout />}>
      <Route index element={<Regform />} />
      <Route path='Login' element={<Login />} />
      <Route path='Posts' element={<Posts />} />
    </Route>
  )
)

function App() {
  return (
    <div>
     {/* <Regform /> */}
     <RouterProvider router={router} />

    {/* // <Login /> */}
    </div>
  );
}

export default App;
