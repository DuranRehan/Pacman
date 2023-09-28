/**
 * Gathers and controls the different elements of the Game and the view.
 */
class GameCtrl {

    /**
     * Inizialize the Maze, and diffenrent component of the Game
     */
    constructor() {
        this._game = new Game(LVL_TABS[0]);
        this._view = new GameView(this._game, this);
        this._pacmanCtrl = new PacmanCtrl(this._game.pacman);
        this._pacmanView = new PacmanView(this._pacmanCtrl);
        this._lvlIndex = 0;
    }

    /**
     * Run the game, in other words, update the frame and move component
     */
    run() {
        this._timer = setInterval(() => {
            this._view.updateFrame();
            this._game.moveSprites();
            this._view.updateLives();
            if (this._game.pacman.nbLives == 0) {
                clearInterval(this._timer);
                this._view.updateFrame();
                this._game.saveScore();
                this._view.displayGameOver();
                this._view.showResetButton();
            }
            if (this._game.lvlSucceed()) {
                this._lvlIndex++;
                if (this._lvlIndex >= LVL_TABS.length) {
                    this._lvlIndex = 0;
                } 
                    this._game.nextLevel(LVL_TABS[this._lvlIndex]);
                    this._view.nextLevel(this._game);
                    clearInterval(this._timer);
                    this.run();
            }
        }, RUN_INTERVAL);
    }

    /**
     * Start the game
     */
    startHasBeenRequested() {
        this.run();
    }

    /**
     * Gets View of the game
     */
    get view() { return this._view; }
}
