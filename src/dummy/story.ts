export interface UserStoryInfoByClass {
  first: StoryGroupItems[]
  second: StoryGroupItems[]
  third: StoryGroupItems[]
  fourth: StoryGroupItems[]
}

export interface StoryGroupItems {
  profileImage: string
  nickname: string
  isRead: boolean
  storyImages: string[]
}

export const UserStoryInfoByclasses: UserStoryInfoByClass = {
  first: [
    {
      profileImage:
        'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
      nickname: 'jane',
      isRead: false,
      storyImages: ['/img/p1-1.jpg', '/img/p1-2.jpg'],
    },
    {
      profileImage:
        'https://cdn.pixabay.com/photo/2016/11/29/11/24/woman-1869158_1280.jpg',
      nickname: 'Isabella',
      isRead: false,
      storyImages: ['/img/p2-1.jpg'],
    },
    {
      profileImage:
        'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
      nickname: 'chris',
      isRead: false,
      storyImages: ['/img/p3-1.jpg', '/img/p3-2.jpg', '/img/p3-3.jpg'],
    },
  ],
  second: [
    {
      profileImage:
        'https://cdn.pixabay.com/photo/2018/04/03/20/26/woman-3287956_1280.jpg',
      nickname: 'Emma',
      isRead: true,
      storyImages: ['/img/p4-1.jpg', '/img/p4-2.jpg'],
    },
    {
      profileImage:
        'https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_1280.jpg',
      nickname: 'Evelyn',
      isRead: false,
      storyImages: ['/img/p5-1.jpg'],
    },
    {
      profileImage:
        'https://cdn.pixabay.com/photo/2015/07/09/00/29/woman-837156_1280.jpg',
      nickname: 'Elizabeth',
      isRead: false,
      storyImages: ['/img/p6-1.jpg'],
    },
  ],
  third: [
    {
      profileImage:
        'https://cdn.pixabay.com/photo/2016/11/29/03/36/woman-1867093_1280.jpg',
      nickname: 'Grace',
      isRead: true,
      storyImages: ['/img/p7-1.jpg'],
    },
    {
      profileImage:
        'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg',
      nickname: 'Lucas',
      isRead: true,
      storyImages: ['/img/p8-1.jpg'],
    },
  ],
  fourth: [
    {
      profileImage:
        'https://cdn.pixabay.com/photo/2016/11/29/01/34/man-1866574_1280.jpg',
      nickname: 'Henry',
      isRead: true,
      storyImages: ['/img/p9-1.jpg'],
    },
    {
      profileImage:
        'https://cdn.pixabay.com/photo/2015/03/03/18/58/woman-657753_1280.jpg',
      nickname: 'Evelyn',
      isRead: true,
      storyImages: ['/img/p10-1.jpg', '/img/p10-2.jpg'],
    },
  ],
}
