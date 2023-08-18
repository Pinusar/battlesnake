import {executeHeatMap} from "./strat.js";

// See https://docs.battlesnake.com/api/example-move for available data
export default function moveSnake(gameState) {
    console.log('Starting turn:', JSON.stringify(gameState))
    let nextMove;

    if (gameState.turn < 30) {
        nextMove = executeHeatMap(gameState);
    } else {
        nextMove = executeHeatMap(gameState);
    }

    console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    return {move: nextMove};
}