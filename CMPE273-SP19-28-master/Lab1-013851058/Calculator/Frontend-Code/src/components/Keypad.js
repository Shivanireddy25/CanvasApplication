import React, {Component} from 'react';
import styles from './Style.css';

class KeyPadComponent extends Component {

    render() {
        return (
            <div className="button" style ={{marginTop : 10}} >
                <button className="butto" name="(" onClick={e => this.props.onClick(e.target.name)}>(</button>
                <button className="butto" name="CE" onClick={e => this.props.onClick(e.target.name)}>CE</button>
                <button  className="butto"name=")" onClick={e => this.props.onClick(e.target.name)}>)</button>
                <button  className="butto"name="C" onClick={e => this.props.onClick(e.target.name)}>C</button><br/>


                <button  className="butto"name="1" onClick={e => this.props.onClick(e.target.name)}>1</button>
                <button  className="butto"name="2" onClick={e => this.props.onClick(e.target.name)}>2</button>
                <button  className="butto"name="3" onClick={e => this.props.onClick(e.target.name)}>3</button>
                <button  className="butto"name="+" onClick={e => this.props.onClick(e.target.name)}>+</button><br/>


                <button  className="butto"name="4" onClick={e => this.props.onClick(e.target.name)}>4</button>
                <button  className="butto"name="5" onClick={e => this.props.onClick(e.target.name)}>5</button>
                <button  className="butto"name="6" onClick={e => this.props.onClick(e.target.name)}>6</button>
                <button  className="butto"name="-" onClick={e => this.props.onClick(e.target.name)}>-</button><br/>

                <button className="butto" name="7" onClick={e => this.props.onClick(e.target.name)}>7</button>
                <button className="butto" name="8" onClick={e => this.props.onClick(e.target.name)}>8</button>
                <button className="butto" name="9" onClick={e => this.props.onClick(e.target.name)}>9</button>
                <button  className="butto"name="*" onClick={e => this.props.onClick(e.target.name)}>x</button><br/>


                <button className="butto" name="." onClick={e => this.props.onClick(e.target.name)}>.</button>
                <button  className="butto"name="0" onClick={e => this.props.onClick(e.target.name)}>0</button>
                <button  className="butto"name="=" onClick={e => this.props.onClick(e.target.name)}>=</button>
                <button  className="butto"name="/" onClick={e => this.props.onClick(e.target.name)}>÷</button><br/>
            </div>
        );
    }
}


export default KeyPadComponent;
