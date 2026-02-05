const idle=document.getElementById("p_idle")
const jump=document.getElementById("p_jump")
const walk1=document.getElementById("p_walk1")
const walk2=document.getElementById("p_walk2")
const walk=[walk1,walk2]
class Player1 {
    constructor() {
        this.position = {
            x: 0,
            y:3000
        }
        this.gravity = 0.1
        this.size = {
            width: 100,
            height: 100
        }
        this.directions = {
            x: 0,
            y: 0
        }
        this.speed = 2
        this.lastKey
        this.prevleft = 0
        this.prevtop = 0
        this.prevright = 0
        this.prevbottom = 0
        this.onTop = false
        this.facing
        this.primary = "gun"
        this.secondary = null
        this.fireRate=200
        this.isjumping = false
        this.hp = 100
        this.alive = true
        this.move = false
        this.state="idle"
        this.walkFrame = 0;
        this.walkTimer = 0;
        this.walkSpeed = 150;
    }
    get left() {
        return this.position.x
    }
    get right() {
        return this.position.x + this.size.width
    }
    get top() {
        return this.position.y
    }
    get bottom() {
        return this.position.y + this.size.height
    }
    draw(ctx) {
    let img;

    if (this.state === "jump") {
        img = jump;
    } else if (this.state === "walk") {
        img = walk[this.walkFrame];
    } else {
        img = idle;
    }
    const cx = (this.left + this.right) / 2;
    const cy = (this.top + this.bottom) / 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(this.facing || 1, 1);
    ctx.drawImage(
        img,
        -this.size.width / 2,
        -this.size.height / 2,
        this.size.width,
        this.size.height
    );

    ctx.restore();
}

    update() {
        this.prevbottom = this.bottom
        this.prevleft = this.left
        this.prevright = this.right
        this.prevtop = this.top
        if (!this.onTop) {
            this.state = "jump";
        } 
        else if (this.directions.x !== 0) {
            this.state = "walk";
        } 
        else {
            this.state = "idle";
        }
        if (this.state === "walk") {
        const now = Date.now();
        if (now - this.walkTimer > this.walkSpeed) {
            this.walkFrame = (this.walkFrame + 1) % walk.length;
            this.walkTimer = now;
        }
        } 
        else {
            this.walkFrame = 0;
        }
        this.position.x += this.directions.x * this.speed
        this.position.y += this.directions.y * this.speed
        if (!this.onTop) {
            this.directions.y += this.gravity
            if (this.directions.y > 8) {
                this.directions.y = 8
            }
        }
        else { this.directions.y = 0 }
    }
}
export default Player1
