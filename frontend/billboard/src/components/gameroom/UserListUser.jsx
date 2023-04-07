import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch } from 'antd';
import { useState } from 'react';
const { Meta } = Card;
const UserListUser = () => {
    const [loading, setLoading] = useState(true);
    const onChange = (checked) => {
        setLoading(!checked);
    };
    return (
        <>
            <Card
                style={{
                    width: 300,
                    marginTop: 16,
                }}
            >

                <Meta
                    avatar={<Avatar src="https://avatars.dicebear.com/api/identicon/wooncloud.svg" />}
                    title="Card title"
                    description="This is the description"
                />

            </Card>
        </>
    );
};
export default UserListUser;