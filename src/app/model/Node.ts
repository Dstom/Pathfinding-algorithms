export class MyNode {
  x: number;
  y: number;
  status: Status;
  F: number;
  G: number;
  H: number;
  parent: MyNode | undefined;
  neighbors: MyNode[];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.F = 0;
    this.G = 0;
    this.H = 0;
    this.status = Status.Path;
    this.parent = undefined;
    this.neighbors = [];
  }

  addNeighbors(grid: MyNode[][]) {
    const [rows, cols] = [grid.length, grid[0].length];
    if (this.x < cols - 1) this.neighbors.push(grid[this.x + 1][this.y]);
    if (this.x > 0) this.neighbors.push(grid[this.x - 1][this.y]);
    if (this.y < rows - 1) this.neighbors.push(grid[this.x][this.y + 1]);
    if (this.y > 0) this.neighbors.push(grid[this.x][this.y - 1]);
    if (this.x > 0 && this.y > 0) this.neighbors.push(grid[this.x - 1][this.y - 1]);
    if (this.x < cols - 1 && this.y > 0) this.neighbors.push(grid[this.x + 1][this.y - 1])
    if (this.x > 0 && this.y < rows - 1) this.neighbors.push(grid[this.x - 1][this.y + 1])
    if (this.x < cols - 1 && this.y < rows - 1) this.neighbors.push(grid[this.x + 1][this.y + 1]);
  }
}

export enum Status {
  Start,
  End,
  Wall,
  Path,
  Visited,
  ShortestPath,
}

export const StatusColors = {
  [Status.Start]: "#008f39",
  [Status.End]: "#CB3234",
  [Status.Wall]: "#004987",
  [Status.Path]: "#e3e3e3",
  [Status.Visited]: "#e5923d",
  [Status.ShortestPath]: "#AB44EE"
}
