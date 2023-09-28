/**
 * GameView class, Centralizes the display of each component of the game 
 * like : 
 *   the tiles
 *   Pacman and the ghosts.
 */
class GameView {

    /**
     * Define the game view of component of the game.
     * To be created, a view need a Game
     * 
     * @param {Game} game 
     * @param {GameCtrl} gameCtrl
     */
    constructor(game, gameCtrl) {
        this._gameCtrl = gameCtrl;
        this._game = game;
        this._nbLifes = PAC_LIFE;
        this.adjustSizeBoard(game);
        let cptId = 0;
        for (let row = 0; row < this._game.maze.nbRows; row++) {
            for (let col = 0; col < this._game.maze.nbColumns; col++) {
                let pos = new Position(row, col);
                if (this._game.maze._wallLayer.hasTile(pos)) {
                    this.createWall(pos);
                }
                if (this._game.maze._dotLayer.hasTile(pos)) {
                    this.createDot(pos, this._game.maze.getDotLayerTile(pos), "dot" + cptId);
                    cptId++;
                }
            }
        }
        this.createPacMan(this._game.maze.pacPos);
        this.createGhost(this._game.maze.ghostRespawn, this._game.ghost.id);
        this.createGhost(this._game.maze.ghostRespawn, this._game.ghost2.id);
        this.createGhost(this._game.maze.ghostRespawn, this._game.ghost3.id);
        this.createHighScore();
        this.createGhost(this._game.maze.ghostRespawn, this._game.ghost4.id);
        for (let i = 0; i < PAC_LIFE; i++) {
            this.createLife(i + 1);
        }
        this.createButton();
    }

    /**
     * Display a dot at a given position 
     * 
     * @param {Position} pos 
     */
    createDot(pos, tile, id) {
        if (tile.isEnergizer) {
            $("#bodyGame").append(
                $("<span>")
                    .addClass("sup_pac-dot")
                    .attr("id", `${id}`)
                    .css("position", "absolute")
                    .css("top", `${TILE_SIZE * pos.row}px`)
                    .css("left", `${TILE_SIZE * pos.column}px`)
            );
        } else {
            $("#bodyGame").append(
                $("<span>")
                    .addClass("pac-dot")
                    .attr("id", `${id}`)
                    .css("position", "absolute")
                    .css("top", `${TILE_SIZE * pos.row}px`)
                    .css("left", `${TILE_SIZE * pos.column}px`)
            );
        }
    }

    /**
     * Display a wall at a given position 
     * 
     * @param {Position} pos 
     */
    createWall(pos) {
        $("#bodyGame").append(
            $("<span>")
                .addClass("wall")
                .css("position", "absolute")
                .css("top", `${TILE_SIZE * pos.row}px`)
                .css("left", `${TILE_SIZE * pos.column}px`)
        );
    }

    /**
     * Display a PacMan at a given position 
     * 
     * @param {Position} pos 
     */
    createPacMan(pos) {
        $("#bodyGame").append(
            $("<span>")
                .addClass("pacman")
                .css("position", "absolute")
                .css("top", `${TILE_SIZE * pos.row}px`)
                .css("left", `${TILE_SIZE * pos.column}px`)
        );
    }

    /**
     * Display a Ghost at a given position 
     * 
     * @param {Position} pos 
     */
    createGhost(pos, id) {
        $("#bodyGame").append(
            $("<span>")
                .attr("id", `${id}`)
                .addClass("ghost")
                .css("position", "absolute")
                .css("top", `${TILE_SIZE * pos.row}px`)
                .css("left", `${TILE_SIZE * pos.column}px`)
        );
    }

    /**
     * Display a life in the life Board
     * 
     * @param {string} id 
     */
    createLife(id) {
        $("#frameLife").append(
            `<span class="life" id=${id}>`
        )
    }

    /**
     * Display the Highest score of the game
     */
    createHighScore() {
        $("#maxScored")
            .text(`${this._game.highScore}`);
    }

    /**
     * Create and Display the Start button of the game
     */
    createButton() {
        $("#bodyGame").append(
            `<button id="start" type="button">pac-man</button>
            <button id="reset" type="button">Restart</button>`
        );
        $("#start")
            .css({ "position": "absolute", });
        $("#reset")
            .css("position", "absolute")
            .hide();
    }

