import React, {Component} from 'react';

class ResultComponent extends Component {
    render() {
        let {result} = this.props;
        return (
            <div className="result">
            <input type = "text" value = {result} style = {{width : 200, height : 50, marginTop : 40}}/>
               
            </div>
    )
        ;
    }
}


export default ResultComponent;