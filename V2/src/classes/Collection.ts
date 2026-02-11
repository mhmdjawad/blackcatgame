export default class Collection{
    coordinates : Set<any>;
    objects : any[];
    score:number;
    constructor(){
        this.coordinates = new Set();
        this.objects = [];
        this.score = 0;
    }
    length() {return this.objects.length}
    removeLast(){
        var last = this.objects.pop();
        const key = JSON.stringify(last);
        this.coordinates.delete(key);
        this.score = this.getSquenceScore();
    }
    getFirst(){
        if(this.objects.length > 0) return this.objects[0];
    }
    getLast(){
        if(this.objects.length > 0) return this.objects[this.objects.length - 1];
    }
    getbeforeLast(){
        if(this.objects.length > 1){
            return this.objects[this.objects.length - 2];
        }
    }
    add(obj : any){
        const key = JSON.stringify(obj);
        if (!this.coordinates.has(key)) {
            this.coordinates.add(key);
            this.objects.push(obj);
            return true;
        }
        return false;
    }
    has(obj : any){
        return this.coordinates.has(JSON.stringify(obj));
    }
    getAll(){
        return [...this.objects];
    }
    getSequence(){
        var vals = this.objects.map(x=>x.val);
        if(vals.length == 0) return ' ';
        return vals.join('');
    }
    getSquenceScore(){
        return 0;
    }
}