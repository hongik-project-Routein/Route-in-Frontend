export interface PostCardData {
  profile: string
  writer: string
  direction: number
  heartCount: number
  postId: string
  postImage: string
  postText: string
}

export const postDemo: PostCardData[] = [
  {
    profile:
      'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
    writer: 'jane',
    direction: 10,
    heartCount: 40,
    postId: '1',
    postImage: '/img/post1.jpg',
    postText: `
    #망원한강공원
    오늘은 날씨가 좋아 공원에 나와서 친구들과 피크닉을 즐겼다.

    #공원_피크닉
    너무 기분이 좋았다
    `,
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2016/11/29/11/24/woman-1869158_1280.jpg',
    writer: 'Isabella',
    direction: 25,
    heartCount: 400,
    postId: '2',
    postImage: '/img/post2.jpg',
    postText: `
    #청계천
    서울에 놀러와서 가장 놀라웠던 곳이었다.
    #청계천_야경
    야경이 너무 이뻐서 놀랐다.
    `,
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    writer: 'chris',
    direction: 5,
    heartCount: 700,
    postId: '3',
    postImage: '/img/post3.jpg',
    postText: `
    #해운대해수욕장
    부산에 오면 항상 나는 해운대 해수욕장에 간다. 바다와 도시가 공존하는 느낌이 너무 새롭다.
    #부산 #부산_해운대 #부산_야경명소
    야경이 너무 이뻐서 놀랐다. 밤바다는 너무 좋은 것 같다
    다음에 또 놀러와야지
    `,
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2016/07/11/15/43/woman-1509956_1280.jpg',
    writer: 'Mia',
    direction: 120,
    heartCount: 700,
    postId: '4',
    postImage: '/img/post4.jpg',
    postText: `
    #잠실야구장
    오늘은 LG를 응원하러 오랜만에 직관을 왔다.
    #LG #무적LG #치킨
    직관와선 치킨이 최고지, 하지만 경기는 져버렸다...ㅜ
    그래도 열심히 응원해서 그런가 기분은 최고였다.
    `,
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2016/12/19/21/36/woman-1919143_1280.jpg',
    writer: 'Sophia',
    direction: 452,
    heartCount: 167,
    postId: '5',
    postImage: '/img/post5.jpg',
    postText: `
    #홍익대학교 서울캠퍼스
    역시 홍대 축제는 너무 재밌어. 다음에 또 와야지
    #홍대 #홍대축제
    `,
  },
  {
    profile:
      'https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg',
    writer: 'Scarlett',
    direction: 56,
    heartCount: 316,
    postId: '6',
    postImage: '/img/post6.jpg',
    postText: `
    #BBQ치킨_홍대점
    오늘은 치맥이 너무 땡겨서 먹었다. 역시 치맥은 행복해
    `,
  },
]
