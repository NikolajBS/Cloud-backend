import { Controller, Post, Body } from '@nestjs/common';
import { DeepaiService } from './deepai.service';

@Controller('deepai')
export class DeepaiController {
  constructor(private readonly deepaiService: DeepaiService) {}

  @Post('/generate-image')
  async generateImage(@Body() text: string): Promise<string> {
    const imageUrl = await this.deepaiService.generateImage(text);
    return imageUrl;
  }
}
