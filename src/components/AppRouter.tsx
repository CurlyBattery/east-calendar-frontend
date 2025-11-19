import {RouterProvider} from "react-router-dom";
import {router} from "../routes.tsx";

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;