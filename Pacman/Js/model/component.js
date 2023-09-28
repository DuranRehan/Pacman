/**
 * A component is a object of the maze
 */
class Component {
    /**
     * To be created, a component just need an id.
     * 
     * @param {string} id unique tile's id
     */
    constructor(id) {
        this._id = id;
    }

    /**
     * Gets id of the component
     */
    get id() { return this._id; }
}