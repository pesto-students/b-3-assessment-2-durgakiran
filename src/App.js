// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { Autocomplete } from './autocomplete/Autocomplete';

// /**
//  * You can use this file to test use-form or other questions.
//  * NOTE that the App.js will not be considered for scoring.
//  * Only useForm.js or files in the relavant folder will be used with custom test cases.
//  */

// // function App() {
// //   return (
// //     <div className="App">
// //       <Autocomplete />
// //       {/* <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header> */}
// //     </div>
// //   );
// // }

// export default App;
import React from 'react';
import { CheckboxGroup } from './checkbox-group/CheckboxGroup';

class App extends React.Component {
  state = {
    fruits: ['apple', 'watermelon'],
  };

  componentDidMount() {
    const timer = setTimeout(() => {
      this.setState({ fruits: ['apple', 'orange'] });
    }, 5000);
  }

  setFruits = (fruits) => {
    console.log(fruits); // All checkboxes which are currently checked.
    this.setState({ fruits });
  };

  render() {
    const { fruits } = this.state;

    return (
      <CheckboxGroup name="fruits" value={fruits} onChange={this.setFruits}>
        {(Checkbox) => (
          <>
            <label>
              <Checkbox value="apple" /> Apple
            </label>
            <label>
              <Checkbox value="orange" /> Orange
            </label>
            <label>
              <Checkbox value="watermelon" /> Watermelon
            </label>
          </>
        )}
      </CheckboxGroup>
    );
  }
}

export default App;
