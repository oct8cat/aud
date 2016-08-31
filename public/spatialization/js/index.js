var SIZE = 500
var MID = SIZE / 2
var RO = 5
var TAU = Math.PI * 2


var rEl = document.getElementById('root')

var aEl = document.createElement('audio')
aEl.src = 'audio.mp3'
rEl.appendChild(aEl)

var cEl = document.createElement('canvas')
cEl.width = cEl.height = SIZE
cEl.style.display = 'block'
cEl.style.margin = '0 auto'
cEl.style.border = 'solid 1px #ddd'
cEl.style.cursor = 'none'
rEl.appendChild(cEl)


var ac = new AudioContext()

var acp = ac.createPanner()
acp.maxDistance = SIZE * 100
acp.connect(ac.destination)

var acm = ac.createMediaElementSource(aEl)
acm.connect(acp)


var x = 0
var y = 0
cEl.addEventListener('mouseover', aEl.play.bind(aEl))
cEl.addEventListener('mouseout',  aEl.pause.bind(aEl))
cEl.addEventListener('mousemove', function(e) {
    x = e.clientX - cEl.offsetLeft - MID
    y = e.clientY - cEl.offsetTop - MID
    acp.positionX.value = x
    acp.positionY.value = y
})


var cx = cEl.getContext('2d')
window.requestAnimationFrame(raf)
function raf() {
    cx.clearRect(0, 0, SIZE, SIZE)

    var r = Math.sqrt(x * x + y * y)
    cx.beginPath()
    cx.arc(MID, MID, r, 0, TAU)
    cx.stroke()
    cx.closePath()

    cx.beginPath()
    cx.moveTo(x + MID, y + MID)
    cx.lineTo(MID, MID)
    cx.stroke()
    cx.closePath()

    cx.beginPath()
    cx.arc(MID, MID, RO, 0, TAU)
    cx.fill()
    cx.closePath()

    cx.beginPath()
    cx.arc(x + MID, y + MID, RO, 0, TAU)
    cx.fill()
    cx.closePath()

    cx.fillText(`distance: ${r.toFixed(2)}`, 16, 16)
    cx.fillText(`angle: ${(!r ? 0 : Math.acos(x / r)).toFixed(2)}`, 16, 32)

    window.requestAnimationFrame(raf)
}
