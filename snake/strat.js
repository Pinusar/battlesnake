const DEATH = -100;
const HEAD_DANGER = -50;
const DEAD_END = -30;
const DEAD_END_LIGHT = -25;
const MILD_DANGER = -10;

function movesMatch(m1, m2) {
    return m1.x === m2.x && m1.y === m2.y;
}

function containsMove(moveSet, targetMove) {
    return moveSet.some(m => movesMatch(m, targetMove));
}

function checkCollisionWithSnake(myHead, body, isMoveSafe) {
    const rightMove = {x: myHead.x + 1, y: myHead.y};
    const leftMove = {x: myHead.x - 1, y: myHead.y};
    const upMove = {x: myHead.x, y: myHead.y + 1};
    const downMove = {x: myHead.x, y: myHead.y - 1};


    console.log('checking collision with body', body)
    if (containsMove(body, rightMove)) {
        console.log('includes right move')
        isMoveSafe.right = false;
    }
    if (containsMove(body, leftMove)) {
        console.log('includes left move')
        isMoveSafe.left = false;
    }
    if (containsMove(body, upMove)) {
        console.log('includes up move')
        isMoveSafe.up = false;
    }
    if (containsMove(body, downMove)) {
        console.log('includes down move')
        isMoveSafe.down = false;
    }
}

function checkEnemyCollision(gameState, isMoveSafe) {
    const myHead = gameState.you.body[0];
    const enemies = gameState.board.snakes;
    enemies.forEach(e => {
        console.log(`Checking collison with sname ${e.id}`)
        checkCollisionWithSnake(myHead, e.body, isMoveSafe)
    })
}

function checkBorderCollisions(gameState, isMoveSafe) {
    console.log('checking bounds')
    const myHead = gameState.you.body[0];
    const boardWidth = gameState.board.width;
    const boardHeight = gameState.board.height;
    if (myHead.x >= boardWidth - 3) {
        isMoveSafe.right = false;
    }
    if (myHead.x === 0) {
        isMoveSafe.left = false;
    }
    if (myHead.y === 0) {
        isMoveSafe.down = false;
    }
    if (myHead.y >= boardHeight - 3) {
        isMoveSafe.up = false;
    }
}

function getPreferredMove(gameState) {
    const myHead = gameState.you.body[0];
    const rightMove = {x: myHead.x + 1, y: myHead.y};
    const leftMove = {x: myHead.x - 1, y: myHead.y};
    const upMove = {x: myHead.x, y: myHead.y + 1};
    const downMove = {x: myHead.x, y: myHead.y - 1};
    let preferredMove = null;
    const food = gameState.board.food;
    food.forEach(f => {
        console.log('checking food')
        console.log(f)
        console.log('right move', rightMove)
        if (movesMatch(f, rightMove)) {
            preferredMove = 'right'
        }
        if (movesMatch(f, leftMove)) {
            preferredMove = 'left'
        }
        if (movesMatch(f, upMove)) {
            preferredMove = 'up'
        }
        if (movesMatch(f, downMove)) {
            preferredMove = 'down'
        }
    })
    return preferredMove;
}

export function executeMainStrategy(gameState, preferredMove) {
    console.log('executing main strategy')
    let nextMove;
    let isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true
    };

    checkBorderCollisions(gameState, isMoveSafe);
    checkEnemyCollision(gameState, isMoveSafe);


    const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
    if (safeMoves.length === 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        nextMove = "down";
    }

    console.log('safe moves', safeMoves)
    nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

    let foodMove = getPreferredMove(gameState);

    console.log('foodmove', foodMove)
    console.log('preferred', preferredMove)
    if (foodMove != null && containsMove(safeMoves, foodMove)) {
        console.log('hello!')
        console.log(`seeing food at (${foodMove}`)
        nextMove = foodMove
    } else if (preferredMove != null && safeMoves.includes(preferredMove)) {
        nextMove = preferredMove;
    }
    return nextMove;
}

