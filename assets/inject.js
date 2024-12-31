window.onload = function () {
  let editor = document.querySelector(".CodeMirror")
  console.log("Editor: ", editor)

  editor.addEventListener("paste", function () {
    console.log("Paste event")

    if (window.location.href.includes("acmicpc.net/submit")) {
      let lang = document.querySelector(".chosen-single")?.textContent
      if (lang.includes("Java")) {
        let codemirror = editor.CodeMirror
        codemirror.setValue(
          transformCode(codemirror.getValue(), "Main", "백준")
        )
      }
    } else if (
      window.location.href.includes(
        "swexpertacademy.com/main/solvingProblem/solvingProblem.do"
      )
    ) {
      let lang = document.querySelector("#sel_lang")?.value
      if (lang === "J") {
        let codemirror = editor.CodeMirror
        codemirror.setValue(
          transformCode(codemirror.getValue(), "Solution", "SWEA")
        )
      }
    }
  })
}

function transformCode(code, targetClassName, platform) {
  const lines = code.trim().split("\n")
  console.log("Original lines:", lines)

  const packageRegex = new RegExp("package")
  if (packageRegex.test(lines[0])) {
    lines.shift()
  }

  const psvmRegex = new RegExp("public static void main")
  const mainLineIndex = lines.findIndex((line) => {
    console.log("line:", line)
    return psvmRegex.test(line)
  })

  console.log("Main method line index:", mainLineIndex)

  if (mainLineIndex === -1) {
    showNotification("오류: main 메소드를 찾을 수 없습니다.", true)
    return code
  }

  // main 메소드부터 위로 올라가면서 중괄호 매칭
  let braceCount = 1
  let classLineIndex = -1

  for (let i = mainLineIndex - 1; i >= 0; i--) {
    // 현재 라인의 중괄호 개수 세기
    const openCount = (lines[i].match(/{/g) || []).length
    const closeCount = (lines[i].match(/}/g) || []).length
    braceCount = braceCount + closeCount - openCount

    // 중괄호 매칭이 맞고, class 키워드가 있는 라인 찾기
    if (braceCount === 0 && lines[i].includes("class ")) {
      classLineIndex = i
      break
    }
  }

  if (classLineIndex === -1) {
    showNotification(
      "오류: main 메소드를 포함하는 클래스를 찾을 수 없습니다.",
      true
    )
    return code
  }

  // 클래스 선언을 public class Main/Solution으로 변경
  lines[classLineIndex] =
    `public class ${targetClassName}` +
    (lines[classLineIndex].includes("{") ? " {" : "")

  console.log("Transformed lines:", lines)
  console.log("Class line changed:", lines[classLineIndex])

  showNotification(
    `${platform}: 클래스 이름을 '${targetClassName}'으로 변환했습니다.`
  )
  return lines.join("\n").trim()
}

function showNotification(message, isError = false) {
  const existingNotification = document.getElementById("transform-notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  const notification = document.createElement("div")
  notification.id = "transform-notification"
  notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${isError ? "#ff4444" : "#333"};
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 9999;
      font-family: Arial, sans-serif;
  `

  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}
