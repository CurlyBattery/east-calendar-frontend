import React, {type FC, type ReactElement, useState} from "react";

import TabItem, {type TabItemProps} from "../TabItem.tsx";
import {sanitizeForId} from "../../utils/stringUtils.ts";
import './_tab_list.scss';

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
        <div className='tab-list'>
            <nav className='tab-list__nav'>
                <ul className='tab-list__ul'>
                    {tabs.map((tab, index) => (
                        <li className='tab-list__item' key={`tab-${index}`}>
                            <button
                                className='tab-list__item__link'
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