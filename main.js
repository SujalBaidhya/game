import Player1 from "./player.js"
import Guns from "./guns.js"
import Bullet from "./bullets.js"
import Map from "./map1.js"
import Enemy from "./enemy.js"
import Sword from "./sword.js"
const world = {
    width: 5000,
    height: 3000
}
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const hpText = document.getElementById("hp");
const ammoText = document.getElementById("ammo");
const reserveText = document.getElementById("reserve");
canvas.width = 800
canvas.height = 500
let player = new Player1()
let gun = new Guns()
let keys = {}
let currentLevel=1
let mouseDown=false
let waveCooldown = 0;
let waitingForNextWave = false;
const WAVE_DELAY = 180;
const level1 = [
    new Map(0, 2900, 5000, 100),
    new Map(300, 2650, 300, 40),
    new Map(700, 2500, 300, 40),
    new Map(1100, 2350, 300, 40),
    new Map(1500, 2500, 300, 40),
    new Map(600, 2150, 400, 40),
    new Map(1300, 2000, 400, 40),
    new Map(1000, 2700, 40, 200),
];
const level2 = [
    new Map(0, 2900, 5000, 100),

    new Map(250, 2650, 280, 40),
    new Map(600, 2500, 280, 40),
    new Map(950, 2350, 280, 40),
    new Map(1300, 2200, 280, 40),

    new Map(700, 2000, 380, 40),
    new Map(1200, 1850, 380, 40),

    new Map(900, 2700, 40, 250),
];
const level3 = [
    new Map(0, 2900, 5000, 100),

    new Map(400, 2700, 500, 40),
    new Map(1100, 2700, 500, 40),
    new Map(1800, 2700, 500, 40),

    new Map(700, 2350, 450, 40),
    new Map(1500, 2350, 450, 40),

    new Map(1000, 2050, 650, 40),
];
const level4 = [
    new Map(0, 2900, 5000, 100),

    new Map(300, 2700, 240, 40),
    new Map(600, 2550, 240, 40),
    new Map(900, 2400, 240, 40),
    new Map(1200, 2250, 240, 40),
    new Map(1500, 2100, 240, 40),

    new Map(1900, 1850, 500, 40),

    new Map(1400, 2700, 40, 250),
];
const level5 = [
    new Map(0, 2900, 5000, 100),
    new Map(250, 2700, 360, 40),
    new Map(700, 2600, 360, 40),
    new Map(1150, 2500, 360, 40),
    new Map(1600, 2600, 360, 40),
    new Map(600, 2200, 500, 40),
    new Map(1300, 2100, 500, 40),
    new Map(900, 1800, 700, 40),
    new Map(2000, 2450, 40, 350),
];
const levels = [level1, level2, level3, level4, level5];
const spawnZones = [
    // Level 1
    [
        { x: 100, y: 2600, w: 800, h: 200 },
        { x: 1200, y: 2400, w: 800, h: 200 }
    ],

    // Level 2
    [
        { x: 200, y: 2700, w: 1000, h: 200 },
        { x: 1400, y: 2200, w: 800, h: 200 }
    ]
];
const waveConfig = [
    [
        { sword: 2, gun: 1 },
        { sword: 3, gun: 2 }
    ],
    [
        { sword: 3, gun: 2 },
        { sword: 4, gun: 3 },
        { sword: 1, gun: 4 }
    ],
    [
        { sword: 3, gun: 2 },
        { sword: 4, gun: 3 },
        { sword: 1, gun: 4 },
        { sword: 4, gun: 3 },
        { sword: 1, gun: 4 }
    ],
    [
        { sword: 3, gun: 2 },
        { sword: 4, gun: 3 },
        { sword: 1, gun: 4 },
        { sword: 3, gun: 2 },
        { sword: 4, gun: 3 },
        { sword: 4, gun: 3 },
    ],
    [
        { sword: 3, gun: 2 },
        { sword: 4, gun: 3 },
        { sword: 1, gun: 4 },
        { sword: 4, gun: 3 },
        { sword: 4, gun: 3 },
        { sword: 4, gun: 3 },
        { sword: 4, gun: 3 },
    ],
];

