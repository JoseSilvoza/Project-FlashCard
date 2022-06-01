import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";

function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const response = await listDecks(abortController.signal);
        console.log("response", response);
        setDecks(response);
      } catch (error) {
        console.error("It doesn't work", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, []);

  async function DeleteHandler(deck) {
    if (
      window.confirm("Delete this deck? You will not be able to recover it")
    ) {
      history.go(0);
      return await deleteDeck(deck.id);
    }
  }

  return (
    <div className="container">
      <Link to="/decks/new" className="btn btn-secondary mb-2">
        Create Deck
      </Link>
      <div className="card-deck">
        {decks.map((deck) => {
          return (
            <div className="card" style={{ width: "30rem" }} key={deck.id}>
              <div className="card-body">
                <div className="card-title">{`${deck.name}`}</div>
                <div className="card-subtitle mb-2 text-muted">
                  {`${deck.cards.length} cards`}
                </div>
                <div className="card-text">{`${deck.description}`}</div>
                <Link
                  to={`/decks/${deck.id}`}
                  className="btn btn-secondary mx-1"
                >
                  View
                </Link>

                <Link
                  to={`/decks/${deck.id}/study`}
                  className="btn btn-primary mx-1"
                >
                  Study
                </Link>

                <button
                  type="button"
                  className="btn btn-danger mx-1"
                  onClick={() => DeleteHandler(deck)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
