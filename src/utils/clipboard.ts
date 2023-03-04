/**
 * @description: 复制 ;
 * @param {*}
 * @return {*}
 *
 */

import { MouseEvent } from 'react';
import Clipboard from 'clipboard';

//如果是svg元素请在外边包一层div，svg元素添加样式 pointerEvents: 'none',
export const clipboardSuccess = () => alert('复制成功');

export const clipboardError = () => alert('复制失败');

export const handleClipboard = (text: string, event: MouseEvent) => {
    const clipboard = new Clipboard(event.target as Element, {
        text: () => text,
    });
    clipboard.on('success', () => {
        clipboardSuccess();
        clipboard.destroy();
    });
    clipboard.on('error', () => {
        clipboardError();
        clipboard.destroy();
    });
    (clipboard as any).onClick(event);
};
