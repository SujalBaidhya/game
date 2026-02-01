class Guns {
  constructor() {
    this.size = {
      width: 100,
      height: 50
    };

    this.img = new Image();
    this.img.src = "gun.png";
  }

  draw(ctx, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);

    let flip = 1;
    let rot=angle
    if (angle > Math.PI / 2 || angle < -Math.PI / 2) {
      flip = -1;
      rot=Math.PI+angle
    }
    ctx.rotate(rot);
    ctx.scale(flip, 1);
    ctx.drawImage(this.img,0,-this.size.height / 2,this.size.width,this.size.height);
    ctx.restore();
  }
}

export default Guns;
