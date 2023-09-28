
function buildMaze() {
    let maze =  RAW_MAZE.table;
    for(let row = 0; row < maze.length ; row++ ) {
        for(let col = 0; col < maze[row].length ; col++) {
            switch (maze[row][col]) {
                case 1:
                    $("#bodyGame").append(
                        $("<span>")
                            .addClass("wall")
                            .css("position", "absolute")
                            .css("top", `${TILE_SIZE*row}px`)
                            .css("left", `${TILE_SIZE*col}px`)
                    );
                    break;
                case 2: 
                    $("#bodyGame").append(
                        $("<span>")
                            .addClass("pac-dot")
                            .css("position","absolute")
                            .css("top", `${TILE_SIZE*row}px`)
                            .css("left", `${TILE_SIZE*col}px`)
                    );
                    break;

                default:
                    break;
            }
        }
    }
}

$(document).ready(function() {
//    buildMaze();
});