module.exports = (arrayAsString)=>{
    const result = '';
    if(arrayAsString != undefined){
        arrayAsString.split(',').map(tech => tech.trim());
    }
    return result;  
}