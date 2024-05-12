import React, { useState } from 'react';
import Load from '../Assets/load.png';
import Trump from '../Assets/Trump.png';
import Search from '../Assets/search.png';
import { Link } from 'react-router-dom';

function DumpQuotes() {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState('');

    const text = "Unfortunately we haven't updated the database for the newest quotes at the moment but you can still find the most controversial quotes Dump has ever said";
    const text2 = "My very important opinion on different topics";

    const generateColoredText = (text) => {
        const words = text.split(' ');
        return words.map((word, index) => {
            let colorClass;
            if (index % 3 === 0) {
                colorClass = "text-red-500";
            } else if (index % 3 === 1) {
                colorClass = "text-white";
            } else {
                colorClass = "text-blue-500";
            }
            return <span key={index} className={colorClass}>{word} </span>;
        });
    };

    const fetchData = () => {
        setLoading(true);
        const apiUrl = "https://api.tronalddump.io/search/quote?query=";
        const url = `${apiUrl}${encodeURIComponent(searchTerm)}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setQuote(data.quote);
                setLoading(false);
                window.location.href = `/topic/${encodeURIComponent(searchTerm)}`;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };

    const handleClick = () => {
        if (searchTerm.trim() !== "") {
            setLoading(true); // Set loading state immediately
            setTimeout(() => { // Set timeout to toggle loading state after 2 seconds
                fetchData();
            }, 2000);
        } else {
            console.error("Search term is empty");
        }
    };

    const redirectToTopic = (topic) => {
        setLoading(true); // Set loading state
        setTimeout(() => { // Set timeout to toggle loading state after 2 seconds
            window.location.href = `/topic/${encodeURIComponent(topic)}`;
        }, 2000);
    };

    return (
        <div className="relative">
            {loading && <div className="overlay" />}
            <div className={`bg-[#FFA500] min-h-screen w-screen flex flex-col justify-center items-center ${loading ? 'opacity-50' : ''}`}>
                <h1 className="text-white text-2xl font-mono mt-4">DumpQuotes</h1>
                <img className="mt-20" width="200" height="200" src={Trump} alt="trump" />
                <p className="text-white text-xl mt-4">Website for donald trump's dumbest quotes</p>
                <p id="flag-text" className="text-base w-96 mt-4">{generateColoredText(text)}</p>
                <div className="flex justify-center items-center mt-20">
                    <div className="-ml-32 mr-6"> {/* Added mr-6 for space */}
                        <div className="w-[200px] -mt-44 bg-[#0047ab] rounded-2xl text-base text-center text-white h-16">
                            <p>Search for your stupid moments, you little migrant</p>
                        </div>
                    </div>
                    <img className="-ml-20" width="300" height="300" src={Search} alt="search" />
                    <div className='-ml-28'>
                        <input type="text" id="search" className="w-48 h-auto ml-5" value={searchTerm} onChange={handleChange} onKeyPress={handleKeyPress} />
                        <button className="ml-2 bg-[#0047ab] w-32 h-10 rounded-xl text-white" onClick={handleClick}>Search</button>
                    </div>
                </div>
                <h1 className="text-white text-2xl font-mono mt-20" id="flag-text2">{generateColoredText(text2)}</h1>
                <div className="flex justify-between mt-10 underline-offset-1 text-xl">
                    <ul className="w-1/1 text-white" style={{ marginRight: '100px' }}> {/* Added inline style for margin-right */}
                        <li><Link onClick={() => redirectToTopic("Leadership")}>Leadership</Link></li>
                        <li><Link onClick={() => redirectToTopic("Economy")}>Economy</Link></li>
                        <li><Link onClick={() => redirectToTopic("Immigration")}>Immigration</Link></li>
                        <li><Link onClick={() => redirectToTopic("China")}>China</Link></li>
                        <li><Link onClick={() => redirectToTopic("Media")}>Media</Link></li>
                        <li><Link onClick={() => redirectToTopic("Twitter")}>Twitter</Link></li>
                        <li><Link onClick={() => redirectToTopic("hillary+clinton")}>Hillary Clinton</Link></li>
                        <li><Link onClick={() => redirectToTopic("Foreign+Policy")}>Foreign Policy</Link></li>
                        <li><Link onClick={() => redirectToTopic("Women")}>Women</Link></li>
                    </ul>
                    <ul className="w-1/1 text-white">
                        <li><Link onClick={() => redirectToTopic("Jobs")}>Jobs</Link></li>
                        <li><Link onClick={() => redirectToTopic("Fake+News")}>Fake News</Link></li>
                        <li><Link onClick={() => redirectToTopic("Environment")}>Environment</Link></li>
                        <li><Link onClick={() => redirectToTopic("Russia")}>Russia</Link></li>
                        <li><Link onClick={() => redirectToTopic("Taxes")}>Taxes</Link></li>
                        <li><Link onClick={() => redirectToTopic("America")}>America</Link></li>
                    </ul>
                </div>
            </div>
            {loading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={Load} alt="loading" style={{ animation: 'spin 1s linear infinite' }} />
                </div>
            )}
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
                    z-index: 9999;
                }
                `}
            </style>
        </div>
    );
}

export default DumpQuotes;
