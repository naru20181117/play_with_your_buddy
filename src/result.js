import React from "react";

export function Result(props) {
  const { resultNum } = props;
  var result_messages = null;

  if (Math.sign(resultNum) === -1) {
    result_messages = (
      <div className="hero-body">
        <h4 className="subtitle">あなたのペットは平均寿命を超えて</h4>
        <h1 className="mb-5">
          <span className='title is-1 has-text-info'>{Math.abs(resultNum)}</span><span>年</span>
        </h1>
        <h4 className="subtitle">たくましく生きてくれています</h4>
      </div>
    );
  } else {
    result_messages = (
      <div className="hero-body">
        <h4 className="subtitle">あなたのペットが死ぬまで</h4>
        <h1 className="mb-5">
          <span>残り</span><span className='title is-1 has-text-info'>{resultNum}</span><span>回</span>
        </h1>
        <h4 className="subtitle">いっしょに遊べるようです</h4>
      </div>
    );
  }

  return (
    <div className="has-text-centered">
        <section className="hero has-background-info-light">
          { result_messages }
        </section>
      </div>
  );
}
