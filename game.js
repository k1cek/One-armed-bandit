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
    constructor() { // tworze konstruktor przechpwujący wszystkie wyniki
        this.gameResults = [{
            win: true,
            bid: 2
        }, {
            win: false,
            bid: -10
        }];
    }

    addGameStatistic(win, bid) { // metoda dodajaca lub odejmujaca wynik
        let result = { // tworzymy obiekt, w ktorym bede umieszczał games result
            win: win,
            bid: bid
            // mozna tez samo: win, bid
        }
        console.log(result);
        this.gameResults.push(result);
    }

    showGameStatistic() { // metoda wyswietlająca wszystkie dane na stronie, przetwarza tablice gameResult
        let games = this.gameResults.length; // pobieram dlugosc tablicy
        let wins = this.gameResults.filter(result => result.win).length; // callback, funkcja filtrująca tablice
        //gameResults. jesli jest true jest zwracane 1. Pozostałe wyniki dadzą ilosc przegranych
        let lossess = this.gameResults.filter(result => !result.win).length;
        return [games, wins, lossess];
    }


}


// const stats = new Statistics();

class Draw {
    constructor() {
        this.options = ['red', 'green', 'blue']; // przechowuje nazwy kolorów które moga byc wylosowane
        let _result = ['red', 'green', 'blue']; // wynik naszego losowania
        this.getDrawResult = () => _result;
    }

    drawResult() {
        let colors = [];
        for (let i = 0; i < this.options.length; i++) {
            const index = Math.floor(Math.random() * this.options.length);
            const color = this.options[index];
            console.log(color);
            colors.push(color);
        }
        return colors;
    }

}

const draw = new Draw();