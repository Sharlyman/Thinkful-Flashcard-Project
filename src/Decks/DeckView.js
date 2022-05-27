import React, { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";


function DeckView () {
    const {deckId} = useParams();
    const [deck,setDeck] = useState({});
    const history = useHistory();

    useEffect(() => {       // "readDeck" api call
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal)
            .then(setDeck)
        
        return () => abortController.abort()
    },[deckId])
    const deleteFunction = (event) => {
        if (window.confirm("Delete this deck?")) {
        deleteDeck(event.target.value)  // "deleteDeck" api call
        history.push("/")   // return to home page
        }
    }
    const cardStyle = {
        justifyContent: "space-around",
        marginRight: "5px",
    }
    if (!deck) {
        return (
            <h3>Loading...</h3>
        )
    }
    return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
            </ol>
        </nav>
        <div className="card">
            <div className="card-body">
                <h5>{deck.name}</h5>
                <p>{deck.description}</p>
                <NavLink to={`/decks/${deckId}/edit`} type="button" className="btn btn-secondary" style={cardStyle}>Edit</NavLink>
                <NavLink to={`/decks/${deckId}/study`} type="button" className="btn btn-primary" style={cardStyle}>Study</NavLink>
                <NavLink to={`/decks/${deckId}/cards/new`} type="button" className="btn btn-primary"style={cardStyle}>Add Cards</NavLink>
                <button type="button" className="btn btn-danger bi bi-trash" style={cardStyle} value={deckId} onClick={deleteFunction}>Delete</button>
            </div>
        </div>
    </div>
    )
}

export default DeckView