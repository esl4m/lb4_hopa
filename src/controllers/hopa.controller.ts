import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Hopa } from '../models';
import { HopaRepository } from '../repositories/hopa.repository';

export class HopaController {
  constructor(
    @repository(HopaRepository)
    public hopaRepository: HopaRepository,
  ) { }

  @post('/hopas', {
    responses: {
      '200': {
        description: 'Hopa model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Hopa } } },
      },
    },
  })
  async create(@requestBody() hopa: Hopa): Promise<Hopa> {
    return await this.hopaRepository.create(hopa);
  }

  @get('/hopas/count', {
    responses: {
      '200': {
        description: 'Hopa model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Hopa)) where?: Where,
  ): Promise<Count> {
    return await this.hopaRepository.count(where);
  }

  @get('/hopas', {
    responses: {
      '200': {
        description: 'Array of Hopa model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Hopa } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Hopa)) filter?: Filter,
  ): Promise<Hopa[]> {
    return await this.hopaRepository.find(filter);
  }

  @patch('/hopas', {
    responses: {
      '200': {
        description: 'Hopa PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() hopa: Hopa,
    @param.query.object('where', getWhereSchemaFor(Hopa)) where?: Where,
  ): Promise<Count> {
    return await this.hopaRepository.updateAll(hopa, where);
  }

  @get('/hopas/{id}', {
    responses: {
      '200': {
        description: 'Hopa model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Hopa } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Hopa> {
    return await this.hopaRepository.findById(id);
  }

  @patch('/hopas/{id}', {
    responses: {
      '204': {
        description: 'Hopa PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() hopa: Hopa,
  ): Promise<void> {
    await this.hopaRepository.updateById(id, hopa);
  }

  @put('/hopas/{id}', {
    responses: {
      '204': {
        description: 'Hopa PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() hopa: Hopa,
  ): Promise<void> {
    await this.hopaRepository.replaceById(id, hopa);
  }

  @del('/hopas/{id}', {
    responses: {
      '204': {
        description: 'Hopa DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.hopaRepository.deleteById(id);
  }
}
