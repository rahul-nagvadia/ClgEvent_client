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
import AddParticipate from './pages/AddParticipate';
import UserProfile from "./pages/UserProfile";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element : <Register/>
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
            
            children: [
              {
                index:true, element: <EventDetails/>
              },
              {
                path : 'addParticipant',
                element : <AddParticipate />
              }
            ]
          }
          
        ]
      },
      {
        path:'userProfile',
        element: <UserProfile />
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
