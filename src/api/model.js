import http from "./http";

/* 
分类管理模块相关接口
*/
//获取分类列表信息
const queryList = (pageNumber = 1, pageSize = 10, categoryLevel = 1, parentId = 0) => {
    return http.get('/categories', {
        params: {
            pageNumber,
            pageSize,
            categoryLevel,
            parentId
        }
    })
}

//删除分类信息
const removeClassify = (ids) => {
    return http.delete('/categories', {
        data: {
            ids
        }
    })
}

//获取分类详细信息
const classifyInfo = (ids) => {
    return http.get(`/categories/${ids}`)
}

//修改分类信息
const updataClassify = (data) => {
    return http.put('/categories', data)
}

//增加分类信息
const addClassify = (data) => {
    return http.post('/categories', data)
}


/* 商品管理模块接口 */
//获取商品列表信息
const queryGoodsList = (pageNumber = 1, pageSize = 10) => {
    return http.get('/goods/list', {
        params: {
            pageNumber,
            pageSize
        }
    })
}



export default {
    //分类管理模块
    queryList,
    removeClassify,
    classifyInfo,
    updataClassify,
    addClassify,
    //商品管理模块
    queryGoodsList
}