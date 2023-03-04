import { deffHttp } from '@/utils/axios';
import { HallParams, HallResult } from '@/types/api/home';

enum Api {
    CMS_HALL_CACHE = '/api/cms/hall/cache',
}

export const getHallList = (data: HallParams) =>
    deffHttp.post<HallResult>(
        { url: Api.CMS_HALL_CACHE, data },
        { errorMessageMode: 'modal', withToken: false },
    );
