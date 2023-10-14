import React from "react";
import ProdButton from "./ProdButton";

class ProdButtonGroup extends React.Component {
    constructor(props){
        super();
        this.state = {
            code: '00',
            buttons: ['A','1','4','B','2','5','C','3','6']
        };
    }

    codeSelect(code){
        code = this.state.code[1] + code;

        if(code.includes('0')){
            this.setState({code: code});
        } else {
            let objects = this.props.objects;

            let chosen = objects.find(prod => prod.code == code);
            
            if(chosen != null){
                this.props.onChoose(chosen);
                this.setState({code: code});

                setTimeout(_=> {
                    this.clearCode();
                },1000);
            } else {
                this.stars();
                
                setTimeout(_=> {
                    this.clearCode();
                },1000);
            }
            
        }  
    }

    stars(){
        this.setState({code: "**"})
    }

    clearCode(){
        this.setState({code: '00'});
    }

    render() {
        const objects = this.state.buttons.map(object => {
            return (
                <ProdButton
                    class="col-4"
                    name={object}
                    obj={object}
                    onChoose={(code)=>this.codeSelect(code)}
                />
            );
        });

        return (    
            <div class="col-12">
                <div class="product-selection">
                    <div class="row no-pad">
                        {objects}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProdButtonGroup;
