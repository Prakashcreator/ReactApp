import React from "react";
import LineItem from "./LineItem";

const ItemList = ({items, handleCheck, handledelete}) => {

    return (
        <ul>
            {items.map((item) =>(
                <LineItem 
                    item = {item}
                    handleCheck = {handleCheck}
                    handledelete = {handledelete}
                />
            ))}
        </ul>
    )
}
export default ItemList;