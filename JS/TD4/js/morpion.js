
export class morpion {

  #joueur1;
  #joueur2;
  #taille;
  #score;
  #joueurActuel;
  #morpionGrille;
  #symbols;
  #nbcoups = 0;

  static MAXGRILLE = 8;
  static MINGRILLE = 3;

  constructor(j1, j2, taille) {

    this.#taille = taille;
    this.#joueur1 = j1;
    this.#joueur2 = j2;

    this.#symbols = {
      [j1]: "X",
      [j2]: "O"

    };
    this.#score = {
      [j1]: 0,
      [j2]: 0
    };

    this.#joueurActuel = this.#joueur1;
    this.#morpionGrille = new Array(this.#taille);
    for (let i = 0; i < this.#taille; i++) {
      this.#morpionGrille[i] = new Array(this.#taille);
      for (let j = 0; j < this.#taille; j++) {
        this.#morpionGrille[i][j] = ' ';
      }
    }

  }

  get joueur1() {
    return this.#joueur1;
  }

  get taille() {
    return this.#taille;
  }

  get score() {
    return this.#score;
  }

  get joueur2() {
    return this.#joueur2;
  }

  get joueurActuel() {
    return this.#joueurActuel;
  }

  get morpionGrille() {
    return this.#morpionGrille;
  }

  get symbols() {
    return this.#symbols;
  }

  set joueur1(value) {
    if (typeof value === 'string' || value instanceof String)
      this.#joueur1 = value;
    else
      console.error("joueur 1 incorrect");
  }

  set joueur2(value) {
    if (typeof value === 'string' || value instanceof String)
      this.#joueur2 = value;
    else
      console.error("joueur 2 incorrect");
  }

  set taille(value) {
    if (Number.isInteger(value) && taille >= this.MINGRILLE && taille <= this.MAXGRILLE)
      this.#taille = value;
    else
      console.error("taille incorrect");
  }

  recommence() {
    for (let i = 0; i < this.#taille; i++) {
      for (let j = 0; j < this.#taille; j++) {
        this.#morpionGrille[i][j] = ' ';
      }
    }
    this.#nbcoups = 0;
    this.#joueurActuel = this.#joueur1;
  }

  increaseScoreJA() {
    this.#score[this.#joueurActuel]++;
  }

  joueSur(y, x) {
    if (this.#morpionGrille[y][x] === ' ') {
      this.#morpionGrille[y][x] = this.#symbols[this.#joueurActuel];
      const victoire = this.aGagne(y, x);
      this.#nbcoups++;
      this.changeJA();
      // 1 victoire du joueur présent // 2 égalité // 3 case déja utilisé
      if (victoire) {
        this.increaseScoreJA();
        return 1;
      } else if (this.#nbcoups === this.#taille * this.#taille) {
        return 2;
      }
    } else {
      return 3;
    }
  }
  //échange des joueurs
  changeJA() {
    if (this.#joueurActuel === this.#joueur1) {
      this.#joueurActuel = this.#joueur2
    } else
      this.#joueurActuel = this.#joueur1
  }

  joueurAdverse() {
    return (this.#joueurActuel === this.#joueur1 ? this.#joueur2 : this.#joueur1);
  }
  aGagne(y, x) {
    const aTrouver = this.#symbols[this.#joueurActuel].repeat(3);

    // gagné en ligne ? : concaténation de la ligne, et recherche de la sous-chaîne gagnante
    let ligne = '';
    this.#morpionGrille[y].forEach(element => (ligne += element));
    if (ligne.indexOf(aTrouver) >= 0) {
        return true;
    }

    // gagné en colonne ? : concaténation de la colonne et recherche de la sous-chaîne gagnante
    let col = '';
    this.#morpionGrille.forEach(element => (col += element[x]));
    if (col.indexOf(aTrouver) >= 0) {
        return true;
    }

    // gagné diagonale
    if (x === y) {
        let diagonale = '';
        for (let lc = 0; lc < this.#taille; lc++) {
            diagonale += this.#morpionGrille[lc][lc];
        }
        if (diagonale.indexOf(aTrouver) >= 0) {
            return true;
        }
    }

    // gagné diag inverse
    if (x === this.#taille - (y + 1)) {
        let inverse = '';
        for (let lc = 0; lc < this.#taille; lc++) {
            inverse += this.#morpionGrille[lc][this.#taille - (lc + 1)];
        }
        if (inverse.indexOf(aTrouver) >= 0) {
            return true;
        }
    }

    return false;
}

}

