import type {FC,  ReactNode} from "react";
import {sanitizeForId} from "../utils/stringUtils.ts";

export interface TabItemProps {
    label: string;
    children: ReactNode;
}



const TabItem: FC<TabItemProps> = ({ label, children }) => {
    return (
        <div
            aria-labelledby={`tab-${sanitizeForId(label)}`}
            id={`panel-${sanitizeForId(label)}`}
        >
            {children}
        </div>
    );
};

export default TabItem;