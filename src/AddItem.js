import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = ({newItem, setNewItem, handleSubmit}) =>{

    //useRef mostly used to get current state focus.
    const inputRef = useRef();
    return(
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor="addItem"> Add Item </label>
            <input
                autoFocus
                id="addItem"
                ref={inputRef}
                type="text"
                placeholder="Add Item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                required
            />

            <button
                type="submit"
                aria-label='Add Item'    
                onClick={() => inputRef.current.focus()}       
            >
                <FaPlus />
            </button>
        </form>
    )

}

export default AddItem