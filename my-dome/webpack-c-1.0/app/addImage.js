import '../styles/addImage.css'

let smallImg = document.createElement('img')
// let bigImg = document.createElement('img')
// 必须require进来
smallImg.src = require('../assets/toast-cross@3x.png')
// bigImg.src = require('../assets/toast@2x.png')
document.body.appendChild(smallImg)
// document.body.appendChild(bigImg)
