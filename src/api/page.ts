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

// 查询医院详情
export function hospitalInfoById(data): any {
  return request.get('/api/hospitalInfo/getById', {
    params: data,
  });
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

// 科室详情
export function departmentInfoGetById(data): any {
  return request.get('/api/departmentInfo/getById', {
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

/**
 * 医生管理
 */
// 医生列表
export function doctorInfo(data): any {
  return request.get('/api/doctorInfo/getByPage', {
    params: data,
  });
}

// 医生详情
export function doctorInfoGetById(data): any {
  return request.get('/api/doctorInfo/getById', {
    params: data,
  });
}

// 新增医生
export function doctorInfoInsert(data): any {
  return request.post('/api/doctorInfo/insert', data);
}

// 修改医生
export function doctorInfoUpdate(data): any {
  return request.post('/api/doctorInfo/update', data);
}

// 删除医生
export function doctorInfoDelete(data): any {
  return request.post('/api/doctorInfo/delete', data, {
    params: data,
  });
}

/**
 * 床位管理
 */
// 床位列表
export function bedInfoInfo(data): any {
  return request.get('/api/bedInfo/getByPage', {
    params: data,
  });
}

// 床位详情
export function bedInfoGetById(data): any {
  return request.get('/api/bedInfo/getById', {
    params: data,
  });
}

// 新增床位
export function bedInfoInsert(data): any {
  return request.post('/api/bedInfo/insert', data);
}

// 修改床位
export function bedInfoUpdate(data): any {
  return request.post('/api/bedInfo/update', data);
}

// 删除床位
export function bedInfoDelete(data): any {
  return request.post('/api/bedInfo/delete', data, {
    params: data,
  });
}

/**
 * 患者管理
 */
// 患者列表
export function patientInfoInfo(data): any {
  return request.get('/api/patientInfo/getByPage', {
    params: data,
  });
}

// 患者详情
export function patientInfoGetById(data): any {
  return request.get('/api/patientInfo/getById', {
    params: data,
  });
}

// 新增患者
export function patientInfoInsert(data): any {
  return request.post('/api/patientInfo/insert', data);
}

// 修改患者
export function patientInfoUpdate(data): any {
  return request.post('/api/patientInfo/update', data);
}

// 删除患者
export function patientInfoDelete(data): any {
  return request.post('/api/patientInfo/delete', data, {
    params: data,
  });
}

/**
 * 设备管理
 */
// 设备列表
export function deviceInfoInfo(data): any {
  return request.get('/api/deviceInfo/getByPage', {
    params: data,
  });
}

// 设备详情
export function deviceInfoGetById(data): any {
  return request.get('/api/deviceInfo/getById', {
    params: data,
  });
}

// 新增设备
export function deviceInfoInsert(data): any {
  return request.post('/api/deviceInfo/insert', data);
}

// 修改设备
export function deviceInfoUpdate(data): any {
  return request.post('/api/deviceInfo/update', data);
}

// 删除设备
export function deviceInfoDelete(data): any {
  return request.post('/api/deviceInfo/delete', data, {
    params: data,
  });
}

/**
 * 报告管理
 */
// 报告列表
export function reportInfoInfo(data): any {
  return request.get('/api/reportInfo/getByPage', {
    params: data,
  });
}

// 报告详情
export function reportInfoGetById(data): any {
  return request.get('/api/reportInfo/getById', {
    params: data,
  });
}

// 新增报告
export function reportInfoInsert(data): any {
  return request.post('/api/reportInfo/insert', data);
}

// 修改报告
export function reportInfoUpdate(data): any {
  return request.post('/api/reportInfo/update', data);
}

// 删除报告
export function reportInfoDelete(data): any {
  return request.post('/api/reportInfo/delete', data, {
    params: data,
  });
}
