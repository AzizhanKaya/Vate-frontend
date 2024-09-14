import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Explore from "../pages/explore";
import MainLayout from "../layouts/main";
import Profile from "../pages/profile";


const routes = createBrowserRouter([

    {

        path: '/',
        element: <MainLayout />,
        children: [

            {
                index: true,
                element: <Home />
            },

            {
                path: 'explore',
                element: <Explore />
            },
            {
                path: 'notifications',
                element: <Home />
            },
            {
                path: ':username',
                element: <Profile />
            }
        ]

    }
    
])

export default routes