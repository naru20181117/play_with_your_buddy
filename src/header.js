import React from "react";
import title_img from './image/playwithyourbuddy_title.png';
import headerStyles from './styles/header.module.css';

export function Header() {
  return (
    <header className="hero is-small is-hold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <img src={title_img} alt="title-img" className={headerStyles.title_img} />
          <h2 className="subtitle">ペットとあと何回遊べるかを確認しよう</h2>
        </div>
      </div>
    </header>
  );
}
