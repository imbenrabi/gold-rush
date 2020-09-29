class Matrix {
    constructor(numRows, numColumns) {
        this.matrix = this.generateMatrix(numRows, numColumns)
    }

    generateMatrix(numRows, numColumns) {
        let matrix = []
        let num = 1

        for (let r = 0; r < numRows; r++) {
            matrix.push([])
            for (let c = 0; c < numColumns; c++) {
                matrix[r].push(num++)
            }
        }

        return matrix
    }

    get(rowNum, colNum) {
        return this.matrix[rowNum][colNum]
    }

    printColumn(colNum) {
        for (let i = 0; i < this.matrix.length; i++) {
            console.log(this.matrix[i][colNum])
        }
    }

    printRow(rowNum) {
        for (let i = 0; i < this.matrix[0].length; i++) {
            console.log(this.matrix[rowNum][i])
        }
    }

    print() {

        for (let i = 0; i < this.matrix.length; i++) {
            let line = ""
            for (let j = 0; j < this.matrix[i].length; j++) {
                line += (this.matrix[i][j] + "\t")
            }
            console.log(line)
        }
    }

    alter(rowNum, colNum, value) {
        this.matrix[rowNum][colNum] = value;
    }

    findCoordinate(value) {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (value === this.matrix[i][j]) { return { x: j, y: i } }
            }

        }
    }
}