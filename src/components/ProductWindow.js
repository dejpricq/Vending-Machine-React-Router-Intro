import React from 'react';
import Product from './Product';

import utils from "../scripts/utilities";



class ProductWindow extends React.Component {
    invSort(inventory) {
        // create an array of products and their quantities
        let srtdInv = {},
            selections = this.props.selections,
            invCopy = utils.copy(inventory);

        for (var i = 0; i < selections.length; i++) {
            let name = selections[i].name;

            srtdInv[name] = [];
        }

        invCopy.forEach(p => {
            srtdInv[p.name].push(p);
        });

        return srtdInv;
    }

    render() {     
        const totalSpace = 9;
        let selections = this.props.selections;

        let sortedInv = this.invSort(this.props.products);

        let fillerCount = totalSpace - this.props.selections.length;

        const products = selections.map((sel, i) => {
            let name = sel.name,
                price = sel.prcDisp,
                code = sel.code,
                cls = sel.cls,
                num = sortedInv[name].length > 0 ? sortedInv[name].length : 
                "Sold Out",
                img = num > 0 ? sel.img : "";

            return (
                <div class="col-4">
                    <Product
                        class="prod"
                        text={name}
                        num={num}
                        img={img}
                        imgCls={cls}
                        price={price}
                        code={code[0]+'-'+code[1]}
                    />
                </div>
            );
        });

        let filler = [];

        while (fillerCount != 0){
            filler.push((
                <div class="col-4">
                <Product
                    class="prod"
                    num="Out of stock"
                    price="$0.00"
                />
                </div>
            ));

            fillerCount = fillerCount - 1;
        }

        const prodSpace = products.concat(filler);

        return (
            <div class={this.props.class}>
                {prodSpace}
            </div>
        )
    }
}

export default ProductWindow;