import { repository } from '@loopback/repository';
import { Provider, inject, ValueOrPromise } from '@loopback/context';
import { Strategy } from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import { BasicStrategy } from 'passport-http';
import { UserRepository } from '../repositories';

const md5 = require('md5');

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
  ) { }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify.bind(this));
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  async verify(
    username: string,
    password: string,
    cb: (err: Error | null, user?: object | false) => void,  // replace UserProfile with object "datatype" for user
  ) {
    const user = await this.userRepository.findOne({ where: { username: username } });
    // find user by name & password
    if (user) {
      // console.log(password);
      if (md5(password) == user.password) {
        cb(null, user);  // when user is authenticated
      }
    } else {
      cb(null, false);  // when user not found
    }
  }
}
