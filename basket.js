'use strict';

class Basket {
    constructor() {
        this.totalCount = 0;
        this.totalAmount = 0;
        this.items = [];
    }

    add(id, name, price) {
        this.totalCount++;
        this.totalAmount += price;
        const itemIdx =
            this.items.findIndex(function (object) { return object.id === id });

        if (itemIdx !== -1) {
            this.items[itemIdx].count++;
            this.items[itemIdx].total =
                this.items[itemIdx].price * this.items[itemIdx].count;
            updateBasketRow(this.items[itemIdx]);
        } else {
            const item = {
                id: id,
                name: name,
                price: price,
                count: 1,
                total: price
            }
            this.items.push(item);
            createBasketRow(item);
        }
    }
}

function updateBasketRow(item) {
    const divRow = document.querySelector(`.basketRow[data-id="${item.id}"]`);

    divRow.querySelector('.productCount').textContent = item.count;
    divRow.querySelector('.productTotal').textContent = item.total;

    basketContainer.querySelector('span').textContent = basket.totalAmount;
    basketCountText.textContent = basket.totalCount;
}

function createBasketRow(item) {
    const divRow = document.createElement('div');
    const divName = document.createElement('div');
    const divCount = document.createElement('div');
    const divPrice = document.createElement('div');
    const divTotal = document.createElement('div');

    divRow.classList.add('basketRow');
    divRow.dataset.id = item.id;
    basketTotal.parentNode.insertBefore(divRow, basketTotal);

    divName.classList.add('productName');
    divCount.classList.add('productCount');
    divPrice.classList.add('productPrice');
    divTotal.classList.add('productTotal');

    divRow.appendChild(divName).textContent = item.name;
    divRow.appendChild(divCount).textContent = item.count;
    divRow.appendChild(divPrice).textContent = item.price;
    divRow.appendChild(divTotal).textContent = item.total;

    basketContainer.querySelector('span').textContent = basket.totalAmount;
    basketCountText.textContent = basket.totalCount;
}

let basket = new Basket();
const basketWrap = document.querySelector('.cartIconWrap');
const basketCountText = document.querySelector('.cartIconWrap > span');
const productContainer = document.querySelector('.featuredItems');
const basketContainer = document.querySelector('.basket');
const basketTotal = basketContainer.querySelector('.basketTotal');

basketCountText.textContent = basket.totalCount;

basketWrap.addEventListener('click', function (event) {
    basketContainer.classList.toggle('hidden');
});

productContainer.addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }

    let featuredItem = event.target;
    while (!featuredItem.classList.contains('featuredItem'))
        featuredItem = featuredItem.parentElement;

    basket.add(
        featuredItem.dataset.id,
        featuredItem.dataset.name,
        parseFloat(featuredItem.dataset.price)
    );
});