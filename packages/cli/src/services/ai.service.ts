import { Service } from 'typedi';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
import config from '@/config';

@Service()
export class AIService {
	private model: ChatOpenAI;

	constructor() {
		this.model = new ChatOpenAI({
			temperature: 0.9,
			openAIApiKey: config.getEnv('ai.openAIApiKey'),
		});
	}

	async prompt(prompt: string) {
		return await this.model.invoke([new HumanMessage(prompt)]);
	}

	async debugError(error: Error) {
		console.log(error);

		return await this.prompt('What is the weather in New York?');
	}
}
