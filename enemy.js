class Enemy{
    constructor(){
        this.position={
            x:Math.random()*window.innerWidth,
            y:10
        }
        this.size={
            width:20,
            height:20
        }
        this.directions={
            x:0,
            y:1
        }
        this.speed=1
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
        ctx.fillRect(this.position.x,this.position.y,this.size.width,this.size.height)
    }
    update(){
        this.position.x+=this.speed*this.directions.x
        this.position.y+=this.speed*this.directions.y
    }
}
export default Enemy