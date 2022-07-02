import React, { useEffect, useState } from "react";
import { fetchImages } from "./api";
import { calculateNumber } from "./calculate";
import { Form } from "./form";
import { Gallery } from "./gallery";
import { Result } from "./result";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";

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
          <FontAwesomeIcon icon={solid('rotate-right')} size="xl" className="mr-2" />スタートに戻る
        </button>
      </div>
      <hr/>
      <div className="column has-text-centered">
        <p className="mb-4">シェアして応援する</p>
        <div className="columns is-gapless is-centered">
          <div className="column is-one-quarter">
            <a href="https://twitter.com/intent/tweet?text=ペットと何回遊べるかを再認識するサイト&hashtags=playwithyourbuddy&via=1026NT&related=1026NT&url=https://www.playwithyourbuddy.com/" target="_blank" className="has-text-black">
              <FontAwesomeIcon icon={brands('twitter-square')} size="3x" />
            </a>
          </div>
          <div className="column is-one-quarter">
            <a href="https://www.facebook.com/share.php?u=https://www.playwithyourbuddy.com/" target="_blank" className="has-text-black">
              <FontAwesomeIcon icon={brands('facebook-square')} size="3x" />
            </a>
          </div>
          <div className="column is-one-quarter">
            <a href="https://timeline.line.me/social-plugin/share?url=https://www.playwithyourbuddy.com/" target="_blank" className="has-text-black">
              <FontAwesomeIcon icon={brands('line')} size="3x" />
            </a>
          </div>
        </div>
      </div>
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
