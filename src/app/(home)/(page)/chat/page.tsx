"use client"

import { Radio, RadioChangeEvent, Tabs } from "antd";
import { useState } from "react";

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const ChatPage = () => {
    const [mode, setMode] = useState<TabPosition>('top');

    return (
        <>
            <div>
                <div className="w-[300px]">
                    <Tabs
                        animated={false}
                        defaultActiveKey="1"
                        tabPosition={mode}
                        style={{ height: 220 }}
                        items={new Array(30).fill(null).map((_, i) => {
                            const id = String(i);
                            return {
                                label: `Tab-${id}`,
                                key: id,
                                disabled: i === 28,
                                children: `Content of tab ${id}`,
                            };
                        })}
                    />
                </div>
            </div>
        </>
    )
};

export default ChatPage;
