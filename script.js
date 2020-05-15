window.addEventListener('load', () => {
    let input = document.querySelector('#country');
    let button = document.querySelector('#button');
    let onDelay = false;

    addOptionsToHTML();
    getGlobalStatistics();

    button.addEventListener('click', () => {
        if (onDelay == false) {
            getCountrySpecificInfo(input.value);

            onDelay = true;
            for (let i = 0; i < 5; i++) {
                delay(i);
            }
            setTimeout(() => {
                button.innerText = "Get info";
                onDelay = false;
            }, 5000);
        } else {
            alert("Function is on cooldown");
        }
    })
})

function delay(i) {
    setTimeout(() => {
        button.innerText = i+1;
    }, 1000 * i);
}

function addOptionsToHTML() {
    let url = "https://api.covid19api.com/summary";
    let selectBox = document.querySelector('#country');

    fetch(url)
    .then(response => response.json())
    .then(json => {
        let countries = json.Countries;

        countries.forEach(element => {
            var opt = document.createElement('option');
            opt.value = element.Country;
            opt.text = element.Country;
            selectBox.appendChild(opt);
        });
    })
}

function getCountrySpecificInfo(userInp) {
    let url = "https://api.covid19api.com/summary";
    let outputWindow = document.querySelector('#specific-country pre');

    fetch(url)
    .then(response => response.json())
    .then(json => {
        let countries = json.Countries;

        countries.forEach(element => {
            if (element.Country == userInp) {
                outputWindow.innerText = "Total cases: " + element.TotalConfirmed + "\nTotal deaths: " + element.TotalDeaths + "\nTotal Recoveries " + element.TotalRecovered + "\nLast updated: " + element.Date;
            }
        });
    })
}

function getGlobalStatistics() {
    let url = "https://api.covid19api.com/summary";
    let globalCases = document.querySelector('#totalGlobalCases');
    let globalDeaths = document.querySelector('#totalGlobalDeaths');
    let globalRecoveries = document.querySelector('#totalGlobalRecoveries');

    fetch(url)
    .then(response => response.json())
    .then(json => {
        globalCases.innerText = json.Global.TotalConfirmed;
        globalDeaths.innerText = json.Global.TotalDeaths;
        globalRecoveries.innerText = json.Global.TotalRecovered;
    })

    // Updates the header every 10 minutes
    setInterval(function (){
        fetch(url)
        .then(response => response.json())
        .then(json => {
            globalCases.innerText = json.Global.TotalConfirmed;
            globalDeaths.innerText = json.Global.TotalDeaths;
            globalRecoveries.innerText = json.Global.TotalRecovered;
        })
    }, 600000)
}