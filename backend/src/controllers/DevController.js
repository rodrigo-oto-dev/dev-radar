const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

module.exports={
    async store (request,response) {
        const { github_username, techs, longitude,latitude } = request.body;

        let dev = await Dev.findOne({github_username});
        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);        
            //Se o name não existir por padrão ele irá atribuir o valor de login
            const {name = login, avatar_url, bio} = apiResponse.data;
            const techsArray = parseStringAsArray(techs);
            const location = {
                type:'Point',
                coordinates:[longitude,latitude]
            };
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs:techsArray,
                location
            });

            //Filtrar conexões que estão no máximo 10km de distancia e que o novo dev tenha pelo menos 1 das techs filtradas
            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray
            );

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        return response.json(dev);
    },

    async index (request,response){
        const devs = await Dev.find();
        return response.json(devs);
    }
};