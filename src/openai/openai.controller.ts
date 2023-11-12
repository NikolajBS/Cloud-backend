
import { Body, Controller, Post } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('generate-text')
  async generateText(@Body() requestData: { prompt: string }): Promise<string> {
    const generatedText = await this.openAIService.generateText(requestData.prompt);

    return generatedText;
  }
}
