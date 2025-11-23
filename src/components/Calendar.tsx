import {type FC, useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {fetchTasksAction} from "../store/reducers/task/action-creators.ts";

interface CalendarProps {
    projectId: string
}

const Calendar: FC<CalendarProps> = ({ projectId }) => {
    const dispatch = useAppDispatch();
    const { tasks } = useAppSelector(state => state.task);

    useEffect(() => {
        dispatch(fetchTasksAction(projectId));
    }, []);


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
        />

    );
};

export default Calendar;
