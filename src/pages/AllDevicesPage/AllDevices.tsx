import {useEffect, useState} from "react";
import {getAllDevices} from "../../http/auth.api.ts";

const AllDevices = () => {
    const [devices, setDevices] = useState<any>();

    useEffect(() => {
        const fetchDevices = async () => {
            const data = await getAllDevices();
            setDevices(data);
        }
        fetchDevices();
    }, []);

    return (
        <div>
            AllDevices
            {devices && devices.refreshTokens.map(device =>
                <h2>{device.userAgent}</h2>
            )}
        </div>
    );
};

export default AllDevices;
