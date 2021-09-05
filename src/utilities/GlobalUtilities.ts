export const GlobalUtilities = {

    readFromFile: (filepath: string) => {
        try {
            if (window && window.require) {
                const fs = window.require("fs");
                return fs.readFileSync(filepath, "utf8");
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    writeToFileSync: (filepath: string, content: string) => {
        try {
            if (window && window.require) {
                const fs = window.require("fs");
                fs.writeFileSync(filepath, content);
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    getNoteDetails: (note: number) => {
        note = Math.round(note);
        const noteObj = {
            name: "Non évalué",
            color: "gray"
        }
        switch (note) {
            case 1:
                noteObj.name = "Maîtrise insuffisante";
                noteObj.color = "red";
                break;

            case 2:
                noteObj.name = "Maîtrise fragile";
                noteObj.color = "orange";
                break;

            case 3:
                noteObj.name = "Presque maîtrisé";
                noteObj.color = "yellow";
                break;

            case 4:
                noteObj.name = "Maîtrise satisfaisante";
                noteObj.color = "lime";
                break;

            case 5:
                noteObj.name = "Très bonne maîtrise";
                noteObj.color = "green";
                break;

            default:
                break;
        }
        return noteObj;
    },

    isSame: (obj1: any, obj2: any) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2)
    },
}