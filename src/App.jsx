import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import './styles.scss';
import Header from './Components/Header';

import Search from "./assets/icon-search.svg";
import Play from "./assets/icon-play.svg";


function App() {

  const [inputWord, setInputWord] = useState("keyboard");

  const handleInputText = (event) => {
    if (event.key === "Enter") {
      setInputWord(event.target.value);
      console.log(inputWord);
    }
  }


  const [searchedWord, setSearchedWord] = useState("");
  const [spelling, setSpelling] = useState("");

  const instance = axios.create({
    baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/",
    headers: {accept: "application/json", "content-Type": "application/json"},
  });

  const getData = async () => {
    try {
      const response = await instance.get(inputWord);
      console.log(response.data);

      setSearchedWord(response.data[0].word);
      setSpelling(response.data[0].phonetic);

    } catch (error) {
      console.log(error);
    }
    };

    useEffect(() => {
      getData();
    }, [inputWord]);

  return (
    <>
      <Header/>


    <div className="searchDiv">
      <input type="text" name="" id="" placeholder='Search for any word…' onKeyDown={handleInputText}/>
      <img src={Search} alt="" />
    </div>



    <div className="wordShower">
      <div>
        <h1 className="searchedWord">{searchedWord}</h1>
        <h1 className="spelling">{spelling}</h1>
      </div>
      <div>
        <img src={Play} alt="PlayButton" className='playButton'/>
      </div>
    </div>




    <div className='meaningOne'>
      <h1 className="partOfSpeech">noun</h1>
      <div className='straightLine'></div>
    </div>

    <div className='definition'>
      <h1 className='meaning'>Meaning</h1>
      <ul>
        <li>(etc.) A set of keys used to operate a typewriter, computer etc.</li>
        <li>A component of many instruments including the piano, organ, and harpsichord consisting of usually black and white keys that cause different tones to be produced when struck.</li>
        <li>A device with keys of a musical keyboard, used to control electronic sound-producing devices which may be built into or separate from the keyboard device.</li>
      </ul>

      <div className='synonymPart'>
        <h1 className='synonym'>Synonyms</h1>
        <h1 className='synonymWord'>electronic keyboard</h1>
      </div>
      </div>
    </>
  )
}

export default App;
