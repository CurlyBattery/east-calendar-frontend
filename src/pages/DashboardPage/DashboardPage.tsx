import './_dashboard.scss';
import ProjectList from "../../components/ProjectList/ProjectList.tsx";

const DashboardPage = () => {
    return (
        <div className='dashboard'>
            <ProjectList />
        </div>
    );
};

export default DashboardPage;