import type {AppDispatch} from "../../store.ts";
import {memberSlice} from "./member.slice.ts";
import {addMember, getMembers} from "../../../http/member.api.ts";
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
}