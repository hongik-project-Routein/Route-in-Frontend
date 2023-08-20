import { type UserData } from './../../types/userType'

export const userDemo: UserData[] = [
  {
    uname: 'jinokim98',
    id: 1,
    last_login: '2023-08-13',
    email: 'jinokim98@gmail.com',
    name: '김진호',
    introduction: `김진호
홍익대학교 경영학과`,
    age: 26,
    image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
    follower_set: ['jane', 'soomineom'],
    following_set: ['Isabella'],
    post_set: [],
  },
  {
    uname: 'jane',
    id: 2,
    last_login: '2023-08-13',
    email: 'jane@gmail.com',
    introduction: 'my name is jane',
    name: '제인',
    age: 20,
    image:
      'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
    post_set: [],
    follower_set: ['jinokim98, chris'],
    following_set: [],
  },
  {
    uname: 'Isabella',
    id: 3,
    last_login: '2023-08-13',
    email: 'Isabella@gmail.com',
    introduction: 'my name is Isabella',
    name: '데모1',
    age: 23,
    image:
      'https://cdn.pixabay.com/photo/2016/11/29/11/24/woman-1869158_1280.jpg',

    post_set: [],
    follower_set: ['jinokim98'],
    following_set: [],
  },
  {
    uname: 'chris',
    id: 4,
    last_login: '2023-08-13',
    email: 'chris@gmail.com',
    introduction: 'my name is chris',
    name: '데모2',
    age: 25,
    image:
      'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    post_set: [],
    follower_set: ['soomineom', 'jane'],
    following_set: ['jinokim98'],
  },
  {
    uname: 'soomineom',
    id: 5,
    last_login: '2023-08-13',
    email: 'soomineom@gmail.com',
    introduction: 'my name is soomineom',
    image:
      'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    name: '엄수민',
    age: 25,
    post_set: [],
    follower_set: ['jinokim98', 'jane', 'chris'],
    following_set: ['jinokim98', 'Isabella'],
  },
]
