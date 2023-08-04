export interface UserData {
  name: string
  nickname: string
  introduction: string
  profile: string
  postNum: number
  followerList: string[]
  followList: string[]
}

export const userDemo: UserData[] = [
  {
    name: '김진호',
    nickname: 'jinokim98',
    introduction: `김진호
홍익대학교 경영학과`,
    profile: 'https://avatars.githubusercontent.com/u/81083461?v=4',
    postNum: 25,
    followerList: ['jane', 'soomineom'],
    followList: ['Isabella'],
  },
  {
    name: '제인',
    nickname: 'jane',
    introduction: 'my name is jane',
    profile:
      'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
    postNum: 20,
    followerList: ['jinokim98, chris'],
    followList: [],
  },
  {
    name: '데모1',
    nickname: 'Isabella',
    introduction: 'my name is Isabella',
    profile:
      'https://cdn.pixabay.com/photo/2016/11/29/11/24/woman-1869158_1280.jpg',
    postNum: 20,
    followerList: ['jinokim98'],
    followList: [],
  },
  {
    name: '데모2',
    nickname: 'chris',
    introduction: 'my name is chris',
    profile:
      'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    postNum: 30,
    followerList: ['soomineom', 'jane'],
    followList: ['jinokim98'],
  },
  {
    name: '엄수민',
    nickname: 'soomineom',
    introduction: 'my name is soomineom',
    profile:
      'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    postNum: 20,
    followerList: ['jinokim98', 'jane', 'chris'],
    followList: ['jinokim98', 'Isabella'],
  },
]
