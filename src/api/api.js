import axios from 'axios';

let baseUrl = window.Api.ApiUrl; //api域名
//预警管理首页数据
export const getYjIndexData = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.yj_MoreData, {timeout: 60000}).then(res => res.data);
};
