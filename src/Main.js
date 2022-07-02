import React, { useEffect, useState } from "react";
import { fetchImages } from "./api";
import { calculateNumber } from "./calculate";
import { Form } from "./form";
import { Gallery } from "./gallery";
import { Result } from "./result";

export function Main() {
  const [urls, setUrls] = useState(null);
  const [resultNum, setResultNum] = useState(null);
  const [isResulted, setIsResulted] = useState(false);

  useEffect(() => {
    fetchImages("shiba").then((urls) => {
      setUrls(urls);
    });
  }, []);

  function reloadResults(data) {
    fetchImages(data.animalKind).then((urls) => {
      setUrls(urls);
    });

    calculateNumber(data).then((resultNum) => {
      setResultNum(resultNum);
    });

    setIsResulted(true);
  };

  function defaultResult() {
    setIsResulted(false);
  };

  const result = (
    <div>
      <Result resultNum={resultNum} />
      <div className="column has-text-centered">
        <button onClick={defaultResult} className="button is-primary">
          スタートに戻る
        </button>
      </div>
      <hr/>
    </div>
  )

  return (
    <main>
      <section className="section">
          <div className="columns is-5 is-narrow is-centered">
            <div className="box">
              {isResulted ? result : <Form onFormSubmit={reloadResults}/>}
            </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

export default Main;
