import React, { useState } from "react";
import {
  useHistory,
} from "react-router-dom";
import { createDeck } from "../utils/api";

function DeckCreate () {
    const history = useHistory()
    const initialFormState = {
        name: "",
        description: "",
    };
    const [deckData, setDeckData] = useState({ ...initialFormState });      // declares a state variable, initialized as a blank object that will be updated by the form
    const handleNameChange = ({target}) => {     // handler for "name" of deck in form
        setDeckData({
            ...deckData,
            name: target.value,
        });
    };
    const handleDescriptionChange = ({target}) => {     // handler for "description" value of deck in form
        setDeckData({
            ...deckData,
            description: target.value,
        });
    };
    const handleSubmit = async (event) => {         // async submit handler that calls "createDeck" api and the resets the form ("deckData") to blank then returns to home
        event.preventDefault();
        await createDeck(deckData)
        setDeckData({...initialFormState});
        history.push("/")
    }
    const cardStyle = {
        marginRight: "5px",
    }
    return (
        <div>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Deck Name" onChange={handleNameChange} value={deckData.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea type="textarea" className="form-control" id="description" placeholder="Brief description of the deck" onChange={handleDescriptionChange} value={deckData.description}/>
                </div>
                <button type="submit" className="btn btn-secondary" style={cardStyle} onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default DeckCreate