let map=levels[currentLevel-1]
let enemy = []
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
const view = {
    x: world.width - canvas.width / zoom,
    y:  world.height - canvas.height / zoom
}
let levelincreased=false
document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase()
    if (key == "a" || key == "d" || key == "w" || key == "r") {
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
document.addEventListener("mousedown", () => {
    if (player.primary == "sword") {
        sword.attack()
    }
    else if (player.primary == "gun") {
        mouseDown=true
    }
})
document.addEventListener("mouseup", () => {
    mouseDown = false;
});
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
               {
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
let currentWave = 0;
function getSwordSpawn(levelIndex) {
    const zones = spawnZones[levelIndex];
    const zone = zones[Math.floor(Math.random() * zones.length)];
    return {
        x: zone.x + Math.random() * zone.w,
        y: 2825
    };
}
function getGunSpawn(levelIndex) {
    const zones = spawnZones[levelIndex];
    const zone = zones[Math.floor(Math.random() * zones.length)];

    return {
        x: zone.x + Math.random() * zone.w,
        y: zone.y + Math.random() * zone.h
    };
}

function spawnWave(levelIndex) {
    enemy.length = 0;
    waitingForNextWave = false
    const wave = waveConfig[levelIndex][currentWave];
    for (let i = 0; i < wave.sword; i++) {
        const p = getSwordSpawn(levelIndex);
        enemy.push(new Enemy(p.x,2825, "sword", 1500));
    }
    for (let i = 0; i < wave.gun; i++) {
        const p = getGunSpawn(levelIndex);
        enemy.push(new Enemy(p.x, p.y, "gun", 1000));
    }
}
currentWave = 0;
spawnWave(currentLevel - 1)
function totalWaves() {
    return waveConfig[currentLevel - 1].length;
}
function updateWaves(levelIndex) {
    const alive = enemy.some(e => e.alive);

    // Wave still active
    if (alive) return;

    // Wave finished → start cooldown
    if (!waitingForNextWave) {
        waitingForNextWave = true;
        waveCooldown = WAVE_DELAY;
        return;
    }

    // Countdown
    if (waveCooldown > 0) {
        waveCooldown--;
        return;
    }

    // Start next wave or level
    currentWave++;

    if (currentWave < waveConfig[levelIndex].length) {
        spawnWave(levelIndex);
    } else {
        // Level complete
        if(player.right>world.width){currentLevel++;
        currentWave = 0;
        spawnWave(currentLevel - 1);}
    }
}
function safeSpawn(pos) {
    const dx = pos.x - cx;
    const dy = pos.y - cy;
    return Math.hypot(dx, dy) > 300;
}
function levelup(){
    map=levels[currentLevel-1]
    enemy = elevels[currentLevel-1]
    enemycount = enemy.length
    for(const e of enemy){
        // player.speed=(currentLevel-1)
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
        if (player.right >= world.width) {
            player.position.x = world.width - player.size.width
            if(!levelincreased&&enemycount<=0){
                player.position.x=0
                player.hp=100
                currentLevel+=1
                levelup()
            }
        }
        if (player.bottom > world.height-100) {
            player.position.y = world.height-100 - player.size.height
        }
}
function playerMove() {
    player.move=false
    if(keys["r"]){  
        gun.reload()
    }
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
        if (!enemy[e].alive) continue;
        if (
            enemy[e].right < view.x ||
            enemy[e].left > view.x + canvas.width / zoom ||
            enemy[e].bottom < view.y ||
            enemy[e].top > view.y + canvas.height / zoom
        ) continue;
        if (player.primary === "gun") {
            for (let i = bullets.length - 1; i >= 0; i--) {
                const b = bullets[i];
                if (!b) continue;
                if (
                    enemy[e].right > b.left &&
                    enemy[e].left < b.right &&
                    enemy[e].top < b.bottom &&
                    enemy[e].bottom > b.top
                ) {
                    enemy[e].hp -= 20;
                    bullets.splice(i, 1);
                    continue;
                }
                for (let m of map) {
                    if (
                        b.right > m.left &&
                        b.left < m.right &&
                        b.bottom > m.top &&
                        b.top < m.bottom
                    ) {
                        bullets.splice(i, 1);
                        break;
                    }
                }
            }
        }
        if (
            player.primary === "sword" &&
            sword.isAttacking &&
            swordHit(sword, en)
        ) {
            enemy[e].hp -= 10;
        }
        if (enemy[e].hp <= 0 && enemy[e].alive) {
            enemy[e].alive = false;
            enemycount--;
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
function hasLineOfSight(x1, y1, x2, y2, obstacles) {
    for (let m of obstacles) {
        if (lineIntersectsRect(x1, y1, x2, y2, m)) {
            return false;
        }
    }
    return true;
}
function lineIntersectsRect(x1, y1, x2, y2, r) {
    return (
        lineIntersectsLine(x1, y1, x2, y2, r.left, r.top, r.right, r.top) ||
        lineIntersectsLine(x1, y1, x2, y2, r.right, r.top, r.right, r.bottom) ||
        lineIntersectsLine(x1, y1, x2, y2, r.right, r.bottom, r.left, r.bottom) ||
        lineIntersectsLine(x1, y1, x2, y2, r.left, r.bottom, r.left, r.top)
    );
}
function lineIntersectsLine(x1,y1,x2,y2,x3,y3,x4,y4) {
    const den = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
    if (den === 0) return false;
    const t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/den;
    const u = -((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3))/den;
    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
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
            let enex = (enemy[i].left + enemy[i].right) / 2;
            let eney = (enemy[i].top + enemy[i].bottom) / 2;
        if(cx>=enex){
            enemy[i].facing=1
        }
        if(cx<enex){
            enemy[i].facing=-1
        }
        if(enemy[i].type=="gun"){
            let y=(enemy[i].top+enemy[i].bottom)/2
            let x=(enemy[i].left+enemy[i].right)/2
            enemy[i].angle= Math.atan2(cy-y,cx-x)
        }
        if ( (cy - enemy[i].bottom > enemy[i].gap || enemy[i].left - player.right > enemy[i].gap || enemy[i].top - player.bottom > enemy[i].gap
             || player.left - enemy[i].right > enemy[i].gap)) {
            if (enemy[i].left > player.left) {
                enemy[i].directions.x = -1
            }
            if (enemy[i].right < player.right) {
                enemy[i].directions.x = 1
            }
           { if (enemy[i].bottom < player.top) {
                enemy[i].directions.y = 1
            }
            if (enemy[i].top > player.bottom) {
                enemy[i].directions.y = -1
            }}
        }
        else {
            if(hasLineOfSight(enex, eney - 5, cx, cy, map) ||
            hasLineOfSight(enex, eney + 5, cx, cy, map)){
            enemy[i].directions.x = 0;
            enemy[i].directions.y = 0;
            const dx = cx - enex;
            const dy = cy - eney;
            enemy[i].directions.y = dy > 0 ? 1 : -1;
            enemy[i].update();
            if (enemy[i].colliding) {
                enemy[i].directions.y = 0;
                enemy[i].directions.x = dx > 0 ? 1 : -1;
            }
                enemy[i].attack()
                    
            }
            else{ 
                enemy[i].directions.x = enemy[i].fixedDir;
                if (enemy[i].onTop && cy > eney || cy< eney) {
                    enemy[i].directions.y = 0;
                }
                enemy[i].directions.y = cy > eney ? 1 : -1;
            }
        }
        obstacleCollision(enemy[i])
        enemy[i].update()
        enemyAttack(enemy[i])
        if(enemy[i].type=="gun"&&hasLineOfSight(enex,eney,cx,cy,map)){
            enemy[i].shoot(player,ebullets,camera)
        }
       } 
    }
}
function show() {
    if(player.hp>0){ctx.fillStyle = "snow";
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
    player.draw(ctx);
    weapon();
    ctx.restore();}
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`Level: ${currentLevel}`, canvas.width-100, 20);
    ctx.fillStyle = "black";
    ctx.font = "22px Arial";
    ctx.textAlign = "right";

    ctx.fillText(
        `Wave ${currentWave + 1} / ${totalWaves()}`,
        canvas.width - 120,
        20
    );

    if (waitingForNextWave && waveCooldown > 0) {
        ctx.font = "26px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
            `Next wave in ${Math.ceil(waveCooldown / 60)}`,
            canvas.width / 2,
            60
        );
    }
    if (player.hp <= 0) {
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
            "Game Over",canvas.width / 2,canvas.height / 2);
        ctx.textAlign = "left"
        ctx.textBaseline = "top"
        ctx.font = "24px Arial"
        ctx.fillStyle = "white"
        if(player.hp<0){
            player.hp=0
            player.alive=false
        }
    }
}
let lastFireTime=0
function update(){
   if(player.hp>0){ levelincreased=false
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemyMove();
    if(player.hp>0){updateWaves(currentLevel - 1);}
    player.onTop = false;
    obstacleCollision(player);
    playerAttackCollision();
    playerMove();
    player.update();
    if (mouseDown && player.primary === "gun" &&!gun.reloading&&player.alive) 
    {
        const now = performance.now();
        if (now - lastFireTime > player.fireRate) {
            if (gun.currAmmo > 0) {
                const x = cx + Math.cos(angle) * gun.size.width;
                const y = cy + Math.sin(angle) * gun.size.width;
                bullets.push(new Bullet(x, y, angle, player));
                gun.currAmmo--;
                lastFireTime = now;
            }
            else {
                gun.reload();
            }
        }
    }
    if (player.primary === "gun") {
    ammoText.textContent = gun.currAmmo;
    reserveText.textContent = gun.totalAmmo;
    }
    hpText.textContent=player.hp
    cx = (player.left + player.right) / 2;
    cy = (player.top + player.bottom) / 2;
    const lerp = 0.01;
    let x = player.position.x + player.size.width / 2 - (canvas.width / 2) / zoom;
    let y = player.position.y + player.size.height / 2 - (canvas.height / 2) / zoom;
    view.x += (x - view.x) * lerp;
    view.y += (y - view.y) * lerp;
    if (view.x < 0) view.x = 0;
    if (view.y < 0) view.y = 0;
    if (view.x + canvas.width / zoom > world.width) view.x = world.width - canvas.width / zoom;
    if (view.y + canvas.height / zoom > world.height) view.y = world.height - canvas.height / zoom;}
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
