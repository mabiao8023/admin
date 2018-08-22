import Vue from 'vue';

// import axios from 'axios';
// //http://120.78.193.207
// import qs from 'qs';

// let base = 'http://120.78.193.207';

let base = 'http://kc.ym8800.com';

let myAjax = {
    get( api,data ){
        return new Promise((resolve,reject) => {
            Vue.http.get( api , { params : data } )
                .then( data => {
                    ajaxResHandle(data,resolve,reject);
                })
                .catch( err => {
                    reject(`请求参数失败`);
                });
        } )
    },
    post( api,data,options = {} ){
        return new Promise( (resolve,reject) => {
            Vue.http.post( api , data ,Object.assign(options,{emulateJSON:true}))
                .then( data => {
                    ajaxResHandle(data,resolve,reject);
                } )
                .catch( err => {
                    reject(`请求参数失败`);
                } );
        } )
    },
}

// 公共的ajax处理函数
let ajaxResHandle =  ( data,resolve,reject ) => {
    let res = data.body;
    if( res.code == 1 ){
        resolve( res.data )
    }else{
        reject( res.msg );
    }
}

// 接口请求

// 登录
export const requestLogin = params => { return myAjax.post(`${base}/admin/common/login`, params) };

// 上传图片
export const uploadFile = params => {return myAjax.post(`${base}/admin/common/upload_image`, params)};

// 上传视频
export const uploadVideo = params => {return myAjax.post(`${base}/admin/common/upload_video`, params)};

// 课程管理
// 课程管理、增加一个课程
export const addClass = params => { return myAjax.post(`${base}/admin/class/add`,  params)};
// 获取课程列表
export const getClassList = params => { return myAjax.get(`${base}/admin/class/list`,  params)};
// 编辑课程
export const editClass = params => { return myAjax.post(`${base}/admin/class/update`,params); };
// 冻结课程
export const removeClass = params => { return myAjax.post(`${base}/admin/class/delete`,params ); }


// 获取用户列表
export const getUserList = params => { return myAjax.get(`${base}/admin/user/list`,  params ); };

// 轮播图管理
// 增加轮播图
export const addBannerList = params => { return myAjax.post(`${base}/admin/banner/add`,  params)};
// 获取轮播图列表
export const getBannerList = params => { return myAjax.get(`${base}/admin/banner/list`,  params)};
// 编辑轮播图
export const editBannerList = params => { return myAjax.post(`${base}/admin/banner/update`,params); };
// 冻结轮播图
export const removeBannerList = params => { return myAjax.post(`${base}/admin/banner/delete`,params ); }

// 课程详情配置
// 获取课程详情
export const getClassIndex = params => { return myAjax.get(`${base}/admin/intro/list`,params ); }

export const addClassDetail = params => { return myAjax.post(`${base}/admin/intro/update`, params ); };

// 免费试听配置
// 获取免费试听列表
export const getClassFreeList = params => { return myAjax.get(`${base}/admin/try/list`, params ); };

export const addClassFreeList = params => { return myAjax.post(`${base}/admin/try/add`,  params ); };

export const removeClassFreeList = params => { return myAjax.post(`${base}/admin/try/delete`, params ); }

//课程章节
export const getClassChapter = params => { return myAjax.get(`${base}/admin/chapter/list`, params ); };

export const addClassChapter = params => { return myAjax.post(`${base}/admin/chapter/add`, params ); };

export const editClassChapter = params => { return myAjax.post(`${base}/admin/chapter/update`, params ); };

export const removeClassChapter = params => { return myAjax.post(`${base}/admin/chapter/delete`, params ); };

// 具体的课程章节信息

export const getClassChapterList = params => { return myAjax.get(`${base}/admin/lesson/list`, params ); };

export const addClassChapterList = params => { return myAjax.post(`${base}/admin/lesson/add`,  params ); };

export const editClassChapterList = params => { return myAjax.post(`${base}/admin/lesson/update`,  params ); };

export const removeClassChapterList = params => { return myAjax.post(`${base}/admin/lesson/delete`, params ); }

// 订单管理 -- 已支付订单

export const getOrderPayList = params => { return myAjax.post(`${base}/admin/order/list`,  params); }

// 获取平台总收入

export const getIncome = params => { return myAjax.get(`${base}/admin/income/static`,  params); }


// 测试列表增删改查

export const getTestList = params => { return myAjax.get(`${base}/admin/test/list`, params ); };

export const addTestList = params => { return myAjax.post(`${base}/admin/test/add`, params ); };

export const editTestList = params => { return myAjax.post(`${base}/admin/test/update`,  params); };

export const removeTestList = params => { return myAjax.post(`${base}/admin/test/delete`,  params); }


// 测试问题列表CURD

export const getQuestionList = params => { return myAjax.get(`${base}/admin/test_ask/list`, params); };

export const addQuestionList = params => { return myAjax.post(`${base}/admin/test_ask/add`, params); };

export const editQuestionList = params => { return myAjax.post(`${base}/admin/test_ask/update`, params ); };

export const removeQuestionList = params => { return myAjax.post(`${base}/admin/test_ask/delete`, params ); }

export const removeQuestionOption = params => { return myAjax.post(`${base}/admin/test_option/delete`, params ); }

// 测试问题答案列表CURD

export const getAnswerList = params => { return myAjax.get(`${base}/admin/test_answer/list`,params ); };

export const addAnswerList = params => { return myAjax.post(`${base}/admin/test_answer/add`,params ); };

export const editAnswerList = params => { return myAjax.post(`${base}/admin/test_answer/update`,params ); };

export const removeAnswerList = params => { return myAjax.post(`${base}/admin/test_answer/delete`, params ); }

// 获取或者查询测试用户列表

export const getTestUserList = params => { return myAjax.get(`${base}/admin/user_test/list`, params ); }
