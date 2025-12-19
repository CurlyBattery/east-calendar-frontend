import type {AppDispatch} from "../../store.ts";
import {memberSlice} from "./member.slice.ts";
import {addMember, getMembers, removeMember} from "../../../http/member.api.ts";
import type {RoleMember} from "../../../types/member.ts";

export const fetchMembersAction = (projectId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(memberSlice.actions.membersFetching());
        const data = await getMembers(projectId);
        dispatch(memberSlice.actions.membersFetchingSuccess(data));
    } catch (e) {
        // @ts-ignore
        dispatch(memberSlice.actions.membersFetchingError(e.message));
    }
};

export const addMemberAction = (userId: string, role: RoleMember, projectId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(memberSlice.actions.addMemberStart());
        const data = await addMember(projectId, userId, role);
        dispatch(memberSlice.actions.addMemberSuccess(data));
    } catch (e) {
        // @ts-ignore
        dispatch(memberSlice.actions.addMemberError(e.message));
    }
};

export const removeMemberAction = (memberId: string, projectId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(memberSlice.actions.removeMemberStart());
        await removeMember(projectId, memberId);
        dispatch(memberSlice.actions.removeMemberSuccess(memberId));
    } catch (e) {
        // @ts-ignore
        dispatch(memberSlice.actions.removeMemberError(e.message));
    }
};