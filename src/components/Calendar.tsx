import { type FC, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, {type EventResizeDoneArg} from '@fullcalendar/interaction'

import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {fetchTasksAction, updateTaskAction} from "../store/reducers/task/action-creators.ts";
import { type EventDropArg } from "@fullcalendar/core";

interface CalendarProps {
    projectId: string
}

const Calendar: FC<CalendarProps> = ({ projectId }) => {
    const dispatch = useAppDispatch();
    const { tasks } = useAppSelector(state => state.task);

    useEffect(() => {
        dispatch(fetchTasksAction(projectId));
    }, []);

    const update = async (info: EventResizeDoneArg | EventDropArg) => {
        const task = tasks.find(task => task.id === info.event.id);
        if(!task) return;

        await dispatch(updateTaskAction(task.id, { start: info.event.start!, end: info.event.end! }))
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={tasks.map(task => {
                return {
                    id: task.id,
                    title: task.title,
                    start: task.start,
                    end: task.end
                }
            })}
            editable={true}
            selectable={true}
            eventResizableFromStart={true}
            eventDrop={async function (info) {
                await update(info)
            }}
            eventResize={async function (info) {
                await update(info)
            }}
        />

    );
};

export default Calendar;
