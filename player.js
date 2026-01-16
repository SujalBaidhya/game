class Player1 {
    constructor() {
        this.position = {
            x: 0,
            y: 400
        }
        this.gravity = 0.2
        this.size = {
            width: 50,
            height: 50
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
        this.isjumping=false
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
        const cx = (this.left + this.right) / 2;
        const cy = (this.top + this.bottom) / 2;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(this.facing, 1); 

        const w = this.size.width;
        const h = this.size.height;


        ctx.fillStyle = "red";
        ctx.fillRect(-w / 2, -h / 2, w / 2, h);


        ctx.fillStyle = "blue";
        ctx.fillRect(0, -h / 2, w / 2, h);

        ctx.restore();
    }

    collide() {
        if (this.top < 0) {
            this.position.y = 0
        }
        if (this.left < 0) {
            this.position.x = 0
        }
        if (this.right > 3000) {
            this.position.x = 3000 - this.size.width
        }
        if (this.bottom > 1000) {
            this.position.y = 1000 - this.size.height
        }
    }
    update() {
        this.prevbottom = this.bottom
        this.prevleft = this.left
        this.prevright = this.right
        this.prevtop = this.top
        this.position.x += this.directions.x * this.speed
        this.position.y += this.directions.y * this.speed
        if (!this.onTop) {
            this.directions.y += this.gravity
            if(this.directions.y>8){
                this.directions.y=8
            }
        }
        else { this.directions.y = 0 }
        this.collide()
    }
}
export default Player1
