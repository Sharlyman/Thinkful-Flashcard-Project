import React from "react";
import {
  NavLink,
  useHistory,
} from "react-router-dom";
import { deleteDeck } from "../utils/api";



function DeckList ({ decks }) {
    const history = useHistory();

    const deleteFunction = (event) => {
        if (window.confirm("Delete this deck?")) {
        deleteDeck(event.target.value);
        history.push("/");
        }
    }
    const cardStyle = {
        justifyContent: "space-around",
        marginRight: "5px",
    }
    
    const list = decks.map((deck, index) => {       // inherits "decks" state variable from "DeckHome" and uses the data to create an array of list items displaying the data contained in the state variable
        const length = deck.cards.length;
        return (
            <li key={index} className="list-group-item">
                <div key={index} className="card-body" style={cardStyle}>
                    <h5>{deck.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{length} cards</h6>
                    <p>{deck.description} </p>
                    <NavLink to={`/decks/${deck.id}`} type="button" className="btn btn-primary" style={cardStyle}>View</NavLink>
                    <NavLink to={`/decks/${deck.id}/study`} type="button" className="btn btn-primary" style={cardStyle}>Study</NavLink>
                    <button key={index} type="button" className="btn btn-danger bi bi-trash" style={cardStyle} value={deck.id} onClick={deleteFunction}></button>
                </div>
            </li>
        )
    })
    return (
        <div>  
            <a className="btn btn-primary" href="/decks/new" type="button" style={{margin: "10px 5px"}} >Create Deck</a>
            <ul className="list-group">
                {list}
            </ul>
        </div>
    )
}

export default DeckList