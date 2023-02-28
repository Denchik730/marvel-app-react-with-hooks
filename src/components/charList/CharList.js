import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';


import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

  const [charList, setCharList] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [newCharLoading, setNewCharLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const {loading, error, getAllCharacters} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  //Запрос когда пользователь кликает на кнопку подгрузки
  const onRequest = (offset, initial) => {
    initial ? setNewCharLoading(false) : setNewCharLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if(newCharList.length < 9) {
      ended = true
    }

    setCharList(charList => [...charList, ...newCharList]);
    setNewCharLoading(newCharLoading => false);
    setOffset(offset => offset + 9);
    setCharEnded(charEnded => ended);
  };


  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();       
  };


  function renderItems(arr) {
    const items = arr.map((item, i) => {

      let imgStyle = {'objectFit' : 'cover'};
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
      }

      return (
        <li 
          className="char__item"
          tabIndex={0}
          key={item.id}
          ref={(el) => itemRefs.current[i] = el}
          onClick={() => {
            props.onCharSelected(item.id);
            focusOnItem(i)
          }}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === "Enter") {
                props.onCharSelected(item.id);
                focusOnItem(i);
            }
          }}>
          <img className="char__item-img" src={item.thumbnail} alt={`Изображение ${item.name}`} style={imgStyle}/>
          <div className="char__item-name">{item.name}</div>
        </li>
      )
    });

    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newCharLoading ? <Spinner/> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button 
        className="button button__main button__long"
        disabled={newCharLoading}
        style={{'display': charEnded ? 'none' : 'block'}}
        onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  )

}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}

export default CharList;