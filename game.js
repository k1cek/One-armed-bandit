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

class Statistics {
    constructor() { // tworze konstruktor przechpwujący wszystkie wyniki
        this.gameResults = []
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


class Draw {
    constructor() {
        this.options = ['red', 'green', 'blue']; // przechowuje nazwy kolorów które moga byc wylosowane
        let _result = this.drawResult(); // wynik naszego losowania
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

// const draw = new Draw();

class Result { // przechowywanie dwóch metod, zwórci nam wynik okreslajaca kto wygrał i druga metoda okreslająca co wygrał uzytkownik
    static moneyWinInGame(result, bid) { // metoda ststyczna, którą wywołujemy jak funkcje np. Result.pokaz();
        // INSTANCJA w static nie jest potrzebna
        if (result) return 3 * bid;
        else return 0;
    }

    static checkWinner(draw) { // zasady gry
        if (draw[0] === draw[1] && draw[1] === draw[2] || draw[0] !== draw[1] && draw[1] !== draw[2] && draw[0] !== draw[2]) return true;
        else return false;
    }
}

Result.moneyWinInGame(true, 100) // wywołanie metody statycznej

// klasa główna

class Game {
    constructor(start) {

        this.stats = new Statistics(); // instancje dwóch klas
        this.wallet = new Wallet(start);

        // BINDOWANIE!!! przywiazanie this aby nie utracic wiązania
        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.spanWallet = document.querySelector('.panel span.wallet');
        this.boards = document.querySelectorAll('div.color'); // nodelist
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector('.score span.result');
        this.spanGames = document.querySelector('.score span.number');
        this.spanWins = document.querySelector('.score span.win');
        this.spanLosses = document.querySelector('.score span.loss');

        this.render();

    }

    render(colors = ['gray', 'gray', 'gray'], money = wallet.getWalletValue(), result = "", total = stats.showGameStatistic(), bid = 0, wonMoney = 0) { // metoda wyswietlająca kolory, wyswietlanie srodkow, informcje
        console.log(`Gramy`);

        if (result) {
            result = `You won ${wonMoney}$`;
        } else if (!result && result !== "") { //!!!! dwa znaki rownosci, oznacza, ze nie douszczamy niejawnej konwersji
            result = `You lost ${bid}$`;
        }

        this.spanResult.textContent = result;
        this.spanWallet.textContent = money;
        this.spanGames.textContent = total[0];
        this.spanWins.textContent = total[1];
        this.spanLosses.textContent = total[2];
        this.boards.forEach((board, index) => {
            board.style.backgroundColor = colors[index]
        })

    }

    startGame() {
        console.log('start');
        if (this.inputBid.value < 1) return alert(`Sorry, you don't have enough money`);
        const bid = Math.floor(this.inputBid.value); // przekształcenie stringa na number

        if (!this.wallet.checkCanPlay(bid)) {
            return alert('Masz za mało środków lub nieprawidłowa wartość');
        }

        this.wallet.changeWallet(bid, "-");

        this.draw = new Draw();
        const colors = this.draw.getDrawResult();
        const win = Result.checkWinner(colors);
        console.log(win);
        console.log(colors);

        const wonMoney = Result.moneyWinInGame(win, bid)
        this.wallet.changeWallet(wonMoney); // "+" ?
        this.stats.addGameStatistic(win, bid);

        this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatistic(), bid, wonMoney);
    }

}

const wallet = new Wallet(220);

const stats = new Statistics();

const game = new Game(200); // INSTANCJA KLASY GAME, STWORZENIE i URUCHOMIENIE GRY, przekazana kwota 200 do start w konstruktorze