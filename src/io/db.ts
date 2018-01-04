import * as loki from 'lokijs';
export const db = new loki('appdb.json');

export const collection = <T extends object> (collectionName: string ) =>  db.addCollection<T>(collectionName);