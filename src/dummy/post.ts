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
    postImage:
      'https://img.hani.co.kr/imgdb/resize/2022/0520/165294067468_20220520.JPG',
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
    postImage:
      'https://youimg1.tripcdn.com/target/0102d1200089h4dx12043_D_560_420.jpg',
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
    postImage:
      'https://a.cdn-hotels.com/gdcs/production138/d281/dd8a2f93-672e-4e2e-a5c7-2fa7f795fc65.jpg',
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
    postImage:
      'https://mblogthumb-phinf.pstatic.net/20130905_243/sense_ssun_1378360100823Bzqkj_JPEG/1378360098714_20130904_193108.jpg?type=w2',
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
    postImage:
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201905/19/dfad7f3c-22aa-4d78-973a-f0c65e97fd7e.jpg',
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
    postImage:
      'https://d12zq4w4guyljn.cloudfront.net/750_750_20210222025830858_photo_c10fa390751e.jpg',
    postText: `
    #BBQ치킨_홍대점
    오늘은 치맥이 너무 땡겨서 먹었다. 역시 치맥은 행복해
    `,
  },
]
