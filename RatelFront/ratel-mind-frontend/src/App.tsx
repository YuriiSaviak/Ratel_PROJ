import { RouterProvider} from "react-router-dom";

import {AppRoutes} from "./app/Router.tsx";

export default function App() {
    return (
        <RouterProvider router={AppRoutes()} />
    );
}
