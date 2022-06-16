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
