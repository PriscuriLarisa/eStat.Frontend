export const getFormattedJSON = (characteristics: string): any => {
    var JSONString = characteristics.replaceAll('\'', '"')
    var n = JSONString.lastIndexOf("\"}");
    var newJSON = JSONString.substring(0,n)+"\\\\"+JSONString.substring(n);
    try{
        let obj = JSON.parse(newJSON);
        return obj;
    }
    catch(ex: any){
        if(ex instanceof SyntaxError)
        {
            var message: string = ex.message;
            var splittedMessage: string[] = message.split("position ");
            var position: number = Number(splittedMessage[splittedMessage.length-1]);
            var formattedJSON: string = newJSON.substring(0, position);
            formattedJSON = formattedJSON.substring(0, formattedJSON.lastIndexOf("}")).concat("}");
            n = formattedJSON.lastIndexOf("\"}");
            formattedJSON = formattedJSON.substring(0,n)+"\\\\" + formattedJSON.substring(n).concat("}");
            return JSON.parse(formattedJSON) ;
        }
    }
};