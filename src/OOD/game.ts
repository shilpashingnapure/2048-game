import { Board } from "./board.ts";

export class Game{
    board : Board;
    defaultValues = {
        size : 4 ,
        winNumber : 2048 , 
        baseNumber : 2
    }
    constructor(){
        this.setBoardValues()
    }

    setBoardValues(defaultValues = this.defaultValues){
        const { size , winNumber , baseNumber} = defaultValues;
        this.board = new Board(size , winNumber , baseNumber);
    }

    getBoardStatus(){
        return this.board.printBoard();
    }

    setDirection(direction){
        this.board.getDirection(direction);


        let isEmptySpot = this.board.isEmptySpot();

        if(!isEmptySpot){
            this.board.addTile();
        }

        let isLost : boolean = this.board.isLost();

        if (isLost && isEmptySpot){
            return [true , 'lost']
        }

        let isWinner : boolean = this.board.isWinner();
        if(isWinner){
            return [true , 'win']
        }
        
        return [false , null];

    }

    
}
