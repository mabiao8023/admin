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
