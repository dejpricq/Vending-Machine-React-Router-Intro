import { Coin } from "../src/scripts/coin";
import { Machine } from "../src/scripts/machine";
import { Product } from "../src/scripts/product";

describe("Machine", function() {
    
    let machine,
        inventory,
        cola,
        chips,
        candy,
        coins,
        nickel,
        dime,
        quarter,
        penny,
        machineWithoutMoney;

    function insertQuarters(){
        machine.insertCoins(quarter);
        machine.insertCoins(quarter);
        machine.insertCoins(quarter);
        machine.insertCoins(quarter);
    }

    beforeEach(function(){
        // Define product objects
        cola  = new Product({name: "Cola", price: 100});
        chips = new Product({name: "Chips", price: 50});
        candy = new Product({name: "Candy", price: 65});

        // Asssign inventory
        inventory = [];
        inventory.push(cola);
        inventory.push(chips);
        inventory.push(candy);
    
        // Define coin objects
        nickel  = new Coin({name: "nickel"});
        dime    = new Coin({name: "dime"});
        quarter = new Coin({name: "quarter"});
        penny   = new Coin({name: "penny"});

        // Assign coins
        coins = [
            nickel,     
            nickel, 
            nickel, 
            dime,       
            dime,   
            dime,
            quarter,    
            quarter, 
            quarter
        ];

        machine = new Machine({ inventory : inventory });  
        machine.loadCoins(coins);
    });

    describe("totalCoins", function(){
        it("has a collection of coins", function(){
            expect(machine.totalCoins).toEqual(coins);
        });
    });

    describe("inventory", function(){
        it("has an inventory of products", function(){
            expect(machine.inventory).toEqual(inventory);
        });
    });

    describe("insertedCoins", function(){
        it("has an empty insertedCoins collection when no coins are inserted", function(){
            expect(machine.insertedCoins).toEqual([]);
        });
    });

    describe("coinReturn", function(){
        it("starts with an empty coin return", function(){
            expect(machine.coinReturn).toEqual([]);
        });
    });

    describe("display", function(){
        it("Display is set to INSERT COIN upon rest", function(){
            expect(machine.display).toEqual("INSERT COIN");
        });
    });

    describe("accepts coins", function(){
        it("accepts dimes and places them in the insertedCoins", function(){
            machine.insertCoins(dime);
            expect(machine.insertedCoins).toEqual([dime]);
        });

        it("accepts nickels and places them in the insertedCoins", function(){
            machine.insertCoins(nickel);
            expect(machine.insertedCoins).toEqual([nickel]);
        });

        it("accepts quarters and places them in the insertedCoins", function(){
            machine.insertCoins(quarter);
            expect(machine.insertedCoins).toEqual([quarter]);
        });
    
        it("does not accept pennies into the insertedCoins", function(){
            machine.insertCoins(penny);
            expect(machine.insertedCoins).toEqual([]);
        });

        it("returns pennies in the coinReturn", function(){
            machine.insertCoins(penny);
            expect(machine.coinReturn).toEqual([penny]);
        });
    });

    describe("current amount of coins inserted", function(){
        it("identifies a quarter is worth 25 cents", function(){
            machine.insertCoins(quarter);
            machine.sumInsertedCoins();
            var amount = machine.currentAmount;
            expect(amount).toEqual(25);
        });

        it("sums the values of a nickel, dime and quarter", function(){
            machine.insertCoins(nickel);
            machine.insertCoins(dime);
            machine.insertCoins(quarter);
            machine.sumInsertedCoins();
            expect(machine.currentAmount).toEqual(40);
        });

        it("displays the inserted amount", function(){
            machine.insertCoins(quarter);
            machine.sumInsertedCoins();
            expect(machine.currentAmount).toEqual(25);
        });
    });

    describe("select a product", function(){
        it("displays the cost of the product if not enough money has been inserted", function(){
            machine.insertCoins(quarter);
            machine.selectProduct(cola);
            expect(machine.display).toEqual("PRICE: 100");
        });

        it("displays 'THANK YOU' if enough money has been inserted", function(){
            insertQuarters();
            machine.selectProduct(cola);
            expect(machine.display).toEqual("THANK YOU");
        });

        it("returns a product if enough money has been inserted", function(){
            insertQuarters();
            machine.selectProduct(cola);
            expect(machine.productReturn).toEqual([cola]);
        });

        it("resets the currentAmount to 0.00 when enough money is inserted and a product is selected", function(){
            insertQuarters();
            machine.selectProduct(cola);
            expect(machine.currentAmount).toEqual(0);
        });

        it("resets the display to 'INSERT COIN' when the product is removed", function(){
            insertQuarters();
            machine.selectProduct(cola);
            machine.removeProduct();
            expect(machine.display).toEqual("INSERT COIN");
        });

        it("deposits the inserted coins into the totalCoins when a product is chosen", function(){
            insertQuarters();
            var allTheCoins = machine.totalCoins.length;
            machine.selectProduct(cola);
            expect(machine.totalCoins.length).toEqual(allTheCoins + 4);
        });
    });

    describe("makes change", function(){
        it("returns a nickel when the currentAmount is +0.05", function(){
            insertQuarters();
            machine.insertCoins(nickel);
            machine.selectProduct(cola);
            expect(machine.coinReturn).toEqual([nickel]);
        });

        it("returns a dime when the currentAmount is +0.10", function(){
            insertQuarters();
            machine.insertCoins(dime);
            machine.selectProduct(cola);
            expect(machine.coinReturn).toEqual([dime]);
        });

        it("returns a nickel and a dime when the currentAmount is +0.15", function(){
            insertQuarters();
            machine.insertCoins(dime);
            machine.insertCoins(nickel);
            machine.selectProduct(cola);
            expect(machine.coinReturn).toEqual([dime, nickel]);
        });

        it("returns two dimes when the currentAmount is +0.20", function(){
            insertQuarters();
            machine.insertCoins(dime);
            machine.insertCoins(dime);
            machine.selectProduct(cola);
            expect(machine.coinReturn).toEqual([dime, dime]);
        });

        it("returns a quarter when the currentAmount is +0.25", function(){
            insertQuarters();
            machine.insertCoins(quarter);
            machine.selectProduct(cola);
            expect(machine.coinReturn).toEqual([quarter]);
        });

        it("returns a quarter and a nickel when the currentAmount is +0.30", function(){
            insertQuarters();
            machine.insertCoins(quarter);
            machine.insertCoins(nickel);
            machine.selectProduct(cola);
            expect(machine.coinReturn).toEqual([quarter, nickel]);
        });

        it("returns a quarter when the currentAmount is +0.35", function(){
            insertQuarters();
            machine.insertCoins(quarter);
            machine.insertCoins(dime);
            machine.selectProduct(cola);
            expect(machine.coinReturn).toEqual([quarter, dime]);
        });

        it("returns a quarter when the currentAmount is +0.40", function(){
            insertQuarters();
            machine.insertCoins(quarter);
            machine.insertCoins(dime);
            machine.insertCoins(nickel);
            machine.selectProduct(cola);
            expect(machine.coinReturn).toEqual([quarter, dime, nickel]);
        });

        it("returns two quarters when the currentAmount is +0.50", function(){
            insertQuarters();
            machine.insertCoins(quarter);
            machine.insertCoins(quarter);
            machine.selectProduct(cola);
            expect(machine.coinReturn).toEqual([quarter, quarter]);
        });

        it("returns two quarters and a dime and a nickel when the currentAmount is +0.65", function(){
            insertQuarters();
            machine.insertCoins(quarter);
            machine.insertCoins(quarter);
            machine.insertCoins(dime);
            machine.insertCoins(nickel);
            machine.selectProduct(cola);
            expect(machine.coinReturn).toEqual([quarter, quarter, dime, nickel]);
        });

        it("returns two quarters and two dimes when the currentAmount is +0.70", function(){
            insertQuarters();
            machine.insertCoins(quarter);
            machine.insertCoins(quarter);
            machine.insertCoins(dime);
            machine.insertCoins(dime);
            machine.selectProduct(cola);
            expect(machine.coinReturn).toEqual([quarter, quarter, dime, dime]);
        });

    });

    describe("returns coins", function(){
        it("returns all the inserted coins into coinReturn collection when you press the coin return", function(){
            machine.insertCoins(quarter);
            var coins = machine.insertedCoins;
            machine.pressCoinReturn();
            expect(machine.coinReturn).toEqual(coins);
        });
    });

    describe("sold out", function(){
        it("displays SOLD OUT if the product is not stcked in the inventory", function(){
            machine.inventory = [];
            insertQuarters();
            machine.selectProduct(cola);
            expect(machine.display).toEqual("SOLD OUT");
        });

        it("allows you to purchase another product if your first choice is sold out", function(){
            machine.inventory = [candy];    
            insertQuarters();
            machine.selectProduct(cola);
            machine.selectProduct(candy);
            expect(machine.productReturn).toEqual([candy]);
        });

        it("returns your change if your product is sold out and you press the coin return", function(){
            machine.inventory = [];
            insertQuarters();
            machine.selectProduct(cola);
            machine.pressCoinReturn();
            expect(machine.coinReturn).toEqual([quarter, quarter, quarter, quarter]);
        });
    });

    describe("sum totalCoins", function(){
        it("sums the coins in the totalCoins collection", function(){
            expect(machine.sumTotalCoins()).toEqual(120);
        });
    });

    describe("exact change", function(){
        it("displays EXACT CHANGE if there is less than 1.00 in coins in the totalCoins collection", function(){
            machineWithoutMoney = new Machine({inventory: inventory});
            expect(machineWithoutMoney.display).toEqual("EXACT CHANGE");
        });

        it("displays EXACT CHANGE if there is less than 1.00 in coins in the totalCoins collection after loading coins", function(){
            machineWithoutMoney = new Machine({inventory: inventory});
            machineWithoutMoney.loadCoins([quarter]);
            expect(machineWithoutMoney.display).toEqual("EXACT CHANGE");
        });

        it("displays INSERT COIN if there is more than 1.00 in coins in the totalCoins collection after loading coins", function(){
            machineWithoutMoney = new Machine({inventory: inventory});
            machineWithoutMoney.loadCoins(coins);
            expect(machineWithoutMoney.display).toEqual("INSERT COIN");
        });

        it("displays INSERT COIN if no money was loaded, but a product was purchased resulting in totalCoins value > 1.00", function(){
            machineWithoutMoney = new Machine({inventory: inventory});
            machineWithoutMoney.insertCoins(quarter);
            machineWithoutMoney.insertCoins(quarter);
            machineWithoutMoney.insertCoins(quarter);
            machineWithoutMoney.insertCoins(quarter);
            machineWithoutMoney.selectProduct(cola);
            machineWithoutMoney.removeProduct();
            expect(machineWithoutMoney.display).toEqual("INSERT COIN");
        });
    });
});
