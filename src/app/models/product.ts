export class Product {
    name: string;
    sizes: string[];
    colors: string[];
    price: number;
    quantity: number;

    constructor(name: string, sizes: string[], colors: string[], price: number, quantity: number){
        this.name = name;
        this.sizes = sizes;
        this.colors = colors;
        this.price = price;
        this.quantity = quantity;
    }
}