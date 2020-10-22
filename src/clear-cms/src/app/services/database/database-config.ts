import { DBConfig } from 'ngx-indexed-db';

export const DB_NAME = 'clear_cms';
export const storeNames = [
  'contentType',
  'content',
  'fieldType',
];

export const dbConfig: DBConfig = {
  name: 'clear_cms',
  version: 1,
  objectStoresMeta: [{
    store: DB_NAME,
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
    ]
  }],
  migrationFactory: () => ({
    1: (db, transaction) => {
      for (const storeName of storeNames) {
        const store = transaction.objectStore(storeName);
        store.createIndex('alias', 'alias', { unique: false });
        store.createIndex('parentAlias', 'parentAlias', { unique: false });
      }
    },
  }),
};
