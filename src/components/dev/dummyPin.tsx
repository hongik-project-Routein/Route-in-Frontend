import React from 'react'
import styled from 'styled-components'
import { type IDataForm } from './dummyData'
import { type UseFormRegister } from 'react-hook-form'

interface IDummyPinProps {
  order: number
  register: UseFormRegister<IDataForm>
}

function DummyPin({ register, order }: IDummyPinProps): JSX.Element {
  return (
    <Container>
      <h2>핀 {order + 1}</h2>
      <label htmlFor="image">이미지 입력</label>
      <input id="image" type="file" {...register(`pins.${order}.image`)} />
      <input
        type="number"
        placeholder="위도"
        {...register(`pins.${order}.latitude`)}
      />
      <input
        id="longitude"
        type="number"
        placeholder="경도"
        {...register(`pins.${order}.longitude`)}
      />
      <input
        type="text"
        placeholder="핀 해시태그"
        {...register(`pins.${order}.pin_hashtag`)}
      />
      <input
        type="text"
        placeholder="핀 본문"
        {...register(`pins.${order}.content`)}
      />
      <input
        type="text"
        placeholder="mapId"
        {...register(`pins.${order}.mapID`)}
      />
    </Container>
  )
}

export default DummyPin

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`
