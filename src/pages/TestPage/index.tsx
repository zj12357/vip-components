import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Form, { useForm } from '@/components/Form';
import Input from '@/components/Input';
import { getHallList } from '@/api/home';
import { ValidatorType } from '@/enums/validatorEnum';

type TestPageProps = {};

const TestPage: FC<TestPageProps> = (props) => {
    const { status, data, error, mutate } = useMutation(
        (params: any) => getHallList(params),
        {
            onSuccess: () => {
                console.log('成功');
            },
        },
    );
    const [form] = useForm();

    const onSubmit = (values: any, result: any) => {
        console.log('----submit Successfully', values, result);
        console.log(form.setFieldValue('name', 8888), form);
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
                    field="age"
                    label="Age"
                    rules={[
                        {
                            type: ValidatorType.Number,
                            required: true,
                            message: '请输入年龄',
                        },
                        { type: ValidatorType.Number, min: 12 },
                    ]}
                >
                    <Input
                        placeholder="Please input username"
                        clearable
                        border="none"
                    />
                </Form.Item>
                <Form.Item
                    field="name"
                    label="Name"
                    rules={[{ type: ValidatorType.Number, min: 12 }]}
                >
                    <Input
                        placeholder="Please input username"
                        clearable
                        border="none"
                    />
                </Form.Item>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </Form>

            <button onClick={() => mutate({})}>useMutation</button>
        </div>
    );
};

export default TestPage;
