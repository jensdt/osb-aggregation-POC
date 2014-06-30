/**
 * Created by roexber on 30/06/14.
 */
var swagger = require('swagger-node-express'),
    param = require("../node_modules/swagger-node-express/lib/paramTypes.js"),
    modelspec = require('./api/model-spec.js'),
    server = require("../server.js"),
    nmscs = require('../src/routes/nmscs');

//Couple the application to the Swagger module.
swagger.setAppHandler(server.app);
swagger.addModels(modelspec);

//set api info
swagger.setApiInfo({
    swaggerVersion: "2.1",
    title: "OSB Aggregation API Documentation"
});

swagger.addGet({
    'spec': {
        method: "GET",
        path: "/nmscs",
        summary: "Get all Nmscs",
        notes: "Get all Nmscs",
        description: "Operations about Nmscs",
        type: "array",
        items: {
            $ref: "Nmsc"
        },
        errorResponses: [swagger.errors.notFound('Nmsc')],
        nickname: "findAllNmscs"
    },
    'action': nmscs.findAll
});

swagger.addGet({
    'spec': {
        description: "Operations about Nmscs",
        path: "/nmscs/{nmscId}",
        notes: "Returns an Nmsc based on ID",
        summary: "Find Nmsc by ID",
        method: "GET",
        type: "Nmsc",
        parameters: [param.path("nmscId", "ID of the Nmsc that needs to be fetched", "string")],
        errorResponses: [swagger.errors.notFound('Nmsc')],
        nickname: "getNmscById"
    },
    'action': nmscs.findById
});

//Configures the app's base path and api version.
swagger.configureSwaggerPaths("", "api-docs", "");

var swaggerUri = process.env.SWAGGER_URI ||
    'http://localhost:3000';

swagger.configure(swaggerUri, "1.0.0");
swagger.configureDeclaration('nmscs', {
    description: 'Operations about Nmscs'
});
