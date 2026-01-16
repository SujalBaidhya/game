class Bullet{
    constructor(x,y,d){
        this.size={
        width:10,
        height:10
        }
        this.position={
            x:x,
            y:y
        }
        this.hitStatus=false
        this.speed=3
        this.direction=d
        this.gravity=0.25
    }
    draw(ctx){
        ctx.beginPath()
        ctx.rect(this.position.x,this.position.y,this.size.width,this.size.height)
        ctx.fillStyle="black"
        ctx.fill()
    }
    update(){
        this.position.x+=this.speed*this.direction
        this.position.y+this.gravity
    }
}
export default Bullet