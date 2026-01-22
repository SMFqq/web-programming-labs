const container = document.getElementById('app-container');

function loadCatalogLoader(e) {
    if(e) e.preventDefault();

    fetch('data/categories.json')
        .then(response => response.json())
        .then(categories => {
            renderCategories(categories);
        })
        .catch(error => {
            console.error('Error loading categories:', error);
            container.innerHTML = `<div class="alert alert-danger">Error loading catalog. Please check console.</div>`;
        });
}

function renderCategories(categories) {
    let html = `<h2 class="text-center mb-4">Product Catalog</h2>`;
    html += `<div class="row g-4">`;

    categories.forEach(cat => {
        html += `
        <div class="col-md-4">
            <div class="card h-100 category-card" onclick="loadCategoryProducts('${cat.shortname}')">
                <div class="card-body text-center">
                    <h3 class="card-title">${cat.name}</h3>
                    <p class="card-text text-muted">${cat.notes}</p>
                    <button class="btn btn-outline-primary">View Products</button>
                </div>
            </div>
        </div>`;
    });

    html += `</div>`;

    html += `
    <div class="text-center mt-5">
        <hr>
        <h3>Looking for something special?</h3>
        <button class="btn btn-lg specials-btn mt-3" onclick="loadRandomCategory()">
            See Specials (Random Category)
        </button>
    </div>
    `;

    container.innerHTML = html;
}

function loadCategoryProducts(shortname) {
    const url = `data/${shortname}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error('Error loading products:', error);
            container.innerHTML = `<div class="alert alert-danger">Error loading products for ${shortname}</div>`;
        });
}

function renderProducts(data) {
    let html = `
    <button class="btn btn-secondary mb-3" onclick="loadCatalogLoader(null)">&larr; Back to Catalog</button>
    <h2 class="mb-4 text-primary border-bottom pb-2">${data.categoryName}</h2>
    <div class="row g-4">`;

    data.products.forEach(prod => {
        const imgSrc = `https://placehold.co/200x200?text=${encodeURIComponent(prod.name)}`;

        html += `
        <div class="col-md-6 col-lg-3">
            <div class="card h-100">
                <img src="${imgSrc}" class="card-img-top product-img" alt="${prod.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${prod.name}</h5>
                    <p class="card-text small text-muted">${prod.description}</p>
                    <div class="mt-auto">
                        <h4 class="text-success">${prod.price}</h4>
                        <button class="btn btn-primary w-100">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>`;
    });

    html += `</div>`;
    container.innerHTML = html;
}

function loadRandomCategory() {
    fetch('data/categories.json')
        .then(response => response.json())
        .then(categories => {
            const randomIndex = Math.floor(Math.random() * categories.length);
            const randomCategory = categories[randomIndex];
            
            loadCategoryProducts(randomCategory.shortname);
        })
        .catch(err => console.error(err));
}