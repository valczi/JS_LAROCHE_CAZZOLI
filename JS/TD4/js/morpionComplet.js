import {morpion} from "./morpion.js";


export class morpionComplet extends morpion {

    constructor(j1,j2,taille){
        super(j1,j2,taille);
    }

    aGagne(y, x) {
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