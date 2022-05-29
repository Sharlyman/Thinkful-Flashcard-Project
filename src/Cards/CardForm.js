import React from "react";
import { useHistory } from "react-router-dom";

function CardForm ( { handleSubmit, handleFrontChange, handleBackChange, front, back, deckId } ) {
    const history = useHistory()
    const cardStyle = {
        marginRight: "5px",
    }

    return (
        <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea type="text" className="form-control" rows="3" id="front" onChange={handleFrontChange}  value={front}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea type="text" className="form-control" rows="3" id="back" onChange={handleBackChange}  value={back}></textarea>
                </div>
                <button type="button" className="btn btn-secondary" style={cardStyle} onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    )
}

export default CardForm