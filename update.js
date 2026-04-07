const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update menu items
const regex = /<img src="([^"]+)"\s+alt="([^"]+)">(?:\s|<br>)*<div class="menu-item-details">\s*<div class="menu-item-header">\s*<h3>([^<]+)<\/h3>\s*<span class="price">₹(\d+)<\/span>\s*<\/div>\s*<p>([^<]+)<\/p>\s*<\/div>/g;

let matchCount = 0;
html = html.replace(regex, (match, imgSrc, altText, name, price, desc) => {
    matchCount++;
    return `<img src="${imgSrc}"
                            alt="${altText}">
                        <div class="menu-item-details">
                            <div class="menu-item-header">
                                <h3>${name}</h3>
                                <span class="price">₹${price}</span>
                            </div>
                            <p>${desc}</p>
                            <button class="btn btn-primary btn-add-cart" data-name="${name}" data-price="${price}" data-img="${imgSrc}" style="padding: 0.4rem 1rem; font-size: 0.9rem; margin-top: 0.8rem; width: 100%;">Add to Cart</button>
                        </div>`;
});

console.log(`Updated ${matchCount} menu items.`);

// Update navbar (Order link to Cart button)
// We look for: <a href="https://wa.me/919650939167" target="_blank" class="btn-nav"><i class="fab fa-whatsapp"></i>\n                    Order</a>
const navbarRegex = /<a href="https:\/\/wa\.me\/919650939167" target="_blank" class="btn-nav"><i class="fab fa-whatsapp"><\/i>\s*Order<\/a>/;
html = html.replace(navbarRegex, `<button class="btn-nav cart-toggle-btn" id="cartToggleBtn">\n                    <i class="fas fa-shopping-cart"></i> Cart \n                    <span class="cart-badge" id="cartBadge" style="background: white; color: var(--primary-orange); border-radius: 50%; padding: 0.1rem 0.4rem; font-size: 0.8rem; margin-left: 0.3rem; display: none;">0</span>\n                </button>`);

// Add Cart Sidebar before </body>
const sidebarHTML = `
    <!-- Cart Sidebar Overlay -->
    <div class="cart-overlay" id="cartOverlay"></div>

    <!-- Cart Sidebar -->
    <div class="cart-sidebar" id="cartSidebar">
        <div class="cart-header">
            <h2>Your Order</h2>
            <button class="close-cart-btn" id="closeCartBtn"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="cart-items-container" id="cartItemsContainer">
            <!-- Cart items will be injected here via JS -->
            <div class="empty-cart-message">Your cart is empty</div>
        </div>

        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span id="cartTotalPrice">₹0</span>
            </div>
            
            <form id="checkoutForm" class="checkout-form">
                <h4>Checkout Details</h4>
                <div class="form-group" style="margin-bottom: 0.8rem;">
                    <input type="text" id="custName" placeholder="Your Name" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div class="form-group" style="margin-bottom: 0.8rem;">
                    <input type="tel" id="custPhone" placeholder="Phone Number" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div class="form-group" style="margin-bottom: 0.8rem;">
                    <textarea id="custAddress" placeholder="Delivery Address" rows="2" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px; resize: none;"></textarea>
                </div>
                <div class="form-group" style="margin-bottom: 0.8rem;">
                    <textarea id="custInstructions" placeholder="Special Instructions (Optional)" rows="1" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px; resize: none;"></textarea>
                </div>
                <button type="submit" class="btn btn-whatsapp w-100" style="width: 100%; margin-top: 10px; border: none; cursor: pointer; padding: 1rem;">
                    <i class="fab fa-whatsapp"></i> Order via WhatsApp
                </button>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
</body>`;

html = html.replace(/<script src="script\.js"><\/script>\s*<\/body>/, sidebarHTML);

fs.writeFileSync('index.html', html);
console.log('index.html modified successfully.');
