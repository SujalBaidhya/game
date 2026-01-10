class Map{
    constructor(x,y,w,h){
        this.position={
            x:x,
            y:y
        }
        this.size={
            width:w,
            height:h
        }   
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
        ctx.fillStyle="pink"
        ctx.fill()
    }
    
}
export default Map