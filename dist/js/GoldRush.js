const GOLD_RATIO = 0.2;
const WALLS_RATIO = 0.2;

class GoldRush extends Matrix {
    constructor(numRows, numColoumns) {
        super()

        this.numRows = numRows;
        this.numColoumns = numColoumns;
        this.startingPosition = {
            player1: [0, 0],
            player2: [numRows - 1, numColoumns - 1]
        }

        this.players = {
            player1: {
                position: _.cloneDeep(this.startingPosition.player1),
                lastPosition: _.cloneDeep(this.startingPosition.player1),
                score: 0
            },
            player2: {
                position: _.cloneDeep(this.startingPosition.player2),
                lastPosition: _.cloneDeep(this.startingPosition.player2),
                score: 0
            }
        }

        this.gold = {
            amount: getRandomInt(numRows * numColoumns * GOLD_RATIO) + 1,
            coordinates: []
        }

        this.walls = {
            amount: getRandomInt(numRows * numColoumns * WALLS_RATIO) + 1,
            coordinates: []
        }

        this.matrix = this.loadBoard(numRows, numColoumns);
    }

    loadBoard(numRows, numColoumns) {
        let matrix = []

        for (let r = 0; r < numRows; r++) {
            matrix.push([]);

            for (let c = 0; c < numColoumns; c++) {
                matrix[r].push('.')
            }

        }

        matrix = this.setGold(matrix);
        matrix = this.setWalls(matrix);
        matrix = this.setPlayers(matrix);

        return matrix;

    }

    setGold(matrix) {
        for (let g = 0; g < this.gold.amount; g++) {
            let coordinate = [getRandomInt(this.numRows - 1) + 1, getRandomInt(this.numColoumns - 1)];

            while (isTileOccuoied(this.gold.coordinates, coordinate) || coordinate === this.startingPosition.player1 || coordinate === this.startingPosition.player2) {
                coordinate = [getRandomInt(this.numRows - 1), getRandomInt(this.numColoumns - 1)];
            }

            this.gold.coordinates.push(coordinate);
            matrix[coordinate[0]][coordinate[1]] = 'g';

        }

        return matrix;
    }

    setWalls(matrix) {
        for (let w = 0; w < this.walls.amount; w++) {
            let coordinate = [getRandomInt(this.numRows - 1) + 1, getRandomInt(this.numColoumns - 1)];

            while (this.isBlockingWall(matrix, coordinate) || isTileOccuoied(this.walls.coordinates, coordinate) || isTileOccuoied(this.gold.coordinates, coordinate) || coordinate === this.startingPosition.player1 || coordinate === this.startingPosition.player2) {
                coordinate = [getRandomInt(this.numRows - 1), getRandomInt(this.numColoumns - 1)];
            }

            this.walls.coordinates.push(coordinate);
            matrix[coordinate[0]][coordinate[1]] = 'w';

        }

        return matrix;
    }

    isBlockingWall(matrix, tile) {
        if (tile[0] === 0 || tile[0] === matrix.length - 1 || tile[1] === 0 || tile[1] === matrix[0].length - 1) { return true; };

        let diagonaleEmptyCount = 0;
        let straightEmptyCount = 0;

        if (matrix[tile[0] + 1][tile[0] + 1] === '.') { diagonaleEmptyCount += 1 }
        if (matrix[tile[0] - 1][tile[0] - 1] === '.') { diagonaleEmptyCount += 1 }
        if (matrix[tile[0] - 1][tile[0] + 1] === '.') { diagonaleEmptyCount += 1 }
        if (matrix[tile[0] + 1][tile[0] - 1] === '.') { diagonaleEmptyCount += 1 }

        if (matrix[tile[0] + 1][tile[0]] === '.') { straightEmptyCount += 1 }
        if (matrix[tile[0] - 1][tile[0]] === '.') { straightEmptyCount += 1 }
        if (matrix[tile[0]][tile[0] + 1] === '.') { straightEmptyCount += 1 }
        if (matrix[tile[0]][tile[0] - 1] === '.') { straightEmptyCount += 1 }

        if (diagonaleEmptyCount < 3 || straightEmptyCount < 3) { return true; }
        console.log(diagonaleEmptyCount, straightEmptyCount)
        return false;

    }

