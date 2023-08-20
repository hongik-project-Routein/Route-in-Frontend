import { type SendPostCoordinate, type PostSendToBackend } from './postTypes'

export function coordinatePostSendType(
  pins: PostSendToBackend
): SendPostCoordinate {
  return {
    content: pins.content,
    pins: pins.pins.map((pin) => {
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
