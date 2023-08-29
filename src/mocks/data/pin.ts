import { type SearchPinType } from '../../types/postTypes'

export const pinDemo: SearchPinType[] = [
  {
    profile:
      'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
    writer: 'jinokim98',
    pin: {
      image: '/img/post/post1-1.jpg',
      latitude: 37.54914805206545,
      longitude: 126.92203012459908,
    },
    postId: 1,
    like_users: ['soomineom'],
    like_status: false,
    bookmark: false,
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
    writer: 'jinokim98',
    pin: {
      image: '/img/post/post1-2.jpg',
      latitude: 37.5484216771677,
      longitude: 126.921772870235,
    },
    postId: 1,
    like_users: ['soomineom'],
    like_status: false,
    bookmark: false,
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
    writer: 'jinokim98',
    pin: {
      image: '/img/post/post1-3.jpg',
      latitude: 37.5517245459018,
      longitude: 126.900027640945,
    },
    postId: 1,
    like_users: ['soomineom'],
    like_status: false,
    bookmark: false,
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    writer: 'chris',
    pin: {
      image: '/img/post/post3-1.jpg',
      latitude: 35.1585232170784,
      longitude: 129.159854668484,
    },
    postId: 3,
    like_users: ['soomineom', 'jinokim98'],
    like_status: true,
    bookmark: true,
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    writer: 'chris',
    pin: {
      image: '/img/post/post3-2.jpg',
      latitude: 35.1610973199815,
      longitude: 129.160638198785,
    },
    postId: 3,
    like_users: ['soomineom', 'jinokim98'],
    like_status: true,
    bookmark: true,
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2016/12/19/21/36/woman-1919143_1280.jpg',
    writer: 'Sophia',
    pin: {
      image: '/img/post/post5-2.jpg',
      latitude: 37.550874837441,
      longitude: 126.925554591431,
    },
    postId: 5,
    like_users: ['soomineom', 'jinokim98'],
    like_status: true,
    bookmark: false,
  },
]
