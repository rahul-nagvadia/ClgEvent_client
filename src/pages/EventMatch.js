import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';

export default function EventMatch() {
    const { eventID } = useParams();
    const [event, setEvent] = useState({});
    const [matches, setMatches] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [matchStates, setMatchStates] = useState([]);
    const [isEnable, setIsEnable] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:5000/clg/getEventDetails/${eventID}`, {
                    method: 'POST',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch event');
                }

                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event:', error.message);
            }
        };

        fetchEvent();
    }, []);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch(`http://localhost:5000/clg/getMatches/${eventID}`, {
                    method: 'POST',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch matches');
                }

                const data = await response.json();
                setMatches(data.matches);

                // Initialize state for each match
                const initialMatchStates = data.matches.map(() => ({
                    winnerUpdated: false,
                    isSure1: false,
                    isSure2: false,
                    clg1: '',
                    clg2: '',
                    btnDisable: false,
                }));
                setMatchStates(initialMatchStates);
            } catch (error) {
                console.error('Error fetching matches:', error.message);
            }
        };

        fetchMatches();
    }, []);

    const winnerSave = async (index, clg) => {
        try {
            const response = await fetch(`http://localhost:5000/clg/matchWinner/${eventID}/${index}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ clg: clg })
            });

            const data = await response.json();
            if (data.success) {
                alert("Winner Saved Successfully...")
            } else {
                alert("No Saved!!!");
            }
        } catch (error) {
            console.error('Error fetching matches:', error.message);
        }
    }

    const winnerClick = (e, index) => {
        let matchState = matchStates[index];
        if (e.target.name === "clg1") {
            updateMatchState(index, { isSure1: true, isSure2: false });
        } else if (e.target.name === "clg2") {
            updateMatchState(index, { isSure1: false, isSure2: true });
        }
    };

    const YesClicked = (e, index) => {
        const matchState = matchStates[index];
        const name = e.target.name;

        if (name === "clg1") {
            winnerSave(index, matchState.clg1);
            updateMatchState(index, { isSure1: false });
        } else if (name === "clg2") {
            winnerSave(index, matchState.clg2);
            updateMatchState(index, { isSure2: false });
        }
        window.location.reload();
    };

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const NoClicked = (e, index) => {
        const name = e.target.name;
        if (name === "clg1") {
            updateMatchState(index, { isSure1: false });
        } else if (name === "clg2") {
            updateMatchState(index, { isSure2: false });
        }
    }

    const updateMatchState = (index, newState) => {
        setMatchStates(prevMatchStates => {
            return prevMatchStates.map((state, i) =>
                i === index ? { ...state, ...newState } : state
            );
        });
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleScroll = (e) => {
        const element = e.target;
        console.log(element.scrollTop);
    };

    const filteredMatches = selectedDate ? matches.filter(match => formatDate(match.match_date) === selectedDate) : matches;

    const dates = [...new Set(matches.map(match => formatDate(match.match_date)))];

    const dateButtonStyle = {
        backgroundColor: 'lightblue',
        marginBottom: '10px',
        padding: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '150px', // Adjust according to your preference
    };

    const matchCardStyle = {
        marginBottom: '20px', // Adjust spacing between cards
    };

    return (
        <Layout fnSetEnable={setIsEnable}>
            <div className='container mt-3'>
                <div className="row">
                    <div className="col-md-3" style={{ overflowY: 'scroll', maxHeight: '600px' }} onScroll={handleScroll}>
                        <h3 style={{ marginBottom: '20px' }}>Select Date:</h3>
                        {dates.map(date => (
                            <button key={date} style={{ ...dateButtonStyle, backgroundColor: date === selectedDate ? 'lightgreen' : 'lightblue' }} onClick={() => handleDateClick(date)}>{date}</button>
                        ))}
                    </div>
                    <div className="col-md-9">
                        <h1>{event.event_name}</h1>
                        <div className='container mt-5'>
                            {filteredMatches.length === 0 ? (
                                <h2>No matches found for selected date.</h2>
                            ) : (
                                filteredMatches.map((match, index) => (
                                    <div key={index} className='match' style={matchCardStyle}>
                                        <div className="card">
                                            <div className="card-header">
                                                <div className='row'>
                                                    <div className='col-sm' style={{ color: "grey" }}>
                                                        <h5>Round - {match.round}</h5>
                                                    </div>
                                                    <div className='col-sm' style={{ color: "grey" }}>
                                                        <h5>Timing : {match.time}</h5>
                                                    </div>
                                                    <div className='col-sm' style={{ color: "grey" }}>
                                                        <h5>Match Date : {formatDate(match.match_date)}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className='col-sm text-center' style={{ color: "green" }}>
                                                        <h5>Match - {index + 1}</h5>
                                                    </div>
                                                </div>
                                                {
                                                    match.clg2 ? (
                                                        <>
                                                            <div className='row'>
                                                                <div className='col-sm text-left'>
                                                                    <h2 className=''>{match.clg1.clg_name}</h2>
                                                                    {isEnable && !matchStates[index].winnerUpdated && (
                                                                        <div>
                                                                            <button className='btn btn-primary' name='clg1' onClick={(e) => winnerClick(e, index)}>Winner</button>
                                                                            {matchStates[index].isSure1 && (
                                                                                <div className='mt-3'>
                                                                                    <p><strong>Are You Sure, {match.clg1.clg_name} is Winner ?</strong></p>
                                                                                    <button className='btn btn-success mx-1' name='clg1' onClick={(e) => YesClicked(e, index)}>Yes</button>
                                                                                    <button className='btn btn-danger mx-1' name='clg1' onClick={(e) => NoClicked(e, index)}>No</button>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className='col-sm' style={{ color: "grey" }}>
                                                                    <h5 className='text-center'>V / S</h5>
                                                                </div>
                                                                <div className='col-sm text-right'>
                                                                    <h2 className=''>{match.clg2.clg_name}</h2>
                                                                    {isEnable && !matchStates[index].winnerUpdated && (
                                                                        <div>
                                                                            <button className='btn btn-primary' name='clg2' onClick={(e) => winnerClick(e, index)}>Winner</button>
                                                                            {matchStates[index].isSure2 && (
                                                                                <div className='mt-3'>
                                                                                    <p><strong>Are You Sure, {match.clg2.clg_name} is Winner ?</strong></p>
                                                                                    <button className='btn btn-success mx-1' name='clg2' onClick={(e) => YesClicked(e, index)}>Yes</button>
                                                                                    <button className='btn btn-danger mx-1' name='clg2' onClick={(e) => NoClicked(e, index)}>No</button>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {match.winner && (
                                                                <div className='text-center'>
                                                                    <h3><span style={{ color: "darkblue" }}>{match.winner}</span> won the match.</h3>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div className="text-center">
                                                            <h2><span style={{color:'blue'}}>{match.clg1.clg_name}</span> is promoted to next Round.</h2>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

