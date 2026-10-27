// TODO: get the relevent elements.
const balanceElement = document.querySelector(".balance-amount");
const incomeTotalElement = document.querySelector(".income-amount");
const expenseTotalElement = document.querySelector(".expense-amount");
const transListElement = document.querySelector(".transactions-list");
const transactionFormElement = document.querySelector(".trans-form");
const descriptionElement = document.getElementById("description");
const transactionAmountElement = document.getElementById("amount");

//TODO: get data stored in local storage or create empty list . make sure its JSON and not string
let transactions = JSON.parse(localStorage.getItem("transactions"))|| [];



// TODO: update summary view 
// TODO: handle the addition of new transaction
transactionFormElement.addEventListener('submit', addTransaction);



function addTransaction(e){
    e.preventDefault();

    let description = descriptionElement.value;
    let amount = parseFloat(transactionAmountElement.value) ;

    // console.log(newDescription," ", newAmount);
    // console.log(typeof newAmount);
    newTransactionsObject = {
        id: Date.now(),
        description,
        amount


    };
    // console.log(newTransactionsObject);
    transactions.push(newTransactionsObject);
    updateTransactions();
    updateSummary();



transactionFormElement.reset()
}
// TODO: update transactions list
function updateTransactions (){
    transListElement.innerHTML ="";

    transactions.forEach(transaction => {
        newTransactionDisplayElement = createTransactionElement(transaction);
        transListElement .appendChild(newTransactionDisplayElement);
        

    });
    localStorage.setItem('transactions',JSON.stringify(transactions));

}

function createTransactionElement(transaction){
    let NewListElement = document.createElement("li");
    NewListElement.classList.add('list-item')
    NewListElement.classList.add(transaction.amount>0? 'income':'expense');
    NewListElement.innerHTML =`
      
            <div class="transaction-desc">
                ${transaction.description}
            </div>
            <div class="trans-amount ">
                ${zarFormatter(transaction.amount)}
            </div>
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
                <i class="fa-solid fa-xmark"></i>

            </button>

    `
    return NewListElement;

}

function updateSummary(){
    let balance = transactions.reduce((acc, transaction)=>{return acc+transaction.amount},0);
    let incomeTotal = transactions.filter(transaction=>transaction.amount>0).reduce((acc, transaction)=>{return acc+transaction.amount},0);  
    let expenseTotal = transactions.filter(transaction=>transaction.amount<0).reduce((acc, transaction)=>{return acc+transaction.amount},0);  
    
    balanceElement.textContent = zarFormatter(balance);
    incomeTotalElement.textContent = zarFormatter(incomeTotal);
    expenseTotalElement.textContent =zarFormatter(expenseTotal);
}


// TODO: handl e the removal of items
function removeTransaction(id){
    transactions = transactions.filter(transaction=>transaction.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    updateTransactions ();
    updateSummary();

}
// TODO: format the currencys displayed 
function zarFormatter(number){
    let newNumber = new Intl.NumberFormat("en-ZA",{
        style: "currency",
        currency: "ZAR",

    }).format(number)
    return newNumber
}
updateTransactions ();
updateSummary();
