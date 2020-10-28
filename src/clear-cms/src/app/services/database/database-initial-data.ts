import { Database } from './models/database.model';

export const DEFAULT_DATA: Database = {
  dataType: [
    {
      alias: 'longText',
      name: 'Long text',
      type: 'string',
    },
  ],
  contentType: [
    {
      alias: 'node',
      properties: [],
      template: ''
    },
    {
      alias: 'page',
      parentAlias: 'node',
      properties: [
        {
          alias: 'description',
          dataTypeAlias: 'longText'
        }
      ],
      template: '<h1>{{title}}</h1><br><span>{{description}}</span>',
    },
  ],
  content: [
    {
      alias: 'home',
      title: 'My Simple Site',
      urlFragment: '',
      contentTypeAlias: 'page',
      properties: {
        description: 'This site is empty. Visit /admin and start adding pages'
      },
    },
  ],
};
