import { useEffect, useState } from 'react';
import DisplayTime from './components/DisplayTime';
import './App.css';

const App = ()=> {
    const [input, setInput] = useState("");
    const [items, setItems] = useState(()=>{
        return JSON.parse(localStorage.getItem("allTodoItems")) || [];
    });

    const addItem = (e)=>{
        e.preventDefault();

        let val = input.trim();
        if(val === "") {
            alert("Please Enter an Item");
        }
        else {
            const obj = {id: new Date().getTime(), item:val, isMarked:false};

            if(localStorage.getItem("allTodoItems") === null) {
                const allTodoItems = [];
                allTodoItems.push(obj);
                localStorage.setItem("allTodoItems",JSON.stringify(allTodoItems));
            }
            else {
                const allTodoItems = JSON.parse(localStorage.getItem("allTodoItems"));
                allTodoItems.push(obj);
                localStorage.setItem("allTodoItems",JSON.stringify(allTodoItems));
            }
            setItems(JSON.parse(localStorage.getItem("allTodoItems")));
            setInput("");
        }
    }

    const deleteItem = (index)=>{
        const allTodoItems = JSON.parse(localStorage.getItem("allTodoItems"));
        if(confirm(`Are you sure to delete "${allTodoItems[index].item}"?`)) {
            allTodoItems.splice(index,1);
            localStorage.setItem("allTodoItems", JSON.stringify(allTodoItems));
            setItems(JSON.parse(localStorage.getItem("allTodoItems")));
        }
    }

    const markRead = (e, index)=>{
        const allTodoItems = JSON.parse(localStorage.getItem("allTodoItems"));
        allTodoItems[index].isMarked = e.target.checked;
        localStorage.setItem("allTodoItems",JSON.stringify(allTodoItems));
        setItems(JSON.parse(localStorage.getItem("allTodoItems")));
    }
    
	return(<>
        <div className="content">
            <div className="container">
                <div className="row">
                    <div className="offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-4 col-lg-4 offset-xl-4 col-xl-3">
                        <div className="todo mt-4 p-1">
                            <div className="header">
                                <h4 className="pt-3 text-center">ToDo List</h4>
                                <p className='display_time text-end pe-2'><DisplayTime /></p>
                            </div>
                            <div className="input mb-4 mt-3">
                                <form onSubmit={(e)=>addItem(e)} name='form_handler'>
                                    <input type="text" className="form-control item" id="item" placeholder="Enter item" name="item" value={input} onChange={(e)=>setInput(e.target.value)} />
                                    <input type='submit' className='btn btn-success add_btn' value="Add" />
                                </form>
                            </div>
                            <ol className="list list-unstyled">
                                { items.length > 0 ? (items.map((item,i)=>{
                                    return(
                                        <li key={item.id} className="position-relative item p-2 rounded mb-1 text-white">
                                            <span className='d-flex'>
                                                <input checked={item.isMarked} onChange={(e)=>markRead(e, i)} className='mark_read' type="checkbox" />&nbsp;&nbsp;
                                                {item.isMarked?<del className='ellipsis d-inline-block'>{item.item}</del>:<span className='ellipsis d-inline-block'>{item.item}</span>}
                                            </span>
                                            <span onClick={()=>deleteItem(i)} className='position-absolute delete_icon'><i className="bi bi-trash-fill"></i></span></li>
                                    );
                                })):(<p className='text-center text-white'>No Items</p>)}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default App;