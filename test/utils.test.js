import {Utils} from "../src/utils";
import {CurrencyEntity} from "../src/CurrencyEntity";

let utils = new Utils()

// formatFloatToDisplayingAmount

test('знаков больше чем нужно', () => {
    expect(utils.formatFloatToDisplayingAmount(3.3122342)).toBe("3.312");
});


test('1 цифра вместо 3', () => {
    expect(utils.formatFloatToDisplayingAmount(3.1)).toBe("3.1");
});

test('число без цифр после запятой (так работает number)', () => {
    expect(utils.formatFloatToDisplayingAmount(3.0)).toBe("3");
});

test('скос всех цифр', () => {
    expect(utils.formatFloatToDisplayingAmount(3.32,0)).toBe("3");
});

test('нужно столько же цифр сколько есть', () => {
    expect(utils.formatFloatToDisplayingAmount(3.32,2)).toBe("3.32");
});

// showNominalCurrency

const currencyEntity= new CurrencyEntity({
    CharCode: "USD",
    Nominal: 5,
    Value: 100
})
test('обычный рабочий сценарий с всеми данными', () => {
    expect(utils.showNominalCurrency(1,currencyEntity)).toBe("1 USD = 20₽");
});

test('номинал=0', () => {
    expect(utils.showNominalCurrency(0,currencyEntity)).toBe("");
});

test('номинал отрицательный', () => {
    expect(utils.showNominalCurrency(-5,currencyEntity)).toBe("");
});

const currencyEntity1= new CurrencyEntity({
    Nominal: 5,
    Value: 100
})
test('сценарий с неполными данными', () => {
    expect(utils.showNominalCurrency(1,currencyEntity1)).toBe("");
});
