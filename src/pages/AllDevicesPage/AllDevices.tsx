import {useEffect, useState} from "react";
import {getAllDevices} from "../../http/auth.api.ts";
import type {IDevice} from "../../types/user.ts";

const AllDevices = () => {
    const [devices, setDevices] = useState<IDevice[] | undefined>();

    useEffect(() => {
        const fetchDevices = async () => {
            const data = await getAllDevices();
            setDevices(data);
        }
        fetchDevices();
    }, []);

    return (
        <div className="devices">
            <h2 className='divices__title'>AllDevices</h2>
            <ul className='devices__list'>
                {devices && devices.map((device: IDevice) =>
                    <li className='devices__list__item'>{device.userAgent}</li>
                )}
            </ul>
        </div>
    );
};

export default AllDevices;
