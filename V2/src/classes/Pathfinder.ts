export default class Pathfinder {
    rows:number;
    cols:number;
    maze : number[][];
    constructor(maze : number[][]) {
        this.maze = maze;
        this.rows = maze.length;
        this.cols = maze[0]?.length ?? 0;
    }
    findPath(startRow : number, startCol : number, endRow : number, endCol : number) {
        startRow = Math.floor(startRow);
        startCol = Math.floor(startCol);
        endRow = Math.floor(endRow);
        endCol = Math.floor(endCol);
        const openSet = [];
        const closedSet = new Set();
        const cameFrom : any = {};
        const gScore = new Array(this.rows).fill(null).map(() => new Array(this.cols).fill(Infinity));
        gScore[startRow][startCol] = 0;
        const fScore = new Array(this.rows).fill(null).map(() => new Array(this.cols).fill(Infinity));
        fScore[startRow][startCol] = this.heuristic(startRow, startCol, endRow, endCol);
        openSet.push([startRow, startCol]);
        while (openSet.length > 0) {
            const current = this.findLowestFScore(openSet, fScore);
            const [currentRow, currentCol] = current;
            if (currentRow === endRow && currentCol === endCol) {
                return this.reconstructPath(cameFrom, current);
            }
            openSet.splice(openSet.indexOf(current), 1);
            closedSet.add(`${currentRow}-${currentCol}`);
            const neighbors = this.getNeighbors(currentRow, currentCol);
            for (const neighbor of neighbors) {
                const [neighborRow, neighborCol] = neighbor;
                if (closedSet.has(`${neighborRow}-${neighborCol}`) || this.maze[neighborRow][neighborCol]) {
                    continue;
                }
                const tentativeGScore = gScore[currentRow][currentCol] + 1;
                if (tentativeGScore < gScore[neighborRow][neighborCol]) {
                    cameFrom[`${neighborRow}-${neighborCol}`] = current;
                    gScore[neighborRow][neighborCol] = tentativeGScore;
                    fScore[neighborRow][neighborCol] = tentativeGScore + this.heuristic(neighborRow, neighborCol, endRow, endCol);
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
        return null; // No path found
    }
    heuristic(row1 :number, col1 : number, row2 : number, col2 : number) {return Math.abs(row1 - row2) + Math.abs(col1 - col2);}
    findLowestFScore(nodes : number[][], fScore : number[][]) {let lowestNode = nodes[0];let lowestFScore = fScore[lowestNode[0]][lowestNode[1]];for (const node of nodes) {const [row, col] = node;if (fScore[row][col] < lowestFScore) {lowestNode = node;lowestFScore = fScore[row][col];}}return lowestNode;}
    getNeighbors(row : number, col : number) {const neighbors = [];if (row > 0) {neighbors.push([row - 1, col]);}if (row < this.rows - 1) {neighbors.push([row + 1, col]);}if (col > 0) {neighbors.push([row, col - 1]);}if (col < this.cols - 1) {neighbors.push([row, col + 1]);}return neighbors;}
    reconstructPath(cameFrom : any, current : any) {const path = [current];while (cameFrom.hasOwnProperty(`${current[0]}-${current[1]}`)) {current = cameFrom[`${current[0]}-${current[1]}`];path.unshift(current);}return path;}
}