import {
  type LoadPostFromBackMain,
  type LoadPostDetail,
  type LoadPostFromBack,
  type LoadPostMainPage,
} from '../../types/postTypes'

export function coordinatePostDetailType(
  post: LoadPostFromBack
): LoadPostDetail {
  return {
    postId: String(post.post.id),
    writer: post.post.writer,
    profile: post.user.image,
    postText: post.post.content,

    pinCount: post.pin.length,
    pinImage: post.pin.map((pin) => {
      return pin.image
    }),
    latLng: post.pin.map((pin) => {
      return { lat: pin.latitude, lng: pin.longitude }
    }),

    direction: 10,
    likeUsers: post.post.like_count,
    bookMarkUsers: post.post.bookmark_users.length,
    taggedUsers: 1,

    commentCount: post.comment.length,
    comment: post.comment.map((comment) => {
      return {
        id: String(comment.id),
        image: 'null',
        commentWriter: comment.writer,
        comment: comment.content,
        tagged_users: ['name'],
        time: 60, // 나중에 날짜 처리
        heartCount: comment.like_count,
        isHeartButtonClick: false,
      }
    }),
  }
}

export function coordinatePostType(
  posts: LoadPostFromBackMain[]
): LoadPostMainPage[] {
  return posts.map((post) => {
    return {
      postId: String(post.id),
      writer: post.writer,
      profile: post.user.image,
      postText: post.content,

      pinCount: post.pin_count,
      pinImage: post.pin.map((pin) => {
        return pin.image
      }),
      latLng: post.pin.map((pin) => {
        return { lat: pin.latitude, lng: pin.longitude }
      }),
      likeUsers: post.like_count,
      bookmark: false,

      commentCount: post.comment_count,
    }
  })
}
