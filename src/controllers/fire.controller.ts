// import {inject} from '@loopback/context';
import { get, param } from '@loopback/rest';

export class FireController {
  constructor() { }

  @get('/fire')
  fire(): string {
    return 'fire test //  me !';
  }

  @get('/greet', {
    responses: {
      '200': {
        description: 'greeting text',
        content: {
          'application/json': {
            schema: { type: 'string' },
          },
        },
      },
    },
  })
  greet(@param.query.string('name') name: string) {
    return `hello ${name}`;
  }
}
