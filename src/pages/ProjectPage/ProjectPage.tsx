import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import type {IProject} from "../../types/project.ts";
import {getOneProject} from "../../http/project.api.ts";
import TabList from "../../components/TabList.tsx";
import TabItem from "../../components/TabItem.tsx";
import TaskList from "../../components/TaskList.tsx";
import Calendar from "../../components/Calendar.tsx";
import MemberList from "../../components/MemberList.tsx";
import './_one_project.scss';

type ProjectPageParams = {
    id: string;
}

const ProjectPage = () => {
    const [project, setProject] = useState<IProject | null>(null);
    const { id } = useParams<ProjectPageParams>();

    useEffect(() => {
        (async () => {
            await fetchProject();
        })()
    }, []);

    async function fetchProject() {
        try {
            const data = await getOneProject(id!);
            setProject(data);
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div className='one-project'>
            <div className='one-project__header'>
                <span className='one-project__name'>Проекты</span>
                <h1 className='one-project__title' style={{ marginTop: 0, marginBottom: 0 }}>{project?.name}</h1>
                <p className='one-project__description'>{project?.description}</p>
            </div>
            <TabList activeTabIndex={0} >
                <TabItem label='Tab #1'>
                    <TaskList projectId={id!}/>
                </TabItem>
                <TabItem label='Tab #2'>
                    <Calendar projectId={id!}/>
                </TabItem>
                <TabItem label='Tab #3'>
                    <MemberList projectId={id!} />
                </TabItem>
            </TabList>
        </div>
    );
};

export default ProjectPage;
