import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ResultComponent from './components/Output';
import KeyPadComponent from "./components/Keypad";


class App extends Component {
    constructor(){
        super();

        this.state = {
            result: "",
            answer:""
        }
    }

    onClick = button => {

        if(button === "="){
            this.calculate()
        }

        else if(button === "C"){
            this.reset()
        }
        else if(button === "CE"){
            this.backspace()
        }

        else {
            var result = this.state.result;
             this.setState({ result: result.concat(button)})
           
        }
    };


    calculate = () => {
        console.log(this.state.result);
        var data = 
        {q : this.state.result};

        axios.post('http://localhost:3001/calculate', data
        ).then(function (response) {
            console.log(response);
            this.setState({
                result : response.data
            })
           
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });   
       
    };

    reset = () => {
        this.setState({
            result: ""
        })
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    };

    render() {
        return (
            <div>
                <div className="calculator-body" align = "center" style = {{height : 1440}}>
                    <h2 >Simple Calculator</h2>
                    <ResultComponent result={this.state.result}/>
                    <KeyPadComponent onClick={this.onClick}/>
                </div>
            </div>
        );
    }
}

export default App;
