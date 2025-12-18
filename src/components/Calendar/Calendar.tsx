import {type FC, useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, {type EventResizeDoneArg} from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru';

import { type EventDropArg } from "@fullcalendar/core";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {fetchTasksAction, updateTaskAction} from "../../store/reducers/task/action-creators.ts";
import './_calendar.scss';
import {TaskStatus} from "../../types/task.ts";
import TaskModal from "../TaskModal/TaskModal.tsx";
import disk2 from "../../assets/images/disk2.png";

interface CalendarProps {
    projectId: string
}

const Calendar: FC<CalendarProps> = ({ projectId }) => {
    const dispatch = useAppDispatch();
    const { tasks } = useAppSelector(state => state.task);
    const colors = new Map<TaskStatus, string>(
        [ [TaskStatus.TODO, 'gray'],
            [TaskStatus.DONE, 'green'],
            [TaskStatus.IN_PROGRESS, 'blue'],
            [TaskStatus.CHECKING, 'pink'],
        ]
    );
    const [openModalOne, setOpenModalOne] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);


    const handleEventClick = (info: { event: { id: string } }) => {
        setSelectedTaskId(info.event.id);
        setOpenModalOne(true);
    };

    useEffect(() => {
        dispatch(fetchTasksAction(projectId));
    }, []);

    const update = async (info: EventResizeDoneArg | EventDropArg) => {
        const task = tasks.find(task => task.id === info.event.id);
        if(!task) return;

        await dispatch(updateTaskAction(task.id, { start: info.event.start!, end: info.event.end! }))
    }

    return (
        <div className='calendar'>
            <div className='calendar__wrapper'>
                <FullCalendar
                    locale={ruLocale}
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
                            end: task.end,
                            color: colors.get(task.status),
                            textColor: '#FFFFFF'
                        }
                    })}
                    editable={true}
                    selectable={true}
                    eventResizableFromStart={true}
                    eventClick={handleEventClick}
                    eventDrop={async function (info) {
                        await update(info)
                    }}
                    eventResize={async function (info) {
                        await update(info)
                    }}
                />
            </div>
            <div className='calendar__image'>
                <img src={disk2} alt="диск"/>
            </div>
            {(openModalOne && selectedTaskId) && (
                <TaskModal
                    visible={openModalOne}
                    setVisible={setOpenModalOne}
                    taskId={selectedTaskId}
                />
            )}
        </div>


    );
};

export default Calendar;
