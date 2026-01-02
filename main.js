import Player1 from "./player.js"
import Player2 from "./player2.js"
import Guns from "./guns.js"
import Bullet from "./bullets.js"
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.height = window.innerHeight - 5
canvas.width = window.innerWidth
let player = new Player1()
let gun = new Guns()
let player2 = new Player2()
let keys = {}
let cx = (player.left + player.right) / 2
let cy = (player.top + player.bottom) / 2
let ex = cx
let ey = cy
let angle = 0
let mouseactive = false
document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase()
    if (key == "a" || key == "d" || key == "w") {
        player.lastKey = key
        keys[key] = true
    }
    if (key == "arrowleft" || key == "arrowright" || key == "arrowup") {
        event.preventDefault()
        player2.lastKey = key
        keys[key] = true
    }
})
document.body.addEventListener("mousemove", (event) => {
    mouseactive = true
   const rect = canvas.getBoundingClientRect()
    ex = event.clientX - rect.left
    ey = event.clientY - rect.top
    let dx = ex - cx
    let dy = ey - cy
    angle = Math.atan2(dy, dx)
})
function Player1move() {
    if (player.lastKey === "w" && keys["w"]) {
        player.directions.y = -3
    }
    if (player.lastKey === "a" && keys["a"]) {
        player.directions.x = -1
    }
    if (player.lastKey === "d" && keys["d"]) {
        player.directions.x = 1
    }
}
function Player2move() {
    if (player2.lastKey == "arrowup" && keys["arrowup"]) {
        player2.directions.y = -3
    }
    if (player2.lastKey == "arrowleft" && keys["arrowleft"]) {
        player2.directions.x = -1
    }
    if (player2.lastKey == "arrowright" && keys["arrowright"]) {
        player2.directions.x = 1
    }
}
document.addEventListener("keyup", (event) => {
    player.directions.x = 0
    player.directions.y = 0
    player2.directions.x = 0
    player2.directions.y = 0
    const key = event.key.toLowerCase()
    keys[key] = false
    if (key == player.lastKey) {
        if (keys["w"]) {
            player.lastKey = "w"
        }
        else if (keys["a"]) {
            player.lastKey = "a"
        }
        else if (keys["d"]) {
            player.lastKey = "d"
        }
        else {
            player.lastKey = null
        }
    }
    else if (key == player2.lastKey) {
        if (keys["arrowup"]) {
            player2.lastKey = "arrowup"
        }
        else if (keys["arrowleft"]) {
            player2.lastKey = "arrowleft"
        }
        else if (keys["arrowright"]) {
            player2.lastKey = "arrowright"
        }
        else {
            player2.lastKey = null
        }
    }

})
function gameloop() {
    requestAnimationFrame(gameloop)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    cx = (player.left + player.right) / 2
    cy = (player.top + player.bottom) / 2
    Player1move()
    Player2move()
    player.update()
    player.draw(ctx)
    if (mouseactive) { 
        gun.draw(ctx, cx, cy, angle)
    }
    else {
        gun.draw(ctx, cx, cy, 0)
    }
    // player2.update()
    // player2.draw(ctx)

}
gameloop()