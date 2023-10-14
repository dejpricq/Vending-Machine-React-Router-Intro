export function Machine(args) {
    this.totalCoins = args.totalCoins ? args.totalCoins : [];
    this.insertedCoins = [];
    this.currentAmount = 0;
    this.coinReturn = [];
    this.productReturn = [];
    this.inventory = args.inventory ? args.inventory : [];
    this.display = this.initialDisplay();
}

const weights = { 
    630: 5,
    415: 10,
    772: 25
};

const displays = [
    "INSERT COIN", 
    "PRICE: ", 
    "THANK YOU", 
    "EXACT CHANGE",
    "SOLD OUT"
];

const monies = [
    25,
    10,
    5
];

Machine.prototype = {
    // Machine rejects pennies but accepts nickels, dimes and quarters
    insertCoins: function(coin) {
        if ( [630, 415, 772].indexOf(coin.weight) < 0) {
            this.coinReturn.push(coin);
        } else {
            this.insertedCoins.push(coin);
            this.sumInsertedCoins();
        }
        
    },

    // Add value to each coin in a coin collection when loaded into the machine
    loadCoins: function(coins) {
        this.totalCoins = coins.map(coin => {
            coin.value = weights[coin.weight];
            return coin;
        });
        this.setInitialDisplay();
    },

    setInitialDisplay: function(){
        this.display = this.initialDisplay();
    },

    selectProduct: function(product) { 
        // Add values to the coins and sum them when a product is selected
        this.sumInsertedCoins();
        // Check if enough money has been inserted
        let enoughMoney = this.checkMoneyInserted(product);
        let chosenProduct = this.getProductFromInventory(product);
        
        if ( enoughMoney && chosenProduct ){
            this.addInsertedCoinsToTotalCoins();
            this.makeChange(product);
            this.setDisplayToThankYou();
            this.returnProduct(chosenProduct);      
            this.resetCurrentAmountDisplay();
        } else if ( enoughMoney && !chosenProduct ) {
            this.setDisplayToSoldOut();
        } else {
            this.displayProductPrice(product);
            this.sumInsertedCoins();
        }
    },

    returnProduct: function(chosenProduct){
        this.productReturn.push(chosenProduct);
    },

    setDisplayToThankYou: function(){
        this.display = displays[2];
    },

    setDisplayToSoldOut: function(){
        this.display = displays[4];
    },

    displayProductPrice: function(product){
        this.display = displays[1] + product.price;
    },

    resetCurrentAmountDisplay: function(){
        this.currentAmount = 0;
    },

    addInsertedCoinsToTotalCoins: function(){
        this.totalCoins = this.totalCoins.concat(this.insertedCoins);
        this.insertedCoins = [];
    },

    checkMoneyInserted: function(product){
        return this.currentAmount >= product.price;
    },

    getProductFromInventory: function(product){
        let index = this.inventory.findIndex((element) => element.name == product.name);
        if ( index == -1 )
            return false;
        else        
            return this.inventory.splice(index, 1)[0];     
    },

    // Iterate through inserted coins, set value attribute of each coin, 
    // sum values, set currentAmount display
    sumInsertedCoins: function() {
        this.currentAmount = this.insertedCoins.map((coin)=>{
            coin.value = weights[coin.weight];
            return coin.value;
        }).reduce((acc, val) => acc + val, 0);
    },

    makeChange: function(product) {
        // Identify how much change needs to be made
        var valueReturned = this.currentAmount - product.price;
        this.makeChangeAlgorithm(valueReturned);
    },

    // Make change by looping through the monies array. For each value, 25, 10, and 5,
    // divide the valueReturned by the value of the coin(element) of the monies array. 
    makeChangeAlgorithm: function(valueReturned){
        let machine = this;
        monies.forEach(function(coin){
            let times =  valueReturned / coin;
            times = Math.floor(times);

            for (let i = 0; i < times; i++) {
                let index = this.totalCoins.findIndex(element => element.value == coin);
                this.coinReturn.push(this.totalCoins.splice(index, 1)[0]);
            }
            valueReturned = valueReturned - (times * coin);
        }, machine);
    },

    // When a customer changes their mind before choosing a product, they can have their money returned
    pressCoinReturn: function() {
        this.coinReturn = this.coinReturn.concat(this.insertedCoins);
        this.insertedCoins = new Array;
        this.resetCurrentAmountDisplay();
    },

    // Take a product that has been paid for from the product return
    removeProduct: function() {
        this.display = this.initialDisplay();
        this.productReturn = new Array;
        this.resetCurrentAmountDisplay();
    },

    // Remove the coins from the coin return
    takeCoins: function(){
        this.coinReturn = new Array;
        this.resetCurrentAmountDisplay();
    },

    // Sum the total amount of coins inside the machine 
    sumTotalCoins: function() {
        if ( this.totalCoins.length > 0)
            return this.totalCoins.reduce((acc, coin) => acc + coin.value, 0);
    },

    // Set the initial display of the machine to INSERT COIN or EXACT CHANGE
    initialDisplay: function() {
        if ( this.sumTotalCoins() >= 100 ) {
            return displays[0];
        } else {
            return displays[3];
        }
    }
};

// export default Machine;
