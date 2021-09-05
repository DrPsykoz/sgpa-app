import { IClasse, IEleve, IEvaluation, INote } from "@/interfaces"

export const ElevesUtilities = {
    getMoyenne: (classe: IClasse, eleve: IEleve) => {
        return 0;
    },

    getOrCreateNotation: (evaluation: IEvaluation, eleve: IEleve, competence_id: string) => {
        let notation = evaluation.notes.find((notation) => notation.eleve_id === eleve.id && notation.competence_id === competence_id)
        if (!notation) {
            notation = new INote({
                eleve_id: eleve.id,
                competence_id: competence_id,
                note: 0,
            });
            evaluation.notes.push(notation);
        }
        return notation;
    }
}