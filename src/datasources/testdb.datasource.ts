import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './testdb.datasource.json';

export class TestdbDataSource extends juggler.DataSource {
  static dataSourceName = 'testdb';

  constructor(
    @inject('datasources.config.testdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
