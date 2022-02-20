import { IClasse, IEleve, IEvaluation, INote } from "@/interfaces"

export const ElevesUtilities = {
    getMoyenne: (classe: IClasse, eleve: IEleve) => {
        const notes = classe.evaluations
            .flatMap((evaluation) => evaluation.notes)
            .filter((note) => note.eleve_id === eleve.id)
            .filter((x) => x.note > 0)
            .map((note) => note.note);

        return notes.length > 0 ? notes.reduce((a, b) => a + b) / notes.length : -1;
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