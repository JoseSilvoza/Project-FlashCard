import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";

function EditCard() {
    const history = useHistory();
    const { deckId, cardId } = useParams();

    const initialDeckState = {
        id: "",
        name: "",
        description: "",
    };

    const [deck, setDeck] = useState(initialDeckState);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(
                    deckId, abortController.signal
                );
                setDeck(response);
            } catch (error) {
                console.error("Failed to load deck", error);
            }
            return () => {
                abortController.abort();
            }
        }
        fetchData();
    }, []);

    const initialCardState = {
        id: "",
        name: "",
        description: "",
    }

    const [card, setCard] = useState(initialCardState)

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readCard(
                    cardId, abortController.signal
                )
                setCard(response);
            } catch (error) {
                console.error("Failed to load card", error)
            }
            return () => {
                abortController.abort();
            }
        }
        fetchData()
    }, []);


    function ChangeHandler({ target }) {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }

    async function SubmitHandler(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateCard({ ...card }, abortController.signal);
        history.push(`/decks/${deckId}`);
        return response;
    }

    async function CancelHandler() {
        history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Edit Card {cardId}</li>
            </ol>
            <form onSubmit={SubmitHandler}>
                <h2>Edit Card</h2>

                <div className="form-group">
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={ChangeHandler}
                        type="text"
                        value={card.front}
                    />
                </div>

                <div className="form-group">
                    <label>Back</label>
                    <textarea
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={ChangeHandler}
                        type="text"
                        value={card.back}
                    />
                </div>

                <button
                    className="btn btn-secondary mx-1"
                    onClick={() => CancelHandler()}
                >
                    Cancel
                </button>
                
                <button
                    className="btn btn-primary mx-1"
                    type="submit"
                >
                    Save
                </button>
            </form>
        </div>
    )
}

export default EditCard;