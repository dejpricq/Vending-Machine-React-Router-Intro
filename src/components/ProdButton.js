import React from 'react';

class ProdButton extends React.Component {
    select(obj) {
        this.props.onChoose(obj);
    }
    
    render() {
        return (
            <div className={this.props.class}>           
                <button 
                    type="button"
                    class="prod-button"
                    onClick={_=>this.select(this.props.obj)}
                >{this.props.name}
                </button>              
            </div>
        );
    }
}

export default ProdButton;
