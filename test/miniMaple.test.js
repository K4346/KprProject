// import {MiniMaple} from "../src/miniMaple";
//
// let miniMaple = new MiniMaple()
// test('1', () => {
//     expect(miniMaple.calculateDiff("x^3+9*x^2-x^2 , x")).toBe("3*x^2+18*x-2*x");
// });
// test('2', () => {
//     expect(miniMaple.calculateDiff("x^3+9*x^2-x^2 ,y")).toBe("");
// });
// test('3', () => {
//     expect(miniMaple.calculateDiff("4*x^3, x")).toBe("12*x^2");
// });
// test('4', () => {
//     expect(miniMaple.calculateDiff("4*x^3, y")).toBe("");
// });
// test('5', () => {
//     expect(miniMaple.calculateDiff("4*x^3-x^2, x")).toBe("12*x^2-2*x");
// });
// test('6', () => {
//     try {
//         miniMaple.calculateDiff("4*x^3/x^2, x");
//         expect(true).toBe(false);
//     } catch (e) {
//         expect(e.message).toBe('Присутствует недопустимый символ');
//     }
// });
// test('7', () => {
//     expect(miniMaple.calculateDiff("x, x")).toBe("1*x^0");
// });