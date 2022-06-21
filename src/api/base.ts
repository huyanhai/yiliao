import request from '@/utils/request';

// 区域
export function regionCodes(data?: any): any {
  return request.get('/api/regionCodes/gets', {
    params: data,
  });
}

// 用户信息
export function getUserDetailByLogins(data?: any): any {
  return request.get('/api/user/getUserDetailByLogin', {
    params: data,
  });
}

// 父级医院
export function hospitalInfoGets(data?: any): any {
  return request.get('/api/hospitalInfo/gets', {
    params: data,
  });
}

// 上传文件
export function uploadImg(data?: any): any {
  return request.post('/api/file/upload', data);
}

// 查询所有科室，根据医院选中, hospitalId 可为空
export function getAllByHospitalId(data?: any): any {
  return request.get('/api/departmentInfo/getAllByHospitalId', {
    params: data,
  });
}
