import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Trump from '../Assets/Trump.png';
import Load from '../Assets/load.png'; // Import the loading image

export default function Topic() {
    const { topic } = useParams();
    const [topicData, setTopicData] = useState(null);
    const [loading, setLoading] = useState(true); // State for managing loading state
    const [search, setSearch] = useState('');
    const [showAll, setShowAll] = useState(false);

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading state to true when fetching data starts
                const apiUrl = `https://api.tronalddump.io/search/quote?query=${topic}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                setTopicData(data);
                // Simulate loading delay with setTimeout
                setTimeout(() => {
                    setLoading(false); // Set loading state to false after 2 seconds
                }, 2000);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading state to false in case of error
            }
        };

        fetchData();
    }, [topic]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `<span class="text-blue-500">${year}</span>-<span class="text-red-500">${month}</span>-<span class="text-white">${day}</span>`;
    };

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const handleSearch = () => {
        if (search.trim() !== "") {
            // Redirect to the searched topic
            window.location.href = `/topic/${encodeURIComponent(search)}`;
        } else {
            console.error("Search term is empty");
        }
    };

    return (
        <div className="relative">
            {loading && <div className="overlay" />}
            <div className='bg-[#FFA500] min-h-screen w-screen flex flex-col justify-center items-center'>
                <h1 className="text-white text-2xl font-mono mt-4">DumpQuotes</h1>
                <Link to="/">
                    <img className="mr-4" width="200" height="200" src={Trump} alt="trump" />
                </Link>
                <div className="flex items-center mt-4">
                    <div>
                        <h1 className='text-white text-xl font-bold -ml-20 -mt-1 absolute'>Search:</h1>
                        <input type="text" className='w-48 h-auto' value={search} placeholder={topic} onChange={handleChange} onKeyPress={handleKeyPress} />
                        <button onClick={handleSearch} className='ml-2'>Search</button>
                    </div>
                </div>
                <div>
                    {loading && <p>Loading...</p>}
                    {topicData && topicData._embedded && topicData._embedded.quotes && topicData._embedded.quotes.length > 0 ? (
                        <>
                            {showAll
                                ? topicData._embedded.quotes.map((quote, index) => (
                                    <div key={index} className="bg-[#c7ced6] w-[500px] p-4 m-4 rounded-md shadow-md">
                                        <p>"{quote.value}" <span dangerouslySetInnerHTML={{ __html: formatDate(quote.appeared_at) }}></span></p>
                                    </div>
                                ))
                                : topicData._embedded.quotes.slice(0, 5).map((quote, index) => (
                                    <div key={index} className="bg-[#c7ced6] w-[500px] p-4 m-4 rounded-md shadow-md">
                                        <p>"{quote.value}" <span dangerouslySetInnerHTML={{ __html: formatDate(quote.appeared_at) }}></span></p>
                                    </div>
                                ))}
                            {topicData._embedded.quotes.length > 7 && (
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-52" onClick={toggleShowAll}>
                                    {showAll ? 'Show Less' : 'Load More'}
                                </button>
                            )}
                        </>
                    ) : (
                        <p className='mt-20 text-2xl font-bold text-red-500'>Nothing here</p>
                    )}
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
