import './App.css';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Result } from './Components/Result';
import { useEffect, useMemo, useState } from 'react';

const synth = window.speechSynthesis;

function App() {

  // console.log(synth.getVoices())
  const voices = useMemo(() => synth.getVoices(), [])
  const [selectedVoice, setSelectedVoice] = useState("");
  const [text, setText] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [meanings, setMeanings] = useState([]);
  const [phonetics, setPhonetics] = useState([]);
  const [word, setWord] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dictionaryApi = (text) => {
    setLoading(true);
    let url  = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setMeanings(data[0].meanings)
        setPhonetics(data[0].phonetics);
        setWord(data[0].word);
        setError(false);
      })
      .catch(e => {
        console.log(e)
        setError(true);
      })
      .finally(setLoading(false))
  }

  // console.log("Meanings: ", meanings)
  // console.log("Phonetics", phonetics)

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const reset = () => {
    setError(false);
    setWord([]);
    setMeanings([])
    setPhonetics([])
    setIsSpeaking(false);
    setLoading(false);
  }

  useEffect(() => {
    if(!text.trim()) return reset();

    const debounce = setTimeout(() => {
      setLoading(true)
      dictionaryApi(text);
    }, 1000);

    return () => clearTimeout(debounce);

  }, [text])


  const startSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((voice) => voice.name === selectedVoice);
    utterance.voice = voice;
    synth.speak(utterance);
    setIsSpeaking(false);
  }

  const handleSpeech = () => {
    if(!text.trim()) return;
    if(!synth.speaking){
      startSpeech(text);
      setIsSpeaking(true);
    }
    else{
      synth.cancel();
    }

    setInterval(() => {
      if(!synth.speaking) {
        setIsSpeaking(false);
      }
    }, 50)

  }

  return (
    <>
      <Header/>
      <div className='container max-w-[1000px] px-3 mx-auto my-10'>

        <div className='max-w-[500px] flex flex-col gap-5 justify-center w-full mx-auto shadow-2xl py-3 px-4 rounded-md'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <textarea cols="30" rows="5" className='outline-none p-2 resize-none border border-blue-500 rounded-sm ' value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <div className='w-full flex items-center justify-between gap-2'>
              <select name="voices" className='w-full p-2' value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}  >
                {voices.map((voice, index) => (
                  <option key={index} value={voice.name}>{voice.name}</option>
                ))}
              </select>
              <i className={`fas fa-volume-high cursor-pointer  ${isSpeaking ? 'text-blue-500' : ''}`}
              onClick={handleSpeech}
              ></i>
            </div>
        </form>
         {
          error ? (
            <h2 className='text-xl font-semibold ml-2 mb-2'>No Definitions found!!</h2>
          ) : (
            <Result meanings={meanings} phonetics={phonetics} word={word} loading={loading} setText={setText}/>
          )
         }         

        </div>

      </div>
      <Footer/>
    </>
  );
}

export default App;
