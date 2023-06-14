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
  const [inputValue, setInputValue] = useState("");
  const [wordDetails, setWordDetails] = useState([]);
  const [searchedWord, setSearchedWord] = useState("");
  const [spelling, setSpelling] = useState("");
  const [source, setSource] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const [isPlayActive, setIsPlayActive] = useState(false);

  const [changeFont, setChangeFont] = useState(1);

  const handlePlayClick = () => {
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

      setSearchedWord(wordData.word);
      setSpelling(wordData.phonetic);
      setWordDetails(wordData.meanings)
      setSource(wordData.sourceUrls);

      const audioUrl = wordData.phonetics.find((phonetic) => phonetic.audio)?.audio;
      if (audioUrl) {
        audioRef.current = new Audio(audioUrl);
      }

    } catch (error) {
      console.log(error);
    }
    };


  return (
    <>
      <Header setChangeFont={setChangeFont} changeFont={changeFont} isChecked={isChecked} setIsChecked={setIsChecked}/>

      <input   className={`inputStyle ${isChecked ? "input-dark-mode" : ""}`} type="text" placeholder='Search for any word…' onChange={(event) => setInputValue(event.target.value)} onKeyDown={handleInputText}/>
      <img className="searchImage" src={Search} alt="" onClick={handleSearchClick}/>


      {searchedWord && (
            <div className="wordShower">
            <div>
              <h1 className={`searchedWord ${isChecked ? "whiteColor" : ""}`}>{searchedWord}</h1>
              <h1 className="spelling">{spelling}</h1>
            </div>
            <div>
              <img src={isPlayActive ? PlayActive : Play} className={`playButton ${isPlayActive ? "active" : ""}`} onClick={handlePlayClick}/>
            </div>
          </div>
      )}

      <ErrorPage isChecked={isChecked} setIsChecked={setIsChecked}/>

      <Meaning wordDetails={wordDetails} searchedWord={searchedWord} isChecked={isChecked} source={source}/>

    </>
  )
}

export default App;
