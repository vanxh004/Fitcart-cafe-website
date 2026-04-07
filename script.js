document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Sticky Navbar & Scroll Spy
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        // Sticky Navbar Toggle
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Spy Logic
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // 3. Menu Filtering
    const filterTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to current tab
            tab.classList.add('active');

            const target = tab.getAttribute('data-target');

            menuItems.forEach(item => {
                if (target === 'all' || item.getAttribute('data-category') === target) {
                    item.style.display = 'flex';
                    // Trigger reflow for animation
                    item.style.animation = 'none';
                    item.offsetHeight; /* trigger reflow */
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 4. Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .slide-up');
    fadeElements.forEach(el => observer.observe(el));

    // ==========================================
    // 5. Online Ordering & Cart System (WhatsApp)
    // ==========================================

    let cart = JSON.parse(localStorage.getItem('fitkart_cart')) || [];
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartBadge = document.getElementById('cartBadge');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const checkoutForm = document.getElementById('checkoutForm');

    // Toggle Cart function
    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }

    cartToggleBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Save cart to local storage
    function saveCart() {
        localStorage.setItem('fitkart_cart', JSON.stringify(cart));
    }

    // Update Cart UI
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
            cartBadge.style.display = 'none';
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                totalItems += item.quantity;

                const cartItemHTML = `
                    <div class="cart-item">
                        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-details">
                            <h4 class="cart-item-name">${item.name}</h4>
                            <div class="cart-item-price">₹${item.price * item.quantity}</div>
                            <div class="cart-qty-controls">
                                <button class="qty-btn minus-btn" data-index="${index}">-</button>
                                <span class="qty-display">${item.quantity}</span>
                                <button class="qty-btn plus-btn" data-index="${index}">+</button>
                            </div>
                        </div>
                        <button class="remove-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
            });

            cartBadge.textContent = totalItems;
            cartBadge.style.display = 'block';
        }

        cartTotalPrice.textContent = '₹' + total;
        saveCart();

        // Attach event listeners to new DOM elements in cart
        attachCartEvents();
    }

    // Attach Cart Action Events
    function attachCartEvents() {
        document.querySelectorAll('.qty-btn.plus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart[index].quantity += 1;
                updateCartUI();
            });
        });

        document.querySelectorAll('.qty-btn.minus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                updateCartUI();
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }

    // Add To Cart Event
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            const price = parseInt(e.target.getAttribute('data-price'));
            const img = e.target.getAttribute('data-img');

            // Quick Animation feedback
            const originalText = e.target.textContent;
            e.target.textContent = 'Added!';
            e.target.style.backgroundColor = 'var(--light-green)';
            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.style.backgroundColor = 'var(--primary-orange)';
            }, 1000);

            // Check if exists
            const existingItem = document.querySelector('img[src="' + img + '"]');
            let itemIndex = cart.findIndex(item => item.name === name);
            if (itemIndex > -1) {
                cart[itemIndex].quantity += 1;
            } else {
                cart.push({ name, price, img, quantity: 1 });
            }

            updateCartUI();
            
            // Pop the cart open automatically on first add to show user it works
            if(cart.length === 1 && cart[0].quantity === 1) {
                cartSidebar.classList.add('active');
                cartOverlay.classList.add('active');
                // Auto close after 2s so they can keep ordering
                setTimeout(() => {
                    cartSidebar.classList.remove('active');
                    cartOverlay.classList.remove('active');
                }, 2000);
            }
        });
    });

    // Checkout via WhatsApp
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items to order.');
            return;
        }

        const name = document.getElementById('custName').value.trim();
        const phone = document.getElementById('custPhone').value.trim();
        const address = document.getElementById('custAddress').value.trim();
        const instructions = document.getElementById('custInstructions').value.trim();

        let total = 0;
        let orderText = `*New Order from Fitkart Cafe!*\n\n*Customer Details*\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\n*Order Items*\n`;

        cart.forEach((item, index) => {
            orderText += `${index + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`;
            total += item.price * item.quantity;
        });

        orderText += `\n*Total Order Value: ₹${total}*\n`;
        
        if (instructions) {
            orderText += `\n*Special Instructions:* ${instructions}\n`;
        }
        
        const encodedText = encodeURIComponent(orderText);
        const whatsappNumber = '919650939167';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

        // Open WhatsApp
        window.open(whatsappURL, '_blank');

        // Optional: clear cart after sending?
        if(confirm('Did you complete sending the order on WhatsApp? Click OK to clear your cart.')) {
            cart = [];
            document.getElementById('custName').value = '';
            document.getElementById('custPhone').value = '';
            document.getElementById('custAddress').value = '';
            document.getElementById('custInstructions').value = '';
            updateCartUI();
            toggleCart();
        }
    });

    // Initialize UI on load
    updateCartUI();
});
