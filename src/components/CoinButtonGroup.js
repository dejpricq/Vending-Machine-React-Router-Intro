import React from "react";
import CoinButton from "./CoinButton";

class CoinButtonGroup extends React.Component {
    render() {
        // how to pull out the logic for one object, one button
        // where a product needs a combo of buttons
        const objects = this.props.objects.map(object => {
            return (
                <CoinButton
                    class="col-6"
                    name={object.code}
                    obj={object}
                    onChoose={this.props.onChoose}
                />
            );
        });

        return (
            <div class={this.props.class}>
                {this.props.question}
                <div class="row no-pad">
                    {objects}
                </div>
            </div>
        );
    }
}

export default CoinButtonGroup;
