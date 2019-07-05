import { SET_USER } from '../actions/actions';
import { RESET } from '../actions/actions';


export const initialState = {
    user : {

       email: '' ,
       name : localStorage.getItem('name'),
      about : '',
       city : '',
       country : '',
      company : '', 
      school : '',
       hometown : '',
        languages : '',
         gender : ''
    }
}

const reducer = (state = initialState, action ) => {
    let data ={}, newState = {}
    switch(action.type){
        case SET_USER:
            data = {

                email: action.payload.email,
                name : action.payload.name,
               about : action.payload.about,
                city : action.payload.city,
                country :  action.payload.country,
               company : action.payload.company, 
              school : action.payload.school,
                hometown : action.payload.hometown,
                 languages : action.payload.language,
                 gender : action.payload.gender,
            }
           // Object.assign(newState, data);
            Object.assign(newState,initialState,data);
            return newState;
        case RESET:
             return state; 
        default: return state;
    }
}

export default reducer;
