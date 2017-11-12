import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

const classList = [];

for (let i = 0; i < 3; i++) {
  classList.push(Mock.mock({
    id: Mock.Random.increment(),
    title: Mock.Random.ctitle(),
    banner: Mock.Random.image('200x100','#ffffff'),
    tag:Mock.Random.cword(3),
    desc:Mock.Random.cword(10),
    prize: Mock.Random.integer(1, 200),
    peoples:Mock.Random.integer(1000,100000)
  }));
}


export { LoginUsers, Users, classList };
