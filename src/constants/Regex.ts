export const Regex = {
  // 사용자명@도메인.도메인확장자
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },

  // 영어 숫자를 포함한 8자 이상
  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
  },

  // uname: 한글, 영어, 숫자를 허용, 6~20자리
  uname: {
    pattern: /^[가-힣a-zA-Z0-9]{6,20}$/,
  },

  // name: 한글, 영어, 공백을 허용, 2~20자리
  name: {
    pattern: /^[가-힣a-zA-Z\s]{2,20}$/,
  },

  // age: 숫자 1~3자리 허용
  age: {
    pattern: /^\d{1,3}$/,
  },

  // gender: M 남자, F 여자 두 문자 한 자리만 허용
  gender: {
    pattern: /^[MF]$/,
  },
}
