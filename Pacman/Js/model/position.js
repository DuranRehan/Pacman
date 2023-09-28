/**
 * Define the positions of the game components
 */
class Position {

    /**
     * To be created, a position need an index of row and column
     * 
     * @param {number} row the index of the row
     * @param {number} column the index of the column
     */
    constructor(row, column) {
        this._row = row;
        this._column = column;
    }

    /**
     * @returns {number} get the value of the row attribut
     */
    get row() { return this._row; }

    /**
     * @returns {number} get the value of the column attribut
     */
    get column() { return this._column; }

    /**
     * Find the next position to go, and return it
     * 
     * @param {Direction} dir direction to go
     */
    nextPosition(dir) {
        return new Position(this._row + dir.deltaRow, this._column + dir.deltaColumn);
    }
}
