export interface NotificationData {
  actor: string
  actorProfile: string
  noticeType: string
  noticeDesc: string
  postImage: string
}

export const notificationDummy: NotificationData[] = [
  {
    actor: 'jane',
    actorProfile:
      'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
    noticeType: 'post',
    noticeDesc: `좋아요를 눌렀습니다.`,
    postImage:
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201905/19/dfad7f3c-22aa-4d78-973a-f0c65e97fd7e.jpg',
  },
  {
    actor: 'Isabella',
    actorProfile:
      'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    noticeType: 'post',
    noticeDesc: `댓글을 남겼습니다.`,
    postImage:
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201905/19/dfad7f3c-22aa-4d78-973a-f0c65e97fd7e.jpg',
  },
  {
    actor: 'Scarlett',
    actorProfile:
      'https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg',
    noticeType: 'story',
    noticeDesc: `좋아요를 눌렀습니다.`,
    postImage: '/img/p2-1.jpg',
  },
  {
    actor: 'jane',
    actorProfile:
      'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
    noticeType: 'story',
    noticeDesc: `좋아요를 눌렀습니다.`,
    postImage: '/img/p5-1.jpg',
  },
  {
    actor: 'Mia',
    actorProfile:
      'https://cdn.pixabay.com/photo/2016/07/11/15/43/woman-1509956_1280.jpg',
    noticeType: 'story',
    noticeDesc: `좋아요를 눌렀습니다.`,
    postImage: '/img/p5-1.jpg',
  },
  {
    actor: 'jane',
    actorProfile:
      'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
    noticeType: 'story',
    noticeDesc: `좋아요를 눌렀습니다.`,
    postImage: '/img/p9-1.jpg',
  },
]
