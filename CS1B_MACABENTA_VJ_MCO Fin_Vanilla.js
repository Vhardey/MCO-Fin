/* VANILLA GROUP
   VHARDEY JOHN MACABENTA
   AARUME XANDER UNADIA
   LESTER JAVILLONAR
   JOSE RICAFRENTE
*/

function foodorderingsystem() {
    // ======= Lester: LOGIN AND MENU SETUP =======

    // Allowed usernames (case-insensitive)
    const allowedUsernames = ["lester", "vhardey", "aarume", "jose"];

    // Function: Cashier Login
    function login() {
        const username = prompt("Enter cashier username:");
        const password = prompt("Enter cashier password:"); // Password is not validated

        // Only allow specific usernames
        if (username && allowedUsernames.includes(username.toLowerCase())) {
            alert(`Welcome, ${username}!`);
        } else {
            alert("Login failed. Invalid username.");
            login(); // Retry login if username is invalid
        }
    }

    // Menu Data: Food Categories and Items with stock and price
    // Water has unlimited stock (Infinity)
    const categories = {
        Chicken: [
            { name: "Inasal", stock: 10, price: 160 },
            { name: "Fried Chicken", stock: 15, price: 90 },
            { name: "Grilled Chicken", stock: 10, price: 180 },
            { name: "Adobo", stock: 12, price: 120 },
            { name: "Chicken Curry", stock: 11, price: 125 }
        ],
        Drinks: [
            { name: "Water", stock: Infinity, price: 0 },
            { name: "Coke", stock: 20, price: 20 },
            { name: "Nestea", stock: 18, price: 17 },
            { name: "Royal", stock: 17, price: 21 },
            { name: "Sprite", stock: 22, price: 19 }
        ],
        Dessert: [
            { name: "Vanilla Cake", stock: 10, price: 65 },
            { name: "Chocolate Chip Cookie", stock: 20, price: 57 },
            { name: "Cheesecake", stock: 8, price: 59 },
            { name: "Brownies", stock: 12, price: 70 },
            { name: "Apple Pie", stock: 9, price: 50 }
        ],
        "Side Dish": [
            { name: "Mashed Potatoes", stock: 10, price: 30 },
            { name: "French Fries", stock: 15, price: 35 },
            { name: "Lumpiang Shanghai", stock: 14, price: 40 },
            { name: "Pandesal", stock: 20, price: 25 },
            { name: "Salad", stock: 10, price: 24 }
        ]
    };

    let cart = [];

    function findItemByName(name) {
        for (let cat in categories) {
            for (let item of categories[cat]) {
                if (item.name.toLowerCase() === name.toLowerCase()) {
                    return item;
                }
            }
        }
        return null;
    }

    // ======= Aarume: ITEM SELECTION AND DISPLAY =======

    function showCategoriesAndPickItem() {
        let categoryList = Object.keys(categories);

        let categoryChoice = prompt(
            "Select a Category:\n" +
            categoryList.map((c, i) => `${i + 1}. ${c}`).join("\n")
        );

        let chosenCat = categoryList[parseInt(categoryChoice) - 1];
        if (!chosenCat) {
            alert("Invalid category.");
            return showCategoriesAndPickItem();
        }

        let items = categories[chosenCat];
        let itemChoice = prompt(
            "Select an item:\n" +
            items.map((item, i) => {
                let stockDisplay = item.stock === Infinity ? "Unlimited" : item.stock;
                return `${i + 1}. ${item.name} (₱${item.price}, Stock: ${stockDisplay})`;
            }).join("\n")
        );

        let chosenItem = items[parseInt(itemChoice) - 1];
        if (!chosenItem) {
            alert("Invalid item.");
            return showCategoriesAndPickItem();
        }

        return chosenItem.name;
    }

    // ======= Jose: ORDER MANAGEMENT (ADD/REMOVE ITEMS) =======

    function orderingSystem() {
        while (true) {
            let mainAction = prompt(
                "Choose an action:\n" +
                "1. Add Item\n2. Remove Item\n3. Print Receipt / Checkout\n4. Cancel Order"
            );

            if (mainAction === "1") {
                let selectedItemName = showCategoriesAndPickItem();
                let item = findItemByName(selectedItemName);
                let qty = parseInt(prompt(`How many '${item.name}' to add?`));

                if (qty > 0 && (item.stock === Infinity || item.stock >= qty)) {
                    if (item.stock !== Infinity) {
                        item.stock -= qty;
                    }

                    let existing = cart.find(i => i.name === item.name);
                    if (existing) {
                        existing.quantity += qty;
                    } else {
                        cart.push({ name: item.name, price: item.price, quantity: qty });
                    }

                    alert(`${item.name} added to cart.`);
                } else {
                    alert("Not enough stock or invalid quantity.");
                }
            }

            else if (mainAction === "2") {
                let selectedItemName = showCategoriesAndPickItem();
                let item = findItemByName(selectedItemName);
                let cartIndex = cart.findIndex(i => i.name === item.name);

                if (cartIndex === -1) {
                    alert("Item not in cart.");
                } else {
                    let removeQty = parseInt(prompt("Quantity to remove:"));

                    if (removeQty > 0) {
                        if (removeQty >= cart[cartIndex].quantity) {
                            if (item.stock !== Infinity) {
                                item.stock += cart[cartIndex].quantity;
                            }
                            cart.splice(cartIndex, 1);
                        } else {
                            cart[cartIndex].quantity -= removeQty;
                            if (item.stock !== Infinity) {
                                item.stock += removeQty;
                            }
                        }

                        alert("Item updated in cart.");
                    } else {
                        alert("Invalid quantity.");
                    }
                }
            }

            // ======= Vhardey: RECEIPT PRINTING AND PAYMENT HANDLING =======

            else if (mainAction === "3") {
                if (cart.length === 0) {
                    alert("Cart is empty!");
                    continue;
                }

                console.log("----- RECEIPT -----");
                let total = 0;

                cart.forEach(i => {
                    let sub = i.price * i.quantity;
                    total += sub;
                    console.log(`${i.name} - ₱${i.price} x ${i.quantity} = ₱${sub}`);
                });

                console.log("-------------------");
                console.log(`TOTAL: ₱${total}`);

                let payment = parseFloat(prompt(`Your total is ₱${total}. Enter payment:`));
                if (payment >= total) {
                    let change = payment - total;
                    console.log(`PAYMENT: ₱${payment}`);
                    console.log(`CHANGE: ₱${change}`);
                    console.log("Thank you for your order!");
                    alert(`Payment received.\nChange: ₱${change}\nThank you!`);
                    break;
                } else {
                    alert("Insufficient payment.");
                }
            }

            else if (mainAction === "4") {
                alert("Order canceled.");
                break;
            }

            else {
                alert("Invalid action.");
            }
        }
    }

    // Run login and start ordering system
    login();
    orderingSystem();
}

// Start the program
foodorderingsystem();

/* References
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join

*/
