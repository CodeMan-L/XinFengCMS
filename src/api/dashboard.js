/* Dashboard板块的接口 */
import http from "./http";

// 获取信息
const queryData = (sentry_key, sentry_version) => {
    return http.post(`5737358/envelope/?sentry_key=${sentry_key}$sentry_version=${sentry_version}`)
}

export default {
    queryData
}