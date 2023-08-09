export default function heatMap(gameState) {
    const height = gameState.board.height;
    const width = gameState.board.width;
    const myHead = gameState.you.body[0]

    let heatMap = [];
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            if (i === 0 || i === height -1 || j === 0 || j === width -1) {
                row.push(-1)
            } else {
                row.push(0);
            }
        }
        heatMap.push(row);
    }

    gameState.board.snakes.forEach(snake => {
        snake.body.forEach(c => heatMap[c.y][c.x] = -3)
    })

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

    const bestMove = moves.reduce((prev, current) => (heatMap[prev.y][prev.x] > heatMap[current.y][current.x]) ? prev : current)

    return bestMove.direction;
}