import React, { useState, useEffect } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

const Hangman = () => {
  /** by default, allow 6 guesses and use provided gallows images. */
  const defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  
  const[ nWrong, setnWrong] = useState(0)
  const [ guessed, setGuessed ] = useState(new Set())
  const [answer, setAnswer ] = useState(randomWord())
  // constructor(props) {
  //   super(props);
  //   this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
  //   this.handleGuess = this.handleGuess.bind(this);
  //   this.reset = this.reset.bind(this);
  // }
  const reset = () => {
    // this.setState({
    //   nWrong: 0,
    //   guessed: new Set(),
    //   answer: randomWord()
    // });
    setnWrong(0);
    setGuessed(new Set())
    setAnswer(randomWord())
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  const guessedWord = () => {
    return answer
      .split("")
      .map(ltr => (guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  const handleGuess = (evt) => {
    let ltr = evt.target.value;
    // this.setState(st => ({
    //   guessed: st.guessed.add(ltr),
    //   nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    // }));
    setGuessed(prev => new Set(prev.add(ltr)));
    setnWrong(prev =>  prev + (answer.includes(ltr) ? 0 : 1))
  }

  /** generateButtons: return array of letter buttons to render */

  
  const generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={(e) => handleGuess(e)}
        disabled={guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  useEffect(()=> {
    console.log(answer);
  })
  /** render: render game */
  
    const gameOver = nWrong >= defaultProps.maxWrong;
    const isWinner = guessedWord().join("") === answer;
    const altText = `${nWrong}/${defaultProps.maxWrong} guesses`;
    let gameState = generateButtons();
    if (isWinner) gameState = "You Win!";
    if (gameOver) gameState = "You Lose!";
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={defaultProps.images[nWrong]} alt={altText} />
        <p>Guessed Wrong: {nWrong}</p>
        <p className='Hangman-word'>
          {!gameOver ? guessedWord() : answer}
        </p>
        <p className='Hangman-btns'>{gameState}</p>
        <button id='reset' onClick={() => reset()}>
          Restart?
        </button>
      </div>
    );
  
};

export default Hangman;
