// Data hewan lengkap
const animals = [
    { id: 1, name: "Leopard Gecko", species: "Reptile", breed: "Leopard Gecko", age: "6 bulan", price: 200000, oldPrice: null, desc: "Reptil jinak, mudah dirawat, cocok untuk pemula.", img: "gecko 2026-04-16 at 11.50.14.jpeg" },
    { id: 2, name: "Kucing Jakarta", species: "Kucing", breed: "Kucing Jakarta", age: "5 bulan", price: 2000000000, oldPrice: null, desc: "Hewan peliharaan berkualitas dari Jakarta.", img: "petiii 2026-04-23 at 20.41.19.jpeg" },
    { id: 3, name: "BEO", species: "Burung", breed: "BEO", age: "3 bulan", price: 1500000, oldPrice: null, desc: "Burung berkicau yang indah dan cerdas.", img: "BEO 2026-04-23 at 20.41.20.jpeg" },
    { id: 4, name: "Leopard Gecko", species: "Reptile", breed: "Leopard Gecko", age: "7 bulan", price: 200000, oldPrice: null, desc: "Reptil jinak, mudah dirawat, cocok untuk pemula.", img: "gecko 2026-04-16 at 11.50.14.jpeg" },
    { id: 5, name: "Kucing Jakarta", species: "Kucing", breed: "Kucing Jakarta", age: "8 bulan", price: 2000000000, oldPrice: null, desc: "Hewan peliharaan berkualitas dari Jakarta.", img: "petiii 2026-04-23 at 20.41.19.jpeg" },
    { id: 6, name: "NURI P.HITAM", species: "Burung", breed: "NURI P.HITAM", age: "6 bulan", price: 4570000, oldPrice: null, desc: "Burung berwarna indah dengan kepribadian yang kuat.", img: "NURI P.HITAM 2026-04-23 at 20.41.20.jpeg" },
    { id: 7, name: "MURAI BATU", species: "Burung", breed: "MURAI BATU", age: "4 bulan", price: 3550000, oldPrice: null, desc: "Burung penyanyi terbaik dengan suara yang merdu.", img: "MURAI BATU 2026-04-23 at 20.38.08.jpeg" },
    { id: 8, name: "Leopard Gecko", species: "Reptile", breed: "Leopard Gecko", age: "6 bulan", price: 200000, oldPrice: null, desc: "Reptil jinak, mudah dirawat, cocok untuk pemula.", img: "gecko 2026-04-16 at 11.50.14.jpeg" }
];

let currentFilter = "all";
const productGrid = document.getElementById("productGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("detailModal");
const modalName = document.getElementById("modalName");
const modalDetail = document.getElementById("modalDetail");
const modalPriceSpan = document.getElementById("modalPrice");

function formatPrice(price) {
    return "Rp " + price.toLocaleString("id-ID");
}

function renderCards() {
    let filtered = animals;
    if (currentFilter !== "all") {
        filtered = animals.filter(animal => animal.species === currentFilter);
    }

    if (filtered.length === 0) {
        productGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px;">😢 Tidak ada hewan dengan kategori ini, coba filter lain.</div>`;
        return;
    }

    productGrid.innerHTML = filtered.map(animal => `
        <div class="product-card" data-id="${animal.id}">
            <div class="card-img" style="background-image: url('${animal.img}'); background-size: cover;">
                <div class="card-badge">${animal.species} • ${animal.age}</div>
            </div>
            <div class="card-content">
                <div class="card-title">${animal.name} <span style="font-size:0.9rem; font-weight:normal;">${animal.breed}</span></div>
                <div class="card-desc">${animal.desc.substring(0, 60)}...</div>
                <div class="price-row">
                    <div>
                        <span class="price">${formatPrice(animal.price)}</span>
                        ${animal.oldPrice ? `<span class="old-price">${formatPrice(animal.oldPrice)}</span>` : ''}
                    </div>
                    <i class="fas fa-heart" style="color:#f3aa6b;"></i>
                </div>
                <button class="btn-card" data-id="${animal.id}">💬 Detail & Adopsi</button>
            </div>
        </div>
    `).join('');

    // attach event listeners ke tombol detail
    document.querySelectorAll('.btn-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            const animal = animals.find(a => a.id === id);
            if (animal) showModal(animal);
        });
    });
    
    // tambahkan card click juga optional
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if(e.target.classList.contains('btn-card')) return;
            const id = parseInt(card.getAttribute('data-id'));
            const animal = animals.find(a => a.id === id);
            if (animal) showModal(animal);
        });
    });
}

function showModal(animal) {
    modalName.innerText = `${animal.name} - ${animal.species} ${animal.breed}`;
    modalDetail.innerHTML = `${animal.desc}<br><br>📌 Umur: ${animal.age}<br>✅ Vaksin & Kesehatan terjamin<br>📍 Lokasi: Ravipsa Pet Store (tersedia pengiriman)`;
    modalPriceSpan.innerHTML = `${formatPrice(animal.price)} ${animal.oldPrice ? `<span style="font-size:0.9rem; text-decoration:line-through; margin-left:8px;">${formatPrice(animal.oldPrice)}</span>` : ''}`;
    modal.style.display = "flex";
}

// filter logic
function setActiveFilter(selected) {
    filterBtns.forEach(btn => {
        const filterVal = btn.getAttribute('data-filter');
        if (filterVal === selected) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        currentFilter = filterValue;
        setActiveFilter(currentFilter);
        renderCards();
        // scroll sedikit ke grid
        document.getElementById("hewan").scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// modal close
function closeModal() {
    modal.style.display = "none";
}
document.getElementById("closeModalBtn").addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

// tombol explore & contact
document.getElementById("exploreBtn").addEventListener("click", () => {
    document.getElementById("hewan").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("contactBtn").addEventListener("click", () => {
    alert("🐾 Hubungi kami: +62 812 3456 7890 atau email hello@ravipsa.com. Tim Ravipsa siap membantu!");
});

// set hero image
const heroImg = document.getElementById("heroImg");
if(heroImg) {
    heroImg.src = "gecko 2026-04-16 at 11.50.14.jpeg";
    heroImg.alt = "Ravipsa Hewan Lucu";
}

// initial render
renderCards();