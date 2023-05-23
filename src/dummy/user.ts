export interface UserData {
  nickname: string
  introduction: string
  profile: string
  postNum: number
  followerNum: number
  followNum: number
}

export const userDemo: UserData[] = [
  {
    nickname: 'jane',
    introduction: 'my name is jane',
    profile:
      'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
    postNum: 20,
    followerNum: 300,
    followNum: 500,
  },
  {
    nickname: 'Isabella',
    introduction: 'my name is Isabella',
    profile:
      'https://cdn.pixabay.com/photo/2016/11/29/11/24/woman-1869158_1280.jpg',
    postNum: 20,
    followerNum: 120,
    followNum: 100,
  },
  {
    nickname: 'chris',
    introduction: 'my name is chris',
    profile:
      'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    postNum: 30,
    followerNum: 140,
    followNum: 174,
  },
  {
    nickname: 'Isabella',
    introduction: 'my name is Isabella',
    profile:
      'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    postNum: 20,
    followerNum: 120,
    followNum: 100,
  },
  {
    nickname: 'Isabella',
    introduction: 'my name is Isabella',
    profile:
      'https://cdn.pixabay.com/photo/2016/11/29/11/24/woman-1869158_1280.jpg',
    postNum: 20,
    followerNum: 120,
    followNum: 100,
  },
]