    setPlayers(matrix) {
        matrix[this.players.player1.position[0]][this.players.player1.position[1]] = 1;
        matrix[this.players.player2.position[0]][this.players.player2.position[1]] = 2;

        return matrix;
    }

    movePlayer(player, move) {
        switch (move) {
            case 'up':
                if (!this.isValidMove(player, move)) {
                    break;
                }

                this.players[player].lastPosition = _.cloneDeep(this.players[player].position);
                this.players[player].position[0] -= 1;
                this.moveOutcome(player)
                break;

            case 'down':
                if (!this.isValidMove(player, move)) {
                    break;
                }

                this.players[player].lastPosition = _.cloneDeep(this.players[player].position);
                this.players[player].position[0] += 1;
                this.moveOutcome(player)
                break;

            case 'right':
                if (!this.isValidMove(player, move)) {
                    break;
                }

                this.players[player].lastPosition = _.cloneDeep(this.players[player].position);
                this.players[player].position[1] += 1;
                this.moveOutcome(player)
                break;

            case 'left':
                if (!this.isValidMove(player, move)) {
                    break;
                }

                this.players[player].lastPosition = _.cloneDeep(this.players[player].position);
                this.players[player].position[1] -= 1;
                this.moveOutcome(player)
                break;

            default:
                break;
        }

    }

    isValidMove(player, move) {
        switch (move) {
            case 'up':
                /**validating not stepping out of board */
                if (this.players[player].position[0] === 0) {
                    break;
                }
                /**validating not stepping into wall */
                if (isTileOccuoied(this.walls.coordinates, [this.players[player].position[0] - 1, this.players[player].position[1]])) {
                    break;
                }
                /**validating not stepping into other player */
                if (this.matrix[this.players[player].position[0] - 1][this.players[player].position[1]] === 1 || this.matrix[this.players[player].position[0] - 1][this.players[player].position[1]] === 2) {
                    break;
                }

                return true;

            case 'down':
                if (this.players[player].position[0] === this.numRows - 1) {
                    break;
                }

                if (isTileOccuoied(this.walls.coordinates, [this.players[player].position[0] + 1, this.players[player].position[1]])) {
                    break;
                }

                if (this.matrix[this.players[player].position[0] + 1][this.players[player].position[1]] === 1 || this.matrix[this.players[player].position[0] + 1][this.players[player].position[1]] === 2) {
                    break;
                }

                return true;


            case 'right':
                if (this.players[player].position[1] === this.numColoumns - 1) {
                    break;
                }

                if (isTileOccuoied(this.walls.coordinates, [this.players[player].position[0], this.players[player].position[1] + 1])) {
                    break;
                }

                if (this.matrix[this.players[player].position[0]][this.players[player].position[1] + 1] === 1 || this.matrix[this.players[player].position[0]][this.players[player].position[1] + 1] === 2) {
                    break;
                }

                return true;

            case 'left':
                if (this.players[player].position[1] === 0) {
                    break;
                }

                if (isTileOccuoied(this.walls.coordinates, [this.players[player].position[0], this.players[player].position[1] - 1])) {
                    break;
                }

                if (this.matrix[this.players[player].position[0]][this.players[player].position[1] - 1] === 1 || this.matrix[this.players[player].position[0]][this.players[player].position[1] - 1] === 2) {
                    break;
                }

                return true;

            default:
                break;
        }

        return false;
    }

    moveOutcome(player) {
        /**moving the player and setting his last tile to empty */
        this.matrix[this.players[player].position[0]][this.players[player].position[1]] = parseInt(player.slice(6));
        this.matrix[this.players[player].lastPosition[0]][this.players[player].lastPosition[1]] = '.';

        const goldIndex = this.gold.coordinates.findIndex((gold) => {
            return gold[0] === this.players[player].position[0] && gold[1] === this.players[player].position[1]
        });

        if (goldIndex !== -1) {
            this.players[player].score += 10;
            this.gold.coordinates.splice(goldIndex, 1)

        }

    }

}
