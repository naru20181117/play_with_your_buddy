import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Main } from "./Main";
import appStyles from './styles/app.module.css';

function App() {
  return (
    <div className={appStyles.backgroundImage}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
