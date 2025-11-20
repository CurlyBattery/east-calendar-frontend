import {useEffect, useState} from "react";
import type {IProject} from "../types/project.ts";
import {useParams} from "react-router-dom";
import {getOneProject} from "../http/project.api.ts";
import TabList from "../components/TabList.tsx";
import TabItem from "../components/TabItem.tsx";

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
        <div>
            <div>
                <h1>{project?.name}</h1>
                <p>{project?.description}</p>
            </div>
            <TabList activeTabIndex={0} >
                <TabItem label='Tab #1'>
                    <p>This is Tab #1</p>
                </TabItem>
                <TabItem label='Tab #2'>
                    <p>This is Tab #2</p>
                </TabItem>
            </TabList>
        </div>
    );
};

export default ProjectPage;