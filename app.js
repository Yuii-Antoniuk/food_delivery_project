let products = [
    // food - pizza
    { id: 1, name: "Pizza Carbonara", categories: { category: "food", subcategory: "pizza" }, rating: 8, isInStock: true, price: 320 },
    { id: 2, name: "Pizza 4 Cheese", categories: { category: "food", subcategory: "pizza" }, rating: 7, isInStock: true, price: 290 },
    { id: 3, name: "Pepperoni", categories: { category: "food", subcategory: "pizza" }, rating: 9, isInStock: false, price: 270 },

    // food - burger
    { id: 4, name: "Cheeseburger", categories: { category: "food", subcategory: "burger" }, rating: 10, isInStock: true, price: 190 },
    { id: 5, name: "Double Bacon Burger", categories: { category: "food", subcategory: "burger" }, rating: 9, isInStock: true, price: 240 },

    // food - Asian
    { id: 6, name: "California Roll", categories: { category: "food", subcategory: "sushi" }, rating: 8, isInStock: true, price: 220 },
    { id: 7, name: "Chicken Ramen", categories: { category: "food", subcategory: "soup" }, rating: 9, isInStock: false, price: 230 },

    // drinks - soda
    { id: 8, name: "Pepsi", categories: { category: "drink", subcategory: "soda" }, rating: 10, isInStock: true, price: 50 },
    { id: 9, name: "Coca-Cola", categories: { category: "drink", subcategory: "soda" }, rating: 10, isInStock: true, price: 50 },

    // drinks - hot
    { id: 10, name: "Cappuccino", categories: { category: "drink", subcategory: "coffee" }, rating: 8, isInStock: true, price: 85 },
    { id: 11, name: "Americano", categories: { category: "drink", subcategory: "coffee" }, rating: 8, isInStock: true, price: 60 },
    { id: 12, name: "Latte", categories: { category: "drink", subcategory: "coffee" }, rating: 9, isInStock: false, price: 90 },
    { id: 13, name: "Matcha Latte", categories: { category: "drink", subcategory: "tea" }, rating: 6, isInStock: true, price: 110 },
    { id: 14, name: "Black tea", categories: { category: "drink", subcategory: "tea" }, rating: 9, isInStock: true, price: 55 },
    { id: 15, name: "Green tea", categories: { category: "drink", subcategory: "tea" }, rating: 9, isInStock: true, price: 55 },

    // desserts
    { id: 16, name: "Tiramisu", categories: { category: "dessert", subcategory: "cake" }, rating: 9, isInStock: true, price: 140 }
];

let cart = [];
let cartTech = [];
let appliedDiscount = 0;

let codes = [
    { name: "mykola", discount: 0.15 },
    { name: "kokos100500", discount: 0.25 },
    { name: "mykola200", discount: 0.05 },
];

let tprice = {
    totalprice: () => {
        let sum = cartTech.reduce((acc, item) => acc + Number(item.price), 0);
        return sum * (1 - appliedDiscount);
    }
};

let cardInf = { number: "", expire: "", cvv: "" };

function startMenu() {
    while (true) {
        let choise = +prompt(`1 - view menu
2 - find dish/drink by name
3 - add dish/drink into cart
4 - view cart
5 - add details of card
6 - use promocode
7 - make an order
8 - clear cart
0 - exit
`);
        if (choise === 0) {
            alert("Good luck! :)");
            break;
        }
        switch (choise) {
            case 1:
                alert("======== MENU ======== \n" + viewMenu());
                break;

            case 2:
                findDishByName();
                break;

            case 3:
                addDishToCart();
                break;

            case 4:
                viewCart();
                break;

            case 5:
                addDetailsOfCard();
                break;

            case 6:
                usePromo();
                break;

            case 7:
                makeAnOrder();
                break;

            case 8:
                clearCart();
                break;

            default: 
                alert("Error");
                break;
        }
    }
}


function viewMenu() {
    let array1 = [];
    products.forEach(details => {
        let status = details.isInStock ? "" : " (Out of stock)";
        array1.push(`id: ${details.id} = name: ${details.name} = rating: ${details.rating} = price: ${details.price}грн${status}\n`);
    });
    return array1.join("");
}

function findDishByName(name) {
    name = prompt("Type name of dish/drink");
    if (!name) return;

    let filteredArray = [];
    let isFound = products.filter(product => 
        product.name.toLowerCase().includes(name.toLowerCase())
    );

    isFound.forEach(product => {
        let status = product.isInStock ? "In stock" : "Out of stock";
        filteredArray.push(`id: ${product.id} \n name: ${product.name} \n rating: ${product.rating}/10 \n price: ${product.price}грн \n status: ${status}`);
    });

    if (filteredArray.length === 0) {
        alert(`your dish is not found`);
    } else {
        alert(filteredArray.join("\n\n"));
    }
}

function addDishToCart() {
    let inputId = prompt(`Type id of dish/drink\n\n${viewMenu()}`);
    if (!inputId) return;
    let productId = Number(inputId);

    let product = products.find(p => p.id === productId);

    if (!product) {
        alert("Dish with this ID was not found!");
        return;
    }

    if (!product.isInStock) {
        alert("Sorry, this item is out of stock!");
        return;
    }

    let inputNumber = prompt(`Type number of your dish/drink`);
    if (!inputNumber) return;
    let productNumber = Number(inputNumber);

    for (let i = 0; i < productNumber; i++) {
        cart.push(`id: ${product.id} = name: ${product.name} = rating: ${product.rating} = price: ${Number(product.price)}грн`);
        cartTech.push(product);
    }
    alert("added!");
}

function viewCart() {
    if (cart.length === 0) {
        return alert("Your cart is empty!");
    }
    return alert(`${cart.join('\n')}\n\n===== total price: ${tprice.totalprice()}грн =====`);
}

function clearCart() {
    cart.splice(0, cart.length);
    cartTech.splice(0, cartTech.length);
    appliedDiscount = 0;
    alert("Cart was succesfully cleared!");
}

function usePromo(code1) {
    code1 = prompt("Use your promocode!");
    if (!code1) return;

    let found = codes.find(code => code.name === code1);
    
    if (found) {
        appliedDiscount = found.discount;
        alert(`yay! Discount ${found.discount * 100}% applied`);
    } else {
        alert("nah");
    }
}

function addDetailsOfCard() {
    cardInf.number = prompt("Type number of your card");
    cardInf.expire = prompt("Type date of expire of your card");
    cardInf.cvv = prompt("Type cvv of your card");

    alert(`Number: ${cardInf.number} \n Date of expire: ${cardInf.expire} \n CVV: ${cardInf.cvv} \n З вашої карти було снято всі гроші людиної Mykola200`);
}

function viewCard() {
    return `Number: ${cardInf.number} \n Date of expire: ${cardInf.expire} \n CVV: ${cardInf.cvv}`;
}

function checkout() {
    alert(`${viewCard()} \n\nTotal to pay: ${tprice.totalprice()}грн`);
}

function makeAnOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    if (!cardInf.number || !cardInf.expire || !cardInf.cvv) {
        alert("Please add card details first (option 5)!");
        return;
    }
    checkout();
    alert("Order successful! Thank you!");
    clearCart();
}

startMenu();