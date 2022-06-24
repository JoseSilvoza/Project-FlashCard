import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";
export default function EditCard() {
  const [deck, setDeck] = useState({});
  const { params, url } = useRouteMatch();

  useEffect(() => {
    const ac = new AbortController();
    readDeck(params.deckId, ac.signal).then((response) => {
      setDeck(response);
    });
  }, [params.deckId, url]);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`decks/${params.deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <CardForm url={url} params={params} />
    </>
  );
}