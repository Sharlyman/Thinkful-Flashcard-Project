import React, { useEffect, useState } from "react";
import {
  useParams,
  useHistory,
} from "react-router-dom";

function CardStudy ({deck}) {
    const [side, setSide] = useState(true);
    const [cardNum, setCardNum] = useState(0);
    const [currentCard, setCurrentCard] = useState(deck.cards[0])
    const { deckId } = useParams()
    const history = useHistory();
    const cardList = deck.cards     // pulls 'deck' state from 'DeckStudy' and assigns the cards array contained within to a variable
    
    useEffect (() => {  // effect hook that runs when the cardList variable or cardNum state are updated
        const abortController = new AbortController();
        
        setCurrentCard(cardList[cardNum])   

        return () => abortController.abort()
    }, [cardList, cardNum])
    const handleNext = () => {      // clicking "next" increments the "cardNum" state, triggering the effect hook
        handleFlip()                // runs 'flip' function
        return setCardNum((currentCardNum) => currentCardNum + 1)
    }
    const handleFlip = () => {
        return setSide(!side) // determines if the front or back of the card is displayed
    }
    const handleLast = () => {      // runs a window.confirm() warning prompting the user to either go back to the beginning of the card list or exit the study screen
        if (window.confirm("Restart Cards?")) {
            setCardNum(0)
        } else {
            history.push(`/decks/${deckId}`)
        }
    }
    const cardStyle = {
        marginRight: "5px",
    }
    if (cardList.length < 3) {      // displays an error message if there are less than 3 cards in the deck
        return (
            <div>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {cardList.length} cards in this deck.</p>
                <button className="btn btn-primary" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add Cards</button>
            </div>
        )
    }
    if (cardNum <= cardList.length - 2) {   // standard operation for all but the last card in the deck
        return (
            <div className="card">
                <div className="card-body">
                    <h3>Card {cardNum + 1} of {cardList.length}</h3>
                    {side ? <p>{currentCard.front}</p> : <p>{currentCard.back}</p>}
                    <button type="button" className="btn btn-secondary" style={cardStyle} onClick={handleFlip}>Flip</button>
                    {!side ? <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>:<></>}
                </div>
            </div>
        )
    } else if (cardNum === cardList.length-1) {     // for the last card in the deck, the "next" button is replaced by a "restart" button
        return (
            <div className="card">
                <div className="card-body">
                    <h3>Card {cardNum + 1} of {cardList.length}</h3>
                    {side ? <p>{currentCard.front}</p> : <p>{currentCard.back}</p>}
                    <button type="button" className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                    {!side ? <button type="button" className="btn btn-primary" onClick={handleLast}>Restart</button>:<></>}
                </div>
            </div>
        )
    }
}

export default CardStudy