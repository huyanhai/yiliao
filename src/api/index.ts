import request from '@/utils/request';

export * from './base';

export function login(data): any {
  return request.post('/api/user/login', data, {
    params: data,
  });
}

export function hospitalInfoList(data): any {
  return request.get('/api/hospitalInfo/getByPage', {
    params: data,
  });
}

// 科室 - 查询所有
export function departmentInfoGet(data): any {
  return request.get('/api/departmentInfo/gets', {
    params: data,
  });
}

/**
 * 设备管理
 */
// 列表-分页
export function deviceInfoGetPage(data): any {
  return request.get('/api/deviceInfo/getByPage', {
    params: data,
  });
}
