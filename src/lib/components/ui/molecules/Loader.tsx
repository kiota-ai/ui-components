import ReactDOM from 'react-dom'

export function Loader() {
  const LOADER = <svg
    id="loading-spinner"
    width="192"
    height="193"
    viewBox="-5 0 278 270"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="path-one"
      d="M15.3283 0H0V272.708H15.3283V0Z"
      stroke="white"
      strokeWidth="3"
    />
    <path
      id="path-two"
      d="M150.271 150.57L85.0244 215.817L141.875 272.653H158.709L215.206 216.156L215.572 215.789L150.271 150.57ZM150.705 264.053L102.482 215.844L150.271 168.055L198.426 216.224L150.705 264.053Z"
      stroke="#3C5DA3"
      strokeWidth="3"
    />
    <path
      id="path-three"
      d="M150.271 37.6017L85.0244 102.849L150.271 168.095L215.152 103.215L215.518 102.849L150.271 37.6017ZM150.271 150.638L102.482 102.849L150.271 55.0597L198.047 102.849L150.271 150.638Z"
      stroke="#3C5DA3"
      strokeWidth="3"
    />
    <path
      id="path-four"
      d="M207.094 207.447L141.983 272.708L271.717 272.273L207.094 207.447ZM171.731 260.35L207.094 224.905L242.214 260.174L171.731 260.35Z"
      stroke="#67A7DE"
      strokeWidth="3"
    />
    <path
      id="path-five"
      d="M93.5975 94.0586L28.3506 159.305L93.5975 224.539L158.478 159.658L158.844 159.305L93.5975 94.0586ZM141.386 159.305L93.5975 207.094L45.8492 159.305L93.5975 111.503L141.386 159.305Z"
      stroke="white"
      strokeWidth="3"
    />
    <path
      id="path-six"
      d="M182.895 13.5648C178.611 9.28067 173.524 5.88228 167.927 3.5637C162.329 1.24512 156.33 0.0517655 150.271 0.0517654C144.213 0.0517654 138.213 1.24512 132.616 3.5637C127.018 5.88228 121.932 9.28067 117.648 13.5648C113.364 17.849 109.965 22.9351 107.647 28.5326C105.328 34.1301 104.135 40.1295 104.135 46.1883C104.135 52.247 105.328 58.2464 107.647 63.844C109.965 69.4415 113.364 74.5275 117.648 78.8117C126.3 87.464 138.035 92.3248 150.271 92.3248C162.507 92.3248 174.242 87.464 182.895 78.8117C191.547 70.1594 196.408 58.4244 196.408 46.1883C196.408 33.9521 191.547 22.2171 182.895 13.5648V13.5648ZM174.159 70.076C169.432 74.8058 163.409 78.0276 156.851 79.3338C150.293 80.6401 143.495 79.972 137.317 77.4142C131.139 74.8564 125.858 70.5237 122.143 64.9642C118.428 59.4047 116.444 52.8682 116.444 46.1815C116.444 39.4948 118.428 32.9583 122.143 27.3988C125.858 21.8393 131.139 17.5066 137.317 14.9488C143.495 12.391 150.293 11.7229 156.851 13.0292C163.409 14.3354 169.432 17.5572 174.159 22.287C180.495 28.6304 184.054 37.2294 184.054 46.1951C184.054 55.1607 180.495 63.7597 174.159 70.1031V70.076Z"
      stroke="#67A7DE"
      strokeWidth="3"
    />
  </svg>
  return ReactDOM.createPortal(
    <div
      className="bg-gray-opacity h-screen fixed top-0 right-0 z-50"
      id="spinner"
    >
      {LOADER}
    </div>
    , document.body)
}