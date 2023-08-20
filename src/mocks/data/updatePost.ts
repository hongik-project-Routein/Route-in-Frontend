import { type UpdatePost } from '../../types/postTypes'

export const updatedPost: UpdatePost = {
  content: `#집밥김치찌개
김치찌개가 맛있는 집, 맛도 맛있고 앞에 벛꽃이 너무 예쁘게 펴서

#데코아발림
디져트도 맛있고 분위기도 좋은 집

#망원한강공원
오늘은 날씨가 좋아 공원에 나와서 친구들과 피크닉을 즐겼다.

#공원_피크닉
너무 기분이 좋았다`,
  pins: [
    {
      image: '/img/post/post1-1.jpg',
      pin_hashtag: '#집밥김치찌개',
      content: '김치찌개가 맛있는 집, 맛도 맛있고 앞에 벛꽃이 너무 예쁘게 펴서',
      latitude: 0,
      longitude: 0,
    },
    {
      image: '/img/post/post1-2.jpg',
      pin_hashtag: '#데코아발림',
      content: '디져트도 맛있고 분위기도 좋은 집',
      latitude: 0,
      longitude: 0,
    },
    {
      image: '/img/post/post1-3.jpg',
      pin_hashtag: '#망원한강공원',
      content: '오늘은 날씨가 좋아 공원에 나와서 친구들과 피크닉을 즐겼다.',
      latitude: 0,
      longitude: 0,
    },
  ],
}
