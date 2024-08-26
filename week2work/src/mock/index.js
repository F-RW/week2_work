import Mock from 'mockjs';
import { parseUrl } from './util';
import userAPI from './module/user';

// 临时缓存mockjs数据
let MockCache = {};

const MockBot = {
  // 通用模板API
  fastAPI: {
    // 获取数据列表
    page: (base) => config => {
      const list = MockCache[base] || [];
      const param = parseUrl(config.url) || {};
      const { page = 1, size = 10, ...query } = param;
      // 计算有几个搜索条件
      let queryCount = false;
      for (let key in query) {
        if (query[key]) {
          queryCount += 1;
          break;
        }
      }
      // 根据搜索条件过滤结果
      const filteredList = queryCount > 0 ? list.filter(data => {
        let result = false;
        for (let key in query) {
          if (data[key] === query[key]) {
            result = true;
            break;
          }
        }
        return result;
      }) : list;
      // 根据结果处理分页数据
      const _page = Number(page);
      const _limit = Number(size);
      const pageList = filteredList.filter((item, index) => index < _limit * _page && index >= _limit * (_page - 1));
      const response = {
        page: _page,
        size: _limit,
        result: {
          list: pageList,
          total: filteredList.length,
        },
        success: true,
      };
      return response;
    },
    // 查询数据详情
    get: (base) => config => {
      const list = MockCache[base] || [];
      const param = parseUrl(config.url) || {};
      const id = param.id;
      const result = list.find((item) => item.id == id);
      return {
        result: result,
        success: true,
      };
    },
    // 新增数据
    add: (base) => config => {
      const param = JSON.parse(config.body);
      MockCache[base].unshift(param);
      return {
        success: true,
      };
    },
    // 编辑数据
    update: (base) => config => {
      const param = JSON.parse(config.body);
      const index = MockCache[base].findIndex(item => item.id === param.id);
      MockCache[base][index] = param;
      return {
        success: true,
      };
    },
    // 删除数据
    delete: (base) => config => {
      const ids = JSON.parse(config.body);
      ids.forEach(id => {
        MockCache[base] = MockCache[base].filter(item => item.id !== id);
      });
      return {
        success: true,
      };
    }
  },
  // 根据通用模板API快速创建模拟接口
  fastMock: (url, list) => {
    MockCache[url] = list;
    Mock.mock(new RegExp(`\/${url}\/page`), 'get', MockBot.fastAPI.page(url));
    Mock.mock(new RegExp(`\/${url}\/get`), 'get', MockBot.fastAPI.get(url));
    Mock.mock(new RegExp(`\/${url}\/add`), 'post', MockBot.fastAPI.add(url));
    Mock.mock(new RegExp(`\/${url}\/update`), 'post', MockBot.fastAPI.update(url));
    Mock.mock(new RegExp(`\/${url}\/delete`), 'post', MockBot.fastAPI.delete(url));
  },
}

// 产品管理
MockBot.fastMock('user', userAPI.userList);
