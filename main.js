import Player1 from "./player.js"
import Player2 from "./player2.js"
import Guns from "./guns.js"
import Bullet from "./bullets.js"
import Map from "./map1.js"
import Enemy from "./enemy.js"
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.height = window.innerHeight - 5
canvas.width = window.innerWidth
let player = new Player1()
let gun = new Guns()
let player2 = new Player2()
let keys = {}
let enemy=[]
enemy[0]=new Enemy()
function enemyMove(){
    for(let i=enemy.length-1;i>=0;i--){
        enemy[i].draw(ctx)
        enemy[i].update()
        if(enemy[i].left>player.left){
            enemy[i].directions.x=-1
        }
        if(enemy[i].right<player.right){
            enemy[i].directions.x=1
        }
        if(enemy[i].bottom<player.top){
            enemy[i].directions.y=1
        }
        if(enemy[i].top>player.bottom){
            enemy[i].directions.y=-1
        }
    }
}
let cx = (player.left + player.right) / 2
let cy = (player.top + player.bottom) / 2
let ex = cx
let ey = cy
let angle = 0
let mouseactive = false
let map=new Map()
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
function player1Move() {
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
function player2Move() {
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
function obstacleCollision(){
    if(map.top<player.bottom&&map.right>=player.left&&map.left<=player.right&&map.top>player.top&&map.top+5>player.bottom){
        player.directions.y=0
    }
}
function gameloop() {
    requestAnimationFrame(gameloop)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    cx = (player.left + player.right) / 2
    cy = (player.top + player.bottom) / 2
    enemyMove()
    player1Move()
    player2Move()
    player.update()
    player.draw(ctx)
    if (mouseactive) { 
        gun.draw(ctx, cx, cy, angle)
    }
    else {
        gun.draw(ctx, cx, cy, 0)
    }
    obstacleCollision() 
    map.draw(ctx)
    // player2.update()
    // player2.draw(ctx)

}
gameloop()