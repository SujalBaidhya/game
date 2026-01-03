class Map{
    constructor(){
        this.position={
            x:100,
            y:window.innerHeight/2
        }
        this.size={
            width:100,
            height:30
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
    draw(ctx){
        ctx.beginPath()
        ctx.fillRect(this.position.x,this.position.y,this.size.width,this.size.height)
        // ctx.closPath()
    }
    
}
export default Map