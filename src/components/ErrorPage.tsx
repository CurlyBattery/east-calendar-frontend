import type {FC} from "react";

interface ErrorPageProps {
    title: string;
    message: string;
}

const ErrorPage: FC<ErrorPageProps> = ({ title, message }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    )
}

export default ErrorPage;