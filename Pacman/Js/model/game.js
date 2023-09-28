/**
 * The Game class defines the game design pattern
 */
class Game {

    /**
     * To be created, a game need a raw maze
     * 
     * @param {number[][]} rawMaze 
     */
    constructor(rawMaze) {
        this._maze = new Maze(rawMaze);
        this._pacman = new Pacman((this.maze.pacPos), Direction.WEST);
        this._ghost = new Ghost((this.maze.ghostRespawn), Direction.WEST, "Blinky");
        this._ghost2 = new Ghost((this.maze.ghostRespawn), Direction.EAST, "Pinky");
        this._ghost3 = new Ghost((this.maze.ghostRespawn), Direction.NORTH, "Inky");
        this._ghost4 = new Ghost((this.maze.ghostRespawn), Direction.SOUTH, "Clyde");
        this._score = 0;
        this._removedDot = 0;
        this._highScore;
        this.findHighestScore();
    }

    /**
     * Changes the direction of pacman or Ghost if needed,
     * Check if the move is allowed then moves the component
     */
    moveSprites() {
        this.movePacMan();
        this.moveGhost(this._ghost);
        this.moveGhost(this._ghost2);
        this.moveGhost(this._ghost3);
        this.moveGhost(this._ghost4);
    }

    /**
     * Move the pacMan
     */
    movePacMan() {
        if (this._pacman._askedToChangeDirection && this._maze.canWalkOn(this._pacman.position.nextPosition(this._pacman._askedDirection))) {
            this.pacman.changeDirection();
            this._pacman.move();
        }
        else if (this._maze.canWalkOn(this._pacman.position.nextPosition(this._pacman.direction))) {
            this._pacman.move();
        }
        this.pacManEat();
    }
    
    /**
     * Checks if Pac-man can eat the dot
     */
    pacManEat() {
        if (this._maze.canPick(this._pacman.position)) {
            let dot = this._maze.getDotLayerTile(this._pacman.position);
            if (dot.isEnergizer) {
                this._score += SCORE_ENERGIZER_DOT;
            } else {
                this._score += SCORE_DOT;
            }
            this._removedDot = this._maze.pick(this._pacman.position);
        }
    }

    /**
     * Move the Ghosts
     * 
     * @param {Ghost} ghost Ghost of the game
     */
    moveGhost(ghost) {
        if (this._maze.canWalkOn(ghost.position.nextPosition(ghost.direction))) {
            ghost.move();
            if (ghost.canEat(this.pacman)) {
                this._pacman.hasBeenEaten();
                this.respawn();
            }
        } else {
            ghost.notifyIsBlocked();
        }
    }

    /**
     * Check if the game is over
     * 
     * @returns true if the game is over, false otherwise
     */
    isGameOver() {
        return this._pacman.nbLives == 0;
    }

    /**
     * Checks if the pacman is dead
     * 
     * @returns true if the pacman is dead, false otherwise
     */
    pacmanHasBeenEaten() {
        return this._pacman.isDead;
    }

    /**
     * Reset all sprites at their default values
     *  
     */
    respawn() {
        this._pacman.respawn(this._maze.pacPos);
        this._ghost.respawn(this._maze.ghostRespawn);
        this._ghost2.respawn(this._maze.ghostRespawn);
        this._ghost3.respawn(this._maze.ghostRespawn);
        this._ghost4.respawn(this._maze.ghostRespawn);
    }


    /**
     * Find the highest score of localStorage
     * 
     * @returns highest score of local score
     */
    findHighestScore() {
        let score = localStorage.getItem("score");
        this._highScore = localStorage.getItem("score");
        if (!score) {
            this._highScore = 0;
            return 0;
        } else {
            return score;
        }
    }

    /**
     * Save the highest score in local Storage
     */
    saveScore() {
        if (this.findHighestScore() < this._score) {
            localStorage.setItem("score", this.score);
            this._highScore = this._score;
        }
    }

    /**
     * Check if the lvl is complete or not
     * 
     * @returns true if the level is succeed, false otherwise
     */
    lvlSucceed() {
        return this._maze.isEmpty();
    }

    /**
     * Create the new maze for the next Level
     * 
     * @param {number[][]} newLvl The maze to create
     */
    nextLevel(newLvl) {
        this._maze = new Maze(newLvl);
        this._removedDot = 0;
        this.respawn();
    }


    /**
     * Gets the maze of the game
     */
    get maze() { return this._maze; }

    /**
     * Gets the PacMan of the game
     */
    get pacman() { return this._pacman; }

    /**
     * Gets the first ghost of the game
     */
    get ghost() { return this._ghost; }

    /**
     * Gets the second ghost of the game
     */
    get ghost2() { return this._ghost2; }

    /**
     * Gets the third ghost of the game
     */
    get ghost3() { return this._ghost3; }

    /**
     * Gets the fourth ghost of the game
     */
    get ghost4() { return this._ghost4; }

    /**
     * Gets the score of the game
     */
    get score() { return this._score; }

    /**
     * Gets the removed dot 
     */
    get removedDot() { return this._removedDot; }

    /**
     * Gets the highest score of the game
     */
    get highScore() { return this._highScore; }
}