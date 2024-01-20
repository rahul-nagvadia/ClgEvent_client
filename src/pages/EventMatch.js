import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';

export default function EventMatch() {
    const { eventID } = useParams();
    const [event, setEvent] = useState({});
    const [matches, setMatches] = useState([]);
    const [matchStates, setMatchStates] = useState([
        // Initial state for the first object in the array
        {
          winnerUpdated: false,
          isSure1: false,
          isSure2: false,
          clg1: '',
          clg2: '',
          btnDisable: false,
        },
        // Additional initial states for more objects can be added here if needed
      ]);
       // State for each match
    // const [btnDisable, setBtnDisable] = useState(false);
    // const [currentIndex, setCurrentIndex] = useState(null);
    const [isEnable, setIsEnable] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:5000/clg/getEventDetails/${eventID}`, {
                    method: 'POST',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch matches');
                }

                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Error fetching matches:', error.message);
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
                console.log(data.matches)
                // Initialize state for each match
                const initialMatchStates = data.matches.map((match) => (
                    {
                    winnerUpdated: (match.winner ? true : false),
                    isSure1: false,
                    isSure2: false,
                    clg1: match.clg1._id,
                    clg2: match.clg2._id,
                    }
                ));

                setMatchStates(initialMatchStates);
                console.log(matchStates)
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
        console.log(index)
        console.log(matchState)
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
            updateMatchState(index, { isSure1: false});
        } else if (name === "clg2") {
            winnerSave(index, matchState.clg2);
            updateMatchState(index, { isSure2: false });
        }
        window.location.reload();

        // setMatchStates(updateMatchState(index, { isSure1: false, isSure2: false }));
    };

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();

        // Pad single-digit day or month with a leading zero
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}-${formattedMonth}-${year}`;
    }
    const NoClicked = (e, index) => {
        const name = e.target.name;
        if (name === "clg1") {
            updateMatchState(index, { isSure1: false });
            
        }
        else if (name === "clg2") {
            updateMatchState(index, { isSure2: false });
            
        }
        // setMatchStates(updateMatchState(index, { isSure1: false, isSure2: false }));
    }

    let updateMatchState = (index, newState) => {
        setMatchStates(prevMatchStates => {
            return prevMatchStates.map((state, i) =>
                i === index ? { ...state, ...newState } : state
            );
        });
    };
    

    let fnSetEnable = (data) => {
        setIsEnable(data);
    }
    return (
        <Layout fnSetEnable={fnSetEnable}>
            <div className='container mt-3'>
                <h1>{event.event_name}</h1>
                {
                    matches.length == 0 ?
                        <h1>
                            Loading...
                        </h1>
                        :
                        matches.map((match, index) => [
                            <div key={index} className='container mt-5'>
                                <div className="card">
                                    <div className="card-header">
                                        <div className='row'>
                                            <div className='col-sm' style={{ color: "grey" }}>
                                        
                                                <h5>Match - {index + 1}</h5>
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
                                        <div className='row'>
                                            <div className='col-sm text-left'>
                                                <h2 className=''>{match.clg1.clg_name}</h2>
                                                {
                                                    isEnable && !matchStates[index].winnerUpdated && (
                                                        <div>
                                                            <button className='btn btn-primary' name='clg1' onClick={(e) => winnerClick(e, index)} >winner</button>
                                                            {
                                                                matchStates[index].isSure1 && (
                                                                    <div className='mt-3'>
                                                                        <p><strong>Are You Sure, {match.clg1.clg_name} is Winner ? </strong></p>

                                                                        <button
                                                                            className='btn btn-success mx-1'
                                                                            name='clg1'
                                                                            onClick={(e) => YesClicked(e, index)}
                                                                        >
                                                                            Yes
                                                                        </button>
                                                                        <button name='clg1' onClick={(e) => NoClicked(e, index)} className='btn btn-danger mx-1'>No</button>

                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>

                                            <div className='col-sm' style={{ color: "grey" }}>
                                                <h5 className='text-center'>V / S</h5>
                                            </div>

                                            <div className='col-sm text-right'>
                                                <h2 className=''>{match.clg2.clg_name}</h2>
                                                {
                                                    isEnable && !matchStates[index].winnerUpdated && (
                                                        <div>
                                                            
                                                            <button className='btn btn-primary' name='clg2' onClick={(e) => winnerClick(e, index)}>winner</button>
                                                            {
                                                                matchStates[index].isSure2 && (
                                                                    <div className='mt-3'>
                                                                        <p><strong>Are You Sure, {match.clg2.clg_name} is Winner ? </strong></p>

                                                                        <button
                                                                            className='btn btn-success mx-1'
                                                                            name='clg2'
                                                                            onClick={(e) => YesClicked(e, index)}
                                                                        >
                                                                            Yes
                                                                        </button>
                                                                        <button name='clg2' onClick={(e) => NoClicked(e, index)} className='btn btn-danger mx-1'>No</button>

                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>

                                        </div>
                                        {
                                            match.winner && (
                                                <div className='text-center'>
                                                    <h3><span style={{ color: "darkblue" }}>{match.winner}</span> won the match.</h3>
                                                </div>
                                            )
                                        }

                                    </div>
                                </div>

                            </div>
                        ])
                }
            </div>
        </Layout>
    );
}
