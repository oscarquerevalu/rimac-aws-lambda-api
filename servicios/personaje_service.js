const datamanager = require('../datamanager/datamanager')

module.exports.grabarBD = function (id,obj) {
    var input = {
        "id": id,
        "nombre": obj['nombre'], 
        "altura": obj['altura'], 
        "peso": obj['peso'], 
        "color_cabello": obj['color_cabello'], 
        "tipo_sangre": obj['tipo_sangre'], 
        "nacimiento": obj['nacimiento'], 
        "color_ojos": obj['color_ojos'], 
        "peliculas": obj['peliculas'], 
        "genero": obj['genero'], 
        "piel": obj['piel'], 
        "mundo_natal": obj['mundo_natal'], 
        "creacion": obj['creacion'], 
        "edicion": obj['edicion'], 
        "especies": obj['especies'], 
        "naves_espaciales": obj['naves_espaciales'], 
        "vehiculos": obj['vehiculos'], 
    };
    var params = {
        TableName: "starwars",
        Item:  input
    };
    datamanager.docClient.put(params, function (err, data) {

        if (err) {
            console.log("starwars::save::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("starwars::save::success" );         
        }
    });
}

module.exports.obtenerID = itemId => {
    const params = {
      Key: {
        id: itemId
      },
      TableName: "starwars"
    };
  
    return datamanager.docClient.get(params).promise().then(result => {
      return result.Item;
    });
  };