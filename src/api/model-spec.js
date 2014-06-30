exports.models = {
	"Nmsc" : {
		"id": "Nmsc",
		"required" : [ "id" ],
		"type": "object",
		"properties" : {
			"id" : {
				"type" : "integer",
				"format" : "int64",
				"description" : "The id of the Nmsc"
			},
			"name" : {
				"type" : "string",
				"description" : "Name of the Nmsc"
			},
			"code" : {
				"type" : "string",
				"description" : "code of the Nmsc"
			}
		}
	}
};