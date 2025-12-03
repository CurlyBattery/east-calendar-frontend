import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import type {IProject} from "../../types/project.ts";
import {getOneProject} from "../../http/project.api.ts";
import TabItem from "../../components/TabItem.tsx";
import './_one_project.scss';
import TabList from "../../components/TabList/TabList.tsx";
import TaskList from "../../components/TaskList/TaskList.tsx";
import Calendar from "../../components/Calendar/Calendar.tsx";
import MemberList from "../../components/MemberList/MemberList.tsx";

type ProjectPageParams = {
    id: string;
}

const ProjectPage = () => {
    const [project, setProject] = useState<IProject | null>(null);
    const { id } = useParams<ProjectPageParams>();

    async function fetchProject() {
        try {
            const data = await getOneProject(id!);
            setProject(data);
        } catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        (async () => {
            await fetchProject();
        })()
    }, []);

    return (
        <div className='one-project'>
            <div className='one-project__header'>
                <span className='one-project__name'>Проекты</span>
                <h1 className='one-project__title' >{project?.name}</h1>
                <p className='one-project__description'>{project?.description}</p>
            </div>
            <TabList activeTabIndex={0} >
                <TabItem label='Список'>
                    <TaskList projectId={id!}/>
                </TabItem>
                <TabItem label='Календарь'>
                    <Calendar projectId={id!}/>
                </TabItem>
                <TabItem label='Участники'>
                    <MemberList projectId={id!} />
                </TabItem>
            </TabList>
        </div>
    );
};

export default ProjectPage;
