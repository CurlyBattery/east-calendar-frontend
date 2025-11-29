import { createPayment} from "../../http/payment.api.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {PlanUser} from "../../types/user.ts";
import {useEffect} from "react";
import {checkPayloadAction} from "../../store/reducers/auth/action-creators.ts";

const PremiumPage = () => {
    const {user} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkPayloadAction())
    }, []);

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        const { confirmation } = await createPayment();
        window.location.href = confirmation?.confirmation_url;

        if(confirmation) {
            window.location.href = confirmation?.confirmation_url;
        }
    }

    return (
        <div>
            {user?.plan?.subscriptionPlan === PlanUser.PRO ?
                (<h1>Подписка активирована</h1>)
                :
               ( <form onSubmit={(e) => handleClick(e)}>
                    <button type='submit'>Оплатить подписку</button>
                </form>)
            }

        </div>
    );
};

export default PremiumPage;
