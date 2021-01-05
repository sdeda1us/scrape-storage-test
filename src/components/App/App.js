import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import styled, {css} from 'styled-components';



export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {dispatch({type:'SCRAPE_PLAY'})}, []);

  const playData = useSelector(state => state.playReducer);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Hello from template</h1>
      </header>
      <br/>
    </div>
  );
}