export function executeFoodStrategy(gameState) {
    let food = gameState.board.food[0];
    console.log(`Executing food strat. Target: ${JSON.stringify(food)}`)
    return executeTargetStrategy(gameState, food);
}

function executeTargetStrategy(gameState, target) {
    let nextMove;
    function getPreferred() {
        const myHead = gameState.you.body[0];
        let preferredMove;

        if (target.x < myHead.x) {
            preferredMove = "left"
        } else if (target.x > myHead.x) {
            preferredMove = "right"
        } else if (target.y < myHead.y) {
            preferredMove = "down"
        } else if (target.y > myHead.y) {
            preferredMove = "up"
        }
        return preferredMove;
    }
    return executeMainStrategy(gameState, getPreferred(gameState));
}


function printHeatmap(heatMap) {
    let heatmapPicture = '';
    for (let row = 10; row >= 0; row--) {
        for (let square = 0; square < 11; square++) {
            let score = heatMap[row][square];
            heatmapPicture += `[${score.toFixed(1).padStart(5)}]`
        }
        heatmapPicture += '\n';
    }
    console.log('HEAT MAP\n', heatmapPicture);
}

export function executeHeatMap(gameState) {
    let heatMap = populateHeatMap(gameState);

    const myHead = gameState.you.body[0]
    let moves = [
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
    ]

    let borderAvoidingMoves = moves.
        filter(move => !(move.coordinate.x > 10 || move.coordinate.y < 0 || move.coordinate.y > 10 || move.coordinate.y < 0));

    populateGameStatePicture(gameState)
    printHeatmap(heatMap);

    let bestMove = getMaxScoreMove(borderAvoidingMoves, heatMap);
    return bestMove.direction;
}

function getMaxScoreMove(filteredMoves, heatMap) {
    let bestMove = null;
    let max = -1000;
    filteredMoves.forEach(m => {
        let y = m.coordinate.y;
        let x = m.coordinate.x;
        if (heatMap[y][x] > max) {
            max = heatMap[y][x]
            bestMove = m
        }
    })
    console.log(JSON.stringify(filteredMoves))
    console.log(`Best move is ${bestMove.direction} (${bestMove.coordinate.x}, ${bestMove.coordinate.y}). Score: ${max}`)
    return bestMove;
}

function populateHeatMap(gameState) {
    const height = gameState.board.height;
    const width = gameState.board.width;
    const myHead = gameState.you.body[0]
    let heatMap = [];
    initializeHeatMap(height, width, heatMap);
    markSnakes(gameState, heatMap, myHead);
    markHazards(gameState, heatMap, myHead);
    markFood(gameState, heatMap, height, width);

    colorFill(height, width, heatMap, gameState);


    return heatMap;
}

function populateGameStatePicture(gameState) {
    const height = gameState.board.height;
    const width = gameState.board.width;
    let picture = [];
    initializeHeatMap(height, width, picture);
    gameState.board.snakes.forEach(snake => {
        snake.body.forEach(c => picture[c.y][c.x] = 'S')
    })
    gameState.board.food.forEach(food => {
        picture[food.y][food.x] = 'F'
    })

    let result = '';
    for (let row = 10; row >= 0; row--) {
        for (let square = 0; square < 11; square++) {
            let score = picture[row][square];
            result += `[${score.toString().padStart(2)}]`
        }
        result += '\n';
    }
    console.log('GAME STATE\n', result);
}

function initializeHeatMap(height, width, heatMap) {
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
}

function markSnakes(gameState, heatMap, myHead) {
    const myId = gameState.you.id;
    gameState.board.snakes.forEach(snake => {
        for (let i = 0; i < snake.body.length; i++){
            const c = snake.body[i];
            bump(c.y, c.x, heatMap, DEATH);
            if (i === 0) {
                if (snake.id !== myId) {
                    createSmallSquare(c.y, c.x, heatMap, HEAD_DANGER);
                }
            }
        }
    })
    heatMap[myHead.y][myHead.x] = -33.3;
}
function markHazards(gameState, heatMap, myHead) {
    gameState.board.hazards.forEach(c => {
        bump(c.y, c.x, heatMap, -3)
    })
}

