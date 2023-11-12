import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private readonly openai: OpenAI;

  constructor(){
    this.openai = new OpenAI({apiKey: "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"});
  }
  async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.openai.completions.create({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        n: 1,
        //size
      });
  
      // Extract the generated text from the response
      const generatedText = response.choices[0].text;
  
      // Log the generated text to the console
      console.log(generatedText);
  
      // Return the generated text
      return generatedText;
    } catch (error) {
      console.error('Error generating text:', error.message);
      throw new Error('Error generating text: ' + error.message);
    }
  }
}