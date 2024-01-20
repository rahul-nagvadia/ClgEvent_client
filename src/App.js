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
import ParticipatedClg from "./pages/ParticipatedClg";
import ShowPlayers from "./pages/ShowPlayers";
import UserProfile from "./pages/UserProfile";
import Schedule from "./pages/Schedule";
import AllMatches from "./pages/AllMatches";
import EventMatch from "./pages/EventMatch";

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
        path: 'userProfile',
        element: <UserProfile />
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
                element : <AddParticipate />,
              },
              {
                path: 'participatedclg',
                
                children: [
                  {index: true, element: <ParticipatedClg/>},
                  {
                    path: 'showplayers',
                    element: <ShowPlayers/>
                  }
                ]
              }
            ]
          }
          
        ]
      },
      {
        path:'userProfile',
        element: <UserProfile />
      },
      {
        path: 'schedule',
        element: <Schedule/>
      },
      {
        path: 'matches',
        children : [
          {
            index : true,
            element: < AllMatches />
          },
          {
            path:':eventID',
            element: < EventMatch />
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
