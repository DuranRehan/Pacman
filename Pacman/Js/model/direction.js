/**
 * The direction class will allow us to describe the directions that can take our sprites
 */
class Direction {

    /**
     * To be created, a direction need :
     * DeltaColumn, 1 for down /-1 for Up
     * DeltaRow, 1 for right / -1 for left
     * 
     * @param {number} deltaColumn describes the direction Up or Down
     * @param {number} deltaRow describes the direction right or left
     */
    constructor(deltaRow, deltaColumn) {
        this._deltaColumn = deltaColumn;
        this._deltaRow = deltaRow;
    }
    /**
     * Gets the Delta column value
     */
    get deltaColumn() { return this._deltaColumn; }

    /**
     * Gets the Delta row value
     */
    get deltaRow() { return this._deltaRow; }
}


