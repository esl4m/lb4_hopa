import { get, param } from '@loopback/rest';
import { inject } from '@loopback/context';
import { AuthenticationBindings, UserProfile, authenticate } from '@loopback/authentication';

export class FireController {
  constructor(@inject(AuthenticationBindings.CURRENT_USER) private user: UserProfile, ) {
  }

  @authenticate('BasicStrategy')  // protecting the /fire endpoint with the 'basic strategy' authentication
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
