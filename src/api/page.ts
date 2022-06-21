import request from '@/utils/request';

export function login(data): any {
  return request.post('/api/user/login', data, {
    params: data,
  });
}

/**
 * 工作站管理
 * @param data
 * @returns
 */
// 分页查询列表
export function hospitalInfoList(data): any {
  return request.get('/api/hospitalInfo/getByPage', {
    params: data,
  });
}

// 新增医院
export function hospitalInfoInsert(data): any {
  return request.post('/api/hospitalInfo/insert', data);
}

// 查询所有医院
export function departmentInfoGet(data): any {
  return request.get('/api/departmentInfo/gets', {
    params: data,
  });
}

// 删除医院
export function hospitalInfoDelete(data): any {
  return request.post('/api/hospitalInfo/delete', data, {
    params: data,
  });
}

// 修改医院
export function hospitalInfoUpdate(data): any {
  return request.post('/api/hospitalInfo/update', data);
}

/**
 * 科室管理
 */
// 分页查询列表
export function departmentInfo(data): any {
  return request.get('/api/departmentInfo/getByPage', {
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

// 新增科室
export function departmentInfoInsert(data): any {
  return request.post('/api/departmentInfo/insert', data);
}

// 修改科室
export function departmentInfoUpdate(data): any {
  return request.post('/api/departmentInfo/update', data);
}

// 删除科室
export function departmentInfoDelete(data): any {
  return request.post('/api/departmentInfo/delete', data, {
    params: data,
  });
}
