import http from "./http";
import carousels from "./carousels";
import dashboard from "./dashboard";

//登录接口
const adminLogin = (userName, passwordMd5) => {
    return http.post('/adminUser/login', {
        userName,
        passwordMd5
    });
}

//获取登录者信息
const adminProfile = () => {
    return http.get('/adminUser/profile')
}

//上传图片接口
const upload = (file) => {
    let fm = new FormData;
    fm.append('file', file);
    return http.post('/upload/file', fm);
}

/* 暴露API */
const api = {
    upload,
    adminLogin,
    adminProfile,
    carousels,
    dashboard
};
export default api;