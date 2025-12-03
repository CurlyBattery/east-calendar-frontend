import type {FC} from "react";

import type {IMember} from "../../types/member.ts";
import './_member_item.scss';

interface MemberItemProps {
    member: IMember;
}

const MemberItem: FC<MemberItemProps> = ({ member }) => {
    return (
        <div>
            {member?.user?.plan?.subscriptionPlan}. {member?.user?.name} - {member.role}
        </div>
    )
};

export default MemberItem;