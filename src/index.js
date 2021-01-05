import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put, call} from 'redux-saga/effects';
import Axios from 'axios';
import cheerio from 'cheerio';


const sagaMiddleware = createSagaMiddleware();

//----------------------WATCHER SAGA------------------------------//
function* rootSaga() {
    yield takeEvery('SCRAPE_PLAY', scrapePlay);
}

function* scrapePlay() {
    try {
        const response = yield call(Axios.get, `https://cors-anywhere.herokuapp.com/http://shakespeare.mit.edu/henryv/full.html`);
        yield put({type: 'SET_PLAY', payload: response.data});
    } catch (error) {
        console.log('error fetching play', error);
    }
}

const playReducer = (state=[], action) => {
    if (action.type === 'SET_PLAY'){
        let locations = [];
        let lines =[];
        let $ = cheerio.load(action.payload);
        $('h3').each(function(i, element) {
            let location = $(this)
                .prepend()
                .text();
            locations.push(location);
        });
        $('a').each(function(i, element) {
            let line= $(this)
                .prepend()
                .text();
            lines.push(line);
        })
        return [locations, lines];
    }
    return state;
}

const storeInstance = createStore( 
    (combineReducers({
        playReducer
    })),
        applyMiddleware(sagaMiddleware, logger)
    );

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
