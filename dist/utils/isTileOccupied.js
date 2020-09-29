const isTileOccuoied = (array, coordinate) => {
    const result = array.findIndex((element) => {
        return element[0] === coordinate[0] && element[1] === coordinate[1]
    })

    if (result === -1) {
        return false;
    }

    return true;
}