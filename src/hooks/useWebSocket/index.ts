import { useEffect, useRef, useState, useCallback } from 'react';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import useUnmount from '../useUnmount';

export enum ReadyState {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3,
}

//处理 WebSocket
export interface Options {
    //重试次数
    reconnectLimit?: number;
    //重试时间间隔（ms）
    reconnectInterval?: number;
    //手动启动连接
    manual?: boolean;
    //webSocket 连接成功回调
    onOpen?: (event: WebSocketEventMap['open'], instance: WebSocket) => void;
    //webSocket 关闭回调
    onClose?: (event: WebSocketEventMap['close'], instance: WebSocket) => void;
    //webSocket 收到消息回调
    onMessage?: (
        message: WebSocketEventMap['message'],
        instance: WebSocket,
    ) => void;
    //webSocket 错误回调
    onError?: (event: WebSocketEventMap['error'], instance: WebSocket) => void;
    //子协议
    protocols?: string | string[];
}

export interface Result {
    //最新消息
    latestMessage?: WebSocketEventMap['message'];
    //发送消息函数
    sendMessage?: WebSocket['send'];
    //手动断开 webSocket 连接
    disconnect?: () => void;
    //手动连接 webSocket，如果当前已有连接，则关闭后重新连接
    connect?: () => void;
    //当前 webSocket 连接状态
    readyState: ReadyState;
    //webSocket 实例
    webSocketIns?: WebSocket;
}

export default function useWebSocket(
    socketUrl: string, //webSocket地址
    options: Options = {}, //配置项
): Result {
    const {
        reconnectLimit = 3,
        reconnectInterval = 3 * 1000,
        manual = false,
        onOpen,
        onClose,
        onMessage,
        onError,
        protocols,
    } = options;

    const onOpenRef = useLatest(onOpen);
    const onCloseRef = useLatest(onClose);
    const onMessageRef = useLatest(onMessage);
    const onErrorRef = useLatest(onError);

    const reconnectTimesRef = useRef(0);
    const reconnectTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const websocketRef = useRef<WebSocket>();

    const unmountedRef = useRef(false);

    const [latestMessage, setLatestMessage] =
        useState<WebSocketEventMap['message']>();
    const [readyState, setReadyState] = useState<ReadyState>(ReadyState.Closed);

    //重新连接
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const reconnect = () => {
        if (
            reconnectTimesRef.current < reconnectLimit &&
            websocketRef.current?.readyState !== ReadyState.Open
        ) {
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }

            reconnectTimerRef.current = setTimeout(() => {
                connectWs();
                reconnectTimesRef.current++;
            }, reconnectInterval);
        }
    };

    //初始化，连接webSocket
    const connectWs = useCallback(() => {
        if (reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current);
        }

        if (websocketRef.current) {
            websocketRef.current.close();
        }

        const ws = new WebSocket(socketUrl, protocols);
        setReadyState(ReadyState.Connecting);

        ws.onerror = (event) => {
            if (unmountedRef.current) {
                return;
            }
            reconnect();
            onErrorRef.current?.(event, ws);
            setReadyState(ws.readyState || ReadyState.Closed);
        };
        ws.onopen = (event) => {
            if (unmountedRef.current) {
                return;
            }
            onOpenRef.current?.(event, ws);
            reconnectTimesRef.current = 0;
            setReadyState(ws.readyState || ReadyState.Open);
        };
        ws.onmessage = (message: WebSocketEventMap['message']) => {
            if (unmountedRef.current) {
                return;
            }
            onMessageRef.current?.(message, ws);
            setLatestMessage(message);
        };
        ws.onclose = (event) => {
            if (unmountedRef.current) {
                return;
            }
            reconnect();
            onCloseRef.current?.(event, ws);
            setReadyState(ws.readyState || ReadyState.Closed);
        };

        websocketRef.current = ws;
    }, [
        onCloseRef,
        onErrorRef,
        onMessageRef,
        onOpenRef,
        protocols,
        reconnect,
        socketUrl,
    ]);

    //发送消息
    const sendMessage: WebSocket['send'] = (message) => {
        if (readyState === ReadyState.Open) {
            websocketRef.current?.send(message);
        } else {
            throw new Error('WebSocket disconnected');
        }
    };

    //连接
    const connect = useCallback(() => {
        reconnectTimesRef.current = 0;
        connectWs();
    }, [connectWs]);

    //断开链接
    const disconnect = () => {
        if (reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current);
        }

        reconnectTimesRef.current = reconnectLimit;
        websocketRef.current?.close();
    };

    useEffect(() => {
        if (!manual) {
            connect();
        }
    }, [socketUrl, manual, connect]);

    useUnmount(() => {
        unmountedRef.current = true;
        disconnect();
    });

    return {
        latestMessage,
        sendMessage: useMemoizedFn(sendMessage),
        connect: useMemoizedFn(connect),
        disconnect: useMemoizedFn(disconnect),
        readyState,
        webSocketIns: websocketRef.current,
    };
}
