import {createBrowserRouter} from "react-router-dom";
import Layout from "../layout/Layout.tsx";
import HomePage from "../pages/HomePage.tsx";
import TestPage from "../pages/TestPage.tsx";
import AboutPage from "../pages/AboutPage.tsx";
import WorkshopsPage from "../pages/WorkshopsPage.tsx";
import ContactPage from "../pages/ContactPage.tsx";

export const AppRoutes = () => {
    return createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    index: true,
                    element: <HomePage/>
                },
                {
                    path: "test",
                    element: <TestPage/>
                },
                {
                    path: "about",
                    element: <AboutPage/>
                },
                {
                    path: "workshops",
                    element: <WorkshopsPage/>
                },
                {
                    path: "contact",
                    element: <ContactPage/>
                }
            ]
        }
    ]);
}