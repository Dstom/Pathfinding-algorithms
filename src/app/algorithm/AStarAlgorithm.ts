import { MyNode, Status } from "../model/Node";

const normalDistance = 10;
const diagDistance = 14;

export const createGrid = (rows: number, cols: number) => {
    const grid = Array(rows).fill(null).map((x, xIndex) => Array(cols).fill(null).map((y, yIndex) => new MyNode(xIndex, yIndex)))
    return grid;
}

export const addNeighbors = (grid: MyNode[][]) => {
    const newGrid = grid.slice();
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            newGrid[i][j].addNeighbors(grid);
        }
    }
    return newGrid;
}

export const getNewGridWithNewNodeStatus = (grid: MyNode[][], x: number, y: number, status: Status) => {
    const newGrid = grid.slice();
    const node = newGrid[x][y];
    const newNode: MyNode = new MyNode(x, y)
    newNode.neighbors = [...node.neighbors]
    newNode.status = status;
    newGrid[x][y] = newNode;
    return newGrid;
}

export const aStarAlgorithm = (startNode: MyNode, endNode: MyNode) => {
    let openSet: MyNode[] = [];
    let closedSet: MyNode[] = [];
    let path: MyNode[] = [];
    let visitedNodes: MyNode[] = [];

    openSet.push(startNode);

    while (openSet.length > 0) {
        let leastIndex = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].F < openSet[leastIndex].F) {
                leastIndex = i;
            }
        }

        let current: MyNode = openSet[leastIndex];
        visitedNodes.push(current);

        if (current.x === endNode.x && current.y === endNode.y) {
            let temp = current;
            path.push(temp);
            while (temp.parent) {
                path.push(temp.parent)
                temp = temp.parent;
            }
            console.log(path)
            return { path, visitedNodes };
        }
        removeFromArray(openSet, current)
        closedSet.push(current);

        let neighbors = current.neighbors;

        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (!closedSet.includes(neighbor) && neighbor.status !== Status.Wall) {
                let tempG = current.G + 1;
                let newPath = false;

                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.G) {
                        neighbor.G = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.G = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }

                if (newPath) {
                    neighbor.H = heuristic(neighbor, endNode);
                    neighbor.F = neighbor.G + neighbor.H;
                    neighbor.parent = current;
                }
            }
        }
    }
    return { path, visitedNodes, error: "No Path Found" };
}

// TODO: new heuristic
export const heuristic = (node: MyNode, endNode: MyNode) => {
    //max(y2 - y1, x2 - x1)
    // var d1 = Math.abs(endNode.x - node.x) + Math.abs(endNode.y - node.y);

    //var d2 = Math.abs(endNode.x - node.x) + Math.abs(endNode.y - node.y);
    //return d1;
    return Math.hypot(endNode.x - node.x, endNode.y - node.y)
}

const removeFromArray = (arr: MyNode[], elt: MyNode) => {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}
