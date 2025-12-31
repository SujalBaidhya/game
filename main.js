import Player1 from "./player.js"
import Player2 from "./player2.js"
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.height = window.innerHeight - 5
canvas.width = window.innerWidth
let player = new Player1()
let player2 = new Player2()
let keys = []
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
function Player1move() {
    if (player.lastKey === "w" && keys["w"]) {
        player.directions.y = -3
    }
    else if (player.lastKey === "a" && keys["a"]) {
        player.directions.x = -1
    }
    else if (player.lastKey === "d" && keys["d"]) {
        player.directions.x = 1
    }
}
function Player2move() {
    if (player2.lastKey == "arrowup" && keys["arrowup"]) {
        player2.directions.y = -3
    }
    else if (player2.lastKey == "arrowleft" && keys["arrowleft"]) {
        player2.directions.x = -1
    }
    else if (player2.lastKey == "arrowright" && keys["arrowright"]) {
        player2.directions.x = 1
    }
}
document.addEventListener("keyup", (event) => {
    player.directions.x = 0
    player2.directions.x = 0
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
    Player1move()
    Player2move()
    player.update()
    player.draw(ctx)
    player2.update()
    player2.draw(ctx)

}
gameloop()