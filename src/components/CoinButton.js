import React from 'react';

class CoinButton extends React.Component {
    select(obj) {
        this.props.onChoose(obj);
    }
    
    render() {
        return (
            <div className={this.props.class}>        
                <button 
                    type="button"
                    class="coin-button"
                    onClick={() => this.select(this.props.obj)}
                >{this.props.name}
                </button>
                
            </div>
        );
    }
}

export default CoinButton;