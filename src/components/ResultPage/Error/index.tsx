import React, { FC } from 'react';

type ErrorProps = {
    message: string;
    handleError: () => void;
};

const Error: FC<ErrorProps> = ({ message, handleError }) => {
    return (
        <div className="w-full flex justify-center items-center">
            <div>{message}</div>
            <button
                onClick={() => {
                    window.location.reload();
                    handleError();
                }}
            >
                再试一次
            </button>
        </div>
    );
};

export default Error;
