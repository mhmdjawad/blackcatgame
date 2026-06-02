export default class Point{
    x:number;
    y:number;
    constructor(pos = {x:0,y:0}){
        this.x = pos.x;
        this.y = pos.y;
    }
    moveBy(x:number,y:number){
        return new Point({x:this.x + x,y:this.y + y});
    }
    moveToward(p2 : Point,dist=1){
        var vx = this.x == p2.x ? 0 : this.x < p2.x ? dist : -dist;
        var vy = this.y == p2.y ? 0 : this.y < p2.y ? dist : -dist;
        this.x += vx;
        this.y += vy;
    }
    distance(p2 : Point){
        let distance = 0;
        distance += Math.pow((this.x - p2.x), 2);
        distance += Math.pow((this.y - p2.y), 2);
        distance = Math.sqrt(distance);
        return distance;
    }
    getAngleTo(target:Point){
        let dx = target.x - this.x;
        let dy = target.y - this.y;
        let angleRadians = Math.atan2(dy, dx);
        return angleRadians * 180/Math.PI;
    }
    moveByAngle(rotation = 0,distance = 0){
        const rRad = rotation * (Math.PI / 180);
        const vx = distance * Math.cos(rRad);
        const vy = distance * Math.sin(rRad);
        this.x = this.x + vx;
        this.y = this.y + vy;
    }
}