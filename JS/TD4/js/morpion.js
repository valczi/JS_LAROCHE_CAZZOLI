
export class morpion {

  joueur1;
  joueur2;
  taille;
  joueurActuel;
  modeJeu;
  morpionGrille;
  symbols;
  nbCoups=0;

  get joueur1() {
    return this.joueur1;
  }

  get joueur2() {
    return this.joueur2;
  }

  get joueurActuel() {
    return this.joueurActuel;
  }

  get morpionGrille() {
    return this.morpionGrille;
  }

  get symbols() {
    return this.symbols;
  }


  set joueur1(value) {
    this.joueur1 = value;
  }

  set joueur2(value) {
    this.joueur2 = value;
  }

  set joueurActuel(value) {
    this.joueurActuel = value;
  }

  set morpionGrille(value) {
    this.morpionGrille = value;
  }

  set symbols(value) {
    this.symbols = value;
  }

  constructor(j1,j2,taille,modeJeu) {
    this.joueur1=j1;
    this.joueur2=j2;
    this.symbols={
      [j1] : "X",
      [j2] : "O"
    };
    this.taille=taille;
    this.modeJeu=modeJeu;
  }

  recommence() {
    const MAXGRILLE = 8;
    const MINGRILLE = 3;
    if (Number.isNaN(this.taille) || this.taille < MINGRILLE || this.taille > MAXGRILLE) {
      return 'Taille invalide !';
    }
      this.morpionGrille = new Array(this.taille);
      for (let i = 0; i < this.taille; i++) {
        this.morpionGrille[i] = new Array(this.taille);
        for (let j = 0; j < this.taille; j++) {
          this.morpionGrille[i][j] = ' ';
        }
      }

      this.joueurActuel = this.joueur1;
    }

  clicBouton(y, x) {
    if (this.morpionGrille[y][x] === ' ') {
      this.morpionGrille[y][x] = this.symbols[this.joueurActuel];
      this.nbCoups++;
      const victoire = this.aGagne(y, x);

      if (victoire) {
        return 1;
      } else if (this.nbCoups === this.taille * this.taille) {
        return 2;
      } else {
        //échange des joueurs
        if (this.joueurActuel === this.joueur1) {
          this.joueurActuel=this.joueur2
        }else
          this.joueurActuel=this.joueur1
        return 0;
      }
    } else {
      return 3;
    }
  }

  aGagne(y, x) {
    if (this.modeJeu === 'simple') {
      return this.aGagne3ParmiN(y, x);
    }

    let nbSymboles;

    // gagné en ligne ?
    const ligne = y;
    nbSymboles = 0;
    for (let col = 0; col < this.taille; col++) {
      if (this.morpionGrille[ligne][col] === this.symbols[this.joueurActuel]) {
        nbSymboles++;
      }
    }
    if (nbSymboles === this.taille) {
      return true;
    }

    // gagné en colonne ?
    const col = x;
    nbSymboles = 0;
    for (let ligne = 0; ligne < this.taille; ligne++) {
      if (this.morpionGrille[ligne][col] === this.symbols[this.joueurActuel]) {
        nbSymboles++;
      }
    }
    if (nbSymboles === this.taille) {
      return true;
    }

    // gagné diagonale
    if (x === y) {
      nbSymboles = 0;
      for (let lc = 0; lc < this.taille; lc++) {
        if (this.morpionGrille[lc][lc] === this.symbols[this.joueurActuel]) {
          nbSymboles++;
        }
      }
      if (nbSymboles === this.taille) {
        return true;
      }
    }

    // gagné diag inverse
    if (x === this.taille - (y + 1)) {
      nbSymboles = 0;
      for (let ligne = 0; ligne < this.taille; ligne++) {
        if (this.morpionGrille[ligne][this.taille - (ligne + 1)] === this.symbols[this.joueurActuel]) {
          nbSymboles++;
        }
      }
      if (nbSymboles === this.taille) {
        return true;
      }
    }

    return false;
  }

  aGagne3ParmiN(y, x) {
    const aTrouver = this.symbols[this.joueurActuel].repeat(3);

    // gagné en ligne ? : concaténation de la ligne, et recherche de la sous-chaîne gagnante
    let ligne = '';
    this.morpionGrille[y].forEach(element => (ligne += element));
    if (ligne.indexOf(aTrouver) >= 0) {
      return true;
    }

    // gagné en colonne ? : concaténation de la colonne et recherche de la sous-chaîne gagnante
    let col = '';
    this.morpionGrille.forEach(element => (col += element[x]));
    if (col.indexOf(aTrouver) >= 0) {
      return true;
    }

    // gagné diagonale
    if (x === y) {
      let diagonale = '';
      for (let lc = 0; lc < this.taille; lc++) {
        diagonale += this.morpionGrille[lc][lc];
      }
      if (diagonale.indexOf(aTrouver) >= 0) {
        return true;
      }
    }

    // gagné diag inverse
    if (x === this.taille - (y + 1)) {
      let inverse = '';
      for (let lc = 0; lc < this.taille; lc++) {
        inverse += this.morpionGrille[lc][this.taille - (lc + 1)];
      }
      if (inverse.indexOf(aTrouver) >= 0) {
        return true;
      }
    }

    return false;
  }
}

