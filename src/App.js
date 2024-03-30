import "./App.css";
import { useEffect, useState } from "react";
import { Game } from "./OOD/game.ts";

function App() {
  const [game, setGame] = useState(new Game());
  const [setting , setSetting] = useState({
    size : 4 ,
    winNumber : 2048 , 
    baseNumber : 2
  })
  const [board, setBoard] = useState(game.getBoardStatus());
  const [gameStatus , setGameStatus] = useState('');
  const [isOpen , setOpen] = useState(false);

  useEffect(()=> {
    document.addEventListener('keydown' , detectKey , true);
    return document.removeEventListener('keydown' , detectKey);
      
  } , [game])

  const detectKey = (e)=> {
    if(e.key == 'ArrowUp'){
      moveTiles('2')
    }else if(e.key == 'ArrowDown'){
      moveTiles('3');
    }
    else if(e.key == 'ArrowRight'){
      moveTiles('1');
      
    }else if(e.key == 'ArrowLeft'){
      moveTiles('0');

    }
  }

  function updateUI(){
    setBoard([...game.getBoardStatus()]);
  }

  function moveTiles(direction){
    let [status , game_status] = game.setDirection(direction);
    if(status){
      setGameStatus(game_status);
      return;

    }
    updateUI();
    
  }

  function reStart(){
    const values = {
      size : parseInt(setting.size) ,
      winNumber : parseInt(setting.winNumber) ,
      baseNumber : parseInt(setting.baseNumber)
    }
    game.setBoardValues(values);
    setBoard([...game.getBoardStatus()]);   
    setGameStatus('');
    console.log(gameStatus);
 
    
  }

  function handleChange(e){
    let { name , value } = e.target;
    setSetting((prevData) => ({ ...prevData , [name] : value}))
  }
  function handleSubmit(){
    reStart();
    setOpen(!isOpen);

  }

  return (
    <div className="App">
      <div className="btns">
      <button onClick={reStart}>New Game</button>
      <button onClick={()=> setOpen(!isOpen)}>Setting</button>
      </div>
      
      <div className="board">
        {board.map((items) => {
          return (
            <div className="box">
              {items.map((item) => {
                return (
                  <div className={item ? `tile tile-${Math.floor(Math.log2(item))}` : "empty-cell"}>
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
        {
          (gameStatus == 'lost') ? <div className='game-over'>
          <h1>Game over!</h1>
          <button onClick={reStart}>Try again</button>
        </div>  : ''
        }

        {
         (gameStatus == 'win') ? <div className='game-over'>
          <h1>Congratulations !</h1>
          <button onClick={reStart}>new Game</button>
        </div> : ''
        }

        
        
      </div>


      {
        isOpen ? <div className="setting-container">
          <h3>Change Setting </h3>
          <div className="form">
          <div className="input-field">
              <label label='size'>Do you want to change grid size ?</label>
              <input type='text' value={setting.size} name='size' onChange={handleChange}/>
          </div>
          <div className="input-field">
              <label label='win-number'>Do you want to change winning number ?</label>
              <input type='text' value={setting.winNumber} name='winNumber' onChange={handleChange}/>
          </div>
          <div className="input-field">
              <label label = 'base-number'>Do you want to change base number ?</label>
              <input type='text' value={setting.baseNumber} name='baseNumber' onChange={handleChange}/>
          </div>
          
          <div className="btns">

          <button onClick={handleSubmit}>Save</button>
          <button onClick={()=> setOpen(!isOpen)}>Close</button>
          </div>
          </div>
        </div> : ''
      }
      
    </div>
  );
}

export default App;
