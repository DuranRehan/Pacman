/**
 * The class is used to model the labyrinth of the Game
 */
class Maze {

    /**
     * Creates layers of maze, fill them with their values.
     * Needs a rawMaze to be created
     * 
     * @param {number[][]} rawMaze
     */
    constructor(rawMaze) {
        this._dotLayer = new Layer(rawMaze.length, rawMaze[0].length);
        this._wallLayer = new Layer(rawMaze.length, rawMaze[0].length);
        let cptDot = 0;
        for (let row = 0; row < rawMaze.length; row++) {
            for (let col = 0; col < rawMaze[row].length; col++) {
                switch (rawMaze[row][col]) {
                    case 1:
                        this._wallLayer.setTile(new Position(row, col), new Tile("wall"));
                        break;
                    case 2:
                        this._dotLayer.setTile(new Position(row, col), new Dot("dot" + cptDot, false));
                        cptDot++;
                        break;
                    case 3:
                        this._dotLayer.setTile(new Position(row, col), new Dot("dot" + cptDot, true));
                        cptDot++;
                        break;
                    case 4:
                        this._pacPos = new Position(row, col);
                        break;
                    case 5:
                        this._ghostRespawn = new Position(row, col);
                        break;
                    default:
                }
            }
        }
        this._nbDots = this._dotLayer.countTile();
    }

    /**
     * Get a wall tile at a given position on wall layer
     * 
     * @param {Position} pos
     * @throws if there are no dot at given position
     * @returns The wall at given position 
     */
    getWallLayerTile(pos) {
        if (this._wallLayer.contains(pos)) {
            return this._wallLayer.getTile(pos);
        }
        throw "There are no walls in this position";
    }

    /**
      * Get a dot tile at a given position on dot layer
      *  
      * @param {Position} pos 
      * @throws if there are no dot at given position
      * @returns the dot at given position
      */
    getDotLayerTile(pos) {
        if (this._dotLayer.contains(pos)) {
            return this._dotLayer.getTile(pos);
        }
        throw "There are no Dot in this position";
    }

    /**
     * check if the position is part of the maze and there is no collision with a wall at the given position,
     * 
     * @param {Position} position Position to check
     * @returns true if the position is inside and no collision with wall, false otherwise
     */
    canWalkOn(position) {
        return (!this._wallLayer.hasTile(position) && this._dotLayer.contains(position));
    }

    /**
     * Checks if the position is part of the maze and there is a dot to take.
     * 
     * @param {Position} position Position to check
     * @returns true if the position is inside the maze and there is a dot
     */
    canPick(position) {
        return (this._dotLayer.contains(position) && this._dotLayer.hasTile(position));
    }

    /**
     * Give the dot at the given position
     * 
     * @param {Position} position Position to check
     * @throws if there is no dot
     * @returns the dot at given position
     */
    pick(position) {
        if (!this._dotLayer.hasTile(position)) {
            throw "there is no dot"
        }
        let tempTile = this.getDotLayerTile(position);
        this._dotLayer.setTile(position, undefined);
        return tempTile;
    }

    /**
     * Check if the maze is empty of dot
     * @returns true if is the maze is empty of dot, false otherwise
     */
    isEmpty() {
        return (this._dotLayer.countTile() == 0);
    }
    
    /**
     * Gets the count of rows in rawMaze
     */
    get nbRows() { return this._dotLayer._nbRows; }

    /**
     * Gets the count of columns in rawMaze
     */
    get nbColumns() { return this._dotLayer._nbColumns; }

    /**
     * Gets the spawn position of PacMan
     */
    get pacPos() { return this._pacPos; }

    /**
     * Gets the spawn position of Ghost
     */
    get ghostRespawn() { return this._ghostRespawn; }
}