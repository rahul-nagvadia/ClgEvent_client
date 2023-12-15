import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
