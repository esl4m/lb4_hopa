import { Client, expect } from '@loopback/testlab';
import { HopaApplication } from '../..';
import { setupApplication } from './test-helper';

describe('FireController', () => {
  let app: HopaApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /fire', async () => {
    // console.log(client);
    const res = await client.get('/fire').auth('eslam2', '123').expect(200);
    console.log(res);
    expect(res.text).to.containEql('fire test //  me !');
  });
});
