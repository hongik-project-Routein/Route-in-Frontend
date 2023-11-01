import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import theme from '../../styles/Theme'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import PostModal from '../../components/popup/PostModal'
import { type Pin, type HashtagAutoAndText } from '../../types/postTypes'
import usePost from '../../recoil/hooks/usePost'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/util/loading'
import { getTagList, tagProcess } from '../../components/function/tag'

export default function CreatePostCheck(): JSX.Element {
  const [hashtagAutoText, setHashtagAutoText] = useState<
    HashtagAutoAndText[] | []
  >([])
  const [restHashtag, setRestHashtag] = useState<string[] | []>([])
  const [text, setText] = useState<string>('')
  const [holeText, setHoleText] = useState<string>('')
  const [userTags, setUserTags] = useState<string[]>([])

  const [points, setPoints] = useState<kakao.maps.LatLng[]>([])
  const [map, setMap] = useState<kakao.maps.Map>()
  const [index, setIndex] = useState<number>(-1)

  const [loading, setLoading] = useState<boolean>(false)

  const { pins, imgUrls, hashtagAndText, savePost } = usePost()

  const [, setCarouselOpen] = useState<boolean[]>(
    Array(pins.length).fill(false)
  )

  const navigate = useNavigate()

  const loadText = (): void => {
    // 자동 해시태그
    setHashtagAutoText(
      pins.map((pin: Pin) => {
        return pin.hashtagAuto
      })
    )

    // 추가로 만든 해시태그
    setRestHashtag(hashtagAndText.hashtag)

    // 해시태그를 뺀 나머지
    const removeHashtag: string = hashtagAndText.text.replace(/#\w+\s?/g, '')
    setText(removeHashtag)

    // 모든 문자열 저장 => 백엔드에 보내지는 텍스트
    const hashtagAutoText: string[] = pins.map((pin: Pin) => {
      return `${pin.hashtagAuto.hashtagAuto}\n${pin.hashtagAuto.text}\n\n`
    })

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const returnText: string = hashtagAutoText.join(' ') + hashtagAndText.text
    setHoleText(returnText)
  }

  // 본문 읽어오기
  useEffect(() => {
    loadText()
  }, [])

  useEffect(() => {
    setUserTags(getTagList(tagProcess(holeText)))
  }, [holeText])

  const sendPost = async (): Promise<void> => {
    try {
      setLoading(true)
      const result = await savePost({
        pins,
        content: holeText,
        tagged_users: userTags,
      })

      if (result) {
        setLoading(false)
        navigate('/')
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const calculateCenter = (map: kakao.maps.Map): void => {
    if (pins.length > 0) {
      const bounds = new kakao.maps.LatLngBounds()
      const newPoint: kakao.maps.LatLng[] = []

      pins.forEach((pin: Pin) => {
        const { lat, lng } = pin.LatLng
        const point = new kakao.maps.LatLng(lat, lng)
        bounds.extend(point)
        newPoint.push(point)
      })

      setPoints(newPoint)
      map.setBounds(bounds)

      const polyline = new kakao.maps.Polyline({
        path: newPoint,
        strokeWeight: 5,
        strokeColor: 'red',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
      })

      polyline.setMap(map)
    }
  }

  const changeIndex = (idx: number): void => {
    setIndex(idx)
    setCarouselOpen((prev) =>
      prev.map((open, index) => (idx === index ? !open : open))
    )
  }

  useEffect(() => {
    if (map === undefined) return
    calculateCenter(map)
  }, [map])

  const mapContainerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {loading && <Loading />}
      <Title>게시글 확인</Title>
      <Paragraph>
        {`지도 위에 핀이 표시됩니다.
        지도 위에 핀을 누르면 선택한 사진이 나옵니다.`}
      </Paragraph>
      <GroupContainer>
        <LayerGroup>
          <KakaoMapContainer ref={mapContainerRef}>
            {pins.length > 0 && (
              <Map
                center={{
                  lat: pins[0].LatLng.lat,
                  lng: pins[0].LatLng.lng,
                }}
                style={{ width: '100%', height: '100%' }}
                onCreate={(map) => {
                  setMap(map)
                }}
              >
                {points.length > 0 && (
                  <>
                    {points.map((point, idx) => (
                      <MapMarker
                        key={`${point.getLat()}-${point.getLng()}`}
                        position={{ lat: point.getLat(), lng: point.getLng() }}
                        onClick={() => {
                          changeIndex(idx)
                        }}
                      />
                    ))}
                  </>
                )}
              </Map>
            )}
          </KakaoMapContainer>
          <ImageGroup active={index !== -1}>
            {pins.length > 0 && index !== -1 && (
              <PostModal
                postImage={<CarouselImage src={imgUrls[index]} />}
                setModalOpen={changeIndex}
              ></PostModal>
            )}
          </ImageGroup>
        </LayerGroup>
        <LocationGroup>
          <WriteSpace>
            <ProcessHashtagBlue
              hashtagAutoText={hashtagAutoText}
              restHashtag={restHashtag}
              text={text}
            />
          </WriteSpace>
        </LocationGroup>
      </GroupContainer>
      <ButtonContainer>
        <NextButton onClick={sendPost}>추가하기</NextButton>
      </ButtonContainer>
    </>
  )
}

interface ProcessHashtagBlueProps {
  hashtagAutoText: HashtagAutoAndText[] | []
  restHashtag: string[] | []
  text: string
}

function ProcessHashtagBlue(props: ProcessHashtagBlueProps): JSX.Element {
  const processHashtagAutoBlue = (): JSX.Element[] | undefined => {
    if (props.hashtagAutoText.length === 0) return undefined

    return props.hashtagAutoText.map((item, idx) => {
      return (
        <>
          <HashtagStyle
            key={`hashtagAuto${idx}`}
            style={{ color: `${theme.colors.primaryColor}` }}
          >
            {item.hashtagAuto}
          </HashtagStyle>
          <br />
          <TextStyle>{item.text}</TextStyle>
          <br />
          <br />
        </>
      )
    })
  }

  const parsing = props.text.split('\n')
  // 해시태그가 들어가있는 줄은 무조건 한 줄로 작성하세요..
  const processHashtagBlue = (parsing: string[]): JSX.Element[] => {
    return parsing.map((parse, index) => {
      if (parse.startsWith('#')) {
        const deleteBlank = parse.trim()

        return (
          <React.Fragment key={index}>
            <HashtagStyle style={{ color: `${theme.colors.primaryColor}` }}>
              {deleteBlank}
            </HashtagStyle>
            <br />
          </React.Fragment>
        )
      }
      return <div key={`nohashtag${index}`}>{parse}</div>
    })
  }

  return (
    <>
      {processHashtagAutoBlue()}
      {processHashtagBlue(parsing)}
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

// PictureGroup, LocationGroup을 묶어주는 컨테이너
const GroupContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`

const LayerGroup = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 350px;

  @media screen and (max-width: 480px) {
    width: 100%;
    margin-bottom: 20px;
  }
`

const KakaoMapContainer = styled.div`
  position: absolute;
  z-index: 0;
  top: 2%;
  left: 2%;
  width: 100%;
  height: 100%;
`

const ImageGroup = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  position: absolute;
  z-index: 1;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
`

const LocationGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const WriteSpace = styled.div`
  width: 380px;
  height: 350px;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  white-space: pre-line;

  overflow-x: hidden;
  overflow-y: scroll;

  @media screen and (max-width: 480px) {
    width: 100vw;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  margin: 30px 0;
`

const NextButton = styled.button`
  width: 100px;
  height: 35px;
  margin: auto;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  border-radius: 8px;
  font-size: 16px;
`

const CarouselImage = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
`

const HashtagStyle = styled.span`
  color: ${theme.colors.primaryColor};
`
const TextStyle = styled.span``
