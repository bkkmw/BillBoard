import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';
const { Option } = Select;
const UserListDrawer = ({showDrawer, onClose, setOpen,open}) => {

  return (
    <>

      <Drawer
        title="Add User"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="id"
                label="ID"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user id',
                  },
                ]}
              >
                <Input placeholder="Please enter user id" />
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="PASSWORD"
                rules={[
                  {
                    required: true,
                    message: 'password',
                  },
                ]}
              >
                <Input placeholder="Please enter user password" />
              </Form.Item>
              <Form.Item>
          <Button type={'primary'} htmlType={"submit"}>Submit</Button>
        </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default UserListDrawer;