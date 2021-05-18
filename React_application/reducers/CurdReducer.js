//Intialising the initial value

const initialstate = {
  checked : [],
    orders: [ ]    
};    

//Creting Reducer and making switch case for different operations
const reducer = (state = initialstate, action) => {    
    switch (action.type) {    
        case "Checked":
            return {...state,checked : action.payload}

        case 'Orders':    
            return {    
                ...state ,
                 orders:[...state.orders,...action.payload],   
            };    
            case 'Add':    
            return {    
                ...state ,
               orders:[...state.orders,...action.payload],   
            };     
        case 'Edit':    
            return {    
                ...state,    
                orders:state.orders.concat(action.payload)
                                            
            };    
        case 'Delete':    
            return {    
                ...state,    
                orders:state.orders.concat(action.payload)    
            };  
        case 'Search':    
            return {    
                ...state,    
                orders:[...action.payload],   
            };    
      
        default:    
            return state;    
    }    
};    
    
export default reducer;   