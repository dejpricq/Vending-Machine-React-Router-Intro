import React from 'react';

class Product extends React.Component {
    backgroundImgs(num, img){
        let amt = num == "Sold Out" ? 0 : 
            num > 3 ? 4 : num;

        let imgs = [];

        let count = 1;

        while (count < amt) {
            let cls = "prod-bkgrd-img-" + count;
            imgs.push(<img class={cls} src={img} />)
            count += 1;
        }

        return imgs;
    }

    render() {
        let imgs = this.backgroundImgs(this.props.num, this.props.img);

        return(
            <div class={this.props.class}>
                <div class="prod-wrapper">
                    <div>
                        {this.props.price}
                    </div>
                    <div>
                        <img class="prod-img" src={this.props.img}/>
                        {imgs}
                    </div>
                    <div>
                        {this.props.num != "Sold Out" && this.props.num != "Out of stock" ? "Qty. " + this.props.num : this.props.num}
                    </div>
                    <div>
                        {this.props.code}
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;
