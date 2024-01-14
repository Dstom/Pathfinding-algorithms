import React from 'react'
import { MyNode, Status, StatusColors } from '../model/Node';
interface Props {
    node: MyNode;
    cellClicked(x: number, y: number): void;
    handleMouseDown(x: number, y: number): void;
    handleMouseEnter(x: number, y: number): void;
    handleMouseUp(): void;

}

export const Node = ({ node, cellClicked, handleMouseDown, handleMouseEnter, handleMouseUp }: Props) => {
    const { x, y } = node;

    return (
        <div            
            style={{
                backgroundColor: StatusColors[node.status]
            }}
            key={`${x},${y}`}
            onClick={() => cellClicked(x, y)}
            onMouseDown={() => handleMouseDown(x, y)}
            onMouseEnter={() => handleMouseEnter(x, y)}
            onMouseUp={() => handleMouseUp()}
            className='border border-black rounded-md'></div>
    )
}

