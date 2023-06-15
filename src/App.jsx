import { useState, useEffect, useRef } from 'react'
import './App.css'
import axios from 'axios';
import './styles.scss';
import Header from './Components/Header';

import Search from "./assets/icon-search.svg";
import Play from "./assets/icon-play.svg";
import PlayActive from "./assets/icon-play-active.svg";
import Meaning from './Components/Meaning';
import ErrorPage from './Components/ErrorPage';


function App() {
  const [inputValue, setInputValue] = useState(null);
  const [searchedWord, setSearchedWord] = useState("");
  const [spelling, setSpelling] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isPlayActive, setIsPlayActive] = useState(false);
  const [changeFont, setChangeFont] = useState(1);
  const [isError, SetIsError] = useState(false);
  const [wordData, setWordData] = useState([]);




  const handlePlayClick = () => {
    console.log(audioRef.current + "123");
    if (audioRef.current) {
      setIsPlayActive(true);
      audioRef.current.play();
  
      audioRef.current.onended = () => {
        setIsPlayActive(false);
      };
    }
  };

  useEffect(() => {
    if (isChecked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isChecked]);


  useEffect(() => {
    document.body.classList.remove('interFont', 'loraFont', 'InconsolataFont');


    changeFont == 1 ? document.body.classList.add('interFont') : 
    changeFont == 2 ? document.body.classList.add('loraFont') :
    changeFont == 3 ? document.body.classList.add('InconsolataFont') : "";
  }, [changeFont]);

  const audioRef = useRef(null);



  console.log(wordData);

  const handleInputText = (event) => {
    if (event.key === "Enter") {
      setInputValue(event.target.value);
      getData(event.target.value);
    }
  }

  const handleSearchClick = () => {
    getData(inputValue);
  }


  const instance = axios.create({
    baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/",
    headers: {accept: "application/json", "content-Type": "application/json"},
  });




  const getData = async (inputWord) => {
    try {
      const response = await instance.get(inputWord);
      const wordData = response.data[0];
      setWordData(response.data[0]);
      setSearchedWord(wordData.word);
      setSpelling(wordData.phonetic);
      SetIsError(false);

      const audioUrl = wordData.phonetics?.find((phonetic) => phonetic.audio)?.audio;
      console.log(audioUrl);
      if (audioUrl) {
        audioRef.current = new Audio(audioUrl);
      }

    } catch (error) {
      console.log(error);
      SetIsError(true);
    }
    };


  return (
    <>
      <Header setChangeFont={setChangeFont} changeFont={changeFont} isChecked={isChecked} setIsChecked={setIsChecked}/>

      <div className='inputDiv'>
        <input   className={`inputStyle ${isChecked ? "input-dark-mode" : ""}`} type="text" placeholder='Search for any word…' onChange={(event) => setInputValue(event.target.value)} onKeyDown={handleInputText}/>
        <img className="searchImage" src={Search} alt="" onClick={handleSearchClick}/>
      </div>

      {inputValue === "" &&  inputValue !== null && (<p className='emptyError'>Whoops, can’t be empty…</p>)}

      {isError ? null : (wordData.word && (
            <div className="wordShower">
            <div>
              <h1 className={`searchedWord ${isChecked ? "whiteColor" : ""}`}>{wordData.word}</h1>
              <h1 className="spelling">{spelling}</h1>
            </div>
            <div>
              <img src={isPlayActive ? PlayActive : Play} className={`playButton ${isPlayActive ? "active" : ""}`} onClick={handlePlayClick}/>
            </div>
          </div>
      ))}

      {isError ? <ErrorPage isChecked={isChecked} setIsChecked={setIsChecked}/> : null}

      {isError ? null : (<Meaning wordData={wordData} searchedWord={searchedWord} isChecked={isChecked}/>)}

    </>
  )
}

export default App;
