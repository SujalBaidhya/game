class Sword {
  constructor() {
    this.length = 50;
    this.width = 5;
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
        swing = Math.PI - swing
      };
      angle = swing;
    }
    this.hitbox.x = cx + Math.cos(angle) * this.length;
    this.hitbox.y = cy + Math.sin(angle) * this.length;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(this.hitbox.x, this.hitbox.y);
    ctx.strokeStyle = "golden";
    ctx.lineWidth = this.width;
    ctx.stroke();
  }
}
export default Sword