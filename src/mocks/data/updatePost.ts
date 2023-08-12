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
      hashtagAuto: {
        hashtagAuto: '#집밥김치찌개',
        text: '김치찌개가 맛있는 집, 맛도 맛있고 앞에 벛꽃이 너무 예쁘게 펴서',
      },
      LatLng: { lat: 37.54914805206545, lng: 126.92203012459908 },
      placeId: 12131231,
    },
    {
      image: '/img/post/post1-2.jpg',
      hashtagAuto: {
        hashtagAuto: '#데코아발림',
        text: '디져트도 맛있고 분위기도 좋은 집',
      },
      LatLng: { lat: 37.5484216771677, lng: 126.921772870235 },
      placeId: 12131231,
    },
    {
      image: '/img/post/post1-3.jpg',
      hashtagAuto: {
        hashtagAuto: '#망원한강공원',
        text: '오늘은 날씨가 좋아 공원에 나와서 친구들과 피크닉을 즐겼다.',
      },
      LatLng: { lat: 37.5517245459018, lng: 126.900027640945 },
      placeId: 12131231,
    },
  ],
}
