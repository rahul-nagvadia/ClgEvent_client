import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminHome from './pages/AdminHome';
import OrganizeNewEvent from "./pages/OrganizeNewEvent";
import Requests from "./pages/Requests";
import AddEvent from "./pages/AddEvent";
import AllEvent from "./pages/AllEvent";
import EventDetails from "./pages/EventDetails";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/Home',

    children: [
      {index: true, element: <Home />},
      {
        path: "add-event", 
        element: <AddEvent />,
      },
      {
        path: 'all-events',
        children: [
          {index:true, element: <AllEvent/>},
          {
            path: ':eventId',
            element: <EventDetails/>
          }
        ]
      }
    ],
  },
  {
    path: '/adminhome',
    element: <AdminHome />
  },
  {
    path: '/organize',
    element: <OrganizeNewEvent />,
  },
  {
    path: '/requests',
    element: <Requests />
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
