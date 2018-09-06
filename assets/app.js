//Form event listeners
document.querySelector("#loan-form").addEventListener('submit', function(e){
    //Hide results
    document.querySelector("#results").style.display = 'none';

    //Show loader
    document.getElementById("loader").style.display = "block";

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});


//Function to calculate results
function calculateResults()
{
    //UI vars
    var ui_amount = document.querySelector("#amount");
    var ui_interest = document.querySelector("#interest");
    var ui_years = document.querySelector("#years");
    var ui_monthlyPayment = document.querySelector("#monthly-payment");
    var ui_totalPayment = document.querySelector("#total-payment");
    var ui_totalInterest = document.querySelector("#total-interest");

    var principal = parseFloat(ui_amount.value);
    var calculatedInterest = parseFloat(ui_interest.value) / 100 / 12;
    var calculatedPayments = parseFloat(ui_years.value) * 12;


    //Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x-1);

    if (isFinite(monthly))
    {
        ui_monthlyPayment.textContent = monthly.toFixed(2);
        ui_totalPayment.textContent = (monthly * calculatedPayments).toFixed(2);
        ui_totalInterest.textContent = ((monthly * calculatedPayments) - principal).toFixed(2);
        
        //show results
        document.querySelector("#results").style.display = 'block';
        //hide loader
        document.querySelector("#loader").style.display = 'none';
    } else {
        showError('Please check your numbers');
    }

}

//function to show errors
function showError(message) {

    //hide results
    document.querySelector("#results").style.display = 'none';
    //hide loader
    document.querySelector("#loader").style.display = 'none';

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(message));

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 2 secs
    setTimeout(clearError, 2000);

}

function clearError() {
    document.querySelector('.alert').remove();
}