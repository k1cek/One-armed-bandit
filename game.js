class Wallet { // przechowywanie stanu pieniedzy
    constructor(money) {
        // domknięcie, metody musza byc w konstruktorze aby widziały zmienne
        let _money = money; //CLOSURE _money ukryta zmienna przechowujaca srodki

        this.getWalletValue = () => { // pierwsza metoda pobierajaca info o stanie konta
            return _money;
        }


        this.checkCanPlay = (value) => { // metoda sprawdzajaca czy mozemy grac
            if (_money >= value) {
                return true;
            } else return false;
        }

        this.changeWallet = (value, type = "+") => { // zmieniamy zawartosc portfela
            if (typeof value === "number" && !isNaN(value)) { // tylko w sytuacji kiedy number jest 'number' i nie jest NAN
                // jedna funkcja do dwóch rzeczy. W zaleznosci od otrzymanych danych zachowa się inaczej

                if (type === "+") {
                    return _money += value;
                } else if (type === "-") {
                    return _money -= value;
                } else {
                    throw new Error('nieprawidłowy typ działania')
                }
            } else {
                console.log(typeof value);
                throw new Error("nieprawidłowa liczba")
            }
        }

    }

}

// const wallet = new Wallet(200);

class Statistics {
    constructor() {

    }
}