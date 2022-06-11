import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const history = useHistory();

  const initialState = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(initialState);
  function ChangeHandler({ target }) {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
    });
  }

  async function SubmitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createDeck({ ...newDeck }, abortController.signal);
    history.push("/");
    return response;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={SubmitHandler}>
        <h1 className="my-4 text-center">Create Deck</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            className="form-control form-control-lg"
            type="text"
            placeholder="Deck Name"
            onChange={ChangeHandler}
            value={newDeck.name}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="5"
            placeholder="Brief description of the deck"
            onChange={ChangeHandler}
            value={newDeck.description}
            required
          ></textarea>
        </div>
        <Link to="/" className="mr-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
        </Link>
              <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={SubmitHandler}
              >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
