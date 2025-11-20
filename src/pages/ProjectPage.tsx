import {useEffect, useState} from "react";
import type {IProject} from "../types/project.ts";
import {useParams} from "react-router-dom";
import {getOneProject} from "../http/project.api.ts";

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
            <h1>{project?.name}</h1>
            <p>{project?.description}</p>
        </div>
    );
};

export default ProjectPage;