import { Coin } from "./coin";
import { Product } from "./product";

import utils from "./utilities";

const weightHash = {
    772: 25,
    415: 10,
    630: 5,
    554: 1
};

let cola  = new Product({name: "Cola", price: 100, img: "https://vending-machine-bjo.s3.us-east-2.amazonaws.com/products/c-cola.png"}),
    chips = new Product({name: "Chips", price: 50, img: "https://vending-machine-bjo.s3.us-east-2.amazonaws.com/products/chips.png"}),
    candy = new Product({name: "Reese's", price: 65, img: "https://vending-machine-bjo.s3.us-east-2.amazonaws.com/products/reese.png"}),
    cheetos = new Product({name: "Cheetos", price: 50, img: "https://vending-machine-bjo.s3.us-east-2.amazonaws.com/products/cheetos.png"}),
    twizzlers = new Product({name: "Twizzlers", price: 75, img:"https://vending-machine-bjo.s3.us-east-2.amazonaws.com/products/twizzlers.png"}),
    carrot = new Product({name: "Carrot", price: 15, img: "https://vending-machine-bjo.s3.us-east-2.amazonaws.com/products/carrot.png"}),
    apple = new Product({name: "Apple", price: 25, img: "https://vending-machine-bjo.s3.us-east-2.amazonaws.com/products/apple.png"});

let nickel  = new Coin({name: "nickel"}), // size and weight set upon coin init
    dime    = new Coin({name: "dime"}),
    quarter = new Coin({name: "quarter"}),
    penny   = new Coin({name: "penny"});

let coins = [
    utils.copy(nickel),
    utils.copy(nickel),
    utils.copy(nickel),
    utils.copy(dime),
    utils.copy(dime),
    utils.copy(dime),
    utils.copy(quarter),
    utils.copy(quarter),
    utils.copy(quarter)
];

coins = coins.map(coin => { // set value for pre loaded coins
    coin.value = weightHash[coin.weight];
    return coin;
})

let colaSel = utils.copy(cola),
    chipsSel = utils.copy(chips),
    candySel = utils.copy(candy),
    cheetosSel = utils.copy(cheetos),
    twizzlersSel = utils.copy(twizzlers),
    carrotSel = utils.copy(carrot),
    appleSel = utils.copy(apple);

let nickelSel = utils.copy(nickel),
    dimeSel = utils.copy(dime),
    quarterSel = utils.copy(quarter),
    pennySel = utils.copy(penny);

const stock = {
    inventory: [
        utils.copy(cola),
        utils.copy(cola),
        utils.copy(chips),
        utils.copy(chips),
        utils.copy(candy),
        utils.copy(candy),
        utils.copy(cheetos),
        utils.copy(cheetos),
        utils.copy(twizzlers),
        utils.copy(twizzlers),
        utils.copy(carrot),
        utils.copy(carrot),
        utils.copy(apple),
        utils.copy(apple),
    ],
    selections: [ // merge more into these objects, A1, A2, as well as the class associated for the image
        utils.merge(colaSel,{cls: 'cola', code: 'A1', type: 'product', prcDisp: '$1.00'}),
        utils.merge(chipsSel,{cls: 'chips', code: 'A2', type: 'product', prcDisp: '$0.50'}),
        utils.merge(candySel,{cls: 'candy', code: 'A3', type: 'product', prcDisp: '$0.65'}),
        utils.merge(cheetosSel,{cls: 'cheetos', code: 'B1', type: 'product', prcDisp: '$0.50'}),
        utils.merge(twizzlersSel,{cls: 'twizzlers', code: 'B2', type: 'product', prcDisp: '$0.75'}),
        utils.merge(carrotSel,{cls: 'carrot', code: 'B3', type: 'product', prcDisp: '$0.15'}),
        utils.merge(appleSel,{cls: 'apple', code: 'C1', type: 'product', prcDisp: '$0.25'}),
    ],
    coins: [
        utils.merge(nickelSel, {cls: 'nickel', code: '5\u00A2', type: 'coin'}),
        utils.merge(dimeSel, {cls: 'dime', code: '10\u00A2', type: 'coin'}),
        utils.merge(quarterSel, {cls: 'quarter', code: '25\u00A2', type: 'coin'}),
        utils.merge(pennySel, {cls: 'peny', code: '1\u00A2', type: 'coin'}),
    ],
    totalCoins: coins
};

export default stock;
