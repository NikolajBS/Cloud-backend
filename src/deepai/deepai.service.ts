import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DeepaiService {
  async generateImage(text: string): Promise<string> {
    // Make a POST request to the DeepAI API
    const response = await axios.post('https://api.deepai.org/text2img', {
      text: text,
    }, {
      headers: {
        'api-key': '747e0cdc-43f6-4f28-8c4c-2171d466ec6e',
      },
    });

    // Extract the image URL from the response
    const imageUrl = response.data.output_url;

    return imageUrl;
  }
}