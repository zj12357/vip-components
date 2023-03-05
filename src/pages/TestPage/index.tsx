import React, { FC, useRef } from 'react';
import { Input, Form, Loading } from '@/components/vip-ui';
import { useForm } from '@/components/vip-ui/Form';

type TestPageProps = {};

const TestPage: FC<TestPageProps> = (props) => {
    const [form] = useForm();
    const childRef = useRef(null);

    const onSubmit = (values: any, result: any) => {
        console.log('----submit Successfully', values, result);
        console.log(childRef.current);
    };

    return (
        <div>
            <div>I am TestPage</div>
            <Form
                form={form}
                onSubmit={onSubmit}
                initialValues={{
                    name: '123',
                    age: 12,
                }}
            >
                <Form.Item
                    field="name"
                    label="姓名"
                    rules={[
                        {
                            required: true,
                            message: '请输入姓名',
                        },
                    ]}
                >
                    <Input
                        placeholder="Please input username"
                        clearable
                        border="none"
                        ref={childRef}
                    />
                </Form.Item>
                <Form.Item
                    field="age"
                    label="年龄"
                    rules={[
                        {
                            required: true,
                            message: '请输入年龄',
                        },
                        {
                            pattern: /^\d+$/,
                            message: '请输入数字',
                        },
                        {
                            validator: (val, callback) => {
                                if (val.length > 5) {
                                    callback(
                                        'The maximum number of characters is 5',
                                    );
                                } else {
                                    callback();
                                }
                            },
                        },
                    ]}
                >
                    <Input
                        placeholder="Please input username"
                        clearable
                        border="none"
                    />
                </Form.Item>

                <div>
                    <button type="submit">提交</button>
                </div>
            </Form>

            <Loading></Loading>
        </div>
    );
};

export default TestPage;
