import type { PlasmoCSConfig } from "plasmo"





export const config: PlasmoCSConfig = {
  matches: ["https://www.acmicpc.net/*", "https://swexpertacademy.com/*"]
}

const script = document.createElement("script")
script.src = chrome.runtime.getURL("assets/inject.js")
script.onload = function () {
  script.remove()
}
document.head.appendChild(script)
