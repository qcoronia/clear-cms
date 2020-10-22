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
  objectStoresMeta: storeNames.map(storeName => ({
    store: storeName,
    storeConfig: { keyPath: 'alias', autoIncrement: true },
    storeSchema: [
      { name: 'parentAlias', keypath: 'parentAlias', options: { unique: false } },
    ]
  })),
  migrationFactory: () => ({
    1: (db, transaction) => {
      for (const storeName of storeNames) {
        const store = transaction.objectStore(storeName);
        store.createIndex('parentAlias', 'parentAlias', { unique: false });
      }
    },
  }),
};
