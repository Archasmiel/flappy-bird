class Background {
    ctx
    sprite
    xPos

    constructor(ctx, sprite) {
        this.ctx = ctx
        this.sprite = sprite
        this.xPos = 0
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.xPos, 0)
        this.ctx.drawImage(this.sprite, this.xPos + 256, 0)
    }

    update() {
        if (this.xPos <= -256){
            this.xPos = 0
        }
        this.xPos -= 2
    }

}

class Bird {
    game
    ctx

    sprite
    flySound

    yPos
    velY
    gravity

    constructor(game, ctx, sprite, flySound, gravity) {
        this.game = game
        this.ctx = ctx

        this.sprite = sprite
        this.flySound = flySound

        this.yPos = 0
        this.velY = 0
        this.gravity = gravity
    }

    draw() {
        this.ctx.drawImage(this.sprite, 0, this.yPos)
    }

    update() {
        if (this.yPos > 412) {
            this.game.reload()
            return
        }
        this.velY += this.gravity
        this.yPos += this.velY
    }

    moveUp() {
        if (this.game.paused) {
            return;
        }
        this.velY = -10
        this.flySound.pause()
        this.flySound.currentTime = 0
        this.flySound.play()
    }

}

class Tube {
    ctx
    // coordinates
    topY
    botY
    x 
    // textures
    topTube
    botTube
    passed

    constructor(ctx, topTube, botTube, topY, botY){
        this.ctx = ctx
        this.botY = botY
        this.topY = topY
        this.topTube = topTube
        this.botTube = botTube
        this.x = 300
        this.passed = false
    }
    
    update(){
        this.x = this.x - 2
    }

    canRemove(){
        return this.x <= -100
    }

    draw(){
        this.ctx.drawImage(this.topTube, this.x, this.topY-242)
        this.ctx.drawImage(this.botTube, this.x, this.botY)
    }
}

class Road {
    ctx
    sprite
    xPos

    constructor(ctx, sprite) {
        this.ctx = ctx
        this.sprite = sprite
        this.xPos = 0
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.xPos, 0)
        this.ctx.drawImage(this.sprite, this.xPos + 256, 0)
    }

    update() {
        if (this.xPos <= -256){
            this.xPos = 0
        }
        this.xPos -= 2
    }

}