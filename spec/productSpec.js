import { Product } from "../src/scripts/product";

describe("Product", function() {
    let product;

    beforeEach(function() {
        product = new Product({name: "Cola", price: 1.00 });
    });

    describe("name" , function() {
        it("has a name", function() {
            expect(product.name).toEqual("Cola");
        });
    });

    describe("price", function() {
        it("has a price", function(){
            expect(product.price).toEqual(1.00);
        });
    });
});