const categories = {
    "Electronics": {
        "Laptops": ["Gaming Laptops", "Ultrabooks"],
        "Phones": ["Smartphones", "Feature Phones"]
    },
    "Home Appliances": {
        "Vacuum Cleaners": ["Robot Vacuums", "Stick Vacuums"],
        "Massage Chairs": ["Reclining Chairs", "Portable Massagers"]
    },
    "Fashion": {
        "Women's Clothing": ["Dresses", "Tops", "Bras"],
        "Men's Clothing": ["Shirts", "Trousers"],
        "Accessories": ["Bags", "Shoes"]
    }
};

// Populate Dropdowns
const categoryDropdown = document.getElementById("category");
const subcategoryDropdown = document.getElementById("subcategory");
const subsubcategoryDropdown = document.getElementById("subsubcategory");
const summaryList = document.getElementById("summary-list");
const grandTotalDisplay = document.getElementById("grand-total");

let grandTotal = 0;

function populateDropdown(dropdown, options) {
    dropdown.innerHTML = '<option value="" disabled selected>Select an option</option>';
    options.forEach(option => dropdown.innerHTML += `<option value="${option}">${option}</option>`);
}

// Populate categories
populateDropdown(categoryDropdown, Object.keys(categories));

// On category change
categoryDropdown.addEventListener("change", function () {
    const selectedCategory = this.value;
    populateDropdown(subcategoryDropdown, Object.keys(categories[selectedCategory] || {}));
    subsubcategoryDropdown.innerHTML = '<option value="" disabled selected>Select a sub-subcategory</option>';
});

// On subcategory change
subcategoryDropdown.addEventListener("change", function () {
    const selectedCategory = categoryDropdown.value;
    const selectedSubcategory = this.value;
    populateDropdown(subsubcategoryDropdown, categories[selectedCategory][selectedSubcategory] || []);
});

// Handle form submission
document.getElementById("shopping-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const category = categoryDropdown.value;
    const subcategory = subcategoryDropdown.value;
    const subsubcategory = subsubcategoryDropdown.value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);

    if (!category || !subcategory || !subsubcategory || isNaN(quantity) || isNaN(price)) {
        alert("Please fill in all fields!");
        return;
    }

    const total = quantity * price;
    grandTotal += total;

    // Add to summary
    const listItem = document.createElement("li");
    listItem.textContent = `${category} > ${subcategory} > ${subsubcategory} - Quantity: ${quantity}, Price: $${price}, Total: $${total.toFixed(2)}`;
    summaryList.appendChild(listItem);

    // Update grand total
    grandTotalDisplay.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;

    // Reset form
    document.getElementById("shopping-form").reset();
    subcategoryDropdown.innerHTML = '<option value="" disabled selected>Select a subcategory</option>';
    subsubcategoryDropdown.innerHTML = '<option value="" disabled selected>Select a sub-subcategory</option>';
});
