
const BaseDict= [1,1,2,4,8,12,20,32,52,84,132,200,300,450,700,1000,1500,2200,3200,4700,7000];
export default class MergeCalculator {
    static calculateGain(val : number){
        if(val < BaseDict.length) return BaseDict[val];
        var a = BaseDict[BaseDict.length-2];
        var b = BaseDict[BaseDict.length-1];
        for(let i = BaseDict.length; i <= val; i++){
            var c = a + b;
            BaseDict.push(c);
            a = b;
            b = c;
        }
        return b;
    }
}