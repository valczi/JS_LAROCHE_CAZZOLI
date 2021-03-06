
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

  get nbcoups() {
    return this.#nbcoups;
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
      this.#nbcoups++;
      const victoire = this.aGagne(y, x);
      // 1 victoire du joueur pr??sent // 2 ??galit?? // 3 case d??ja utilis??
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

  //??change des joueurs
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
    //pas besoin de v??rifier si l'ont a pas atteint le nombre minimal de coup pour gagner
    if (this.#nbcoups >= 5) {
      const aTrouver = this.#symbols[this.#joueurActuel].repeat(3);

      // gagn?? en ligne ? : concat??nation de la ligne, et recherche de la sous-cha??ne gagnante
      let ligne = '';
      this.#morpionGrille[y].forEach(element => (ligne += element));
      if (ligne.indexOf(aTrouver) >= 0) {
        return true;
      }

      // gagn?? en colonne ? : concat??nation de la colonne et recherche de la sous-cha??ne gagnante
      let col = '';
      this.#morpionGrille.forEach(element => (col += element[x]));
      if (col.indexOf(aTrouver) >= 0) {
        return true;
      }

      // gagn?? diagonale
      let diagonale = '';
      for (let x = 0; x < this.#taille; x++) {
        for (let y = 0; y < this.#taille; y++) {
          if (x <= this.#taille - 3 && y <= this.#taille - 3)
            diagonale += this.#morpionGrille[x][y] + this.#morpionGrille[x + 1][y + 1] + this.#morpionGrille[x + 2][y + 2];
          if (diagonale.indexOf(aTrouver) >= 0) {
            return true;
          }
          diagonale = '';
        }
      }

      // gagn?? diag inverse
      let inverse = '';
      for (let x = 0; x < this.#taille; x++) {
        for (let y = 0; y < this.#taille; y++) {
          if (x <= this.#taille - 3 && y >= 2)
            inverse += this.#morpionGrille[x][y] + this.#morpionGrille[x + 1][y - 1] + this.#morpionGrille[x + 2][y - 2];
          if (inverse.indexOf(aTrouver) >= 0) {
            return true;
          }
          inverse = '';
        }
      }
    }
    return false;
  }

}

