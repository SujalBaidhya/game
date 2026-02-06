import Sword from "./sword.js"
import Guns from "./guns.js"
import Bullet from "./bullets.js"
const idle=document.getElementById("idle")
const walking=document.getElementById("walking")
const flying=document.getElementById("flying")
const images=[idle,walking,flying]
const stateImageMap = {
    idle: idle,
    walking: walking,
    flying: flying,
};
class Enemy{
    constructor(x,y,type,delay){
        this.position={
            x:x,
            y:y
        }
        this.size={
            width:75,
            height:75
        }
        this.directions={
            x:1,
            y:0
        }
        this.state="idle"
        this.speed=1
        this.prevleft = 10
        this.prevtop = 10
        this.prevright = 10
        this.prevbottom = 10
        // this.max={
        //     top:top,
        //     left:left,
        //     right:right,
        //     bottom:bottom
        // }
        // this.img=new Image()
        // this.img.src="enemy.png"
        this.type=type
        if(this.type=="sword"){this.weapon=new Sword(),
            this.gap=100
        }
        if(this.type=="gun"){this.weapon=new Guns(),
            this.gap=600
        }
        this.facing
        this.state="idle"
        this.alive=true
        this.delay=delay
        this.lastAttack=0
        this.angle=0
        this.hp=20
        this.onTop=false
        this.isJumping=false
        this.fixedDir = Math.random() < 0.5 ? -1 : 1;
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
    draw(ctx) {
    if(!this.onTop){
        this.state="flying"
    }
    else{
        this.state="walking"
    }
    const img = stateImageMap[this.state] || idle;
    ctx.save();
    if (this.facing === -1) {
        ctx.translate(this.right, this.top);
        ctx.scale(-1, 1);
        ctx.drawImage(
            img,
            0,
            0,
            this.size.width,
            this.size.height
        );
    } else {
        ctx.drawImage(
            img,
            this.left,
            this.top,
            this.size.width,
            this.size.height
        );
    }
    ctx.restore();
    this.weaponDraw(ctx);
    }
    weaponDraw(ctx){
        if(this.type=="sword"){
        this.weapon.draw(ctx,(this.left+this.right)/2,(this.top+this.bottom)/2,this.facing)
        }
        else if(this.type=="gun"){  
            this.weapon.draw(ctx,(this.left+this.right)/2,(this.top+this.bottom)/2,this.angle)
        }
    }
    shoot(player,ebullets,camera){
        if(this.type=="gun"&&this.alive){
            if (
                this.right < camera.left ||this.left > camera.right ||this.bottom < camera.top ||this.top > camera.bottom
            ) {
                return;
            }
            // if(player.left>this.max.left&&player.right<this.max.right&&player.top>this.max.top&&player.bottom<this.max.bottom){
                const now = Date.now();
                if (now - this.lastAttack < this.delay) return;
                const cx = (this.left + this.right) / 2 + Math.cos(this.angle) * 50;
                const cy = (this.top + this.bottom) / 2 +Math.sin(this.angle)*50;
                const px = (player.left + player.right) / 2;
                const py = (player.top + player.bottom) / 2;
                const angle = Math.atan2(py - cy, px - cx)+(Math.random() - 0.5) *0.1;
                ebullets.push(new Bullet(cx,cy,angle,this))
                this.lastAttack = now;
            // }
        }
    }
    update(){
        this.prevbottom = this.bottom
        this.prevleft = this.left
        this.prevright = this.right
        this.prevtop = this.top
        this.position.x+=this.speed*this.directions.x
        this.onTop=false
        if(this.type=="gun"){this.position.y+=this.speed*this.directions.y}
        // if(this.left<this.max.left){
        //     this.position.x=this.max.left
        // }
        // else if(this.top<this.max.top){
        //     this.position.y=this.max.top
        // }
        // else if(this.right>this.max.right){
        //     this.position.x=this.max.right+this.size.width
        // }
        // else if(this.bottom<this.max.bottom){
        //     this.position.y=this.max.bottom+this.size.height
        // }
        if(this.type=="sword"){
            this.weapon.update(this.facing)
        }
    }
    attack(){
            if(this.type=="sword"){
                const now = Date.now();
                if (now - this.lastAttack >=this.delay) 
                {
                    this.weapon.attack()
                    this.lastAttack=now
                }
            }
    }
}
export default Enemy