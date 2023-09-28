/**
 * A sprite is a mobile element in the game
 */
class Sprite extends Component {

    /**
     * Need a position, direction and a id to initialize a sprite.
     * 
     * @param {Position} position The position of the sprite.
     * @param {Direction} direction The direction in which the sprite is moving
     * @param {boolean} askedToChangeDirection true if the direction changes, false otherwise 
     * @param {direction} askedDirection The direction with which to change
     * @param {string} id identifiant of the sprite
     */
    constructor(position, direction, id) {
        super(id);
        this._position = position;
        this._spawnDirection = direction;
        this._direction = direction;
        this._askedToChangeDirection = false;
        this._askedDirection;
        this._previousPosition;
        this._isDead = false;
    }

    /**
     * Gets position of the sprite
     */
    get position() { return this._position; }

    /**
     * Gets direction of the sprite
     */
    get direction() { return this._direction; }

    /**
     * Gets the value of askToChangeDirection attribut
     */
    get askedToChangeDirection() { return this._askedToChangeDirection; }

    /**
     * Gets the value of askedDirection attribut
     */
    get askedDirection() { return this._askedDirection; }

    /**
     * Gets the value of previousPosition attribut
     */
    get previousPosition() { return this._previousPosition; }

    /**
     * Gets the value of isDead attribut
     */
    get isDead() { return this._isDead; }

    /**
     * Move the sprite in the desired direction
     */
    move() {
        this._previousPosition = this._position;
        this._position = this._position.nextPosition(this._direction);
    }

    /**
     * Ask the Sprites to change its direction
     * 
     * @param {Direction} direction direction in which we want to change
     */
    askToChangeDirection(direction) {
        this._askedToChangeDirection = true;
        this._askedDirection = direction;
    }

    /**
     * Change the current direction to another
     */
    changeDirection() {
        if (this._askedToChangeDirection) {
            this._direction = this._askedDirection;
            this._askedToChangeDirection = false;
        }
    }

    notifyIsBlocked() {
    }

    /**
     * give dead to the sprite
     */
    hasBeenEaten() {
        this._isDead = true;
    }

    /**
     * give back life to the sprite
     * 
     * @param position
     */
    respawn(position) {
        this._isDead = false;
        this._position = position;
        this._direction = this._spawnDirection;
    }
}