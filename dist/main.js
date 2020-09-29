(function () {
    const renderer = new Renderer();
    let goldRush = new GoldRush(rowNum = 10, colNum = 10);

    const $rowInput = $('#row-input');
    const $colInput = $('#col-input');
    const $startBtn = $('#start-btn');

    const handleKeyPress = (event) => {

        switch (event.key) {
            case 'i':
                goldRush.movePlayer('player2', 'up');

                break;

            case 'k':
                goldRush.movePlayer('player2', 'down');

                break;

            case 'l':
                goldRush.movePlayer('player2', 'right');

                break;

            case 'j':
                goldRush.movePlayer('player2', 'left');
                break;

            case 'w':
                goldRush.movePlayer('player1', 'up');

                break;

            case 's':
                goldRush.movePlayer('player1', 'down');

                break;

            case 'd':
                goldRush.movePlayer('player1', 'right');

                break;

            case 'a':
                goldRush.movePlayer('player1', 'left');

                break;

            default:
                break;

        }

        renderer.renderBoard(goldRush.matrix);
        renderer.renderScore(goldRush.players.player1.score, goldRush.players.player2.score);

    }

    const handleStartClick = () => {
        if ($rowInput.val() > 4 && $colInput.val() > 4) {
            $(document).on('keyup', handleKeyup);

            goldRush = new GoldRush($rowInput.val(), $colInput.val());

            renderer.renderBoard(goldRush.matrix);
            renderer.renderScore(goldRush.players.player1.score, goldRush.players.player2.score);

        } else {
            return alert('Min dimensions are 5 X 5 !');
        }
    }

    const handleKeyup = () => {
        if (isGameEnded(goldRush.matrix) === true) {
            $(document).off('keyup');

            if (goldRush.players.player1.score > goldRush.players.player2.score) {
                return alert('Cat wins, classic...');
            }

            if (goldRush.players.player1.score < goldRush.players.player2.score) {
                return alert('Dragon wins!!!');
            }

            if (goldRush.players.player1.score === goldRush.players.player2.score) {
                return alert('Hooray! a DRAW!');
            }

        }
    }

    const isGameEnded = (board) => {
        for (let r = 0; r < board.length; r++) {

            for (let c = 0; c < board[0].length; c++) {
                if (board[r][c] === 'g') {
                    return false;
                }
            }

        }
        return true;
    }

    renderer.renderBoard(goldRush.matrix);
    renderer.renderScore(goldRush.players.player1.score, goldRush.players.player2.score);

    $(document).on('keydown', handleKeyPress);
    $(document).on('keyup', handleKeyup);

    $startBtn.on('click', handleStartClick);

})();