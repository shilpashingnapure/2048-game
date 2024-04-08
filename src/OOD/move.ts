
export enum direaction {
  left = "0",
  right = "1",
  top = "2",
  bottom = "3",
}

export class SlideTile{
    constructor(){

    }

    // move left side
    moveLeft(board , n){
        for(let i = 0 ; i < n ; i++){
           // move all not empty cell
           this.shiftLeftSide(board[i] , n);

           // merge 2 tiles
           for(let j = 1 ; j < n ; j++){
            let curr = board[i][j]
            let prev = board[i][j-1]
            if(curr != null && prev != null && curr == prev){
                board[i][j-1] += curr;
                board[i][j] = null;
            }
           }

           // after done merge move again
           this.shiftLeftSide(board[i] , n);
        }

    }
    shiftLeftSide(board , n){
        let shift = 0
           for(let j = 0 ; j < n ; j++){
             if(board[j] != null){
                [board[j] , board[shift]] = [board[shift] , board[j]] 
                shift += 1
            }
           }
    }

    // move right side
    moveRight(board , n){
        for(let i = 0 ; i < n ; i++){
            // move all not empty cell
            this.shiftRightSide(board[i] , n);
 
            // merge 2 tiles
            for(let j = n-1 ; j >= 0 ; j--){
             let curr = board[i][j]
             let prev = board[i][j-1]
             if(curr != null && prev != null && curr == prev){
                 board[i][j-1] += curr;
                 board[i][j] = null;
             }
            }
            // again move to right side
            this.shiftRightSide(board[i] , n);
         }
    }

    shiftRightSide(board , n){
        let shift = n-1
            for(let j = n-1 ; j >= 0 ; j--){
              if(board[j] != null){
                 [board[j] , board[shift]] = [board[shift] , board[j]] 
                 shift -= 1
             }
            }
    }

    // move top side
    moveTop(board , n){
        for(let col = 0 ; col < n ; col++){
            // move all not empty cell
            this.shiftTopSide(board , col , n);
 
            // merge 2 tiles
            for(let row = 1 ; row < n ; row++){
             let curr = board[row][col]
             let prev = board[row-1][col]
             if(curr != null && prev != null && curr == prev){
                 board[row-1][col] = prev +  curr;
                 board[row][col] = null;
             }
            }
 
            // after done merge move again
            this.shiftTopSide(board , col , n);
         }

    }

    shiftTopSide(board , i , n){
        let shift = 0
        for(let j = 0 ; j < n ; j++){
          if(board[j][i] != null){
             [board[j][i] , board[shift][i]] = [board[shift][i] , board[j][i]] 
             shift += 1
         }
        }
    }

    moveBottom(board , n){
        for(let col = 0 ; col < n ; col++){
            // move all not empty cell
            this.shiftBottomSide(board , col , n);
 
            // merge 2 tiles
            for(let row = n-1 ; row > 0; row--){
             let curr = board[row][col]
             let prev = board[row-1][col]
             if(curr != null && prev != null && curr == prev){
                 board[row-1][col] = prev +  curr;
                 board[row][col] = null;
             }
            }
 
            // after done merge move again
            this.shiftBottomSide(board , col , n);
         }

    }
    shiftBottomSide(board , i , n){
        let shift = n-1
        for(let j = n-1 ; j >= 0 ; j--){
          if(board[j][i] != null){
             [board[j][i] , board[shift][i]] = [board[shift][i] , board[j][i]] 
             shift -= 1
         }
        }
    }







}