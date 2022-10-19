import {CurrencyEntity} from "./CurrencyEntity.js";
import {GeneralEntity} from "./GeneralEntity.js";
import {CustomChart} from "./CustomChart.js";

document.addEventListener('DOMContentLoaded', setup)


const currencySelector = document.getElementById('currencySelector');
const nominalInput = document.getElementById('nominalInput');
const chart = new CustomChart(document.getElementById('canvas'))

const API = 'https://www.cbr-xml-daily.ru/daily_json.js'
let info
let currency

// TODO СДЕЛАТЬ ПРОГРЕССБАР
function setup() {
    startApp()
}


function calculateResult() {
    const nominal = Number(nominalInput.value)
    if (currencySelector.value === '-' || !Number.isInteger(nominal) || nominal < 1) {
        document.getElementById('output').textContent = '\n';
        return
    }
    const currencyValue = parseFloat(currency.value) * nominal / parseFloat(currency.nominal)
    const result = document.getElementById('output');
    result.textContent = `${nominal.toString()} ${currency.charCode} = ${currencyValue.toString()}₽`
}

function makeChart() {
    chart.arrow([
        {
            value: currency.previous,
            date: info.previousDate
        }, {
            value: currency.value,
            date: info.date
        }])
}

function initCurrencySelector(currencies) {
    currencies.forEach(i => {
        let opt = document.createElement('option');
        opt.value = i
        opt.innerHTML = i
        currencySelector.appendChild(opt)
    })
    currencySelector.addEventListener('change', (event) => {
        const selectedName = document.getElementById('selectedCurrencyContainer')
        if (event.target.value !== '-') {
            currency = new CurrencyEntity(info.valute[currencySelector.value])
            selectedName.textContent = `Валюта: ${currency.name}`
            document.getElementById('changesContainer').style.visibility='visible'
            makeChart()
        } else {
            document.getElementById('changesContainer').style.visibility='hidden'
            selectedName.textContent = `\n`
            chart.clear()
        }
        calculateResult()
    });
}

function initNominalInput() {
    nominalInput.addEventListener('input', () => {
        calculateResult()
    });

}

function initViews() {
    initCurrencySelector(Object.keys(info.valute))
    initNominalInput()
}

function startApp() {
    fetch(API)
        .then(res => res.json())
        .then((out) => {
            if (info != null) return
            info = new GeneralEntity(out)
            initViews()
        }).catch(err => {
        setTimeout(function() {
            startApp()
        }, 2000);
        console.error(err)
    });
}