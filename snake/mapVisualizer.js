export function printDebugInfo(gameState, heatMap) {
    populateGameStatePicture(gameState)
    printHeatmap(heatMap);
}
function populateGameStatePicture(gameState) {
    const height = gameState.board.height;
    const width = gameState.board.width;
    let picture = initializeHeatMap(height, width);
    gameState.board.snakes.forEach(snake => {
        snake.body.forEach(c => picture[c.y][c.x] = 'S')
    })
    gameState.board.food.forEach(food => {
        picture[food.y][food.x] = 'F'
    })

    let result = '';
    for (let row = picture.length - 1; row >= 0; row--) {
        for (let square = 0; square < picture.length; square++) {
            let score = picture[row][square];
            result += `[${score.toString().padStart(2)}]`
        }
        result += '\n';
    }
    console.log('GAME STATE\n', result);
}
function printHeatmap(heatMap) {
    let heatmapPicture = '';
    for (let row = heatMap.length - 1; row >= 0; row--) {
        for (let square = 0; square < heatMap[0].length; square++) {
            let score = heatMap[row][square];
            heatmapPicture += `[${score.toFixed(1).padStart(5)}]`
        }
        heatmapPicture += '\n';
    }
    console.log('HEAT MAP\n', heatmapPicture);
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