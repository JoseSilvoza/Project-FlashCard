import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createCard, readCard, readDeck, updateCard } from "../utils/api";

export default function CardForm({ params, url }) {
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const initialState = {
    front: "",
    back: "",
  };
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    const ac = new AbortController();
    readDeck(params.deckId, ac.signal).then((response) => {
      setDeck(response);
      if (url.includes("edit")) {
        readCard(params.cardId, ac.signal).then((response) => {
          setForm(response);
        });
      }
    });
  }, [params.deckId, params.cardId, url]);

  const changerHandler = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  function submitHandler(event) {
    event.preventDefault();
    if (url.includes("edit")) {
      updateCard(form).then(() => {
        history.push(`decks/${deck.id}`);
      });
    } else {
      createCard(deck.id, form).then(() => {
        history.push(`decks/${deck.id}`);
      });
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          type="text"
          className="form-control"
          id="front"
          name="front"
          placeholder="Front side of card"
          onChange={changerHandler}
          value={form.front}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Back</label>
        <textarea
          className="form-control"
          id="back"
          rows="4"
          name="back"
          placeholder="Back side of card"
          onChange={changerHandler}
          value={form.back}
        />
      </div>
      <Link to={`/decks/${params.deckId}`} className="btn btn-secondary mr-2">
        Cancel
      </Link>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}