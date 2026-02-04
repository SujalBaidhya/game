class Sword {
  constructor() {
    this.length = 150;
    this.width = 30;
    this.isAttacking = false;
    this.attackTime = 0;
    this.attackDuration = 50;
    this.defaultAngle = 0;
    this.hitbox={
      x:0,
      y:0,
      width:this.length,
      length:this.width,
    }
    this.hitStatus=false
    this.image=new Image()
    this.image.src="png/sword.png"
  }
  attack() {
    if (!this.isAttacking) {
      this.isAttacking = true;
      this.attackTime = 0;
    }
  }
  update(facing) {
    if (facing == 1) {
      this.defaultAngle = 0;
    }
    else {
      this.defaultAngle = Math.PI
    }
    if (this.isAttacking) {
      this.attackTime++;
      if (this.attackTime >= this.attackDuration) {
        this.hitStatus=false
        this.isAttacking = false;
      }
    }
  }
  draw(ctx, cx, cy, facing) {
    let angle = this.defaultAngle;

    if (this.isAttacking) {
        const t = this.attackTime / this.attackDuration;
        const swingRange = Math.PI / 2;
        const swingStart = -Math.PI / 4;
        let swing = swingStart + t * swingRange;

        if (facing === -1) {
            swing = Math.PI - swing;
        }

        angle = swing;
    }
    this.hitbox.x = cx + Math.cos(angle) * this.length;
    this.hitbox.y = cy + Math.sin(angle) * this.length;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    if (facing === -1) {
        ctx.scale(1, -1);
    }
    ctx.drawImage(
        this.image,
        0,
        -this.width / 2,
        this.length,
        this.width
    );

    ctx.restore();
}

}
export default Sword