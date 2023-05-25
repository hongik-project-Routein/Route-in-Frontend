import React, { useState, useEffect, type ChangeEvent } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { Link } from 'react-router-dom'
import CarouselSelectPicture from './../../components/carouselSelectPicture'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { EnrollImages } from '../../modules/post'
import { gps } from 'exifr'
import { type Post } from '../../types/postTypes'
import ImageEditor from '../../components/imageEditor'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

interface GPSInfo {
  latitude: number
  longitude: number
}

interface SelectPictureProps {
  mapApi: boolean
  mapApiKey: string
}

export default function SelectPicture(props: SelectPictureProps): JSX.Element {
  const { kakao } = window
  const [selectedFiles, setSelectedFiles] = useState<File[] | undefined>(
    undefined
  )
  // 최적화 필요
  const [imageList, setImageList] = useState<Post[]>([])
  const [imageUrls, setImageUrls] = useState<string[] | undefined>(undefined)
  const [imgTagList, setImgTagList] = useState<JSX.Element[]>()
  const [imgGPSInfoList, setImgGPSInfoList] = useState<GPSInfo[] | []>([])
  const [addresses, setAddresses] = useState<string[] | []>([])
  const [carouselIndex, setCarouselIndex] = useState<number>(0)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const dispatch = useDispatch()

  const fileSelectedHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = event.target.files
    if (files != null) {
      const newUrls: string[] = []
      const newFiles: File[] = []
      const newGPSInfo: GPSInfo[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const newUrl = await readUrl(file)
        const exifTags = await readExifTags(file)
        newFiles.push(file)
        newUrls.push(newUrl)

        // 위치정보가 없으면 위도 경도를 -1로 넣는다.
        exifTags !== undefined
          ? newGPSInfo.push(exifTags)
          : newGPSInfo.push({
              latitude: NaN,
              longitude: NaN,
            })
      }
      setSelectedFiles(newFiles)
      setImageUrls(newUrls)
      setImgGPSInfoList(newGPSInfo)
    }
  }
  const readUrl = async (file: File): Promise<string> => {
    return await new Promise<string>((resolve) => {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        const url = fileReader.result?.toString() ?? ''
        resolve(url)
      }
      fileReader.readAsDataURL(file)
    })
  }

  const readExifTags = async (file: File): Promise<GPSInfo | undefined> => {
    try {
      const exifData = await gps(file)
      if (exifData.latitude !== null && exifData.longitude !== null) {
        return { latitude: exifData.latitude, longitude: exifData.longitude }
      }
    } catch (error) {
      console.error('Error extracting location from image:', error)
    }
    return undefined
  }

  const runImageEditor = (): void => {
    setModalOpen(true)
  }

  // url이 변경됐을 때만 실행 => 사진을 넣을 때만 실행되길 원함
  useEffect(() => {
    const newImgTagList: JSX.Element[] = []
    const newPosts: Post[] = []
    const newAddressList: string[] = []
    const fileLength = selectedFiles?.length

    const processImages = async (): Promise<void> => {
      if (
        selectedFiles !== undefined &&
        fileLength !== undefined &&
        imageUrls !== undefined
      ) {
        for (let i = 0; i < fileLength; i++) {
          const imgTag = (
            <CarouselImageProps key={i} src={imageUrls[i]} alt="img" />
          )
          const address = await getPlacesName(imgGPSInfoList[i])
          console.log(address)

          newPosts.push({
            picture: selectedFiles[i],
            // hashtagAuto: { hashtagAuto: `#${address}`, text: '' },
            hashtagAuto: { hashtagAuto: `#${dummyData[i]}`, text: '' },
            tag: imgTag,
            LatLng: {
              lat: imgGPSInfoList[i].latitude,
              lng: imgGPSInfoList[i].longitude,
            },
          })
          newImgTagList.push(imgTag)
          newAddressList.push(address)
        }
        setImgTagList(newImgTagList)
        setImageList(newPosts)
        setAddresses(newAddressList)
        dispatch(EnrollImages(newPosts))
      }
    }

    processImages().catch((error) => {
      console.log(error)
    })
  }, [imageUrls])

  const getPlacesName = async (place: GPSInfo): Promise<string> => {
    try {
      const geocoder = new kakao.maps.services.Geocoder()
      const coord = new kakao.maps.LatLng(place.latitude, place.longitude)

      const callback = (result: any, status: any): any => {
        console.log(status)

        if (status === kakao.maps.services.Status.OK) {
          console.log(result)
          return result
        }
      }

      geocoder.coord2Address(coord.getLat(), coord.getLng(), callback)
    } catch (error) {
      console.log(error)
      return ''
    }
    return ''
  }

  const dummyData = ['김포국제공항', '제주공항', '동현식당', '스누피가든']

  // test용 Effect
  useEffect(() => {
    console.log(imageList)
  }, [imageList])
  return (
    <>
      <Title>사진 선택</Title>
      <Paragraph>
        {`업로드하고 싶은 사진을 아래 공간에 드래그 앤 드랍하세요
        사진 메타정보를 통해 자동으로 장소를 인식합니다.`}
      </Paragraph>
      <GroupContainer>
        <PictureGroup>
          <InputImageContainer>
            {imgTagList != null ? (
              <CarouselSelectPicture
                items={imgTagList}
                setCarouselIndex={setCarouselIndex}
              />
            ) : (
              <>
                <InputLabel htmlFor="file">
                  <ImageIcon>
                    <FontAwesomeIcon icon={faImage} />
                  </ImageIcon>
                  <ImageIconDesc>이미지 추가</ImageIconDesc>
                </InputLabel>
                <InputPicture
                  id="file"
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={(event) => {
                    fileSelectedHandler(event).catch((error) => {
                      console.log(error)
                    })
                  }}
                  multiple
                />
              </>
            )}
          </InputImageContainer>
          <EditPictureButton
            active={imgTagList !== undefined}
            onClick={runImageEditor}
          >
            사진편집
          </EditPictureButton>
          {modalOpen && <ImageEditor setModalOpen={setModalOpen} />}
        </PictureGroup>
        <LocationGroup>
          <CarouselContainer>
            {imgGPSInfoList.length > 0 ? (
              <Map
                center={{
                  lat: imgGPSInfoList[carouselIndex].latitude,
                  lng: imgGPSInfoList[carouselIndex].longitude,
                }}
                style={{ width: '100%', height: '100%' }}
              >
                <MapMarker
                  position={{
                    lat: imgGPSInfoList[carouselIndex].latitude,
                    lng: imgGPSInfoList[carouselIndex].longitude,
                  }}
                ></MapMarker>
              </Map>
            ) : null}
          </CarouselContainer>
          <LocationName>
            {addresses.length > 0 ? `#${dummyData[carouselIndex]}` : ' '}
          </LocationName>
          <LocationAddress>
            {addresses.length > 0
              ? addresses[carouselIndex]
              : '사진을 입력하세요'}
          </LocationAddress>
        </LocationGroup>
      </GroupContainer>
      <ButtonContainer>
        <Blank />
        <NextButtonLink to="/post/create/text">
          <NextButton>{`다음으로`}</NextButton>
        </NextButtonLink>
        <Blank />
      </ButtonContainer>
    </>
  )
}

