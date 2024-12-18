import Topic from "./topic"
import '../../../assets/css/border.css';
import { useState, useRef, useEffect } from "react";
import { getTopics } from '../../../utils/requests';

export default function Topics(){
    const [topics, setTopics] = useState([]);
    const [focus, setFocus] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [hovered, setHovered] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (focus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focus]);

    useEffect(() => {
        if (!inputRef.current) return;

        if (!inputRef.current.value && focus){
            setFocus(false);
        }
    }, [inputValue]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    function handleMouseEnter() {
        if (!hovered) setHovered(true);
        if (!focus) setFocus(true);
    }
    
    function handleMouseLeave() {
        if (hovered) setHovered(false);
        if (!inputRef.current) {setFocus(false); return};
        if (!inputRef.current.value) setFocus(false);
    }

    function addTopic(){
        if (inputValue.trim()) {
            console.log(inputValue);
            setTopics((prevTopics) => [
                ...prevTopics, 
                { title: inputValue, posts: 0 }
            ]);
            setInputValue("");
        }
    }

    useEffect(() => {
        async function fetchTopics() {
            const res = await getTopics(10);
    
            if (res.ok) {
                const data = await res.json();
                return data;
            }
    
            return [];
        }
    
        async function loadTopics() {
            const topics = await fetchTopics();
            setTopics(topics);
        }
    
        loadTopics();
    }, []);

    return(
        <section className="mb-4 rounded-2xl border border-[#2f3336] shadow-box relative cool-border r-2xl bg-black mt-5">
            <div className="overflow-hidden rounded-2xl">

                <div className="py-4 cursor-default px-5 text-xl relative" onMouseEnter={() => {if (!focus && !hovered) handleMouseEnter();}} onMouseLeave={handleMouseLeave}>
                    {focus ? 
                    (<div className="flex items-center" style={{justifyContent: 'space-between'}}>
                        <input className="w-[80%] bg-black outline-none" onChange={handleInputChange} ref={inputRef} value={inputValue} maxLength={20} type="text" id="topic"/>
                        <div className="rounded-full hover:bg-[#eff3f41a] p-1" onClick={addTopic}>
                            <svg fill="#fff" width="20" height="20" viewBox="0 0 45.402 45.402">
                                <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path>
                            </svg>
                        </div>
                    </div>) : 
                    (<h5 className="font-extrabold flex items-center text">Topics</h5>)}
                </div>

                <div className="grid">
                    {topics.map((topic, index) => <Topic item={topic} key={index} />)}
                </div>
            </div>
        </section>
    )
}