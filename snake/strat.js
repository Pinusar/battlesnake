import {printDebugInfo} from "./mapVisualizer.js";

const DEATH = -100;
const HEAD_DANGER = -50;
const DEAD_END = -30;
const DEAD_END_LIGHT = -25;
const MILD_DANGER = -10;
const TAIL = 0.02;
const FOOD = 15;
const HEAD_WIN = 50;

export function executeHeatMap(gameState) {
    let heatMap = populateHeatMap(gameState);
    let moves = getMoves(gameState);
    let possibleMoves = getPossibleMoves(heatMap, moves);
    let bestMove = getMaxScoreMove(possibleMoves, heatMap);
    printDebugInfo(gameState, heatMap);
    return bestMove.direction;
}

function populateHeatMap(gameState) {
    const height = gameState.board.height;
    const width = gameState.board.width;
    let heatMap = initializeHeatMap(height, width);
    markSnakes(gameState, heatMap);
    markHazards(gameState, heatMap);
    markFood(gameState, heatMap);
    floodFill(height, width, heatMap, gameState);
    return heatMap;
}

function initializeHeatMap(height, width) {
    let heatMap = [];
    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
            if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
                row.push(-1)
            } else {
                row.push(0);
            }
        }
        heatMap.push(row);
    }
    return heatMap;
}

function markSnakes(gameState, heatMap) {
    const myId = gameState.you.id;
    const myLength = gameState.you.body.length;
    gameState.board.snakes.forEach(snake => {
        for (let i = 0; i < snake.body.length; i++){
            const c = snake.body[i];
            if (i === 0) {
                if (snake.id !== myId) {
                    if (snake.body.length + 1 >= myLength) {
                        createSquare(c.y, c.x, heatMap, 1, HEAD_DANGER);
                    } else {
                        createSquare(c.y, c.x, heatMap, 1, HEAD_WIN);
                    }
                }
            }
            if (i === snake.body.length -1) {
                bump(c.y, c.x, heatMap, TAIL);
            } else {
                bump(c.y, c.x, heatMap, DEATH);
            }
        }
    })
}
function markHazards(gameState, heatMap) {
    gameState.board.hazards.forEach(c => {
        bump(c.y, c.x, heatMap, -3)
    })
}

function markFood(gameState, heatMap) {
    gameState.board.food.forEach(food => {
        bump(food.y, food.x, heatMap, FOOD);
        createSquare(food.y, food.x, heatMap, 1, 3);
        createSquare(food.y, food.x, heatMap, 2, 2);
        createSquare(food.y, food.x, heatMap, 3, 1);
        createSquare(food.y, food.x, heatMap, 4, 0.8);
        createSquare(food.y, food.x, heatMap, 5, 0.4);
        createSquare(food.y, food.x, heatMap, 6, 0.2);
        createSquare(food.y, food.x, heatMap, 7, 0.1);
    })
}

function floodFill(height, width, heatMap, gameState) {
    let setOfAreas = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (heatMap[y][x] > MILD_DANGER) {
                let possibleMoves = exploreMovesForCell(y, x, heatMap, setOfAreas);
                if (possibleMoves.length > 0) {
                    setOfAreas.push(possibleMoves);
                }
            }
        }
    }

    let myLength = gameState.you.body.length;
    setOfAreas.sort((a, b) => b.length - a.length);

    for (let i = 0; i < setOfAreas.length; i++){
        const area = setOfAreas[i];
        if (area.length < myLength) {
            area.forEach(cell => {
                bump(cell.y, cell.x, heatMap, DEAD_END + i * -10)
            })
        }
    }

}
function exploreMovesForCell(y, x, heatMap, setOfAreas) {
    if (setOfAreas.some(area => containsMove(area, {x, y}))) {
        return [];
    }
    let toExplore = [{x, y}];
    let explored = [];
    let possibleMoves = [];
    while (toExplore.length > 0) {
        let nextMove = toExplore.pop();
        explore(nextMove.y, nextMove.x, heatMap, possibleMoves, toExplore, explored);
    }
    return possibleMoves;
}
function explore(y, x, heatMap, possibleMoves, toExplore, explored) {
    let currentMove = {x, y};
    if (containsMove(explored, currentMove)) {
        return;
    }

    let height = heatMap.length - 1;
    let width = heatMap[0].length - 1;

    let up = {y: y + 1, x: x}
    let down = {y: y - 1, x: x}
    let left = {y: y, x: x - 1}
    let right = {y: y, x: x + 1};
    let movesToExplore = [currentMove, up, down, left, right];
    movesToExplore.forEach(m => {
            if (!(m.x > width || m.y < 0 || m.y > height || m.y < 0)) {
                if (heatMap[m.y][m.x] > -20) {
                    if (!containsMove(possibleMoves, {y:m.y, x: m.x})) {
                        possibleMoves.push(m);
                        toExplore.push(m);
                    }
                }
            }
        }
    )
    explored.push(currentMove);
}

function getMoves(gameState) {
    const myHead = gameState.you.body[0]
    return [
        {
            direction: 'right',
            coordinate: {x: myHead.x + 1, y: myHead.y}
        },
        {
            direction: 'left',
            coordinate: {x: myHead.x - 1, y: myHead.y}
        },
        {
            direction: 'up',
            coordinate: {x: myHead.x, y: myHead.y + 1}
        },
        {
            direction: 'down',
            coordinate: {x: myHead.x, y: myHead.y - 1}
        },
    ];
}

function getPossibleMoves(heatMap, moves) {
    let height = heatMap.length - 1;
    let width = heatMap[0].length - 1;
    return moves.filter(move => !(move.coordinate.x > width || move.coordinate.y < 0 || move.coordinate.y > height || move.coordinate.y < 0));
}

function getMaxScoreMove(filteredMoves, heatMap) {
    let bestMove = null;
    let max = -1000;
    filteredMoves.forEach(m => {
        let y = m.coordinate.y;
        let x = m.coordinate.x;
        if (heatMap[y][x] > max) {
            max = heatMap[y][x];
            bestMove = m;
        }
    })
    return bestMove;
}

function containsMove(moveSet, targetMove) {
    return moveSet.some(m => movesMatch(m, targetMove));
}
function movesMatch(m1, m2) {
    return m1.x === m2.x && m1.y === m2.y;
}

function createSquare(y, x, heatMap, squareSize, by = 3) {
    for (let i = -squareSize; i < squareSize + 1; i++) {
        bump(y + squareSize, x + i, heatMap, by);
        bump(y - squareSize, x + i, heatMap, by);
    }
    bump(y, x + squareSize, heatMap, by);
    bump(y, x - squareSize, heatMap, by);
}

function bump(y, x, map, by) {
    if (x < 0 || x >= map.length || y < 0 || y >= map.length) return
    map[y][x] += by;
}