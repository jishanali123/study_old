import React, { useEffect , useState , useReducer} from 'react';

const initialState ={
  count:0
}

function reducer (state=initialState , action) {
  switch(action.type) {
    case 'Increment':
      return {
        state,
        count : state.count + 1
      }
  }
}

const App = () => {

const [state,dispatch] = useReducer(reducer , initialState);
//console.log('state:',state);

return (
  <div className="App">
    Count : {state.count}
    <br /><br />
    <button onClick={dispatch({type:'Increment'})}>Increment</button>
    <button onClick={dispatch({type:'Decrement'})}>Decrement</button>
  </div>
);






  /*
   const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    console.log("use effect");
  }, [count]);

  return (
    <div>
    <p>You clicked {count} times</p>
    <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  </div>
);
*/
}

export default App;
