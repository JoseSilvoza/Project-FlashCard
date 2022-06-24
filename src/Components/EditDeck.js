import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
export default function EditDeck() {
  const history = useHistory();
  const initialState = {
    id: "",
    name: "",
    description: "",
    cards: [],
  };

  const [form, setForm] = useState(initialState);
  const { params } = useRouteMatch();

  useEffect(() => {
    const ac = new AbortController();
    readDeck(params.deckId, ac.signal).then((response) => {
      setForm(response);
    });
    return () => ac.abort;
  }, [params.deckId]);

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  function handleSubmit() {
    updateDeck(form);
    history.push(`decks/${form.id}`);
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`decks/${form.id}`}>{form.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            value={form.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            name="description"
            onChange={handleChange}
            value={form.description}
          />
        </div>
        <Link to={`/decks/${form.id}`} className="btn btn-secondary mr-2">
          Cancel
        </Link>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}