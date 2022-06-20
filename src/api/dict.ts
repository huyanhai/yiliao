import request from '@/utils/request';

// 系统字典
export function sysDictionary(): any {
  return request.get('/api/sysDictionary/gets');
}
