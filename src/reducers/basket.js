export default function (state = [{ 
    id: 1,
    brand: "Audi",
   speed : 200,
   amount: 1,
   weight : 1.4,
   price: 150,
   img : "https://styles.redditmedia.com/t5_2qhl2/styles/communityIcon_8n8xmdrerqd11.png"
},{
   id: 2,
   brand: "Bmw",
  speed : 300,
  weight : 1.4,
  amount: 4,
  price: 170,
  img : "https://cdn6.aptoide.com/imgs/1/0/c/10ca03f1e4412c061645241d5b1ca6d4_icon.png?w=256"
}]
    
   , action) {
    switch (action.type) {
        case "BASKET-SELECTED":
            return action.payload
            break;
            case "BASKET-ADD":
            return action.payload
            break;
    
        default:
            return state;
    }
}