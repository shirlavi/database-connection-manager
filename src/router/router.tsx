import { createBrowserRouter } from "react-router-dom";
import { Alert } from "react-bootstrap";
import DatabaseDetails from "../components/DatabaseDetails";
import DatabaseTable from "../components/DatabaseTable";
import MainLayout from "../components/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: (
            <Alert variant="danger">
                <Alert.Heading>404</Alert.Heading>
                <p>Sorry, the page you visited does not exist.</p>
            </Alert>
        ),
        children: [
            {
                path: "",
                element: <DatabaseTable />,
            },
            {
                path: "database/:id",
                element: <DatabaseDetails />,
            },
        ],
    },
]);

export default router;
