/**
 * Ghost class, define the comportement of Ghost in the Pacman game
 */
class Ghost extends Sprite {

    /**
     * To be created, a ghost need an id, a position and a direction
     * 
     * @param {Position} position The position of the Ghost.
     * @param {Direction} direction The direction in which the ghost is moving 
     * @param {string} id identifiant of the sprite
     */
    constructor(position, direction, id) {
        super(position, direction, id);
        this._aleaGhost = setInterval(() => {
            this._choiceNewDirection();
        }, GHOST_RDM_CHANGE);
    }

    /**
     * Choice a new direction in which the ghost will move
     */
    _choiceNewDirection() {
        this.askToChangeDirection(this.randomDirection());
        this.changeDirection();
    }

    /**
     * Get a random direction 
     * 
     * @returns a random direction 
     */
    randomDirection() {
        let rdm = Math.floor(Math.random() * 4) + 1;
        let direction;
        switch (rdm) {
            case 1:
                direction = Direction.NORTH;
                break;
            case 2:
                direction = Direction.SOUTH;
                break;
            case 3:
                direction = Direction.EAST;
                break;
            case 4:
                direction = Direction.WEST;
                break;
            default:
                throw "Error in Ghost Direction";
        }
        return direction;
    }

    /**
     * Checks if the ghost can eat a given Pacman
     * 
     * @param {Pacman} pacman Pacman of the game
     */
    canEat(pacman) {
        return ((JSON.stringify(this.position) == JSON.stringify(pacman.position))
            || ((JSON.stringify(this.previousPosition) == JSON.stringify(pacman.position)) 
            || (JSON.stringify(this.position) == JSON.stringify(pacman.previousPosition))));
    }

    /**
     * Notify that the ghost is bloqued 
     */
    notifyIsBlocked() {
        this._choiceNewDirection();
    }
}