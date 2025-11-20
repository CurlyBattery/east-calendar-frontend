import { useAppSelector} from "../hooks/redux.ts";

const DashboardPage = () => {
    const {  user, isLoading, error } = useAppSelector(state => state.auth);

    return (
        <div>
            {isLoading && <h1>Идет загрузка</h1>}
            {error && <h1>{error}</h1>}
            {user && <h1>{JSON.stringify(user)}</h1>}
        </div>
    );
};

export default DashboardPage;