import log from '@/utils/log';

export function createErrorModal(msg: string) {
    alert(msg);
}

export function createErrorMsg(msg: string) {
    log.error('请求错误', msg);
}

export default function useMessage() {
    return {
        createErrorModal,
        createErrorMsg,
    };
}
