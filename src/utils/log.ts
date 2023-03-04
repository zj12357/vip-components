const error = (title: string, message: string) => {
    console.log(
        `%c ${title}: %c ${message} %c`,
        'background:#f5222d ; padding: 2px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#f5222d ; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent',
    );
};

const success = (title: string, message: string) => {
    console.log(
        `%c ${title}: %c ${message} %c`,
        'background:#52c41a ; padding: 2px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#52c41a ; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent',
    );
};

const warn = (title: string, message: string) => {
    console.log(
        `%c ${title}: %c ${message} %c`,
        'background:#faad14 ; padding: 2px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#faad14 ; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent',
    );
};
const info = (title: string, message: string) => {
    console.log(
        `%c ${title}: %c ${message} %c`,
        'background:#1890ff ; padding: 2px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#1890ff ; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent',
    );
};

export default {
    error,
    success,
    warn,
    info,
};
