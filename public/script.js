// Initialize expenses and totalAmount from localStorage if available
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;

const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const infoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Function to update local storage with current expenses and totalAmount
function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
}

// Function to render expenses from localStorage
function renderExpenses() {
    // Clear existing rows in the table
    expenseTableBody.innerHTML = '';

    // Render each expense in expenses array
    expenses.forEach((expense, index) => {
        const newRow = expenseTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const infoCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        infoCell.textContent = expense.info;
        dateCell.textContent = expense.date;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            // Adjust totalAmount based on category
            if (expense.category === 'Income') {
                totalAmount -= expense.amount;
            } else if (expense.category === 'Expense') {
                totalAmount += expense.amount;
            }

            // Update totalAmountCell content
            totalAmountCell.textContent = totalAmount;

            // Remove the expense from expenses array
            expenses.splice(index, 1);

            // Update localStorage
            updateLocalStorage();

            // Remove the row from the table
            expenseTableBody.removeChild(newRow);
        });

        deleteCell.appendChild(deleteBtn);
    });

    // Update totalAmountCell with current totalAmount
    totalAmountCell.textContent = totalAmount;
}

// Function to handle adding new expense/income
addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const info = infoInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    // Validation checks
    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (info === '') {
        alert('Please enter a valid info');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    // Add expense/income to expenses array
    expenses.push({ category, amount, info, date });

    // Update totalAmount based on category
    if (category === 'Income') {
        totalAmount += amount;
    } else if (category === 'Expense') {
        totalAmount -= amount;
    }

    // Update totalAmountCell content
    totalAmountCell.textContent = totalAmount;

    // Update localStorage
    updateLocalStorage();

    // Render expenses in the table
    renderExpenses();

    // Clear input fields after adding
    categorySelect.value = '';
    amountInput.value = '';
    infoInput.value = '';
    dateInput.value = '';
});

// Initial rendering of expenses from localStorage
renderExpenses();