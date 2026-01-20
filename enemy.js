import Sword from "./sword.js"
import Guns from "./guns.js"
import Bullet from "./bullets.js"
class Enemy{
    constructor(x,y,type){
        this.position={
            x:x,
            y:y
        }
        this.size={
            width:20,
            height:20
        }
        this.directions={
            x:1,
            y:0
        }
        this.speed=1
        // this.max={
        //     top:top,
        //     left:left,
        //     right:right,
        //     bottom:bottom
        // }
        this.type=type
        if(this.type=="sword"){this.weapon=new Sword()}
        if(this.type=="gun"){this.weapon=new Guns()}
        this.facing
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
        ctx.fillStyle="white"
        ctx.fill()
        this.weaponDraw(ctx)
    }
    weaponDraw(ctx){
        if(this.type=="sword"){
        this.weapon.draw(ctx,(this.left+this.right)/2,(this.top+this.bottom)/2,this.facing)
        }
        else if(this.type=="gun"){  
            const angle=Math.atan2(cy-this.position.y/cx-this.position.x)
            this.weapon.draw(ctx,(this.left+this.right)/2,(this.top+this.bottom)/2,angle)
        }
    }
    update(){
        this.position.x+=this.speed*this.directions.x
        this.position.y+=this.speed*this.directions.y
        if(this.left<this.max.left){
            this.position.x=this.max.left
        }
        else if(this.top<this.max.top){
            this.position.y=this.max.top
        }
        else if(this.right>this.max.right){
            this.position.x=this.max.right+this.size.width
        }
        else if(this.bottom<this.max.bottom){
            this.position.y=this.max.bottom+this.size.height
        }
        if(this.weapon){
            this.weapon.update(this.facing)
        }
    }
    attack(){
            if(this.weapon){
                this.weapon.attack()
            }
    }
}
export default Enemy