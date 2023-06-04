import {
  type PostSendToBackType,
  type PostSendToBackend,
} from '../../types/postTypes'

export function coordinatePostSendType(
  pins: PostSendToBackend
): PostSendToBackType {
  return {
    content: pins.text,
    pins: pins.pins.map((pin) => {
      console.log(pin.picture)

      return {
        image: pin.picture,
        pin_hashtag: pin.hashtagAuto.hashtagAuto,
        content: pin.hashtagAuto.text,
        latitude: pin.LatLng.lat,
        longitude: pin.LatLng.lng,
        mapID: String(pin.placeId),
      }
    }),
  }
}
