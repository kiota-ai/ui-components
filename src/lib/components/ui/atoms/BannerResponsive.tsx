
const bgStyles = {
  height: '8rem', backgroundSize: 'contain'
}

export const BannerResponsive = () => {
  return <div className={`bg-no-repeat w-screen absolute top-0 left-0 lg:hidden bg-banner`} style={bgStyles}></div>
}
