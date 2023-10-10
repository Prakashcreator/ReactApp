import React from "react";
import ItemList from "./ItemList";

const Content = ({items, handleCheck, handledelete}) => {
    
    return (
        <>
            {(items.length) ? (
                <ItemList 
                    items = {items}
                    handleCheck = {handleCheck}
                    handledelete = {handledelete}
                />
                ) : (
                    <p style={{marginTop: '2rem'}}>Your List is empty</p>
                )
            }                
        </>
       
    )
}

export default Content