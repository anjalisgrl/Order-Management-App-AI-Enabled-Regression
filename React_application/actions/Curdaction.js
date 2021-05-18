export const Orders='Orders';
//Creating actions to be performed

//Fetching data for table
export const getOrders=(data)=> {  
    
        return {  
            type: 'Orders'  ,
            payload:data.payload
        };  
      
};

//Adding 
export const addOrders=(data)=> {  
    
    return {  
        type: 'Add'  ,
        payload:data.payload
    };  
  
};

//Editing 
export const editOrders=(data)=> {  
    
    return {  
        type: 'Edit'  ,
        payload:data.payload
    };  
  
};

//Deleting
export const deleteOrders=(data)=> {  
    
    return {  
        type: 'Delete'  ,
        payload:data.payload
    };  
  
};

//Checkbox
export const checked=(data)=> {  
    
    return {  
        type: 'Checked'  ,
        payload:data.payload
    };  
  
};

//Searching 
export const search=(data)=> {  
    
    return {  
        type: 'Search'  ,
        payload:data.payload
    };  
  
};  
