class Guns {
  constructor() {
    this.size = {
      width: 100,
      height: 50
    };

    this.img = new Image();
    this.img.src = "gun.png";  
    this.currAmmo = 30;   // bullets in current mag
    this.totalAmmo = 100; // total spare bullets
    this.magSize=30
    this.reloadTime = 1000; // ms
    this.reloading = false;
    this.lastShotTime = 0;
  }
  reload() {
    if (this.reloading) return;
    if (this.totalAmmo <= 0) return;
    if (this.currAmmo === this.magSize) return;
    this.reloading = true;
    setTimeout(() => {
      const needed = this.magSize - this.currAmmo;
      const load = Math.min(needed, this.totalAmmo);
      this.currAmmo += load;
      this.totalAmmo -= load;
      this.reloading = false;
    }, this.reloadTime);
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
