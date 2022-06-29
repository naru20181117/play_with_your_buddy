import React, { useEffect, useState } from "react";
import { fetchImages } from "./api";
import { calculateNumber } from "./calculate";
import { Form } from "./form";

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
      <div className="has-text-centered">
        <section class="hero has-background-info-light">
          <div class="hero-body">
            <h4 className="subtitle">あなたのペットが死ぬまで</h4>
            <h1 className="mb-5">
              <span>残り</span><span className='title is-1 has-text-info'>{resultNum}</span><span>回</span>
            </h1>
            <h4 className="subtitle">いっしょに遊べるようです</h4>
          </div>
        </section>
      </div>
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
        <div className="container">
          <div className="columns box is-centered">
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

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
        <img src={props.src} alt="cute dog!" />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <p>Loading....</p>;
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />
  }
  return (
    <div className="columns is-centered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}

export default Main;
