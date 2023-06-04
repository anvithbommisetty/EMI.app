const loanAmount = document.getElementById("loan_amount");
const loanTenure = document.getElementById("loan_tenure");
const loanRate = document.getElementById("loan_interest");

const loanEmi = document.querySelector(".loan_emi");
const loanPrinciple = document.querySelector(".loan_principle");
const loanTotal = document.querySelector(".loan_total");
const loanInterest = document.querySelector(".loan_interest_rate");

const submitBtn = document.querySelector(".calculator-btn");

submitBtn.addEventListener("click", function () {
  amount = loanAmount.value;
  tenure = loanTenure.value * 12; // 1Year = 12 months
  rate = loanRate.value / 12 / 100; // loan rate per year / 100 = loan percentage
  if(amount<0 || tenure<0 || rate<0)
  {
    alert("Please enter positive values only!!")
    return;
  }
  if(loanTenure.value>=50)
  {
    alert("Loan tenure can not be more than 50 years\nRe-enter the Loan tenure");
    return;   
  }
  if(loanRate.value>=100)
  {
   alert("Interest rate can not be more than 100\nRe-enter the interest rate");
   return;
  }
  emi = (amount * rate * (1 + rate) ** tenure) / ((1 + rate) ** tenure - 1);
  total = emi * tenure; // total amount to be paid including interest
  interest = total - amount; // interest = total amount - principle amount
  if(isNaN(emi))
  {
    alert("Please enter required values");
    return;
  }
  loanEmi.innerHTML = emi.toFixed(2);
  loanPrinciple.innerHTML = amount;
  loanInterest.innerHTML = interest.toFixed(2);
  loanTotal.innerHTML = total.toFixed(2);
 

  //Loanchart
  let xValues = ["Principle", "Interest"];
  let yValues = [amount, Math.floor(interest)];

  let barColors = ["#053D57", "#97BCC7"];

  new Chart("loanChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues
        }
      ]
    },
    options: {
      title: {
        display: false
      }
    }
  });
});