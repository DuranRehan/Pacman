/**
 * PacmanView class, Centralizes the display of Pac-Man
 */
class PacmanView {

    /**
     * To be created, a PacManView need a PacmanCtrl
     * 
     * @param {PacmanCtrl} pacmanCtrl 
     */
    constructor(pacmanCtrl) {
        $(document).on("keydown", function (event) {
            switch (event.key) {
                case "ArrowLeft":
                    pacmanCtrl.askToChange(Direction.WEST);
                    break;
                case "ArrowRight":
                    pacmanCtrl.askToChange(Direction.EAST);
                    break;
                case "ArrowUp":
                    pacmanCtrl.askToChange(Direction.NORTH);
                    break;
                case "ArrowDown":
                    pacmanCtrl.askToChange(Direction.SOUTH);
                    break;
                default:
            }
        });
    }
}