import Mock from 'mockjs';

export const parseUrl = (url) => {
  let obj = {};// 创建一个Object
  let reg = /[?&][^?&]+=[^?&]+/g;// 正则匹配 ?&开始 =拼接  非?&结束  的参数
  let arr = url.match(reg);// match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
  // arr数组形式 ['?id=12345','&a=b']
  if (arr) {
    arr.forEach((item) => {
      /**
       * tempArr数组    ['id','12345']和['a','b']
      * 第一个是key，第二个是value
      * */
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}

export default {
  // 根据配置文件和数量快速生成数据列表
  fastList: (config, count) => {
    const list = []
    for (let i = 0; i < count; i++) {
      list.push(Mock.mock(config));
    }
    return list;
  },
}
