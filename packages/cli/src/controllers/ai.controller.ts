import { Authorized, Post, RestController } from '@/decorators';
import { AIRequest } from '@/requests';
import { AIService } from '@/services/ai.service';

@Authorized()
@RestController('/ai')
export class AIController {
	constructor(private readonly aiService: AIService) {}

	/**
	 * Update the logged-in user's settings.
	 */
	@Post('/debug-error')
	async debugError(req: AIRequest.DebugError): Promise<string> {
		const payload = req.body;
		// const { id } = req.user;

		const result = await this.aiService.debugError(payload.error);
		console.log(payload, result);

		return 'Example';
	}
}
