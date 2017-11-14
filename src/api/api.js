import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getClassList = params => { return axios.get(`${base}/class/list`, { params: params }); };

export const editClass = params => { return axios.get(`${base}/class/edit`, { params: params }); };

export const addClass = params => { return axios.get(`${base}/class/add`, { params: params }); };

export const removeClass = params => { return axios.get(`${base}/class/remove`, { params: params }); };

export const getClassIndex = params => { return axios.get(`${base}/class/classIndex`, { params: params }); };

export const addClassDetail = params => { return axios.get(`${base}/class/addClassDetail`, { params: params }); };

//课程章节 
export const getClassChapter = params => { return axios.get(`${base}/class/getClassChapter`, { params: params }); };

export const addClassChapter = params => { return axios.get(`${base}/class/addClassChapter`, { params: params }); };

export const editClassChapter = params => { return axios.get(`${base}/class/editClassChapter`, { params: params }); };

export const removeClassChapter = params => { return axios.get(`${base}/class/removeClassChapter`, { params: params }); }

// 具体的章节信息

export const getClassChapterList = params => { return axios.get(`${base}/class/getClassChapterList`, { params: params }); };

export const addClassChapterList = params => { return axios.get(`${base}/class/addClassChapterList`, { params: params }); };

export const editClassChapterList = params => { return axios.get(`${base}/class/editClassChapterList`, { params: params }); };

export const removeClassChapterList = params => { return axios.get(`${base}/class/removeClassChapterList`, { params: params }); }

// 免费试听信息

export const getClassFreeList = params => { return axios.get(`${base}/class/getClassFreeList`, { params: params }); };

export const addClassFreeList = params => { return axios.get(`${base}/class/addClassFreeList`, { params: params }); };

export const editClassFreeList = params => { return axios.get(`${base}/class/editClassFreeList`, { params: params }); };

export const removeClassFreeList = params => { return axios.get(`${base}/class/removeClassFreeList`, { params: params }); }


// 轮播图信息

export const getClassBannerList = params => { return axios.get(`${base}/class/getClassBannerList`, { params: params }); };

export const addClassBannerList = params => { return axios.get(`${base}/class/addClassBannerList`, { params: params }); };

export const editClassBannerList = params => { return axios.get(`${base}/class/editClassBannerList`, { params: params }); };

export const removeClassBannerList = params => { return axios.get(`${base}/class/removeClassBannerList`, { params: params }); }