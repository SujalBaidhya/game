
class Guns{
    constructor(){
        this.range=window.innerWidth
        this.damage=10
        this.size={
            width:50,
            height:10
        }
        // this.bulletSpread=0
        this.angle=0
        this.translate={
            x:0,
            y:0
        }
    }
    draw(ctx,x,y,angle){
        this.translate.x=x
        this.translate.y=y
        this.angle=angle
        ctx.save()
        ctx.beginPath()
        ctx.translate(this.translate.x,this.translate.y)
        ctx.rotate(this.angle)
        ctx.rect(0,0,this.size.width,this.size.height)
        ctx.fillStyle="green"
        ctx.fill()
        ctx.restore()
    }
}
export default Guns
