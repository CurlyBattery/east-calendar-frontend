import React, {type FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {RoleMember} from "../../types/member.ts";
import {PlanUser} from "../../types/user.ts";
import {addMemberAction, fetchMembersAction} from "../../store/reducers/member/action-creators.ts";
import {fetchUsersAction} from "../../store/reducers/user/action-creators.ts";
import MemberItem from "../MemberItem/MemberItem.tsx";
import './_member_list.scss';

interface MemberListProps {
    projectId: string;
}

const MemberList: FC<MemberListProps> = ({ projectId }) => {
    const dispatch = useAppDispatch();
    const { members, isLoading, error } = useAppSelector(state => state.member);
    const { user } = useAppSelector(state => state.auth);
    const { users } = useAppSelector(state => state.user);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedRole, setSelectedRole] = useState(RoleMember.MEMBER);

    const isPro = user?.plan?.subscriptionPlan === PlanUser.PRO;
    const memberIds = members.map(member => member.userId);

    useEffect(() => {
        dispatch(fetchMembersAction(projectId));
        if (isPro) {
            dispatch(fetchUsersAction());
        }
    }, [dispatch, projectId, isPro]);

    useEffect(() => {
        const availableUsers = users.filter(user => !memberIds.includes(user.id));

        if (availableUsers.length > 0) {
            const firstAvailableUserId = availableUsers[0].id;

            if (selectedUserId === '' || !availableUsers.some(u => u.id === selectedUserId)) {
                setSelectedUserId(firstAvailableUserId);
            }
        } else if (selectedUserId !== '') {
            setSelectedUserId('');
        }
    }, [users, members, memberIds, selectedUserId]);

    const handleSelectUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUserId(e.target.value);
    };

    const handleSelectRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(e.target.value as RoleMember);
    };

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addMemberAction(selectedUserId, selectedRole, projectId));
    };

    return (
        <div className='member-list'>
            {/* Premium баннер для Free пользователей */}
            {!isPro && (
                <div className='member-list__premium-banner'>
                    <div className='member-list__premium-banner-icon'>👥</div>
                    <h3 className='member-list__premium-banner-title'>
                        Добавляйте участников в команду
                    </h3>
                    <p className='member-list__premium-banner-description'>
                        Обновитесь до PRO, чтобы добавлять неограниченное количество участников в проекты
                    </p>
                    <button className='member-list__premium-banner-button'>
                        Перейти на PRO
                    </button>
                </div>
            )}

            {/* Форма добавления участника (только для PRO) */}
            {isPro && (
                <form className='member-list__form' onSubmit={handleClick}>
                    <div className='member-list__form-group'>
                        <label htmlFor='user-select'>Пользователь</label>
                        <select
                            id='user-select'
                            value={selectedUserId}
                            onChange={handleSelectUserIdChange}
                        >
                            {users && users
                                .filter(user => !memberIds.includes(user.id))
                                .map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='member-list__form-group'>
                        <label htmlFor='role-select'>Роль</label>
                        <select
                            id='role-select'
                            value={selectedRole}
                            onChange={handleSelectRoleChange}
                        >
                            <option value={RoleMember.OWNER}>Руководитель</option>
                            <option value={RoleMember.MEMBER}>Исполнитель</option>
                            <option value={RoleMember.VIEWER}>Наблюдатель</option>
                        </select>
                    </div>

                    <button type='submit'>Добавить</button>
                </form>
            )}

            {/* Список участников */}
            <div className='member-list__container'>
                {isLoading && (
                    <div className='member-list__loading'>Загрузка участников...</div>
                )}

                {error && (
                    <div className='member-list__error'>{error}</div>
                )}

                {!isLoading && !error && members.length === 0 && (
                    <div className='member-list__empty'>
                        <div className='member-list__empty-icon'>👥</div>
                        <h3 className='member-list__empty-title'>Нет участников</h3>
                        <p className='member-list__empty-description'>
                            Добавьте первого участника в проект
                        </p>
                    </div>
                )}

                {!isLoading && !error && members.map(member => (
                    <MemberItem key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
};

export default MemberList;