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
    return bestMove;
}

function populateHeatMap(gameState) {
    const height = gameState.board.height;
    const width = gameState.board.width;
    const myHead = gameState.you.body[0]
    let heatMap = [];
    initializeHeatMap(height, width, heatMap);
    markSnakes(gameState, heatMap, myHead);
    markFood(gameState, heatMap, height, width);
    markDangerousPlaces(height, width, heatMap, myHead);
    markDangerousPlaces(height, width, heatMap, myHead);

    return heatMap;
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
    gameState.board.snakes.forEach(snake => {
        snake.body.forEach(c => heatMap[c.y][c.x] = -7)
    })
    heatMap[myHead.y][myHead.x] -= 8;
}

function markFood(gameState, heatMap, height, width) {
    gameState.board.food.forEach(food => {
        heatMap[food.y][food.x] = 10;
    })
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (heatMap[i][j] === 10) {
                createSmallSquare(i, j, heatMap);
                createMediumSquare(i, j, heatMap);
            }
        }
    }
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
                } else if (heatMap[n.y][n.x] < -5) {
                    if (!(myHead.x === n.x && myHead.y === n.y)) {
                        count++;
                    }
                }
            })

            if (count >= 3) {
                bump(y, x, heatMap, -5);
            }
        }
    }
}
function createSmallSquare(i, j, heatMap) {
    bump(i + 1, j + 1, heatMap, 5);
    bump(i + 1, j, heatMap, 5);
    bump(i + 1, j - 1, heatMap, 5);
    bump(i, j - 1, heatMap, 5);
    bump(i, j + 1, heatMap, 5);
    bump(i - 1, j, heatMap, 5);
    bump(i - 1, j + 1, heatMap, 5);
    bump(i - 1, j - 1, heatMap, 5);
}

function createMediumSquare(i, j, heatMap) {
    bump(i + 2, j, heatMap, 3);
    bump(i + 2, j + 1, heatMap, 3);
    bump(i + 2, j - 1, heatMap, 3);
    bump(i, j + 2, heatMap, 3);
    bump(i, j - 2, heatMap, 3);
    bump(i - 2, j, heatMap, 3);
    bump(i - 2, j + 1, heatMap, 3);
    bump(i - 2, j - 1, heatMap, 3);
    bump(i - 2, j + 2, heatMap, 3);
    bump(i - 2, j + 2, heatMap, 3);
    bump(i - 2, j - 2, heatMap, 3);
    bump(i - 2, j - 2, heatMap, 3);
}
function bump(y, x, map, by) {
    if (x < 0 || x >= 11 || y < 0 || y >= 11) return
    map[y][x] += by;
}