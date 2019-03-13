/**
 * @info： 授权认证
 */
import { getJson, postJson } from '../service/index'
import data from '../config/dev'
import { wxUrl } from './config'
const api = {
    code2Session(param) {
        let url = wxUrl + '/sns/jscode2session'
        let params = { ...param, appid: data.appid, secret: data.secret, grant_type: 'authorization_code'}
        return getJson(url, params)
    },
    getAccessToken() {
        let url = wxUrl + '/cgi-bin/token'
        let params = {
            grant_type: 'client_credential',
            appid: data.appid, 
            secret: data.secret
        };
        return getJson(url, params)
    },
    getWXACodeUnlimit(params) {
        let url = `${wxUrl}/wxa/getwxacodeunlimit?access_token=${params.access_token}`
        let param = {scene : params.scene}
        return postJson(url, param, { responseType: 'arraybuffer'})
    }
}
export default api;