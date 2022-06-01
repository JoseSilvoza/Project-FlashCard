import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../utils/api/index";

function Deck() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
        setCards(response.cards);
      } catch (error) {
        console.error("It didn't work", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, []);

  async function DeleteDeckHandler(deck) {
    if (
      window.confirm("Delete this deck? You will not be able to recover it")
    ) {
      const abortController = new AbortController();
      try {
        history.push("/");
        return await deleteDeck(deck.id, abortController.signal);
      } catch (error) {
        console.error("Still didn't work", error);
      }
      return () => {
        abortController.abort();
      };
    }
  }

  async function DeleteCardHandler(card) {
    if (
      window.confirm("Delete THIS card? You will NOT be able to recover it haha >:) ")
    ) {
      const abortController = new AbortController();
      try {
        history.go(0);
        return await deleteCard(card.id, abortController.signal);
      } catch (error) {
        console.error("It didn't work", error);
      }
      return () => {
        abortController.abort();
      };
    }
  }

  async function EditDeckHandler() {
    history.push(`/decks/${deckId}/edit`);
  }

  async function StudyHandler() {
    history.push(`/decks/${deckId}/study`);
  }

  async function AddCardHandler() {
    history.push(`/decks/${deckId}/cards/new`);
  }

  async function EditCardHandler(card) {
    history.push(`/decks/${deckId}/cards/${cards.id}/edit`);
  }

  if (cards.length > 0) {
    return (
      <div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">{deck.name}</li>
        </ol>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{deck.name}</h2>
            <p>{deck.description}</p>

            <button
              onClick={() => EditDeckHandler()}
              className="btn btn-secondary mx-1"
            >
              Edit
            </button>

            <button
              onClick={() => StudyHandler()}
              className="btn btn-primary mx-1"
            >
              Study
            </button>

            <button
              onClick={() => AddCardHandler()}
              className="btn btn-primary mx-1"
            >
              Add Cards
            </button>

            <button
              onClick={() => DeleteDeckHandler()}
              className="btn btn-danger mx-1"
            >
              Delete
            </button>
          </div>
        </div>
        <h1>Cards</h1>
        {cards.map((card) => {
          return (
            <div className="card-deck" key={card.id}>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col">{card.front}</div>
                    <div className="col">{card.back}</div>
                  </div>
                  <div className="container row">
                    <button
                      onClick={() => EditCardHandler(card)}
                      className="btn btn-secondary mx-1"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => DeleteCardHandler(card)}
                      className="btn btn-danger mx-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}

export default Deck;
