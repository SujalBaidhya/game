class Bullet{
    constructor(){
        this.size={
        width:10,
        height:10
        }
        this.hitStatus=false
        this.speed=3
    }
    draw(ctx,x,y){
        ctx.beginPath()
        ctx.rect(x,y,this.size.width,this.size.height)
        ctx.fill()
    }
}
export default Bullet