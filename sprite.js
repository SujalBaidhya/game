class Sprite{
    constructor(imageSrc,width,height,rows,columns){
        this.image=new Image()
        this.image.src=imageSrc
        this.size={
            width:width,
            height:height
        }
        this.row=rows,
        this.columns=columns
        
    }
}