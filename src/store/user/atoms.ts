import { atom, selector } from 'recoil';
import { UserStateType } from './types';
import UserToken from '@/common/token';

const initialState: UserStateType = {
    token: (UserToken.getToken() as string) || '',
};

export const userAtom = atom<UserStateType>({
    key: 'userAtom',
    default: initialState,
});
