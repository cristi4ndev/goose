export class Dice {
    roll() {
        var result = Math.floor(Math.random() * 6) + 1;
        return result;
    }
}