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

// 用户信息
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

// 课程列表
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

// 课程主页详情
const article = [];

for (let i = 0; i < 3; i++) {
  article.push(Mock.mock({
    title: Mock.Random.ctitle(),
    img: Mock.Random.image('200x100','#ffffff'),
    desc:Mock.Random.cparagraph(),
    link:Mock.Random.url('http'),
  }));
}
// 课程章节

const chapter = [];

for (let i = 0; i < 3; i++) {
  chapter.push(Mock.mock({
    id:Mock.Random.increment(),
    classId:1,
    title: Mock.Random.ctitle(),
    desc:Mock.Random.cparagraph(),
  }));
}

// 章节详情列表

const chapterList = [];

for (let i = 0; i < 3; i++){
  chapterList.push(Mock.mock({
    id:Mock.Random.increment(),
    'type|1-2':1,
    title:Mock.Random.ctitle(),
    desc:Mock.Random.cword(10),
    img:Mock.Random.image('200x100','#ffffff'),
    video:Mock.Random.url('http'),
    article:Mock.Random.cparagraph(),
  }))
}

// 章节详情列表

const freeList = [];

for (let i = 0; i < 3; i++){
  freeList.push(Mock.mock({
    id:Mock.Random.increment(),
    'type|1-2':1,
    title:Mock.Random.ctitle(),
    desc:Mock.Random.cword(10),
    img:Mock.Random.image('200x100','#ffffff'),
    video:Mock.Random.url('http'),
    article:Mock.Random.cparagraph(),
  }))
}

// 轮播图列表

const bannerList = [];

for (let i = 0; i < 3; i++){
  bannerList.push(Mock.mock({
    id:Mock.Random.increment(),
    title:Mock.Random.ctitle(),
    img:Mock.Random.image('200x100','#ffffff'),
    link:Mock.Random.url('http'),
  }))
}

export { LoginUsers, Users, classList,article,chapter,chapterList,freeList,bannerList };
