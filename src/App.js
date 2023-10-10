import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import SearchItem from "./SearchItem";
import { useEffect } from "react";
import apiRequest from "./apiRequest";

function App() {


  const API_URL = 'http://localhost:3500/items'
  // default list 
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  //Search Handling
  const [searchItem, setSearchItem] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //useEffect are used to avoid rendering of the page. If we perform any action in web page getting refresh
  //to avoid this we can use useEffect. useEffect Execute after whole page render.
  // we can re render particular component or variable using useEffect. 
  //useEffect( () => { JSON.parse(localStorage.getItem('todo_list'))}, []);
  useEffect( () => { 
    JSON.parse(localStorage.getItem('todo_list'))
    const fetchItems = async() => {
      try {
        const response = await fetch(API_URL);

        if(!response.ok) throw Error("Data not received");

        const list = await response.json();
        setItems(list);
        setFetchError(null);
      }
      catch (err){  
        setFetchError(err.message);
      }
      finally {
        setIsLoading(false);
      }
    }    
    (async () => await fetchItems())()
  }, []);

  // add new item To do lIsts
  const addItems = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = {id, checked : false, item};
    const listItems = [...items, addNewItem];
    setItems(listItems);

    //To add newly added data to JSON.
    const postOptions = {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(addNewItem)
    }

    const result = await apiRequest(API_URL, postOptions);
    if(result) {
      setFetchError(result);
    }
  }

  // handle checkbox is checked or not.
  const handleCheck = async (id) => {

    const listItems = items.map((item) => 
    item.id === id ? 
    //...item remaining item in the list
    {...item, checked : !item.checked} : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => (item.id === id));

    const updateOptions = {
      method : 'PATCH',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({checked:myItem[0].checked})
    }

    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, updateOptions);
    if(result) {
      setFetchError(result);
    }

  }

  //handle delete button to delete a list using filter.
  const handledelete = async (id) => {

    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    //Don't need local storage because create a fake json datas
    //localStorage.setItem("todo_list", JSON.stringify(listItems));
    const deleteOptions = {
      method : 'DELETE',
     
    }

    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, deleteOptions);
    if(result) {
      setFetchError(result);
    }
  }

  //handle submit button to add a new list 
  const handleSubmit = (e) => {
    //prevent refresh of the page, due to basic behaviour of form.
    e.preventDefault();
    if(!newItem) return;
    addItems(newItem);
    //empty the input after enter value
    setNewItem('');
  }

  return (
    <div className="App">
      <Header 
        title="Prakash List"
      />
      <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <SearchItem 
          searchItem = {searchItem}
          setSearchItem = {setSearchItem}
      />
    <main>
      {isLoading && <p>Loading items..</p>}
      {fetchError && <p> {`Error : ${fetchError}`} </p>}

      <Content
        items ={items.filter(item => ((item.item).toLowerCase()).includes(searchItem.toLowerCase()))}
        handleCheck = {handleCheck}
        handledelete = {handledelete}
      />
    </main>
      <Footer

        length= {items.length}

      />
    </div>
  );
}

export default App;
