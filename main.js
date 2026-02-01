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
let currentLevel=2
const level1 = [
    new Map(0, 960, 3000, 40),       
    new Map(150, 800, 250, 20),
    new Map(500, 720, 180, 20),
    new Map(900, 650, 200, 20),
    new Map(1400, 750, 150, 20),
    new Map(1800, 680, 180, 20),
    new Map(400, 0, 20, 300),         
    new Map(1200, 0, 20, 400),
    new Map(1600, 620, 20, 80),       
    new Map(2000, 0, 20, 350),
];
const level2 = [
    new Map(0, 960, 3000, 40),
    new Map(150, 780, 200, 20),
    new Map(450, 650, 220, 20),
    new Map(800, 730, 180, 20),
    new Map(1200, 650, 200, 20),
    new Map(1600, 700, 150, 20),
    new Map(2100, 600, 180, 20),
    new Map(2500, 550, 120, 20),
    new Map(600, 0, 20, 300),
    new Map(1400, 600, 20, 100),       
    new Map(2200, 0, 20, 400),
];

const level3 = [
    new Map(0, 960, 3000, 40),
    new Map(200, 800, 180, 20),
    new Map(600, 720, 220, 20),
    new Map(1050, 650, 200, 20),
    new Map(1500, 720, 180, 20),
    new Map(1900, 650, 200, 20),
    new Map(400, 0, 20, 400),
    new Map(1200, 600, 20, 80),       
    new Map(2000, 0, 20, 600),
];
const level4 = [
    new Map(0, 960, 3000, 40),
    new Map(150, 800, 200, 20),
    new Map(450, 700, 180, 20),
    new Map(750, 620, 200, 20),
    new Map(1100, 680, 180, 20),
    new Map(1450, 600, 220, 20),
    new Map(1800, 720, 150, 20),
    new Map(500, 0, 20, 500),
    new Map(1000, 550, 20, 60),       
    new Map(1700, 0, 20, 600),
];
const level5 = [
    new Map(0, 960, 3000, 40),
    new Map(150, 800, 180, 20),
    new Map(500, 700, 200, 20),
    new Map(900, 650, 180, 20),
    new Map(1350, 720, 200, 20),
    new Map(1800, 640, 220, 20),
    new Map(2250, 700, 180, 20),
    new Map(400, 0, 20, 500),
    new Map(1100, 580, 20, 80),        
    new Map(1600, 0, 20, 700),
    new Map(2100, 640, 20, 60),       
];
const levels = [level1, level2, level3, level4, level5];
const enemylevel1=[
    new Enemy(300,910,"sword",2000),
    new Enemy(800,910,"gun",1000),
]
const enemylevel2=[
    new Enemy(210,910,"sword",1800),
    new Enemy(700,910,"sword",1800),
    new Enemy(1200,910,"gun",900),
]
const enemylevel3=[
    new Enemy(150,910,"sword",1500),
    new Enemy(500,910,"gun",700),
    new Enemy(900,910,"sword",1500),
    new Enemy(1400,910,"gun",1000),
]
const enemylevel4=[
    new Enemy(200,910,"sword",2000),
    new Enemy(600,910,"gun",1000),
    new Enemy(900,910,"sword",2000),
    new Enemy(1400,910,"gun",1000),
    new Enemy(1500,910,"sword",2000),
    new Enemy(1100,910,"gun",1000),
]
const enemylevel5=[
    new Enemy(400,910,"sword",2000),
    new Enemy(800,910,"gun",1000),
    new Enemy(300,910,"sword",2000),
    new Enemy(800,910,"gun",1000),
    new Enemy(600,910,"sword",2000),
    new Enemy(800,910,"gun",1000),
    new Enemy(900,910,"sword",2000),
    new Enemy(800,910,"gun",1000),
]
const elevels = [
    enemylevel1,
    enemylevel2,
    enemylevel3,
    enemylevel4,
    enemylevel5
]
let map=levels[currentLevel-1]
let enemy = elevels[currentLevel-1]
let enemycount = enemy.length
let cx = (player.left + player.right) / 2
let cy = (player.top + player.bottom) / 2
let ex = cx
let ey = cy
let angle = 0
let sword = new Sword(player.position.x, player.position.y, angle)
let mouseactive = false
let bullets = []
let ebullets=[]
const zoom = 0.5;
let levelincreased=false
document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase()
    if (key == "a" || key == "d" || key == "w") {
        player.lastKey = key
        keys[key] = true
    }
})
document.addEventListener("mousemove", (event) => {
    mouseactive = true
    const rect = canvas.getBoundingClientRect()
    ex = (event.clientX - rect.left) / zoom + view.x;
    ey =( event.clientY - rect.top) / zoom + view.y;
    if (player.primary == "gun") {
        player.facing = (ex >= cx) ? 1 : -1;
        angle = Math.atan2(ey - cy, ex - cx)
    }
    else {
        player.facing = (ex >= cx) ? 1 : -1;
    }
})
document.addEventListener("click", () => {
    if (player.primary == "sword") {
        sword.attack()
    }
    else if (player.primary == "gun") {
        const x = cx + Math.cos(angle) * gun.size.width//x point direction ratio of the angle 
        const y = cy + Math.sin(angle) * gun.size.width//y point direction ratio of angle
        bullets.push(new Bullet(x, y, angle,player))
    }
})
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
function obstacleCollision(obj) {
    for (let i = 0; i < map.length; i++) {
        if(map[i].left<view.x+canvas.width/zoom&&map[i].right>view.x&&map[i].top<view.y+canvas.height/zoom&&map[i].bottom>view.y){
            if (obj.right >= map[i].left && obj.left <= map[i].right) {
            if (obj.bottom >= map[i].top && obj.prevbottom <= map[i].top) {
                if(obj==player){
                obj.onTop = true
                obj.isjumping = false
            }
                obj.directions.y = 0
                obj.position.y = map[i].top - obj.size.height
            }
            if (obj.top <= map[i].bottom && obj.prevtop >= map[i].bottom) {
                obj.position.y = map[i].bottom
            }
        }
        if (obj.bottom >= map[i].top && obj.top <= map[i].bottom) {
            if (obj.right >= map[i].left && obj.prevright <= map[i].left) {
                obj.position.x = map[i].left - obj.size.width
                obj.directions.x = 0
            }
            else if (obj.left <= map[i].right && obj.prevleft >= map[i].right) {
                obj.position.x = map[i].right
                obj.directions.x = 0
            }
        }}
    }
}
function levelup(){
    map=levels[currentLevel-1]
    enemy = elevels[currentLevel-1]
    enemycount = enemy.length
    for(const e of enemy){
        player.speed=(currentLevel-1)
        e.hp=e.hp*currentLevel
        // e.speed=e.speed*(currentLevel-1)
    }
    levelincreased=true
}
function playerCollide(){
    if (player.top < 0) {
            player.position.y = 0
        }
        if (player.left < 0) {
            player.position.x = 0
        }
        if (player.right >= 3000) {
            player.position.x = 3000 - player.size.width
            if(!levelincreased&&enemycount<=0){
                player.position.x=0
                player.hp=100
                currentLevel+=1
                levelup()
            }
        }
        if (player.bottom > 1000) {
            player.position.y = 1000 - player.size.height
        }
}
function playerMove() {
    player.move=false
    if (player.lastKey === "w" && keys["w"] && player.onTop && !player.isjumping) {
        player.directions.y = -6
        if (keys["a"]) {
            player.directions.x = -1
            player.move=true
        }
        if (keys["d"]) {
            player.directions.x = 1.5
            player.move=true
        }
        player.onTop = false
        player.isjumping = true
    }
    if (player.lastKey === "a" && keys["a"]) {
        player.directions.x = -1
        player.move=true
    }
    if (player.lastKey === "d" && keys["d"]) {
        player.directions.x = 1
        player.move=true
    }
    playerCollide()
}
function swordHit(sword,target){
    const left=Math.min(sword.hitbox.x,sword.hitbox.x+sword.hitbox.length*target.facing)
    const right=Math.max(sword.hitbox.x,sword.hitbox.x+sword.hitbox.length*target.facing)
    if(target.right>left&&target.bottom>sword.hitbox.y&&target.top<sword.hitbox.y+sword.hitbox.width&&target.left<right&&sword.hitStatus==false&&target.alive){
        sword.hitStatus=true
        target.hp-=10
    }
}
function playerAttackCollision() {
    for (let e = enemy.length - 1; e >= 0; e--) {
        if (enemy[e].right < view.x ||
            enemy[e].left > view.x + canvas.width / zoom ||
            enemy[e].bottom < view.y ||
            enemy[e].top > view.y + canvas.height / zoom) 
            continue;
        if(player.primary=="gun"){
            for (let i = bullets.length - 1; i >= 0; i--) {
            if(enemy[e].alive){if (
                enemy[e].right > bullets[i].left &&
                enemy[e].left < bullets[i].right &&
                enemy[e].top < bullets[i].bottom &&
                enemy[e].bottom > bullets[i].top
            ) {
                enemy[e].hp -= 20;
                bullets.splice(i, 1);
            }
            if(!bullets[i]){
                return
            }
            for (const m of map) {
            if (bullets[i].top > m.top && bullets[i].right > m.left && bullets[i].left < m.right && bullets[i].top <= m.bottom) {
                bullets.splice(i, 1)
                break
            }}
        }
        }}
        if (
            player.primary === "sword" &&
            sword.isAttacking &&
            swordHit(sword, enemy[e])
        ) {
            enemy[e].hp -= 10;
        }
        if (enemy[e].hp <= 0&&enemy[e].alive) {
            enemycount-=1
            enemy[e].alive=false
        }
    }
}
function enemyBullet() {
    for (let i = ebullets.length - 1; i >= 0; i--) {
          if(!ebullets[i].owner||!ebullets[i].owner.alive){
            ebullets.splice(i, 1);
            continue;
        }
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
        if(!ebullets[i]){
            continue
        }
        if(player.right>ebullets[i].left&&player.left<ebullets[i].right&&player.top<ebullets[i].bottom&&player.bottom>ebullets[i].top){
            player.hp-=20
            ebullets.splice(i,1)
            continue
        }
        ebullets[i].update()
        ebullets[i].draw(ctx)
    }
}
function enemyAttack(e){
    if(e.type=="gun"){
        enemyBullet()
    }
    if(e.type=="sword"){
        if(e.weapon.isAttacking){
            swordHit(e.weapon,player)
        }
    }
}
function weapon() {
    if (player.primary == "gun") {
        if (mouseactive) {
            gun.draw(ctx, cx, cy, angle,player.facing)
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
        if(enemy[i].alive){
        if(player.left>=enemy[i].right){
            enemy[i].facing=1
        }
        if(player.right<enemy[i].left){
            enemy[i].facing=-1
        }
        if(enemy[i].type=="gun"){
            if(player.move){
            let y=(enemy[i].top+enemy[i].bottom)/2
            let x=(enemy[i].left+enemy[i].right)/2
            enemy[i].angle= Math.atan2(cy-y,cx-x)}
        }
        if (player.top - enemy[i].bottom > enemy[i].gap || enemy[i].left - player.right > enemy[i].gap || enemy[i].top - player.bottom > enemy[i].gap || player.left - enemy[i].right > enemy[i].gap) {
            if (enemy[i].left > player.left) {
                enemy[i].directions.x = -1
            }
            if (enemy[i].right < player.right) {
                enemy[i].directions.x = 1
            }
            if (enemy[i].bottom < player.top) {
                enemy[i].directions.y = 1
            }
            if (enemy[i].top > player.bottom) {
                enemy[i].directions.y = -1
            }
        }
        else {
            enemy[i].directions.x = 0
            enemy[i].directions.y = 0
            enemy[i].attack()
        }
        enemy[i].update()
        obstacleCollision(enemy[i])}
        enemyAttack(enemy[i])
        enemy[i].shoot(player,ebullets,camera)
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
        if(e.alive){
            e.draw(ctx);
        }
    }
    for(const b of ebullets){
        b.draw(ctx)
    }
    for(const m of map){
        m.draw(ctx)
    }
    player.draw(ctx);
    weapon();
    ctx.restore();
}
function update(){
    levelincreased=false
    console.log(levelincreased)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(player.hp<=0){
        // ctx.beginPath()
        // ctx.font="50px Arial"
        // ctx.fillStyle="purple"
        ctx.fillText("Game Over",canvas.width/2-100,canvas.height/2)
        return
    }
    player.onTop = false;
    obstacleCollision(player);
    playerAttackCollision();
    playerMove();
    player.update();
    cx = (player.left + player.right) / 2;
    cy = (player.top + player.bottom) / 2;
    enemyMove();
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
    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    ctx.font = "24px Arial"
    ctx.fillStyle = "white"
    if(player.hp<0){
        player.hp=0
    }
    ctx.fillText(`${player.hp}`,20,20)
}
let lastTime = 0;
const fps = 1000 / 240;
let count = 0;
function gameloop(time) {
    requestAnimationFrame(gameloop);
    count += time - lastTime;
    lastTime = time;
    while (count >= fps) {
        update();
        count -= fps;
    }
    show()
}
gameloop(lastTime)
