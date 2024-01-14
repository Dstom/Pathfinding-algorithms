'use client';
import { useEffect, useRef, useState } from "react";
import { MyNode, Status } from "./model/Node";
import { Node } from "./components/Node";
import { addNeighbors, aStarAlgorithm, createGrid, getNewGridWithNewNodeStatus, heuristic } from "./algorithm/AStarAlgorithm";

const rows = 20;
const cols = 20;
const WIDTH = 800; const HEIGHT = 600;

export enum InitNodesEnum {
  Start = "Start",
  End = "End"
}

export default function Home() {
  const [mouseIsPressed, setMouseIsPressed] = useState(false)
  const [grid, setGrid] = useState(createGrid(rows, cols))
  const [selectOption, setselectOption] = useState(InitNodesEnum.Start);
  const [initialNodes, setInitialNodes] = useState({
    [InitNodesEnum.Start]: { selected: false, x: -1, y: -1 },
    [InitNodesEnum.End]: { selected: false, x: -1, y: -1 }
  });
  
  const cellClicked = (x: number, y: number) => {
    if (!initialNodes[selectOption].selected) {
      const newGrid = [...grid];
      newGrid[x][y].status = selectOption === InitNodesEnum.Start ? Status.Start : Status.End
      setGrid(newGrid);
      setInitialNodes({ ...initialNodes, [selectOption]: { selected: true, x, y } })
    }
  }

  const selectHandleChange = (event: any) => {
    const selected = event.target.value;
    setselectOption(selected);
  }

  const handleMouseDown = (row: number, col: number) => {

    const newGrid = getNewGridWithNewNodeStatus(grid, row, col, Status.Wall);
    setMouseIsPressed(true);
    if (newGrid !== undefined) setGrid(newGrid)
  }

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithNewNodeStatus(grid, row, col, Status.Wall);
    if (newGrid !== undefined) setGrid(newGrid)
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false)
  }

  const startAlgorithm = () => {
    setGrid(addNeighbors(grid));
    const endNode = grid[initialNodes[InitNodesEnum.End].x][initialNodes[InitNodesEnum.End].y];
    const startNode = grid[initialNodes[InitNodesEnum.Start].x][initialNodes[InitNodesEnum.Start].y];
    console.log({ startNode })

    const { path, visitedNodes, error } = aStarAlgorithm(startNode, endNode)
    console.log({ path, visitedNodes })
    if (error === undefined) {
      visualizePath(visitedNodes, path);
    } else {

    }
  }
  const visualizeShortestPath = (shortestPath: MyNode[]) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        let newGrid = getNewGridWithNewNodeStatus(grid, shortestPath[i].x, shortestPath[i].y, Status.ShortestPath);
        setGrid(newGrid);
      }, 10 * i);
    }

  }
  const visualizePath = (visitedNodes: MyNode[], shortestPath: MyNode[]) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      if (i === visitedNodes.length - 1) {
        setTimeout(() => {
          visualizeShortestPath(shortestPath)
        }, 20 * i);
      } else {
        setTimeout(() => {
          let newGrid = getNewGridWithNewNodeStatus(grid, visitedNodes[i].x, visitedNodes[i].y, Status.Visited);
          setGrid(newGrid);
        }, 20 * i);
      }

    }
  }

  return (
    <>
      <div className='grid' style={{ width: WIDTH, height: HEIGHT, gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {
          grid.map((x, index) => (
            x.map((p, index2) => (
              <Node
                key={`${index},${index2}`}
                node={p}
                cellClicked={cellClicked}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
                handleMouseUp={handleMouseUp} />
            ))
          ))
        }
      </div>
      <select value={selectOption} onChange={selectHandleChange}>
        {
          Object.keys(InitNodesEnum).filter((v) => isNaN(Number(v))).map(x =>
            <option key={x} value={x}>{x}</option>
          )
        }
      </select>
      <button
        onClick={() => startAlgorithm()}
        className="p-2 bg-blue-600 text-white">
        Start Finding
      </button>
    </>
  )
}