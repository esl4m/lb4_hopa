import {Model, model, property} from '@loopback/repository';

@model()
export class Hopadb extends Model {
  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;


  constructor(data?: Partial<Hopadb>) {
    super(data);
  }
}
