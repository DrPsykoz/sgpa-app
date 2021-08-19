const removeFromList = (index: number, list: any[]) => {
    list.splice(index, 1);
}

const readFromFile = (filepath: string) => {
    if (window && window.require) {
        const fs = window.require("fs");
        return fs.readFileSync(filepath, "utf8");
    } else {
        console.error(`error while loading file at ${filepath}`)
        return null;
    }
}

const writeToFileSync = (filepath: string, content: string) => {
    if (window && window.require) {
        const fs = window.require("fs");
        fs.writeFileSync(filepath, content);
    }
}

const getNextID = (array: any[]) => {
    if (array === undefined) array = [];
    let id = 0;
    if (array.length === 0 || array === undefined) return 0;
    array.forEach(x => {
        if (id < x.id) {
            id = x.id;
        }
    })
    return id + 1;
}

const getByID = (array: any[], id: number) => {
    if (array.length === 0 || array === undefined) return undefined;
    array.forEach(x => {
        if (x.id === id) {
            return x;
        }
    });
    return undefined;
}

const getNote = (note: number) => {
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
}

const isSame = (obj1: any, obj2: any) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}


export default { removeFromList, readFromFile, writeToFileSync, getNextID, getByID, getNote, isSame };