function toggle(source) {
    var checkboxes = document.querySelectorAll('.cart-checkbox');
    checkboxes.forEach(function (cb) {
        cb.checked = source.checked;
    });
    updateTotal();
    updateSummary();
}

function formatCurrency(amount) {
    return amount.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });
}

function updateSummary() {
    var checkboxes = document.querySelectorAll('.cart-checkbox');
    var items = [];
    checkboxes.forEach(function (cb) {
        if (cb.checked) {
            var name = cb.getAttribute('data-name') || '';
            var price = parseFloat(cb.getAttribute('data-price')) || 0;
            if (name) items.push({ name, price });
        }
    });

    var summaryEl = document.getElementById('selected-packages');
    if (summaryEl) {
        summaryEl.innerHTML = '';
        if (items.length) {
            items.forEach(function(item) {
                var row = document.createElement('div');
                row.className = 'flex items-center justify-between gap-4 py-1';

                var nameSpan = document.createElement('span');
                nameSpan.textContent = item.name;
                nameSpan.className = 'text-sm text-gray-700';

                var priceTag = document.createElement('span');
                priceTag.textContent = formatCurrency(item.price);
                priceTag.className = 'text-sm font-semibold text-primary whitespace-nowrap';

                row.appendChild(nameSpan);
                row.appendChild(priceTag);
                summaryEl.appendChild(row);
            });
        } else {
            summaryEl.textContent = '-';
        }
    }
}

function updateTotal() {
    var checkboxes = document.querySelectorAll('.cart-checkbox');
    var total = 0;
    checkboxes.forEach(function (cb) {
        if (cb.checked) {
            var price = parseFloat(cb.getAttribute('data-price')) || 0;
            total += price;
        }
    });
    var totalEl = document.getElementById('total-amount');
    var totalElText = document.getElementById('total-amount-text');
    if (totalEl) {
        totalEl.value = formatCurrency(total);
        totalElText.textContent = formatCurrency(total);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var checkboxes = document.querySelectorAll('.cart-checkbox');
    checkboxes.forEach(function (cb) {
        cb.addEventListener('change', function () {
            updateTotal();
            updateSummary();
        });
    });

    var selectAll = document.getElementById('select-all');
    if (selectAll) selectAll.addEventListener('change', function () {
        toggle(this);
    });

    updateTotal();
    updateSummary();
});