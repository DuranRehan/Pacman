/**
 * The powerful, the pleasurable, the indestructible Pacman
 */
class Pacman extends Sprite {
    /**
     * 
     * @param {Position} position the initial position
     ∗ @param {Direction} direction the initial direction
     * @param {Number} nbLives the number of lives 
     */
    constructor(position, direction) {
        super(position, direction, PACMAN_ID);
        this._nbLives = PAC_LIFE;
    }

    /**
     * Gets the value of nbLives attribut
     */
    get nbLives() { return this._nbLives; }

    /**
     * give death to pacman
     */
    hasBeenEaten() {
        this._isDead = true;
        this._nbLives = this._nbLives - 1;
    }
}