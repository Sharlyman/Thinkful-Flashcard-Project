import React, { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

////CardEdit and CardAdd share the same components
//You must use the readDeck() function from src/utils/api/index.js to load the deck that you're adding the card to.

//add a card and start with a blank form

function CardAdd () {
    const initialFormState = {                  
        front: "",
        back: "",
    };
    const history = useHistory()
    const { deckId } = useParams();
    const [deck, setDeck] = useState({})
    const [cardData, setCardData] = useState({ ...initialFormState });  // declaring state value for new card, initializing it as empty

    useEffect(() => {                                       // effect hook runs with 'deckId' dependency
        const abortController = new AbortController();
        async function getDeck () {                         // 'getDeck' api call in asynchronous function
            const gotDeck = await readDeck( deckId, abortController.signal ) // calls with deckId matching current url parameter
            setDeck(gotDeck)                                // set state of 'deck' to result of api call
        }
        getDeck()
        return () => abortController.abort()
    }, [deckId])
    
    const handleFront = ({target}) => {     // change handler corresponding with data for front of card
        setCardData({
            ...cardData,
            front: target.value,
        });
    };
    const handleBack = ({target}) => {      // change handler corresponding with data for back of card
        setCardData({
            ...cardData,
            back: target.value,
        });
    };
    const handleSubmit = async (event) => {     // asynchronous submit handler function
        event.preventDefault();
        await createCard(deckId, cardData)      // await result of 'createCard' api call
        setCardData({...initialFormState});     // reset form to blank 
        history.push(`/decks/${deckId}`)        // return to deck view
    }
    const cardStyle = {
        marginRight: "5px",
    }

    /* There is a breadcrumb navigation bar with a link to home /, 
    followed by the name of the deck to which the cards are being added,
     and finally the text Add Card (e.g., Home/React Router/Add Card).
     The screen displays the React Router: Add Card deck title.A form is shown with the "front" and "back" fields 
     for a new card. Both fields use a <textarea> tag that can accommodate multiple lines of text.
     If the user clicks Save, a new card is created and associated with the relevant deck. 
    Then the form is cleared and the process for adding a card is restarted. */

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h1>{deck.name}: Create Card</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea type="text" className="form-control" id="front" placeholder="Front side of card" onChange={handleFront} value={cardData.front}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea type="text" className="form-control" id="back" placeholder="Back side of card" onChange={handleBack} value={cardData.back}></textarea>
                </div>
                <button type="submit" className="btn btn-secondary" style={cardStyle} onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CardAdd