const TILE_SIZE = 15;
const PACMAN_ID = Pacman;
const RUN_INTERVAL = 100;
const GHOST_RDM_CHANGE = 4000;
const PAC_LIFE = 2; 
const SCORE_ENERGIZER_DOT = 100;
const SCORE_DOT = 10;
const LVL_TABS = [RAW_MAZE.table, RAW_MAZE.lvl1, RAW_MAZE.lvl2];
//NORTH constant direction, 1 case up
Direction.NORTH = new Direction(-1, 0);
//SOUTH constant direction, 1 case down
Direction.SOUTH = new Direction(1, 0);
//WEST constant direction, 1 case left
Direction.WEST = new Direction(0, -1);
//EAST constant direction, 1 case right
Direction.EAST = new Direction(0, 1);