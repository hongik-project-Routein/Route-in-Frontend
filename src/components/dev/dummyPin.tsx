import React, { useRef } from 'react'
import styled from 'styled-components'
import { type IDataForm } from './dummyData'
import { type UseFormSetValue, type UseFormRegister } from 'react-hook-form'
import useModal from '../../hooks/useModal'
import theme from '../../styles/Theme'
import SearchPlace from './searchPlace'

interface IDummyPinProps {
  order: number
  register: UseFormRegister<IDataForm>
  setValue: UseFormSetValue<IDataForm>
}

function DummyPin({ register, order, setValue }: IDummyPinProps): JSX.Element {
  const modalRef = useRef(null)
  const { modalOpen, closeModal, changeModalState } = useModal(modalRef)

  return (
    <Container>
      <h2>핀 {order + 1}</h2>
      <label htmlFor="image">이미지 입력</label>
      <input id="image" type="file" {...register(`pins.${order}.image`)} />
      <SearchPlaceBtn ref={modalRef} onClick={changeModalState}>
        장소 검색
      </SearchPlaceBtn>
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
        placeholder="mapId"
        {...register(`pins.${order}.mapID`)}
      />
      <div ref={modalRef}>
        {modalOpen && (
          <SearchPlace
            setValue={setValue}
            order={order}
            closeModal={closeModal}
          />
        )}
      </div>
    </Container>
  )
}

export default DummyPin

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`

const SearchPlaceBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80px;
  height: 30px;
  border-radius: 10px;
  background-color: ${theme.colors.primaryColor};

  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
  }
`
