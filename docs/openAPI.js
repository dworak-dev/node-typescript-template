const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const YAML = require('yaml')


	const options = {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'Hello World',
				version: '1.0.0',
			},
			components: {
				schemas: {
					HelloWorld: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
							},
						},
					}
				}
			}
		},
		apis: [
			'../src/api/routes/*.ts',
			'../src/typeorm/entities/*.ts'
		], // files containing annotations as above
	};

	const openapiSpecification = swaggerJsdoc(options);
	const yamlStr = YAML.stringify(openapiSpecification);

	fs.writeFileSync('examples/openapi.yaml', yamlStr);

	console.log(openapiSpecification);
