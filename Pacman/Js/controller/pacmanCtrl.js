class PacmanCtrl {

    /**
     * To be created, a Pacman controller need a PacMan
     * 
     * @param {Pacman} pacman 
     */
    constructor(pacman) {
        this._pacman = pacman;
    }

    /**
     * Ask to the pacMan to change its direction
     * 
     * @param {Direction} direction direction in which we want to change
     */
    askToChange(direction) {
        this._pacman.askToChangeDirection(direction);
    }
}
