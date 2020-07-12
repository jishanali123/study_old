import React, { Component ,useContext} from 'react';

const CurrentRoute = React.createContext({
  path : 'welcomedggg'
});

const App = () =>{
  let currentRoute = useContext(CurrentRoute);

  return (
    <p>Current Route is : {currentRoute.path}</p>
  )

}

/*
//Context
const MyContext = React.createContext();

class MyProvider extends Component{
  state ={
    age : 26,
    name : "John Doe"
  }
  render(){
    return (
      <MyContext.Provider value={{
        state : this.state,
        incrementAge : () => {
          console.log("hey");
          this.setState({
            age : this.state.age + 1
          });
        }
      }}>
      {this.props.children}
      </MyContext.Provider>
    )
  }
}

const Child = () =>{
  return (
    <div>
      <MyContext.Consumer>
        {
          (context)=>(
            <React.Fragment>
              <p>Age: {context.state.age}</p>
              <p>Name: {context.state.name}</p>
              <button onClick={context.incrementAge}>Increment Age</button>
              </React.Fragment>
        )
      }
    </MyContext.Consumer>
    </div>
  )
}

const Person = () => <div><Child /></div>
const Family = () => <div><Person /></div>
const App = () => <MyProvider><Family /></MyProvider>
*/
export default App;
