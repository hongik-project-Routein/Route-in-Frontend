import React, { useState } from 'react'
import styled from 'styled-components'
import DummyPin from './dummyPin'
import { useForm } from 'react-hook-form'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import Loading from '../util/loading'

export interface IDataForm {
  content: string
  pins: IPinForm[]
}

export interface IPinForm {
  image: FileList
  pin_hashtag: string
  content: string
  latitude: number
  longitude: number
  mapID: string
}

function DummyData(): JSX.Element {
  const { loadUserInfo } = useUser()
  const accessToken = loadUserInfo().accessToken
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit, reset, setValue } = useForm<IDataForm>()

  const onSubmit = async (data: IDataForm): Promise<void> => {
    console.log(data)

    const formData = new FormData()
    formData.append('content', data.content)

    // 파일을 보낼 때는 폼데이터로 보내야한다.
    data.pins.forEach((pin, index) => {
      formData.append(`pins[${index}]image`, pin.image[0], pin.image[0].name) // File 객체를 직접 추가
      formData.append(`pins[${index}]pin_hashtag`, pin.pin_hashtag)
      formData.append(`pins[${index}]content`, pin.content)
      formData.append(`pins[${index}]latitude`, pin.latitude.toString())
      formData.append(`pins[${index}]longitude`, pin.longitude.toString())
      formData.append(`pins[${index}]mapID`, pin.mapID)
    })

    try {
      setLoading(true)
      await request('post', `/api/post/create/`, formData, {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      })
      reset()
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }
  const [pinCount, setPinCount] = useState<number>(1)

  const handlePinCount = (event: React.FormEvent<HTMLInputElement>): void => {
    setPinCount(+event.currentTarget.value)
  }

  const handlePinInput = (): JSX.Element[] => {
    const pin = []
    for (let i = 0; i < pinCount; i++) {
      pin.push(
        <DummyPin
          key={`dummy-${i}`}
          order={i}
          register={register}
          setValue={setValue}
        />
      )
    }
    return pin
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container onSubmit={handleSubmit(onSubmit)}>
          <h1>더미 데이터 생성</h1>
          <h2>게시글</h2>
          <input
            style={{ width: '500px' }}
            placeholder="본문"
            type="text"
            {...register('content')}
          />
          <input
            style={{ width: '500px' }}
            type="number"
            value={pinCount}
            onChange={handlePinCount}
          />
          <Pins>{handlePinInput()}</Pins>
          <button type="submit">등록</button>
        </Container>
      )}
    </>
  )
}

export default DummyData

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 900px;
  padding: 10px;

  border: 1px solid black;

  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 25px;
  }

  input {
    width: 200px;
    height: 40px;
    font-size: 18px;
    margin-bottom: 10px;
    border: 1px solid black;
    border-radius: 5px;
  }
`
const Pins = styled.div`
  display: flex;
`
