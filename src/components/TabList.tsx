import React, {type FC, type ReactElement, useState} from "react";
import TabItem, {type TabItemProps} from "./TabItem.tsx";
import {sanitizeForId} from "../utils/stringUtils.ts";

interface TabListProps {
    activeTabIndex: number;
    children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
}

const TabList: FC<TabListProps>= ({ children, activeTabIndex = 0 }) => {
    const [activeTab, setActiveTab] = useState(activeTabIndex);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const tabs = React.Children.toArray(children).filter(
        (child): child is ReactElement<TabItemProps> =>
            React.isValidElement(child) && child.type === TabItem
    );

    return (
        <div>
            <nav>
                <ul>
                    {tabs.map((tab, index) => (
                        <li key={`tab-${index}`}>
                            <button
                                key={`tab-btn-${index}`}
                                id={`tab-${sanitizeForId(tab.props.label)}`}
                                onClick={() => handleTabClick(index)}
                            >{tab.props.label}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            {tabs[activeTab]}
        </div>
    );
};

export default TabList;