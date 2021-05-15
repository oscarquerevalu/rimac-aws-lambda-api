const https = require('https');

const SWAPI_service = require('./servicios/SWAPI_service');
const personaje_service = require('./servicios/personaje_service');
const utilitarios = require('./utils/utilitarios');

const obtenerPersonaje = (event, context, callback) => {
    https.get(SWAPI_service._EXTERNAL_URL+(event.pathParameters.id)+"/", (resp) => {
    let data = '';
    
    resp.on('data', (chunk) => {
        data += chunk;
    });
    
    resp.on('end', () => {

        try {
            console.log(JSON.stringify(data));

            const arr = JSON.parse(data);
            utilitarios.renameKey(arr,'name','nombre');
            utilitarios.renameKey(arr,'height','altura');
            utilitarios.renameKey(arr,'mass','peso');
            utilitarios.renameKey(arr,'hair_color','color_cabello');
            utilitarios.renameKey(arr,'blond','tipo_sangre');
            utilitarios.renameKey(arr,'birth_year','nacimiento');
            utilitarios.renameKey(arr,'eye_color','color_ojos');
            utilitarios.renameKey(arr,'films','peliculas');
            utilitarios.renameKey(arr,'gender','genero');
            utilitarios.renameKey(arr,'skin_color','piel');
            utilitarios.renameKey(arr,'homeworld','mundo_natal');
            utilitarios.renameKey(arr,'created','creacion');
            utilitarios.renameKey(arr,'edited','edicion');
            utilitarios.renameKey(arr,'species','especies');
            utilitarios.renameKey(arr,'starships','naves_espaciales');
            utilitarios.renameKey(arr,'vehicles','vehiculos');
            
            const updatedJson = JSON.stringify( arr );

            //Grabar en dynamodb
            personaje_service.grabarBD(event.pathParameters.id,arr);

            console.log( updatedJson );
            const response = {
                statusCode: 200,
                body: updatedJson
            };
            return callback(null, response);
        } catch (error) {
            const response = {
                statusCode: 500,
                body: "Ocurrió un error inesperado"
            };
            return callback(null, response);
            
        }
    });
    
    }).on("error", (err) => {
       
    console.log("Error: " + err.message);
    });
}

const obtenerPersonajeBD = (event, context, callback) => {
    personaje_service.obtenerID(event.pathParameters.id).then(resp => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(resp)
        };
        return callback(null, response);
      });

};

module.exports.grabar = item => {
  
    personaje_service.grabarBD('1',item);
  };

module.exports.persona = obtenerPersonaje;

module.exports.personaBD = obtenerPersonajeBD;