//import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Dashboard from "./Components/Student/Dashboard/Dashboard";
import Profile from "./Components/Student/Profile/Profile";
import Participation from "./Components/Student/Participation/Participation";
import Notification from "./Components/Student/Notifications/Notifications";
import Sidemenu from "./Components/Sidemenu";

const App=()=>{
    return(
        <div className="flex">
        <Sidemenu/>
        <Outlet/>
        </div>
    );
};

const Router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Dashboard/>,
            },
            {
                path:"/profile",
                element:<Profile/>,
            },
            {
                path:"/participation",
                element:<Participation/>,
            },
            {
                path:"notifications",
                element:<Notification/>,
            }
        ]
    }
]);

const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router = {Router}/>);