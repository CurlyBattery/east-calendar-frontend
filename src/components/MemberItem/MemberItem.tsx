import type {FC} from "react";

import type {IMember} from "../../types/member.ts";
import {PlanUser} from "../../types/user.ts";
import {RoleMember} from "../../types/member.ts";
import './_member_item.scss';

interface MemberItemProps {
    member: IMember;
}

const MemberItem: FC<MemberItemProps> = ({ member }) => {
    const avatar = member?.user?.avatarPath ? `http://79.174.77.240/uploads/${member?.user?.avatarPath}` : 'https://i.pinimg.com/736x/61/8e/b9/618eb95d5194903a7ab2a6641f152bd0.jpg'

    const getRoleClass = (role: RoleMember) => {
        switch (role) {
            case RoleMember.OWNER:
                return 'member-item__role--owner';
            case RoleMember.MEMBER:
                return 'member-item__role--member';
            case RoleMember.VIEWER:
                return 'member-item__role--viewer';
            default:
                return '';
        }
    };

    const getPlanClass = (plan?: PlanUser) => {
        return plan === PlanUser.PRO
            ? 'member-item__plan--pro'
            : 'member-item__plan--free';
    };

    const getRoleText = (role: RoleMember) => {
        switch (role) {
            case RoleMember.OWNER:
                return 'Руководитель';
            case RoleMember.MEMBER:
                return 'Исполнитель';
            case RoleMember.VIEWER:
                return 'Наблюдатель';
            default:
                return role;
        }
    };

    return (
        <div className='member-item'>
            <div className='member-item__info'>
                <img className='member-item__avatar' src={avatar} alt="аватарка"/>
                <div className='member-item__details'>
                    <h4 className='member-item__details-name'>
                        {member?.user?.name}
                    </h4>
                    <p className='member-item__details-email'>
                        {member?.user?.email || 'Нет email'}
                    </p>
                </div>
            </div>

            <div className='member-item__badges'>
                <span className={`member-item__plan ${getPlanClass(member?.user?.plan?.subscriptionPlan)}`}>
                    {member?.user?.plan?.subscriptionPlan === PlanUser.PRO ? 'PRO' : 'FREE'}
                </span>
                <span className={`member-item__role ${getRoleClass(member.role)}`}>
                    {getRoleText(member.role)}
                </span>
            </div>

            {/* <div className='member-item__actions'>
                <button>Изменить</button>
                <button className='delete'>Удалить</button>
            </div> */}
        </div>
    );
};

export default MemberItem;
