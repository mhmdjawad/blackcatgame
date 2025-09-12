class Cat{
    constructor(game){
        this.animations = game.spriteEngine.AnimateCat(); 
    }
    Idle(){
        return this.animations[0];
    }
    IdleAnimation(){
        return [
            this.animations[0],
            this.animations[1]
        ]
    }
    WalkingAnimation(){
        var frames = [];
        for(let i = 2 ; i <= 5;i++){
            frames.push(this.animations[i]);
        }
        return frames;
    }
    CarSprite(windowsprite){
        var canvas = G.makeCanvas(w,h);
        var ctx = canvas.ctx;
        // Draw wheels
        var wheelW = w * 0.22, wheelH = h * 0.18;
        ctx.save();
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.ellipse(w * 0.25, h * 0.85, wheelW/2, wheelH/2, 0, 0, Math.PI * 2);
        ctx.ellipse(w * 0.75, h * 0.85, wheelW/2, wheelH/2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        // Draw car body
        ctx.save();
        ctx.fillStyle = '#e23d3d';
        ctx.beginPath();
        ctx.moveTo(w*0.1, h*0.7);
        ctx.lineTo(w*0.1, h*0.5);
        ctx.bezierCurveTo(w*0.1, h*0.3, w*0.3, h*0.15, w*0.5, h*0.15);
        ctx.bezierCurveTo(w*0.7, h*0.15, w*0.9, h*0.3, w*0.9, h*0.5);
        ctx.lineTo(w*0.9, h*0.7);
        ctx.quadraticCurveTo(w*0.9, h*0.8, w*0.8, h*0.8);
        ctx.lineTo(w*0.2, h*0.8);
        ctx.quadraticCurveTo(w*0.1, h*0.8, w*0.1, h*0.7);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        // Draw car roof (window area)
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(w*0.25, h*0.5);
        ctx.bezierCurveTo(w*0.28, h*0.28, w*0.72, h*0.28, w*0.75, h*0.5);
        ctx.lineTo(w*0.75, h*0.5);
        ctx.lineTo(w*0.25, h*0.5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        // Draw window sprite and overlay with light blue
        if(windowsprite){
            ctx.save();
            ctx.globalAlpha = 1;
            ctx.drawImage(windowsprite, w*0.28, h*0.29, w*0.44, h*0.21);
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = '#aee7ff';
            ctx.fillRect(w*0.28, h*0.29, w*0.44, h*0.21);
            ctx.globalAlpha = 1;
            ctx.restore();
        } else {
            ctx.save();
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = '#aee7ff';
            ctx.fillRect(w*0.28, h*0.29, w*0.44, h*0.21);
            ctx.globalAlpha = 1;
            ctx.restore();
        }
        // Optional: add car details (door line, lights)
        ctx.save();
        ctx.strokeStyle = '#b22222';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w*0.5, h*0.7);
        ctx.lineTo(w*0.5, h*0.8);
        ctx.stroke();
        // Headlights
        ctx.fillStyle = '#fffbe0';
        ctx.beginPath();
        ctx.ellipse(w*0.88, h*0.7, w*0.04, h*0.03, 0, 0, Math.PI*2);
        ctx.fill();
        // Taillights
        ctx.fillStyle = '#ffb3b3';
        ctx.beginPath();
        ctx.ellipse(w*0.12, h*0.7, w*0.04, h*0.03, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
        return canvas;
    }
    CatInCar(){
        var canvas = G.makeCanvas(80,48);
        // canvas.fill('#fff');
        var ctx = canvas.ctx;
        var catsprite = this.Idle();
        var catInWindow = G.crop(catsprite,5,0,22,18);       
        ctx.drawImage(catInWindow,29,11);
        function ccircle(ctx,c){
            ccc(ctx,c[0],c[1],c[2],c[3],c[4],c[5],c[6]);
        }
        var circles = [
            ['#f00',8,35,7,8,0,0],
            ['#f00',16,32,5,8,0,0],
            ['#f00',70,36,9,7,0,0],
            //wheels
            ['#333',16,41,7,7,0,0],
            ['#333',65,41,7,7,0,0],
            ['#b7b7b7',16,41,4,3,0,0],
            ['#b7b7b7',65,41,4,3,0,0],
        ];
        ccircle(ctx,['#4498dda3',40,24,30,18,0,0]);
        ccircle(ctx,['#0d4b7ee3',65,28,5,9,60,120]);
        drawrect(ctx,'#f00',8,28,64,15);
        circles.forEach(c=> ccircle(ctx,c));
        return canvas;
    }
    
}