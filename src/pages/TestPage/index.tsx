import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Form from '@/components/Form';
import Input from '@/components/Input';
import { getHallList } from '@/api/home';

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

    return (
        <div>
            <div>I am TestPage</div>
            <Form>
                <Form.Item
                    field="age"
                    label="Age"
                    trigger="onInput"
                    rules={[
                        { type: 'number', min: 12, validateLevel: 'warning' },
                    ]}
                >
                    <Input
                        placeholder="Please input username"
                        clearable
                        border="none"
                    />
                </Form.Item>
            </Form>

            <button onClick={() => mutate({})}>useMutation</button>
        </div>
    );
};

export default TestPage;
