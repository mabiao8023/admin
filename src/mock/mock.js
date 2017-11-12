import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users , classList,article,chapter } from './data/user';
let _Users = Users;
let _classList = classList;
let _article = article;
let _chapter = chapter;
export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });


    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

    // 获取课程列表
    mock.onGet('/class/list').reply(config => {
      let {title} = config.params;
      let mockClasses = _classList.filter(val => {
        if (title && val.title.indexOf(title) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            classList: mockClasses
          }]);
        }, 1000);
      });
    });

    // 编辑课程
    mock.onGet('/class/edit').reply(config => {
      let { id, title, banner,desc,tag,peoples, prize } = config.params;
      _classList.some(c => {
        if (c.id === id) {
          c.title = title;
          c.banner = banner;
          c.desc = desc;
          c.tag = tag;
          c.peoples = peoples;
          c.prize = prize;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      }); 
    });
    // 增加课程
    mock.onGet('/class/add').reply(config => {
      let { id, title, banner,desc,tag,peoples, prize } = config.params;
      _classList.push({
          id:4, 
          title:title,
          banner:banner,
          desc:desc,
          tag:tag,
          peoples:peoples,
          prize:prize
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功',
            data:{
              id:4
            }
          }]);
        }, 500);
      });
    });
    // 删除课程
    // 增加课程
    mock.onGet('/class/remove').reply(config => {
      let { id } = config.params.id;
      let index;
      _classList.forEach( (c,i) => {
        if( c.id == id ){
          index = i;
          return false;
        }
      } );
      _classList.splice(index,1);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功',
            data:{
              id:4
            }
          }]);
        }, 500);
      });
    });

    // 获取课程首页配置
    mock.onGet('/class/classIndex').reply(config => {
      let id = config.params.id;
      // 随机生成一个传给前端
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功',
            data:{
              article:_article
            }
          }]);
        }, 500);
      });
    } );
    // 增加或者修改课程文章配置
    mock.onGet('/class/addClassDetail').reply(config => {
      // let id = config.params.id;
      _article = config.params.article;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '添加成功',
            data:{
              article:_article
            }
          }]);
        }, 500);
      });
    });// 获取章节列表
    mock.onGet('/class/getClassChapter').reply(config => {
      let id = config.params.id;
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '添加成功',
              data:{
                chapters:_chapter
              }
            }]);
          }, 500);
        });
    });
  }


};