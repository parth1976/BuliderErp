import * as React from "react"

const F_DownloadPdfIcon = ({
  style = {},
  width = "24",
  height = "24",
  className = "",
  stroke = "#e53935",
  fill1 = "#D1293D",
  fill2 = "#e53935",
  viewBox = "0 0 24 24"
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    fill1={fill1}
    fill2={fill2}
    stroke={stroke}
    xmlns="http://www.w3.org/2000/svg"
    className={`${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path className="F_fill"
      d="M22.085 5.29c.263.254.487.596.671 1.028.185.431.274.826.269 1.183l-.237 15.426a1.2 1.2 0 0 1-.415.905 1.375 1.375 0 0 1-.98.36l-19.248-.296a1.374 1.374 0 0 1-.968-.39 1.2 1.2 0 0 1-.387-.916l.33-21.427A1.2 1.2 0 0 1 1.533.26c.272-.246.598-.366.98-.36l12.832.197c.382.006.8.102 1.256.287.456.186.815.406 1.078.66l4.405 4.247Zm-6.309-3.366L15.7 6.96l5.385.082c-.092-.26-.194-.445-.307-.554l-4.418-4.26c-.113-.109-.307-.21-.583-.304Zm5.185 20.547.21-13.713-5.957-.091a1.374 1.374 0 0 1-.968-.39 1.2 1.2 0 0 1-.387-.917l.086-5.57-11-.17-.315 20.57 18.331.28Zm-7.239-8.054c.312.237.709.493 1.192.768a15.2 15.2 0 0 1 1.676-.068c1.404.022 2.246.253 2.525.695.15.199.156.431.018.697 0 .009-.005.018-.014.026l-.03.027v.013c-.062.339-.404.503-1.024.494-.459-.008-1.006-.105-1.643-.294a10.867 10.867 0 0 1-1.851-.738c-2.113.182-3.99.524-5.631 1.025-1.497 2.317-2.67 3.469-3.52 3.455a.88.88 0 0 1-.4-.1l-.34-.165a1.474 1.474 0 0 0-.085-.069c-.094-.09-.12-.252-.079-.483.092-.356.365-.76.82-1.213.457-.453 1.093-.874 1.911-1.263.135-.079.244-.05.328.085.02.018.028.036.028.054a32.142 32.142 0 0 0 1.573-2.614c.668-1.205 1.182-2.366 1.543-3.486a10.207 10.207 0 0 1-.404-2.143c-.051-.692-.011-1.261.12-1.706.11-.355.313-.53.61-.526l.314.005c.22.003.386.073.499.208.169.19.207.495.114.913a.285.285 0 0 1-.058.106.33.33 0 0 1 .012.108l-.006.401c-.036 1.098-.116 1.954-.24 2.568.503 1.473 1.183 2.546 2.042 3.22Zm-8.334 5.377c.5-.207 1.165-.902 1.995-2.086a7.95 7.95 0 0 0-1.27 1.106c-.355.387-.596.714-.725.98Zm5.89-12.233c-.15.373-.168.962-.056 1.768.01-.063.047-.259.11-.588 0-.027.036-.218.108-.574a.293.293 0 0 1 .06-.107c-.01-.009-.015-.018-.015-.027 0-.009-.002-.015-.007-.02-.004-.004-.007-.011-.006-.02a.742.742 0 0 0-.18-.485c0 .009-.004.018-.014.027v.026Zm-1.912 8.825a22.143 22.143 0 0 1 4.084-1.022 2.184 2.184 0 0 1-.185-.13 2.518 2.518 0 0 1-.226-.185c-.716-.61-1.31-1.404-1.782-2.385-.27.764-.68 1.637-1.23 2.62-.294.496-.514.863-.661 1.102Zm9.255-.072c-.226-.218-.893-.336-2-.353.721.261 1.311.396 1.77.403.133.002.22-.002.258-.01 0-.009-.01-.022-.028-.04Z"
      fill={fill1}
    />
    <path
      d="M16.5 23a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z"
      fill="#fff"
      stroke={stroke}
      strokeWidth={1}
    />
    <path className="F_fill"
      d="M19.828 16.086a.583.583 0 0 0-.828 0l-1.918 1.925v-4.428a.583.583 0 0 0-1.165 0v4.428l-1.918-1.925a.585.585 0 1 0-.828.828l2.915 2.917c.055.053.12.094.192.122a.547.547 0 0 0 .443 0 .583.583 0 0 0 .192-.122l2.915-2.917a.584.584 0 0 0 0-.828Z"
      fill={fill2}
    />
  </svg>
);

export default F_DownloadPdfIcon;



