import React from "react"

function IndexPopup() {
  return (
    <div
      style={{
        padding: 16,
        width: "300px",
        fontFamily: "Noto Sans KR",
      }}>
      <h2>Java Code Formatter</h2>

      <p>자동으로 Java 코드를 변환해주는 도구입니다.</p>

      <h3>사용 방법</h3>
      <p>다음 사이트에서 코드를 붙여넣기(Ctrl+V)하면 자동으로 변환됩니다:</p>
      <ul>
        <li>
          백준: https://www.acmicpc.net/submit/
          <br />
          <small>- 클래스 이름을 'Main'으로 변환</small>
        </li>
        <li>
          SWEA: https://swexpertacademy.com/
          <br />
          <small>- 클래스 이름을 'Solution'으로 변환</small>
        </li>
      </ul>
    </div>
  )
}

export default IndexPopup
