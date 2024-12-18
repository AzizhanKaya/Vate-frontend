import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import MainLayout from "../layouts/main";
import Profile from "../pages/profile";
import OnTheWay from "@/components/on-the-way"

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
                element: <OnTheWay />
            },
            {
                path: 'notifications',
                element: <OnTheWay />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: '/user/:pub_key',
                element: <Profile />
            },
            {
                path: '/topic/:Topic',
                element: <Home />
            }
        ]

    }
    
])

export default routes