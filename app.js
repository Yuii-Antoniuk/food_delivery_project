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
let promocodes = [];
// 1
function startMenu() {
    while (true) {
        let choise = +prompt(`1 - view menu
2 - find dish/drink by name
3 - add dish/drink into cart
4 - view cart
5 - checkout
6 - use promocode
7 - make an order
8 - clear cart
0 - exit
`);
        if (choise === 0) {
            alert("Good luck! :)");
            break;
        };
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
                alert("That was 5!")
                break;

            case 6:
                alert("That was 6!")
                break;

            case 7:
                alert("That was 7!")
                break;
            case 8:
            clearCart();
                break;

            default: alert("Error");
                break;
        };
    };
};
startMenu();
function viewMenu() {
    let array1 = [];
    products.filter(details => {
        array1.push(`id: ${details.id} == name: ${details.name} == rating: ${details.rating} == price: ${details.price} \n`);
    });
    return array1;
};

function findDishByName(name) {
    // products.forEach(product => product.name.toLowerCase);
    name = prompt("Type name of dish/drink");
    let filteredArray = [];
    let isFound = products.filter(product => name.includes(product.name));

    const result = isFound.map(product => {
        filteredArray.push(`id: ${product.id} \n name: ${product.name} \n rating: ${product.rating}/10 \n price: ${product.price}`)
    });


    if (filteredArray.length === 0) {
        alert(`your dish is not found`);
    } else {
        alert(filteredArray);
    }
};


function addDishToCart() {
    let productId = Number(prompt(`Type id of dish/drink\n\n${viewMenu()}`));
    let productNumber = Number(prompt(`Type numner of your dish/drink`));
    products.filter(product => {
        if (productId === product.id) {
            for (let i = 0; i < productNumber; i++) {
                cart.push(`id: ${product.id} == name: ${product.name} == rating: ${product.rating} == price: ${Number(product.price)}`);
                cartTech.push(product);
            }
            alert("added!");
        }
    });
};

function viewCart() {
    let totalprice = cartTech.reduce((acc, item) => acc + Number(item.price), 0);
    return alert(`${cart.join('\n')}\n\n===== total price: ${totalprice} =====`);
};

function clearCart() {
    cart.splice(0, cart.length);
    cartTech.splice(0, cartTech.length);
    alert("Cart was succesfully cleared!");
};
