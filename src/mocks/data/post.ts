import { type LoadPost } from '../../types/postTypes'

export const postDemo: LoadPost[] = [
  {
    post: {
      id: 1,
      writer: 'jane',
      content: `
      #집밥김치찌개
      김치찌개가 맛있는 집, 맛도 맛있고 앞에 벛꽃이 너무 예쁘게 펴서

      #데코아발림
      디져트도 맛있고 분위기도 좋은 집

      #망원한강공원
      오늘은 날씨가 좋아 공원에 나와서 친구들과 피크닉을 즐겼다.

      #공원_피크닉
      너무 기분이 좋았다
      `,
      pin_count: 3,
      like_count: 40,
      like_users: [''],
      is_liked: false,
      bookmark_users: [],
      comment_count: 3,
    },
    pin: [
      {
        image: '/img/post/post1-1.jpg',
        latitude: 37.54914805206545,
        longitude: 126.92203012459908,
      },
      {
        image: '/img/post/post1-2.jpg',
        latitude: 37.5484216771677,
        longitude: 126.921772870235,
      },
      {
        image: '/img/post/post1-3.jpg',
        latitude: 37.5517245459018,
        longitude: 126.900027640945,
      },
    ],
    user: {
      image:
        'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
    },
    comment: [
      {
        id: 1,
        updated_at: '1',
        post: 1,
        writer: 'jinokim98',
        content: '안녕하세요 여러분',
        like_count: 2,
        like_status: true,
      },
      {
        id: 2,
        updated_at: '1',
        post: 1,
        writer: 'soomineom',
        content: '안녕하세요',
        like_count: 1,
        like_status: false,
      },
    ],
  },
  {
    post: {
      id: 2,
      writer: 'Isabella',
      content: `
      #청계천
      서울에 놀러와서 가장 놀라웠던 곳이었다.
      #청계천_야경
      야경이 너무 이뻐서 놀랐다.
      `,
      pin_count: 2,
      like_count: 400,
      like_users: [''],
      is_liked: false,
      bookmark_users: [],
      comment_count: 3,
    },
    pin: [
      {
        image: '/img/post/post2-1.jpg',
        latitude: 37.5691469686793,
        longitude: 126.978647068151,
      },
      {
        image: '/img/post/post2-2.jpg',
        latitude: 37.5116212351376,
        longitude: 127.105899949393,
      },
    ],
    user: {
      image:
        'https://cdn.pixabay.com/photo/2016/11/29/11/24/woman-1869158_1280.jpg',
    },
    comment: [],
  },
  {
    post: {
      id: 3,
      writer: 'chris',
      content: `
      #해운대해수욕장
      부산에 오면 항상 나는 해운대 해수욕장에 간다. 바다와 도시가 공존하는 느낌이 너무 새롭다.

      #개미집_국제시장본점직영점
      부산에 오면 항상 먹는 낙곱새 전문점, 항상 맛있다.

      #광안대교
      광안대교를 드라이브하는 낭만

      #부산 #부산_해운대 #부산_야경명소
      야경이 너무 이뻐서 놀랐다. 밤바다는 너무 좋은 것 같다
      다음에 또 놀러와야지
      `,
      pin_count: 3,
      like_count: 700,
      like_users: [''],
      is_liked: false,
      bookmark_users: [],
      comment_count: 3,
    },
    pin: [
      {
        image: '/img/post/post3-1.jpg',
        latitude: 35.1585232170784,
        longitude: 129.159854668484,
      },
      {
        image: '/img/post/post3-2.jpg',
        latitude: 35.1610973199815,
        longitude: 129.160638198785,
      },
      {
        image: '/img/post/post3-3.jpg',
        latitude: 35.1366914246094,
        longitude: 129.116911501501,
      },
    ],
    user: {
      image:
        'https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg',
    },
    comment: [],
  },
  {
    post: {
      id: 4,
      writer: 'Mia',
      content: `
      #잠실야구장
      오늘은 LG를 응원하러 오랜만에 직관을 왔다.

      #고척스카이돔
      오늘은 두산을 응원하러 친구와 직관

      #야구장투어 #치킨
      직관와선 치킨이 최고지, 하지만 경기는 져버렸다...ㅜ
      그래도 열심히 응원해서 그런가 기분은 최고였다.
      `,
      pin_count: 2,
      like_count: 700,
      like_users: [''],
      is_liked: false,
      bookmark_users: [],
      comment_count: 3,
    },
    pin: [
      {
        image: '/img/post/post4-1.jpg',
        latitude: 37.5121513808403,
        longitude: 127.071909507224,
      },
      {
        image: '/img/post/post4-2.jpg',
        latitude: 37.4982338495579,
        longitude: 126.867104761712,
      },
    ],
    user: {
      image:
        'https://cdn.pixabay.com/photo/2016/07/11/15/43/woman-1509956_1280.jpg',
    },
    comment: [],
  },
  {
    post: {
      id: 5,
      writer: 'Sophia',
      content: `
      #연세대학교
      연대는 정말 넓고 예쁘다.
  
      #홍익대학교_서울캠퍼스
      역시 홍대 축제는 너무 재밌어. 다음에 또 와야지
  
      #홍대 #홍대축제 #대학교캠퍼스투어
      `,
      pin_count: 2,
      like_count: 167,
      like_users: [''],
      is_liked: false,
      bookmark_users: [],
      comment_count: 3,
    },
    pin: [
      {
        image: '/img/post/post5-1.jpg',
        latitude: 37.564332600526484,
        longitude: 126.93893346118793,
      },
      {
        image: '/img/post/post5-2.jpg',
        latitude: 37.550874837441,
        longitude: 126.925554591431,
      },
    ],
    user: {
      image:
        'https://cdn.pixabay.com/photo/2016/12/19/21/36/woman-1919143_1280.jpg',
    },
    comment: [],
  },
  {
    post: {
      id: 6,
      writer: 'Scarlett',
      content: `
      #나들목치킨호프
      상수 나들목에서 다같이 회식했다~

      #비스트로큐슈
      카레가 맛있는 맛집

      #아웃닭_홍대점
      친구들이랑 같이 아웃닭에서 치킨 먹으면 행복해

      #홍대 #홍대맛집투어
      `,
      pin_count: 3,
      like_count: 316,
      like_users: [''],
      is_liked: false,
      bookmark_users: [],
      comment_count: 3,
    },
    pin: [
      {
        image: '/img/post/post6-1.jpg',
        latitude: 37.5474996011204,
        longitude: 126.922602174659,
      },
      {
        image: '/img/post/post6-2.jpg',
        latitude: 37.55439862735584,
        longitude: 126.92995120390839,
      },
      {
        image: '/img/post/post6-3.jpg',
        latitude: 37.5500868019196,
        longitude: 126.92189334846,
      },
    ],
    user: {
      image:
        'https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg',
    },
    comment: [],
  },
]
