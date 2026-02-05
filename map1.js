const platformTopImage = new Image()
platformTopImage.src = "./png/platt.png"

const platformWallImage = new Image()
platformWallImage.src = "./png/plat.png"

class Map {
    constructor(x, y, w, h) {
        this.position = { x, y }
        this.size = { width: w, height: h }
    }

    get top() { return this.position.y }
    get left() { return this.position.x }
    get right() { return this.position.x + this.size.width }
    get bottom() { return this.position.y + this.size.height }
    draw(ctx) {
    if (!platformTopImage.complete || !platformWallImage.complete) return

        const isVertical = this.size.height > this.size.width

        if (isVertical) {
            this.drawVertical(ctx)
        } else {
            this.drawHorizontal(ctx)
        }
    }
    drawHorizontal(ctx) {
        const imgW = platformTopImage.width
        const imgH = platformTopImage.height

        const scale = this.size.height / imgH
        const drawW = imgW * scale

        for (let x = 0; x < this.size.width; x += drawW) {
            ctx.drawImage(
                platformTopImage,
                this.position.x + x,
                this.position.y,
                drawW,
                    this.size.height
                )
            }
    }
    drawVertical(ctx) {
        const imgW = platformWallImage.width
        const imgH = platformWallImage.height

        const scale = this.size.width / imgW
        const drawH = imgH * scale

        for (let y = 0; y < this.size.height; y += drawH) {
            ctx.drawImage(
                platformWallImage,
                this.position.x,
                this.position.y + y,
                this.size.width,
                drawH
            )
        }
    }


}

export default Map
