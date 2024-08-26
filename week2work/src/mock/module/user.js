import MockUtil from '../util';

export default {
  // 用户列表
  userList: MockUtil.fastList({
    id: '@guid()',
    name: '@cname()',
    'gender|1': ['male', 'famale'],
    'age|16-40': 1,
  }, 23),
}
