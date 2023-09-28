/**
 * A dot is the component of the maze that earns points when eaten
 */
class Dot extends Tile {

    /**
     * To be created, a dot need an id and to know if it is a super dot 
     * 
     * @param {string} id unique dot's id
     * @param {boolean} isEnergizer is a super dot
     */
    constructor(id, isEnergizer) {
        super(id);
        this._isEnergizer = isEnergizer;
    }

    /**
     * @returns {boolean} value of isEnergizer attribut
     */
    get isEnergizer() { return this._isEnergizer; }

}