    /**
     * Notify to controller that game begin
     */
    startGame() {
        $("#start").fadeOut();
        this._gameCtrl.startHasBeenRequested();
    }

    /**
     * remove the picked dot
     */
    removeDot() {
        let id = this._game._removedDot.id;
        $(`#${id}`).remove();

    }

    /**
     * Display the current score at the end of game
     */
    displayGameOver() {
        $("#scored")
            .css({ "text-align": "center" })
            .text(`Points Scored : ${this._game.score}`);
    }

    /**
     * Display a new Game
     * @param {Game} game 
     */
    displayNewGame(game) {
        this._game = game;
        this._nbLifes = PAC_LIFE;
        this.adjustSizeBoard(game);
        let cptId = 0;
        for (let row = 0; row < this._game.maze.nbRows; row++) {
            for (let col = 0; col < this._game.maze.nbColumns; col++) {
                let pos = new Position(row, col);
                if (this._game.maze._wallLayer.hasTile(pos)) {
                    this.createWall(pos);
                }
                if (this._game.maze._dotLayer.hasTile(pos)) {
                    this.createDot(pos, this._game.maze.getDotLayerTile(pos), "dot" + cptId);
                    cptId++;
                }
            }
        }
        this.createPacMan(this._game.maze.pacPos);
        this.createGhost(this._game.maze.ghostRespawn, this._game.ghost.id);
        this.createGhost(this._game.maze.ghostRespawn, this._game.ghost2.id);
        this.createGhost(this._game.maze.ghostRespawn, this._game.ghost3.id);
        this.createHighScore();
        this.createGhost(this._game.maze.ghostRespawn, this._game.ghost4.id);
        for (let i = 0; i < PAC_LIFE; i++) {
            this.createLife(i + 1);
        }
    }

    /**
     * Display the next Maze of the game
     */
    nextLevel(game) {
        $("#bodyGame").remove();
        $("#borderBoard").append(`<div id="bodyGame">`);
        this.displayNewGame(game);
    }

    /**
     * Show the reset button
     */
    showResetButton() {
        $("#reset").show();
    }

    /**
     * Adjust the size of the game board 
     * @param {Game} game 
     */
    adjustSizeBoard(game) {
        let scoreHeight = $("#scoreFrame").height();
        $("#bodyGame").css("height", `${TILE_SIZE * game.maze.nbRows}`);
        $("#bodyGame").css("width", `${TILE_SIZE * game.maze.nbColumns}`);
        $("#borderBoard").css("width", `${TILE_SIZE * game.maze.nbColumns}`);
        $("#borderBoard").css("height", `${TILE_SIZE * game.maze.nbRows + scoreHeight}`);

    }

    /**
     * Update the frame of each component of the maze
     */
    updateFrame() {
        $(".pacman")
            .css({
                "top": `${TILE_SIZE * this._game.pacman.position.row}px`,
                "left": `${TILE_SIZE * this._game.pacman.position.column}px`,
            });
        this.updateGhost(this._game.ghost);
        this.updateGhost(this._game.ghost2);
        this.updateGhost(this._game.ghost3);
        this.updateGhost(this._game.ghost4)
        this.removeDot();
        this.updateScore();
    }

    /**
     * update the Ghost in the maze
     * @param {Ghost} ghost 
     */
    updateGhost(ghost) {
        $(`#${ghost.id}`)
            .css({
                "top": `${TILE_SIZE * ghost.position.row}px`,
                "left": `${TILE_SIZE * ghost.position.column}px`
            });
    }

    /**
     * Update the score frame
     */
    updateScore() {
        $("#scored")
            .text(`${this._game.score}`);
    }

    /**
     * Update the life count
     */
    updateLives() {
        $(".life").remove();
        if (this._game.pacman.nbLives == 0) {
            $("#frameLife")
                .text("Pac-Life : 0");
        } else {
            for (let i = 0; i < this._game.pacman.nbLives; i++) {
                this.createLife(i + 1);
            }
        }
    }
}