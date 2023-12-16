import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import AdminHome from './pages/AdminHome'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Register/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/Home',
    element: <Home/>
  },
  {
    path: '/adminhome',
    element: <AdminHome/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
