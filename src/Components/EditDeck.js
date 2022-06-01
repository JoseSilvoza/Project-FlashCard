import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api/index";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const initialState = {
    id: "",
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState(initialState);

  function ChangeHandler({ target }) {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  async function SubmitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateDeck({ ...deck }, abortController.signal);
    history.push(`/decks/${deckId}`);
    await response;
  }

  async function CancelHandler() {
    history.push(`/decks/${deckId}`);
  }

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.error("Still doesn't work", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, []);
    
    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Edit Deck</li>
            </ol>
            <form onSubmit={SubmitHandler}>
                <h1>Deck</h1>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={ChangeHandler}
                        type="text"
                        value={deck.name}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        onChange={ChangeHandler}
                        type="text"
                        value={deck.description}
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
                    Submit
                </button>

            </form>
        </div>
    )
}

export default EditDeck;