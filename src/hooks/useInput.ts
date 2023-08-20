import { useState, useCallback } from 'react'

function useInput<T, S>(
  initalValue: T
): [T, (e?: React.ChangeEvent<S>) => void, (value: T) => void] {
  const [value, setValue] = useState<typeof initalValue>(initalValue)

  const onChange = useCallback((event: any) => {
    setValue(event.target.value)
  }, [])

  const directChange = useCallback((value: T) => {
    setValue(value)
  }, [])

  return [value, onChange, directChange]
}

export default useInput
