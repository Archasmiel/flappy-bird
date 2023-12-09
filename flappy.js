import {Bird, Tube, Background, Road} from 'gameobjects.js';

class Resources {

    sounds
    images

    constructor() {
        this.sounds = {}
        this.images = {}
    }

    load(path) {
        let name = path.split("/")
        name = name[name.length-1].split(".")
        name = name[0]

        if (path.includes(".png")) {
            let img = new Image()
            img.src = path
            this.images.set(name, img)
        } 
        else 
        if (path.includes(".mp3")) {
            let img = new Audio()
            img.src = path
            this.sounds.set(name, img)
        } 
        else {
            return
        }
    }

    get(key) {
        let ret = -1

        if (this.images.has(key)) {
            ret = this.images.get(key)
        } 
        else 
        if (this.sounds.has(key)) {
            ret = this.sounds.get(key)
        }

        return ret
    }

}

class Game {
    // engine
    ctx
    resources
    // game obj
    bird
    tubes
    bg
    road
    // score
    score
    bestScore
    paused

    constructor(ctx, resources) {
        this.ctx = ctx
        this.resources = resources
        this.bird = new Bird(this.ctx, resources.get("bird"), 
            resources.get("fly"), 0.8)
        this.bg = new Background(this.ctx, resources.get("back"))
        this.road = new Road(this.ctx, resources.get("road"))
        this.tubes = []
        this.score = 0
        this.bestScore = 0
        this.paused = false
    }

    reload() {
        this.bird.velY = 0
        this.bird.yPos = 0
        this.tubes = []
        
        if (this.score > this.bestScore) {
            this.bestScore = this.score
        }
        this.score = 0

        document.getElementById('score').innerHTML = 'SCORE: ' + this.score
        document.getElementById('best_score').innerHTML = 'BEST SCORE: ' + this.bestScore
    }

    draw() {
        if (paused) {
            // draw paused
            this.bg.draw()
            this.bird.draw()

            this.tubes.forEach((e) => {
                if (e.canRemove()) {
                    tubes.shift()
                    console.log("removed pipe")
                } else {
                    // e.update()
                    e.draw()
                }
            })

            this.road.draw()
            return
        }

        // draw non-paused
        this.bg.draw()
        this.bird.draw()

        this.tubes.forEach((e) => {
            if (e.canRemove()) {
                tubes.shift()
                console.log("removed pipe")
            } else {
                e.update()
                e.draw()
            }
        })

        this.road.draw()

        this.bg.update()
        this.bird.update()
        this.road.update()
    }

    pipeGen() {
        if (this.tubes.length < 10) {
            let random = Math.floor(Math.random() * 212) + 100;
            let tube = new Tube(this.ctx, 
                this.resources.get("pipeUp"), this.resources.get("pipeBottom"),
                random-75, random+75)
            this.tubes.push(tube)
        }
    }

    initScore() {
        document.getElementById('score').innerHTML = 'SCORE: ' + this.score
        document.getElementById('best_score').innerHTML = 'BEST SCORE: ' + this.bestScore
    }

    launch() {
        this.initScore()

        setTimeout(this.draw, 20)
        setTimeout(this.pipeGen, 2000)
    }
}

let canv = document.getElementById('canvas')
let ctx = canv.getContext('2d')

canv.height = 512
canv.width = 256
canv.style.border = "1px solid black"

addEventListener("mousedown", (event) =>{
    moveUp()
})

function moveUp(){
    if (paused) {
        return;
    }
    velY = -10
    fly.pause()
    fly.currentTime = 0
    fly.play()
}

function draw(){
    if (paused) {
        if (backX <= -256){
            backX = 0
        }

        ctx.drawImage(back, backX, 0)
        ctx.drawImage(back, backX + 256, 0)
        ctx.drawImage(bird, 0, yPos)

        tubes.forEach((e) => {
            if (e.canRemove()) {
                tubes.shift()
                console.log("removed pipe")
            } else {
                // e.update()
                e.draw(ctx)
            }
        })

        ctx.drawImage(road, backX, 412)
        ctx.drawImage(road, backX + 256, 412)

        backX = backX - 2
        return;
    }


    
    
    let nearPipe = null
    let nearX = 1000
    tubes.forEach((e) => {
        if (!e.passed) {
            if (e.x > 0 && e.x < 20) {
                currScore += 1
                e.passed = true
                document.getElementById('score').innerHTML = 'SCORE: ' + currScore
            }
        }
        if (e.x >= 0 && e.x <= nearX) {
            nearPipe = e
            nearX = e.x
        }

        if (e.canRemove()) {
            tubes.shift()
            console.log("removed pipe")
        } else {
            e.update()
            e.draw(ctx)
        }
    })

    if (nearX <= 38 && (yPos <= nearPipe.topY || yPos+38 >= nearPipe.botY)) {
        reload()
    }

    ctx.drawImage(road, backX, 412)
    ctx.drawImage(road, backX + 256, 412)

    velY = velY + gravity
    yPos = yPos + velY
}

function pipeGen() {
    
}

function reload() {
    velY = 0
    yPos = 0
    tubes = []
    
    if (currScore > bestScore) {
        bestScore = currScore
    }
    currScore = 0
    document.getElementById('score').innerHTML = 'SCORE: ' + currScore
    document.getElementById('best_score').innerHTML = 'BEST SCORE: ' + bestScore
}

 document.addEventListener("keydown", (e) => {
    if (e.code == 'ArrowUp') {
        moveUp();
    }
 });

 function game_pause() {
    paused = !paused;
 }

setInterval(draw, 20)
setInterval(pipeGen, 2000)

