class Bullet{
    constructor(x,y,angle){
        this.size={
        width:10,
        height:10
        }
        this.position={
            x:x,
            y:y
        }
        this.hitStatus=false
        this.speed=2
        this.direction={
            x:Math.cos(angle)*this.speed,
            y:Math.sin(angle)*this.speed
        }
        this.gravity=0.02
    }
    get top(){
        return this.position.y
    }
    get left(){
        return this.position.x
    }
    get right(){
        return this.position.x+this.size.width
    }
    get bottom(){
        return this.position.y+this.size.height
    }
    draw(ctx){
        ctx.beginPath()
        ctx.rect(this.position.x,this.position.y,this.size.width,this.size.height)
        ctx.fillStyle="black"
        ctx.fill()
    }
    update(){
        this.position.x+=this.speed*this.direction.x
        this.direction.y+=this.gravity
        this.position.y+=this.direction.y
    }
}
export default Bullet