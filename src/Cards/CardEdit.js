import React, { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";
//this imports readdeck, readcard and updatecard

function CardEdit ( { card,  setCard } ) { 
    const history = useHistory()
    const { deckId, cardId } = useParams()
    const [deckData, setDeckData] = useState({});
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    useEffect(() => {      
         // effect hook containing async function to call 'getDeck' to get relevant deck data
        const abortController = new AbortController();
        async function getDeck () {
            const gotDeck = await readDeck( deckId, abortController.signal )
            setDeckData(gotDeck)
        }
        getDeck()
        return () => abortController.abort()
    }, [deckId])

    // effect hook retreiving the data for the current card being edited
    useEffect(() => {       // effect hook retreiving the data for the current card being edited
        async function getCard() {
            const cardInfo = await readCard(cardId);
            setCard(cardInfo);          // setting the state of the whole card
            setFront(cardInfo.front);   // individual state variable for front and back data
            setBack(cardInfo.back);
        }
        getCard();
    }, [setCard, cardId]); //when it states the useEffect is missing a dependency, add the setCard inside.


    const handleFrontChange = (event) => {
        setFront(event.target.value);   // set state for front of card based on inputted form data. this is only used to display up-to-date info in the form
        setCard({                       // updating the actual value for the card that will eventually be submitted with the form
            ...card,
            front: event.target.value,
        });
    }
    const handleBackChange = (event) => {
        setBack(event.target.value);    // set state for back of card based on inputted form data. this is only used to display up-to-date info in the form
        setCard({                       // updating the actual value for the card that will eventually be submitted with the form
            ...card,    
            back: event.target.value,
        });
    }

    // async submit handler that calls 'updateCard' api
    const handleSubmit = async (event) => {     
        event.preventDefault();
        await updateCard(card)
        // return to deck view page
        history.push(`/decks/${deckId}`)        
    }
    const cardStyle = {
        marginRight: "5px",
    }

    //There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4). It displays the same form as the Add Card screen, except it is prefilled with information for the existing card. It can be edited and updated.If the user clicks on either Save or Cancel, the user is taken to the Deck screen.
    //to include cardform
    
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deckId}`}>{deckData.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            <CardForm handleSubmit={handleSubmit} handleFrontChange={handleFrontChange} handleBackChange={handleBackChange} front={front} back={back} deckId={deckId}/>
        </div>
    )
}



export default CardEdit