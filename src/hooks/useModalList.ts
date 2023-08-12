import { useEffect } from 'react'
import {
  type RecoilState,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil'

// useModalList
// 아이템이 여러 개이고 그 상황에서 각각 모달을 띄워야 할 때 사용

// parameter
// dataAtom: 데이터 아톰, modalSelector: 데이터를 모달 확장시킨 셀렉터
// indexAtom: 현재 인덱스 아톰, curPageItem: 현재 페이지 아이템

// return value
// dataList: 현재 페이지 아이템 (모달 확장된 selector value)
// currentIndex: 현재 선택 인덱스
function useModalList<T, S, R>(
  dataAtom: RecoilState<T>,
  modalSelector: RecoilState<S>,
  indexAtom: RecoilState<R>,
  initialData: T
): any {
  const [data, setData] = useRecoilState<T>(dataAtom)
  const [dataList, setDataList] = useRecoilState<S>(modalSelector)
  const currentIndex = useRecoilValue<R>(indexAtom)

  const resetData = useResetRecoilState(dataAtom)

  useEffect(() => {
    setData(initialData)
    setDataList(data)

    return () => {
      resetData()
    }
  }, [])

  return {
    dataList,
    currentIndex,
  }
}

export default useModalList
