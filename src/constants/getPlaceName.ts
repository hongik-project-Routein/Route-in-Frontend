const getPlaceName = async (lat: number, lng: number): Promise<void> => {
  try {
    const geocoder = new kakao.maps.services.Geocoder()
    const callback = (result: any, status: any): void => {
      if (status === kakao.maps.services.Status.OK) {
        console.log(result[0])
      }
    }
    geocoder.coord2Address(lng, lat, callback)
  } catch (error) {
    console.log(error)
  }
}

export default getPlaceName
