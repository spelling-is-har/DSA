const board = []

for (let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
        board.push([i,j])
    }
}

//helper function that returns an array of valid moves on an 8x8 grid, given a starting position of [x,y]
export function getValidMoves(start) {
    const moves = []

    //up & down 1, left and right 2
    for (let x = -2; x <= 2; x += 4) {
        for (let y = - 1; y <= 2; y += 2){
            const xAxis = start[0] + x
            const yAxis = start[1] + y
        
            if ((xAxis >= 0 && xAxis <= 7) && (yAxis >=0 && yAxis <=7)) {
                moves.push([xAxis,yAxis])
            }
        }
    }

    //up & down 2, left and right 1
    for (let x = -1; x <= 2; x += 2) {
        for (let y = -2; y <= 2; y += 4){
            const xAxis = start[0] + x
            const yAxis = start[1] + y
        
            if ((xAxis >= 0 && xAxis <= 7) && (yAxis >=0 && yAxis <=7)) {
                moves.push([xAxis,yAxis])
            }
        }
    }

    return moves
}

function findKnightsShortestPath(start, end){

    //case that the start location is already the correct location
    if (start === end) return start

    const movesMade = {}
    movesMade[start] = true

    const queue = []
    queue.push(start)

    while (queue.length > 0) {
        movesMade[queue[0]] = true
        if (queue[0][0] === end[0] && queue[0][1] === end[1]) {
            return Object.keys(movesMade)
        }

        const arr = [...getValidMoves(queue[0])]

        arr.forEach((element) => {
            if (movesMade[element] != true) {
                queue.push(element)
            }
        })

        queue.shift()
    }
}

const moves = findKnightsShortestPath([0,0], [7,7])

console.log(moves)