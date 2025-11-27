import React, {type FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {addMemberAction, fetchMembersAction} from "../store/reducers/member/action-creators.ts";
import MemberItem from "./MemberItem.tsx";
import {PlanUser} from "../types/user.ts";
import {fetchUsersAction} from "../store/reducers/user/action-creators.ts";
import {RoleMember} from "../types/member.ts";

interface MemberListProps {
    projectId: string;
}

const MemberList: FC<MemberListProps> = ({ projectId }) => {
    const dispatch = useAppDispatch();
    const { members, isLoading, error } = useAppSelector(state => state.member);
    const { user } = useAppSelector(state => state.auth)
    const { users } = useAppSelector(state => state.user)
    const [ selectedUserId, setSelectedUserId ] = useState('');
    const [ selectedRole, setSelectedRole ] = useState(RoleMember.MEMBER);

    const hidden = user?.plan === PlanUser.PRO ? 'flex' : 'none';
    const memberIds = members.map(member => {
        return member.userId;
    });

    useEffect(() => {
        dispatch(fetchMembersAction(projectId));
        if(user?.plan === PlanUser.PRO ) {
            dispatch(fetchUsersAction());
        }
    }, [dispatch, projectId, user?.plan]);

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

    // @ts-ignore
    const handleSelectUserIdChange = (e) => {
        setSelectedUserId(e.target.value)
    };

    // @ts-ignore
    const handleSelectRoleChange = (e) => {
        setSelectedRole(e.target.value)
    };


    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addMemberAction(selectedUserId, selectedRole, projectId))
    }

    return (
        <div>
            <form style={{display: hidden}}>
                <select value={selectedUserId} onChange={handleSelectUserIdChange}>
                    {users && users.filter(user => !memberIds.includes(user.id)).map(user =>
                        <option key={user.id} id={user.id} value={user.id}>
                            {user.name}
                        </option>
                    )}
                </select>
                <select value={selectedRole} onChange={handleSelectRoleChange}>
                        <option key={RoleMember.OWNER} value={RoleMember.OWNER}>Руководитель</option>
                        <option key={RoleMember.MEMBER} value={RoleMember.MEMBER}>Исполнитель</option>
                        <option key={RoleMember.VIEWER} value={RoleMember.VIEWER}>Наблюдатель</option>
                </select>
                <button type='button' onClick={handleClick}>Добавить</button>
            </form>
            <div>
                {isLoading && <h1>Загрузка..</h1>}
                {error && <h1>{error}</h1>}
                {members && members.map(member =>
                    <MemberItem key={member.id} member={member}/>
                )}
            </div>
        </div>
    );
};

export default MemberList;
