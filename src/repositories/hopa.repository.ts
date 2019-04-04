import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Hopa } from '../models';
import { inject } from '@loopback/core';

export class HopaRepository extends DefaultCrudRepository<Hopa, typeof Hopa.prototype.id>
{
  constructor(@inject('datasources.db') dataSource: juggler.DataSource) {
    super(Hopa, dataSource);
  }
}
