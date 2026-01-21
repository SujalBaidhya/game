import Player1 from "./player.js"
import Guns from "./guns.js"
import Bullet from "./bullets.js"
import Map from "./map1.js"
import Enemy from "./enemy.js"
import Sword from "./sword.js"
const world = {
    width: 3000,
    height: 3000
}
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const view = {
    x: 0,
    y: 0
}
canvas.width = 800
canvas.height = 500
let player = new Player1()
let gun = new Guns()
let keys = {}
let enemy = []
let gap = 20
let map = [new Map(100, 200, 100, 50),
new Map(400, 50, 100, 50),
new Map(0, canvas.height - 10, world.width, 50),
]   
enemy[0] = new Enemy(0, 440, "gun")
let cx = (player.left + player.right) / 2
let cy = (player.top + player.bottom) / 2
let ex = cx
let ey = cy
let angle = 0
let sword = new Sword(player.position.x, player.position.y, angle)
let mouseactive = false
let bullets = []
let ebullets=[]
const zoom = 0.7;
document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase()
    if (key == "a" || key == "d" || key == "w") {
        player.lastKey = key
        keys[key] = true
    }
})
canvas.addEventListener("mousemove", (event) => {
    mouseactive = true
    const rect = canvas.getBoundingClientRect()
    ex = event.clientX - rect.left / zoom + view.x;
    ey = event.clientY - rect.top / zoom + view.y;
    if (player.primary == "gun") {
        player.facing = (ex >= cx) ? 1 : -1;
        angle = Math.atan2(ey - cy, ex - cx)
    }
    else {
        player.facing = (ex >= cx) ? 1 : -1;
    }
})
document.body.addEventListener("click", () => {
    if (player.primary == "sword") {
        sword.attack()
    }
    else if (player.primary == "gun") {
        const x = cx + Math.cos(angle) * gun.size.width//x point direction ratio of the angle 
        const y = cy + Math.sin(angle) * gun.size.width//y point direction ratio of angle
        bullets.push(new Bullet(x, y, angle))
    }
})
function bulletCollision() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (const m of map) {
            if (bullets[i].top > m.top && bullets[i].right > m.left && bullets[i].left < m.right && bullets[i].top <= m.bottom) {
                bullets.splice(i, 1)
                break
            }
        }
        for(let e= enemy.length-1;e>=0;e--){
            if(enemy[e].right<view.x||enemy[e].bottom<view.y||enemy[e].left>view.x+canvas.width/zoom||enemy[e].top>view.y+canvas.height/zoom){
                return
            }
            if(enemy[e].right>bullets[i].left&&enemy[e].left<bullets[i].right&&enemy[e].top<bullets[e].bottom&&enemy[e].bottom>bullets[i].top){
                enemy.splice(i,1)
                bullets.splice(i,1)
                continue
            }
        }
    }
}
function weapon() {
    if (player.primary == "gun") {
        if (mouseactive) {
            gun.draw(ctx, cx, cy, angle)
        }
        else {
            gun.draw(ctx, cx, cy, 0)
        }
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].update()
            bullets[i].draw(ctx)
            if (bullets[i].right > view.x + canvas.width / zoom || bullets[i].left < view.x || bullets[i].top < view.y || bullets[i].bottom > view.y + canvas.height / zoom) {
                bullets.splice(i, 1)
            }
        }
    }
    else if (player.primary == "sword") {
        sword.update(player.facing)
        sword.draw(ctx,cx,cy,player.facing)
    }
}
function enemyMove() {
    const camera= {
        left: view.x,
        right: view.x + canvas.width / zoom,
        top: view.y,
        bottom: view.y + canvas.height / zoom
    };
    for (let i = enemy.length - 1; i >= 0; i--) {
        if(player.left>=enemy[i].right){
            enemy[i].facing=1
        }
        if(player.right<enemy[i].left){
            enemy[i].facing=-1
        }
        if(enemy[i].type=="gun"){
            let y=(enemy[i].top+enemy[i].bottom)/2
            let x=(enemy[i].left+enemy[i].right)/2
            enemy[i].angle= Math.atan2(cy-y,cx-x)
        }
        if (player.top - enemy[i].bottom > gap || enemy[i].left - player.right > gap || enemy[i].top - player.bottom > gap || player.left - enemy[i].right > gap) {
            if (enemy[i].left > player.left) {
                enemy[i].directions.x = -1
            }
            if (enemy[i].right < player.right) {
                enemy[i].directions.x = 1
            }
            // if (enemy[i].bottom < player.top) {
            //     enemy[i].directions.y = 1
            // }
            // if (enemy[i].top > player.bottom) {
            //     enemy[i].directions.y = -1
            // }
        }
        else {
            enemy[i].directions.x = 0
            enemy[i].directions.y = 0
            enemy[i].attack()
        }
        enemy[i].shoot(player,ebullets,camera)
        enemy[i].update()
    }
}
function enemyBullet() {
    for (let i = ebullets.length - 1; i >= 0; i--) {
        ebullets[i].update()
        if (
            ebullets[i].right < view.x ||
            ebullets[i].left > view.x + canvas.width / zoom ||
            ebullets[i].bottom < view.y ||
            ebullets[i].top > view.y + canvas.height / zoom
        ) {
            ebullets.splice(i, 1);
            continue;
        }
        for (const m of map) {
            if (ebullets[i].top > m.top && ebullets[i].right > m.left && ebullets[i].left < m.right && ebullets[i].top <= m.bottom) {
                ebullets.splice(i, 1)
                break
            }
        }
        if(player.right>ebullets[i].left&&player.left<ebullets[i].right&&player.top<ebullets[i].bottom&&player.bottom>ebullets[i].top){
            console.log("hit")
            ebullets.splice(i,1)
            continue
        }
    }
}
function playerMove() {
    if (player.lastKey === "w" && keys["w"] && player.onTop && !player.isjumping) {
        player.directions.y = -6
        if (keys["a"]) {
            player.directions.x = -1
        }
        if (keys["d"]) {
            player.directions.x = 1.5
        }
        player.onTop = false
        player.isjumping = true
    }
    if (player.lastKey === "a" && keys["a"]) {
        player.directions.x = -1
    }
    if (player.lastKey === "d" && keys["d"]) {
        player.directions.x = 1
    }
}
document.addEventListener("keyup", (event) => {
    player.directions.x = 0
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
})
function obstacleCollision() {
    for (let i = 0; i < map.length; i++) {
        map[i].draw(ctx)
        if (player.right >= map[i].left && player.left <= map[i].right) {
            if (player.bottom >= map[i].top && player.prevbottom <= map[i].top) {
                player.onTop = true
                player.isjumping = false
                player.directions.y = 0
                player.position.y = map[i].top - player.size.height
            }
            if (player.top <= map[i].bottom && player.prevtop >= map[i].bottom) {
                player.position.y = map[i].bottom
            }
        }
        if (player.bottom >= map[i].top && player.top <= map[i].bottom) {
            if (player.right >= map[i].left && player.prevright <= map[i].left) {
                player.position.x = map[i].left - player.size.width
                player.directions.x = 0
            }
            if (player.left <= map[i].right && player.prevleft >= map[i].right) {
                player.position.x = map[i].right
                player.directions.x = 0
            }
        }
    }
}

