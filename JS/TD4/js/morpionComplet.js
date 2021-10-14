import { morpion } from "./morpion.js";


export class morpionComplet extends morpion {

    constructor(j1, j2, taille) {
        super(j1, j2, taille);

    }

    
  aGagne(y, x) {
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

}