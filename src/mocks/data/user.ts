import { type UserData } from './../../types/userType'

export const userDemo: UserData[] = [
  {
    name: '김진호',
    uname: 'jinokim98',
    introduction: `김진호
홍익대학교 경영학과`,
    image: 'https://avatars.githubusercontent.com/u/81083461?v=4',
    postNum: 25,
    followerList: ['jane', 'soomineom'],
    followList: ['Isabella'],
  },
  {
    name: '제인',
    uname: 'jane',
    introduction: 'my name is jane',
    image:
      'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
    postNum: 20,
    followerList: ['jinokim98, chris'],
    followList: [],
  },
  {
    name: '데모1',
    uname: 'Isabella',
    introduction: 'my name is Isabella',
    image:
      'https://cdn.pixabay.com/photo/2016/11/29/11/24/woman-1869158_1280.jpg',
    postNum: 20,
    followerList: ['jinokim98'],
    followList: [],
  },
  {
    name: '데모2',
    uname: 'chris',
    introduction: 'my name is chris',
    image:
      'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    postNum: 30,
    followerList: ['soomineom', 'jane'],
    followList: ['jinokim98'],
  },
  {
    name: '엄수민',
    uname: 'soomineom',
    introduction: 'my name is soomineom',
    image:
      'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    postNum: 20,
    followerList: ['jinokim98', 'jane', 'chris'],
    followList: ['jinokim98', 'Isabella'],
  },
]
