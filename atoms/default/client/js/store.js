import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";

const initialState = {
    dataLoaded: false,
    sheets: null,
    content: {},
    UI: {
        view: 'home'
    }
};

export const assetsPath = "<%= path %>";

export const 
    ACTION_DATA_LOADED = 'action_data_loaded',
    ACTION_SET_SHEETS = 'action_set_sheets',
    ACTION_SET_SCORE = 'action_set_score',
    ACTION_SET_VIEW = 'action_set_view'
    ;

const setSheets = (sheets) => {
    return {
        type: ACTION_SET_SHEETS,
        payload: sheets
    };
}
const setDataLoaded = () => {
    return {
        type: ACTION_DATA_LOADED,
        payload: true
    };
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_SET_SHEETS:
            const content = {};
            action.payload.global.forEach(v => {
                content[v.key] = v.content;
            });

            content['cards'] = [...action.payload.cards];
            // action.payload.cards.forEach(v => {
            //     content.cards[v.panel] = v;
            // })
            // content['questions'] = {};
            // action.payload.questions.forEach(v => {
            //     content.questions[v.panel] = v;
            // })
            
            return {...state, sheets: action.payload, content: content };
            // return {...state, sheets: action.payload };

            break;
        case ACTION_DATA_LOADED:
            return {...state, dataLoaded: true};
        case ACTION_SET_SCORE:
            return {...state, UI: {...state.UI, score: action.payload}};        
        case ACTION_SET_VIEW:
            return {...state, UI: {...state.UI, view: action.payload}};
        default:
            return state;
    }
}

export const fetchData = (url) => {
    return  (dispatch) => {
        fetch(`${url}?t=${new Date().getTime()}`)
            .then(resp=> resp.json())
            .then((d)=>{
                console.log(d);
                dispatch(setSheets(d.sheets));
                dispatch(setDataLoaded());

            })
            // // .then(setTimeout(this.intro, 2000))
            // .then(this.intro)
            .catch(err => {
                console.log(err);
            });
        }
    
}

export default createStore(rootReducer, applyMiddleware(thunk));