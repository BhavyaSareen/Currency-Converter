BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const drops = document.querySelectorAll("select")
// console.log(drops);
const fromSel = document.querySelector(".from select")
const toSel = document.querySelector(".to select")

// Populate dropdowns
for (let select of drops) {
    // console.log(select);
    for (let currCode in countryList) {
        // console.log("Cuurncy code is: ",currCode, "with country", countryList[currCode]);
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name == "from" && currCode == "INR") { //used to select particular country code from country list dropdown
            newOption.selected = "selected"
        }
        else if (select.name == "to" && currCode == "USD") { //used to select particular country code from country list dropdown
            newOption.selected = "selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change", (el) => {   //updating image acc to selected country
        console.log("country currency: ", el.target.value);
        const selImg = select.parentElement.querySelector("img");
        selImg.src = `https://flagsapi.com/${countryList[el.target.value]}/flat/64.png`;
    })

    document.querySelector("button").addEventListener("click", async (e) => {
        e.preventDefault();
        //Accessing the input value
        let amountVal = document.querySelector(".amount input").value;
        if (amountVal == "" || amountVal < 1) {
            amountVal = 1;
            // amountVal = "1";
        }
        console.log(fromSel.value, toSel.value);
        const URL = `${BASE_URL}/${fromSel.value.toLowerCase()}.json`
        // console.log(URL);
        let res = await fetch(URL);
        // console.log(res)
        let resJson = await res.json();
        console.log(resJson);
        let fromRate = resJson[fromSel.value.toLowerCase()];
        console.log("fromRate", fromRate);
        let rate = fromRate[toSel.value.toLowerCase()];
        console.log(rate);
        let finalAmount = amountVal * rate;
        document.querySelector('.msg').innerText = `${amountVal} ${fromSel.value} = ${finalAmount}${toSel.value}`
    })
}