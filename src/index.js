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


const sagaMiddleware = createSagaMiddleware();

//----------------------WATCHER SAGA------------------------------//
function* rootSaga() {

}

const templateReducer = (state=[], action) => {
    return state;
}

const storeInstance = createStore( 
    (combineReducers({
        templateReducer
    })),
        applyMiddleware(sagaMiddleware, logger)
    );

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
