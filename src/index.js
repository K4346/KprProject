import {CurrencyEntity} from "./CurrencyEntity.js";
import {GeneralEntity} from "./GeneralEntity.js";
import {CustomChart} from "./CustomChart.js";
import {Utils} from "./utils.js";

document.addEventListener('DOMContentLoaded', setup)

const util = new Utils()

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
    const result = document.getElementById('output');
    if (currencySelector.value === '-') {
        result.textContent = ''
        return
    }
    result.textContent = util.showNominalCurrency(Number(nominalInput.value), currency)
}

function makeChart() {
    chart.drawArrow([
            {
                value: currency.previous,
                date: info.previousDate
            }, {
                value: currency.value,
                date: info.date
            }],
        util)
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
            document.getElementById('changesContainer').style.visibility = 'visible'
            makeChart()
        } else {
            document.getElementById('changesContainer').style.visibility = 'hidden'
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

function initDate() {
    document.getElementById('title').textContent = `Курс Валют (${(new Date(info.date)).toLocaleDateString("ru")})`
}

function initViews() {
    initDate()
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
        // setTimeout(function() {
        //     startApp()
        // }, 2000);
        console.error(err)
    });
}