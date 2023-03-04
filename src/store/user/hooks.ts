import { useSetRecoilState } from 'recoil';
import { userAtom } from './atoms';
import UserToken from '@/common/token';

export const useSetToken = () => {
    const setToken = useSetRecoilState(userAtom);
    return (value: string | null) => {
        UserToken.setToken(value ?? '');
        setToken((prev) => ({
            ...prev,
            token: value,
        }));
    };
};

export const useDelToken = () => {
    const setToken = useSetRecoilState(userAtom);
    return () => {
        UserToken.clearToken();
        setToken((prev) => ({
            ...prev,
            token: '',
        }));
    };
};
