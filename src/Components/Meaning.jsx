import React from "react";
import {useState} from "react";

const Meaning = ( { wordDetails, searchedWord, isChecked, source }) => {
    return (
        <>
        {wordDetails.map((wordDetail, index) => (
            <div className='wordFullDefiniton' key={index}>
            <div>
                <div className='partOfSpeechDevider'>
                <h1 className={`partOfSpeech ${isChecked ? "whiteColor" : ""}`}>{wordDetail.partOfSpeech}</h1>
                <div className={`straightLine ${isChecked ? "straightLineDark" : ""}`}></div>
                </div>
                <h1 className='meaning'>Meaning</h1>

                {wordDetail.definitions.map((definition, definitionIndex) => (
                <div key={definitionIndex}>
                    <ul>
                    <li className={isChecked ? "whiteColor" : ""}>{definition.definition}</li>
                    {definition.example && (
                        <h1 className="example">"{definition.example}"</h1>
                    )}
                    </ul>
                </div>
                ))}

                {wordDetail.synonyms.length > 0 ? (
                <div className='synonymPart'>
                    <h1 className='synonym'>Synonyms</h1>
                    {wordDetail.synonyms.map((wordSynonym, synonymIndex) => (
                    <h1 className='synonymWord' key={synonymIndex}>{wordSynonym}</h1>
                ))}
                </div>) : null}

            </div>
            </div>
            ))}

            {searchedWord &&  (
            <div className='footer'>
                <div className='straightLine'></div>
                <p className='source'>source</p>
                <a className={`link ${isChecked ? "whiteColor" : ""}`} target="_blank" href={source}>{source}</a>
            </div>
            )}
        </>
    )
}

export default Meaning;