import { SlideTile, direaction } from "./move.ts";

export class Board{
    board : (number | null)[][] = [];
    size : number;
    winNumber : number;
    baseNumber : number;
    slideTile : SlideTile;
    constructor(size : number , winNumber : number , baseNumber : number){
        this.size = size;
        this.winNumber = winNumber;
        this.baseNumber = baseNumber;

        for(let i = 0 ; i < size; i++){
            let temp : null[] = [];
            for(let j = 0 ; j < size ; j++){
                temp.push(null);
            }
            this.board.push(temp);
        }
        this.slideTile = new SlideTile();
        this.inilizeBoard();
    }    

    inilizeBoard(){
        for(let i = 0 ; i < 2 ; i ++){
            let [r , c] : number[] = this.getRandomTileSpot();
            this.board[r][c] = this.baseNumber;
        }
    }

    isWinner() : boolean{
        for(let i = 0 ; i < this.size ; i++){
            for(let j = 0 ; j < this.size ; j++){
                if(this.board[i][j] == this.winNumber){
                    return true;
                }
            }
        }
        return false;
    }

    checkDirection(r : number , c : number):boolean{
        // check for four direction
        let top = false;
        let bottom = false;
        let left = false;
        let right = false;
        if (r-1 >= 0 && this.board[r][c] == this.board[r-1][c]){
            top = true;
        }
        if (r+1 < this.size && this.board[r][c] == this.board[r+1][c]){
            bottom = true;
        }
        if (c-1 >= 0 && this.board[r][c] == this.board[r][c-1]){
            left = true;
        }
        if (c+1 < this.size && this.board[r][c] == this.board[r][c+1]){
            right = true;
        }
        return top || bottom || left || right;
    }

    isEmptySpot(){
        for(let i = 0 ; i < this.size ; i++){
            for(let j = 0 ; j < this.size ; j++){
                if(this.board[i][j] == null){
                    return false;
                }
            }
        }
        return true;
    }

    isLost() : boolean{
        for(let i = 0 ; i < this.size ; i++){
            for(let j = 0 ; j < this.size ; j++){
                if(this.checkDirection(i , j)){
                    return false;
                }
            }
        }
        return true;
    }

    printBoard(){
        return this.board;
    }

    getRandomTileSpot(){
        let spots : number[][] = [];
        for(let i = 0 ; i < this.size ; i ++){
            for(let j = 0 ; j < this.size ; j++){
                if (this.board[i][j] == null){
                    spots.push([i , j]);
                }
            }
        }

        let randomSpot = Math.floor(Math.random() * spots.length);
        return spots[randomSpot];
    }

    addTile(){
        let [r , c] : number[] = this.getRandomTileSpot();
        this.board[r][c] = this.baseNumber;
    }


    getDirection(dir : string){
        switch(dir){
            case direaction.left:
                this.slideTile.moveLeft(this.board , this.size);
                break;
            case direaction.right:
                this.slideTile.moveRight(this.board , this.size);
                break;
            case direaction.top:
                this.slideTile.moveTop(this.board , this.size);
                break;
            case direaction.bottom:
                this.slideTile.moveBottom(this.board , this.size);
                break;
        }
    }
    

}