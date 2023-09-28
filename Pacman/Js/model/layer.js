
/**
 * A Layer groups together a set of tiles in order to constitute a level
 */
class Layer {
    /**
     * To be created, a layer need a number of rows and columns
     * 
     * @param {number} nbRows Number of layer rows
     * @param {number} nbColumns Number of layer columns 
     */
    constructor(nbRows, nbColumns) {
        this._nbRows = nbRows;
        this._nbColumns = nbColumns;
        this._board = Array(nbRows).fill().map(() => Array(nbColumns));
    }

    /**
     * Checks if the position is inside the layer board
     * 
     * @param {Position} pos position on the layer board
     * @returns true if the position is inside, false otherwise
     */
    contains(pos) {
        let rowTest = pos.row;
        let columnTest = pos.column;
        if ((rowTest < 0 || rowTest > this._nbRows - 1) || (columnTest < 0 || columnTest > this._nbColumns - 1)) {
            return false;
        }
        return true;
    }

    /**
     * Set a certain tile at a certain position on the layer board
     * 
     * @param {Position} pos position on the layer board
     * @param {Tile} tile The tile that will be placed
     * @throws Will throw an error if the position is not inside the layer board
     */
    setTile(pos, tile) {
        if (!this.contains(pos)) {
            throw "The Position is not valide";
        }
        this._board[pos.row].splice(pos.column, 1, tile);
    }

    /**
     * Get the tile at a certain position on the layer board
     * 
     * @param {Position} pos position on the layer board
     * @throws Will throw an error if the position is not inside the layer board
     * @returns The tile has the given position
     */
    getTile(pos) {
        if (!this.contains(pos)) {
            throw "The Position is not valide";
        }
        return this._board[pos.row][pos.column];
    }

    /**
     * Checks if the position on the layer board contain a tile 
     * 
     * @param {Position} pos position on the layer board
     * @throws Will throw an error if the position is not inside the layer board
     * @returns true if position on the layer board is occupied, false otherwise
     */
    hasTile(pos) {
        if (!this.contains(pos)) {
            throw "The Position is not valide";
        }
        return this._board[pos.row][pos.column] != undefined;
    }

    /**
     * Count the number of tile there is in the layer
     * 
     * @returns the number of tile in the layer
     */
    countTile() {
        let cptDot = 0;
        for (let row = 0; row < this._board.length; row++) {
            for (let col = 0; col < this._board[row].length; col++) {
                let pos = new Position(row, col);
                if (this.hasTile(pos)) {
                    cptDot++;
                }
            }
        }
        return cptDot;
    }
}