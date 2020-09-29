class Renderer {
    getColoumnElement(column) {
        let columnElement = '<div class="coloumn">';

        for (let tile of column) {
            switch (tile) {
                case '.':
                    columnElement += '<div class="tile empty"></div>'
                    break;

                case 'g':
                    columnElement += '<div class="tile gold"><i class="fas fa-coins"></i></div>'
                    break;

                case 'w':
                    columnElement += '<div class="tile wall"><i class="fas fa-church"></i></div>'
                    break;

                case 1:
                    columnElement += '<div class="tile player1"><i class="fas fa-cat"></i></div>'
                    break;

                case 2:
                    columnElement += '<div class="tile player2"><i class="fas fa-dragon"></i></div>'
                    break;

                default:
                    break;
            }
        }

        columnElement += '</div>'
        return columnElement;
    }

    renderBoard(board) {
        $('#board').empty()
        for (let c = 0; c < board[0].length; c++) {
            let column = [];

            for (let row of board) {
                column.push(row[c])

            }

            const columnElement = this.getColoumnElement(column);
            $('#board').append(columnElement);
        }

    }

    renderScore(player1Score, player2Score) {
        $('#score').empty();
        $('#score').append(`<p class="score">Cat: ${player1Score}</p><p class="score">Dragon: ${player2Score}</p>`);
    }
}