function bumpFood(height, width, heatMap) {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (heatMap[i][j] > 8) {
                createSmallSquare(i, j, heatMap, 3);
                createMediumSquare(i, j, heatMap, 2);
                createSquare(i, j, heatMap, 3, 1);
                createSquare(i, j, heatMap, 4, 0.8);
                createSquare(i, j, heatMap, 5, 0.4);
                createSquare(i, j, heatMap, 6, 0.2);
                createSquare(i, j, heatMap, 7, 0.1);
            }
        }
    }
}

function markFood(gameState, heatMap, height, width) {
    gameState.board.food.forEach(food => {
        bump(food.y, food.x, heatMap, 10)
    })
    bumpFood(height, width, heatMap);
}

function markDangerousPlaces(height, width, heatMap, myHead) {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let up = {y: y + 1, x: x}
            let down = {y: y - 1, x: x}
            let left = {y: y, x: x - 1}
            let right = {y: y, x: x + 1};
            let neighbours = [up, down, left, right];
            let count = 0;

            neighbours.forEach(n => {
                if (n.x > 10 || n.y < 0 || n.y > 10 || n.y < 0) {
                    count++;
                } else if (heatMap[n.y][n.x] <= DEAD_END_LIGHT) {
                    if (!(myHead.x === n.x && myHead.y === n.y)) {
                        count++;
                    }
                }
            })

            if (count >= 3) {
                bump(y, x, heatMap, DEAD_END);
            }



        }
    }
}

function explore(y, x, heatMap, possibleMoves, toExplore, explored) {
    if (containsMove(explored, {x, y})) {
        return;
    }

    let up = {y: y + 1, x: x}
    let down = {y: y - 1, x: x}
    let left = {y: y, x: x - 1}
    let right = {y: y, x: x + 1};
    let neighbours = [up, down, left, right];
    neighbours.forEach(n => {
            if (!(n.x > 10 || n.y < 0 || n.y > 10 || n.y < 0)) {
                if (heatMap[n.y][n.x] > -20) {
                    if (!containsMove(possibleMoves, {y:n.y, x: n.x})) {
                        possibleMoves.push(n);
                        toExplore.push(n);
                    }
                }
            }
        }
    )
    if (!containsMove(possibleMoves, {x, y})) {
        possibleMoves.push({x, y});
    }
    explored.push({x, y});
}

function exploreMovesForCell(y, x, heatMap, setOfAreas) {
    if (setOfAreas.some(area => containsMove(area, {x, y}))) {
        return [];
    }

    let toExplore = [];
    let explored = [];
    let possibleMoves = [];

    explore(y, x, heatMap, possibleMoves, toExplore, explored);

    while (toExplore.length > 0) {
        let nextMove = toExplore.pop();
        explore(nextMove.y, nextMove.x, heatMap, possibleMoves, toExplore, explored);
    }

    return possibleMoves;
}

function colorFill(height, width, heatMap, gameState) {
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

function createSmallSquare(y, x, heatMap, by= 5) {
    createSquare(y, x, heatMap, 1, by);
}

function createMediumSquare(y, x, heatMap, by = 3) {
    createSquare(y, x, heatMap, 2, by);
}

function createSquare(y, x, heatMap, squareSize, by = 3) {
    for (let i = -squareSize; i < squareSize + 1; i++) {
        bump(y + squareSize, x + i, heatMap, by);
    }

    bump(y, x + squareSize, heatMap, by);
    bump(y, x - squareSize, heatMap, by);

    for (let i = -squareSize; i < squareSize + 1; i++) {
        bump(y - squareSize, x + i, heatMap, by);
    }
}



function bump(y, x, map, by) {
    if (x < 0 || x >= 11 || y < 0 || y >= 11) return
    map[y][x] += by;
}