const fs = require('fs');

const cartCSS = `

/* =========================================
   Slide-out Cart & Ordering System
   ========================================= */

/* Notification Dot / Badge */
.cart-toggle-btn {
    position: relative;
    cursor: pointer;
}

.cart-badge {
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: #ff3b3b;
    color: white;
    border-radius: 50%;
    padding: 0.1rem 0.5rem;
    font-size: 0.75rem;
    font-weight: bold;
    display: none;
    animation: popIn 0.3s ease-out;
}

@keyframes popIn {
    0% { transform: scale(0); }
    80% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

/* Add to Cart Button */
.btn-add-cart {
    width: 100%;
    margin-top: 0.8rem;
    padding: 0.5rem;
    font-size: 0.9rem;
    background-color: var(--primary-orange);
    color: var(--white);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: var(--transition);
}

.btn-add-cart:hover {
    background-color: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(242, 100, 25, 0.3);
}

/* Cart Overlay */
.cart-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: 1049;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.cart-overlay.active {
    opacity: 1;
    visibility: visible;
}

/* Cart Sidebar */
.cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 400px;
    height: 100vh;
    background-color: var(--white);
    z-index: 1050;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    display: flex;
    flex-direction: column;
}

.cart-sidebar.active {
    transform: translateX(0);
}

.cart-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--light-grey);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--cream-bg);
}

.cart-header h2 {
    margin: 0;
    font-size: 1.5rem;
}

.close-cart-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--text-grey);
    cursor: pointer;
    transition: var(--transition);
}

.close-cart-btn:hover {
    color: var(--dark-black);
    transform: rotate(90deg);
}

/* Cart Items Container */
.cart-items-container {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.empty-cart-message {
    text-align: center;
    color: var(--text-grey);
    margin-top: 2rem;
    font-style: italic;
}

.cart-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed var(--light-grey);
}

.cart-item-img {
    width: 60px;
    height: 60px;
    border-radius: var(--radius-sm);
    object-fit: cover;
}

.cart-item-details {
    flex: 1;
}

.cart-item-name {
    font-size: 1rem;
    margin: 0 0 0.2rem;
    font-family: var(--font-body);
    font-weight: 600;
}

.cart-item-price {
    color: var(--primary-orange);
    font-weight: bold;
    font-size: 0.9rem;
}

/* Quantity Controls */
.cart-qty-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.qty-btn {
    background-color: var(--light-grey);
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: var(--transition);
}

.qty-btn:hover {
    background-color: var(--primary-orange);
    color: var(--white);
}

.qty-display {
    font-size: 0.9rem;
    font-weight: bold;
    min-width: 20px;
    text-align: center;
}

.remove-btn {
    background: none;
    border: none;
    color: #ff3b3b;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem;
    transition: var(--transition);
}

.remove-btn:hover {
    transform: scale(1.1);
}

/* Cart Footer & Checkout */
.cart-footer {
    padding: 1.5rem;
    background-color: var(--cream-bg);
    border-top: 1px solid var(--light-grey);
}

.cart-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1.2rem;
}

.cart-total span:last-child {
    color: var(--primary-orange);
    font-size: 1.4rem;
}

.checkout-form h4 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

/* Mobile Responsiveness for Cart */
@media (max-width: 480px) {
    .cart-sidebar {
        width: 100%;
        max-width: 100%;
    }
}
`;

fs.appendFileSync('style.css', cartCSS);
console.log('Appended cartCSS to style.css successfully.');
