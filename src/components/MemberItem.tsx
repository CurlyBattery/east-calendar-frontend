import type {IMember} from "../types/member.ts";
import type {FC} from "react";

interface MemberItemProps {
    member: IMember;
}

const MemberItem: FC<MemberItemProps> = ({ member }) => {
    return (
        <div>
            {member?.user?.plan}. {member?.user?.name} - {member.role}
        </div>
    )
};

export default MemberItem;