const Title = styled.h1`
  color: ${theme.colors.primaryColor};
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 30px;
`
const Paragraph = styled.p`
  font-size: 14px;
  line-height: 24px;
  white-space: pre-line;
  text-align: center;
`
const CarouselContainer = styled.div`
  width: 350px;
  height: 350px;
  margin-bottom: 30px;
  background-color: #d9d9d9;
  border-radius: 10px;
`

const InputImageContainer = styled.div``

const InputPicture = styled.input`
  display: none;
  width: 350px;
  height: 350px;
`

const InputLabel = styled.label`
  display: inline-block;
  width: 350px;
  height: 350px;
  margin-bottom: 30px;
  background-color: #d9d9d9;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    color: ${theme.colors.primaryColor};
  }
`

const ImageIcon = styled.div`
  margin-top: 120px;
  font-size: 60px;
  text-align: center;
`

const ImageIconDesc = styled.div`
  margin-top: 20px;
  font-size: 25px;
  text-align: center;
`

const CarouselImageProps = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
`

// PictureGroup, LocationGroup을 묶어주는 컨테이너
const GroupContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`

const PictureGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const EditPictureButton = styled.button<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  width: 100px;
  height: 35px;
  background-color: ${theme.secondaryColors.secondary};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`

const LocationGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LocationName = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 800;
`
const LocationAddress = styled.p`
  color: #475467;
`

const ButtonContainer = styled.div`
  display: flex;
  margin: 30px 0;
`

const Blank = styled.div``

const NextButtonLink = styled(Link)`
  margin: auto;
`
const NextButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`
