export const getFormattedJSON = (characteristics: string): any => {
    var JSONString = characteristics.replaceAll('\'', '"')
    var n = JSONString.lastIndexOf("\"}");
    var newJSON = JSONString.substring(0, n) + "\\\\" + JSONString.substring(n);
    try {
        let obj = JSON.parse(newJSON);
        return obj;
    }
    catch (ex: any) {
        if (ex instanceof SyntaxError) {
            var message: string = ex.message;
            console.log(message);
            var splittedMessage: string[] = message.split("position ");
            var position: number = Number(splittedMessage[splittedMessage.length - 1]);
            var formattedJSON: string = newJSON.substring(0, position);
            console.log(formattedJSON);
            var hasTwoFinalParanthesis = formattedJSON.includes('}');
            formattedJSON = hasTwoFinalParanthesis ? formattedJSON.substring(0, formattedJSON.lastIndexOf("}")).concat("}") : formattedJSON.concat("}}")
            n = formattedJSON.lastIndexOf("\"}");
            console.log(formattedJSON);
            formattedJSON =  hasTwoFinalParanthesis? formattedJSON.substring(0, n) + "\\\\" + formattedJSON.substring(n).concat("}") : formattedJSON.substring(0, n) + "\\\\" + formattedJSON.substring(n);
            console.log(formattedJSON);
            return JSON.parse(formattedJSON);
        }
    }
};