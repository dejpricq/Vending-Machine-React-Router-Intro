import React from 'react';

class ObjReturn extends React.Component {
    deliverProduct() {
        this.props.onTake();
    }

    render() {
        return (
            <div class={this.props.class}>
                <div class="row">
                    <div class="col-12">
                        <button 
                            class={this.props.innerClass}
                            type="button" 
                            onClick={() => this.deliverProduct()}
                        >{this.props.display}</button>
                    </div>
                </div>
            </div>
        )          
    }
}

export default ObjReturn;