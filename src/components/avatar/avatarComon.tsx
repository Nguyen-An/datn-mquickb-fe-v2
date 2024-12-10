import Image from "next/image";

const COLOR_AVATAR = {
  a: 'linear-gradient(90deg, #12FFF7 0%, #B3FFAB 100%)',
  b: 'linear-gradient(90deg, #1CD8D2 0%, #93EDC7 100%)',
  c: 'linear-gradient(90deg, #009FFC 0%, #56BFFF 100%)',
  d: 'linear-gradient(90deg, #56CCF2 0%, #2F80ED 100%)',
  đ: 'linear-gradient(90deg, #FF4B2B 0%, #FF416C 100%)',
  e: 'linear-gradient(90deg, #FD0880 0%, #FF6A00 100%)',
  f: 'linear-gradient(90deg, #CC251C 0%, #F00 100%)',
  g: 'linear-gradient(90deg, #FF8008 0%, #FFC837 100%)',
  h: 'linear-gradient(90deg, #F7971E 0%, #FFD200 100%)',
  i: 'linear-gradient(90deg, #F0DB19 0%, #EDDE5D 100%)',
  j: 'linear-gradient(90deg, #00F5A0 0%, #00D9F5 100%)',

  k: 'linear-gradient(90deg, #12FFF7 0%, #B3FFAB 100%)',
  l: 'linear-gradient(90deg, #1CD8D2 0%, #93EDC7 100%)',
  m: 'linear-gradient(90deg, #009FFC 0%, #56BFFF 100%)',
  n: 'linear-gradient(90deg, #56CCF2 0%, #2F80ED 100%)',
  o: 'linear-gradient(90deg, #FF4B2B 0%, #FF416C 100%)',
  p: 'linear-gradient(90deg, #FD0880 0%, #FF6A00 100%)',
  q: 'linear-gradient(90deg, #CC251C 0%, #F00 100%)',
  r: 'linear-gradient(90deg, #FF8008 0%, #FFC837 100%)',
  s: 'linear-gradient(90deg, #F7971E 0%, #FFD200 100%)',
  t: 'linear-gradient(90deg, #F0DB19 0%, #EDDE5D 100%)',
  u: 'linear-gradient(90deg, #00F5A0 0%, #00D9F5 100%)',

  v: 'linear-gradient(90deg, #12FFF7 0%, #B3FFAB 100%)',
  w: 'linear-gradient(90deg, #1CD8D2 0%, #93EDC7 100%)',
  x: 'linear-gradient(90deg, #009FFC 0%, #56BFFF 100%)',
  y: 'linear-gradient(90deg, #56CCF2 0%, #2F80ED 100%)',
  z: 'linear-gradient(90deg, #FF4B2B 0%, #FF416C 100%)',
  '1': 'linear-gradient(90deg, #FD0880 0%, #FF6A00 100%)',
  '2': 'linear-gradient(90deg, #CC251C 0%, #F00 100%)',
  '3': 'linear-gradient(90deg, #FF8008 0%, #FFC837 100%)',
  '4': 'linear-gradient(90deg, #F7971E 0%, #FFD200 100%)',
  '5': 'linear-gradient(90deg, #F0DB19 0%, #EDDE5D 100%)',
  '6': 'linear-gradient(90deg, #00F5A0 0%, #00D9F5 100%)',

  '7': 'linear-gradient(90deg, #12FFF7 0%, #B3FFAB 100%)',
  '8': 'linear-gradient(90deg, #1CD8D2 0%, #93EDC7 100%)',
  '9': 'linear-gradient(90deg, #009FFC 0%, #56BFFF 100%)',
  '0': 'linear-gradient(90deg, #56CCF2 0%, #2F80ED 100%)',
  '###': 'linear-gradient(90deg, #FF4B2B 0%, #FF416C 100%)',
};

// Chuyển ký tự có dấu về không dấu
function removeDiacritics(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
}


// Lấy 1 mã nàu theo tên
function getRandomColor(name: string): string {
  // Return an empty string if the name is empty
  if (!name || name.length < 1) {
    return '';
  }

  // Normalize the first character of the name
  let firstLetter = removeDiacritics(name[0]) as keyof typeof COLOR_AVATAR;

  // Return the color associated with the first character, or default color if not found
  return COLOR_AVATAR[firstLetter] || COLOR_AVATAR['###'];
}

const AvatarComon = ({
  email = "N",
  width = "58px",
  height = "58px",
  fontSize = "30px",
}: {
  email: any,
  width: any,
  height: any,
  fontSize: any,
}) => {
  function convertPxToNumber(pxValue: any) {
    // Sử dụng parseInt để chuyển đổi chuỗi sang số
    return parseInt(pxValue, 10);
  }

  return (
    <>
      <div className="m-[5px] rounded-full flex justify-center" style={{ background: getRandomColor(email), width, height }}>
        <div className="text-white text-[30px] font-medium" style={{ lineHeight: height, fontSize: fontSize }}>{email[0].toUpperCase()}</div>
      </div>
    </>
  )
};

export default AvatarComon;
