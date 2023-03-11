import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

import decoration from '../../resources/img/vision.png';


const App = () => {

  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  }

  return (
    <div className="app">
      <AppHeader/>
      <main>
        {/* <ErrorBoundary>
          <RandomChar/>
        </ErrorBoundary>
        <section className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedChar}/>
          </ErrorBoundary>
        </section>
        <img className="bg-decoration" src={decoration} alt="vision"/> */}
        <AppBanner/>
        <ComicsList/>
      </main>
    </div>
  )
  
}

export default App;
