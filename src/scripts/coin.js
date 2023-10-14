export function Coin(args) {
    this.name   = args.name;
    this.size   = args.name.length;
    this.weight = args.name.split("").reduce((acc, letter) => acc + letter.charCodeAt(), 0); 
    this.value  = args.value || "";
}