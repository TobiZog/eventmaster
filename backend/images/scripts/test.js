let username = document.getElementById("txt-username")
let password = document.getElementById("txt-password")
let loginBtn = document.getElementById("btn-login")

console.log("Active")

function grabData() {
  console.log("Grabbed Username: " + username?.value + ", grabbed password: " + password?.value)
}

username?.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    grabData()
  }
})

password?.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    grabData()
  }
})

loginBtn?.addEventListener("click", (event) => {
  grabData()
})