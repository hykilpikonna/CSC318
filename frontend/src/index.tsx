import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Course from "./pages/Course";
import Profile from "./pages/Profile";
import CollabLearning from './pages/CollabLearning';
import Review from './pages/Review';
import CharacterSelection from './pages/CharacterSelection';
import Character from './pages/Character';
import Lesson from './pages/Lesson';
import FakeUserSelection from './pages/FakeUserSelection';
import UserChat from './pages/UserChat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/signup',
    element: <Signup/>,
  },
  {
    path: '/courses',
    element: <Course/>,
  },
  {
    path: '/collab-learning',
    element: <CollabLearning/>
  },
  {
    path: '/review',
    element: <Review/>
  },
  {
    path: '/speaking',
    element: <CharacterSelection/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/character',
    element: <Character/>
  },
  {
    path: '/lesson',
    element: <Lesson/>
  },
  {
    path: '/fake-user-selection',
    element: <FakeUserSelection/>
  },
  {
    path: '/user-chat',
    element: <UserChat/>
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
