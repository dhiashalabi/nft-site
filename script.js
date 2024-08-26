// script.js
document.addEventListener('DOMContentLoaded', function () {
    const nftGallery = document.getElementById('nft-gallery');

    const nftItems = [
        { id: 1, name: 'CryptoPunk #3100', price: 7600000, category: 'art', image: 'images/crypto-punk.jpg' },
        { id: 2, name: 'Meta-Pigeon Sneaker', price: 33000, category: 'collectible', image: 'images/sneakers-purple.png' },
        { id: 3, name: 'NFT Music Track', price: 1500000, category: 'music', image: 'images/music-nft.jpg' },
        { id: 4, name: 'Bag #748', price: 1400000, category: 'collectible', image: 'images/bag.svg' },
        { id: 5, name: 'Art NFT #24', price: 800000, category: 'art', image: 'images/art-nft.jpg' },
    ];

    function renderNFTs(items) {
        nftGallery.innerHTML = '';
        items.forEach(item => {
            nftGallery.innerHTML += `
                <div class="gallery-item">
                    <img src="${item.image}" alt="${item.name}" class="feature-image">
                    <p>${item.name} - $${(item.price / 1000000).toFixed(1)}M</p>
                </div>
            `;
        });
    }

    function applyFilters() {
        const priceFilter = document.getElementById('price-filter').value;
        const categoryFilter = document.getElementById('category-filter').value;

        let filteredNFTs = nftItems;

        if (priceFilter !== 'all') {
            filteredNFTs = filteredNFTs.filter(nft => {
                if (priceFilter === 'under1m') return nft.price < 1000000;
                if (priceFilter === '1m-5m') return nft.price >= 1000000 && nft.price <= 5000000;
                if (priceFilter === 'over5m') return nft.price > 5000000;
            });
        }

        if (categoryFilter !== 'all') {
            filteredNFTs = filteredNFTs.filter(nft => nft.category === categoryFilter);
        }

        renderNFTs(filteredNFTs);
    }

    document.getElementById('filter-btn').addEventListener('click', applyFilters);

    renderNFTs(nftItems);
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    showToast("Your message has been sent successfully!");
    document.getElementById('contactForm').reset();
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";

    setTimeout(function () {
        toast.className = toast.className.replace("show", "hide");
    }, 3000);
}
