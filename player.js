class Player1{
    constructor(){
        this.position={
            x:100,
            y:100
        }
        this.gravity=0.1
        this.size={
            width:50,
            height:50
        }
        this.directions={
            x:0,
            y:0
        }
        this.speed=2
        this.lastKey
    }
    get left(){
        return this.position.x
    }
    get right(){
        return this.position.x+this.size.width
    }
    get top(){
        return this.position.y
    }
    get bottom(){
        return this.position.y+this.size.height
    }
    draw(ctx){
        ctx.beginPath()
        ctx.rect(this.position.x,this.position.y,this.size.width,this.size.height)
        ctx.fill()
    }
    collide(){
        if(this.position.y>=300){
            this.directions.y=0
        }
    }
    update(){
        this.position.y+=this.directions.y*this.speed
        this.position.x+=this.directions.x*this.speed
        if(this.bottom+this.speed+this.directions.y+5<window.innerHeight){
            this.directions.y+=this.gravity
        }
        else {this.directions.y=0}
    }
}
export default Player1
