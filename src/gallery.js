import React from "react";

function Loading() {
  return <p>Loading....</p>;
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

export function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />
  }
  return (
    <div className="columns is-centered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-full-mobile is-one-third-tablet is-one-quarter-desktop">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}
