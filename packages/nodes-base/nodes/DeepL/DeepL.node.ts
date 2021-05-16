import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	deepLApiRequest,
} from './GenericFunctions';

import {
	textOperations
} from './TextDescription';

export class DeepL implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'DeepL',
		name: 'deepL',
		icon: 'file:deepl.svg',
		group: ['input', 'output'],
		version: 1,
		description: 'Translate data using DeepL',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: 'DeepL',
			color: '#0f2b46',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'deepLApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Language',
						value: 'language',
					},
				],
				default: 'language',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'language',
						],
					},
				},
				options: [
					{
						name: 'Translate',
						value: 'translate',
						description: 'Translate data',
					},
				],
				default: 'translate',
				description: 'The operation to perform',
			},
			...textOperations,
		],
	};

	methods = {
		loadOptions: {
			async getLanguages(this: ILoadOptionsFunctions) {
				const returnData: INodePropertyOptions[] = [];
				const languages = await deepLApiRequest.call(this, 'GET', '/languages', {}, { type: 'target' });
				for (const language of languages) {
					returnData.push({
						name: language.name,
						value: language.language,
					});
				}
				return returnData;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const length = items.length;

		const responseData = [];

		for (let i = 0; i < length; i++) {

			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;
			const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

			if (resource === 'language') {

				if (operation === 'translate') {

					const text = this.getNodeParameter('text', i);
					const translateTo = this.getNodeParameter('translateTo', i) as string;
					const qs = { target_lang: translateTo, text } as IDataObject;

					if (additionalFields.sourceLang !== undefined) {
						qs.source_lang = ['EN-GB', 'EN-US'].includes(additionalFields.sourceLang as string)
							? 'EN'
							: additionalFields.sourceLang;
					}

					const response = await deepLApiRequest.call(this, 'GET', '/translate', {}, qs);
					responseData.push(response.translations[0]);
				}
			}
		}

		return [this.helpers.returnJsonArray(responseData)];
	}
}