function show() {
    ctx.fillStyle = "brown";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.translate(-view.x, -view.y);
    for (const p of map) {
        p.draw(ctx);
    }
    for(const e of enemy) {
        e.draw(ctx);
    }
    for(const b of ebullets){
        b.draw(ctx)
    }
    player.draw(ctx);
    weapon();
    ctx.restore();
}
function gameloop() {
    requestAnimationFrame(gameloop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.onTop = false;
    obstacleCollision();
    bulletCollision();
    playerMove();
    player.update();
    cx = (player.left + player.right) / 2;
    cy = (player.top + player.bottom) / 2;
    enemyMove();
    enemyBullet()
    const lerp = 0.01;
    let x = player.position.x + player.size.width / 2 - (canvas.width / 2) / zoom;
    let y = player.position.y + player.size.height / 2 - (canvas.height / 2) / zoom;
    view.x += (x - view.x) * lerp;
    view.y += (y - view.y) * lerp;
    if (view.x < 0) view.x = 0;
    if (view.y < 0) view.y = 0;
    if (view.x + canvas.width / zoom > world.width) view.x = world.width - canvas.width / zoom;
    if (view.y + canvas.height / zoom > world.height) view.y = world.height - canvas.height / zoom;
    show();

}
gameloop()
setInterval(function(){ebullets.push(new Bullet())},500)