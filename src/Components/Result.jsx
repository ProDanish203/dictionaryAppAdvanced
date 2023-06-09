import React from 'react'

export const Result = ({ meanings, phonetics, word, loading, setText}) => {

    if(loading){
        return (
            <p>Loading....</p>
        )
    }

  return (
    <>
    <ul className='overflow-y-scroll max-h-[300px]'>
        <li className='world'>
            <h2 className='font-bold text-xl'>{word}</h2>    
            {
                phonetics.map((phone, index) => (
                    <span key={index} className='text-sm text-gray-500'>{phone.text}</span>
                ))
            }
        </li>     
        
        {
            meanings.map((meaning, index) => (
            <li key={index}>
                <h3 className='mt-2 font-semibold text-[18px] '>{meaning.partOfSpeech}</h3>
                <div className='border-3 border-l-4 my-2 shadow-md p-2 border-l-blue-500 rounded-sm'>
                    <h2 className='font-semibold text-[18px]'>Meaning:</h2>
                    {
                        meaning.definitions?.map((def, i) => (
                            <p key={i} className='text-gray-700 mt-1 ml-2'>- {def.definition}</p>
                        ))
                    }
                </div>

                {meaning.synonyms.length !== 0 && (
                    
                    <div className='border-3 border-l-4 my-3 shadow-md p-2 border-l-blue-500 rounded-sm'>
                    <h2 className='font-semibold text-[18px] ml-1'>Synonyms:</h2>
                    {
                        meaning.synonyms?.map((syn, i) => (
                            <p key={i} className='text-gray-700 ml-2 cursor-pointer' onClick={() => setText(syn)}>-{syn}</p>        
                        ))
                    }
                    
                </div>
            )}
            </li>
            ))
        }
        
    </ul>
    </>
  )
}
