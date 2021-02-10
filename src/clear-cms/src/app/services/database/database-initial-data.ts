import { Database } from './models/database.model';

export const DEFAULT_DATA: Database = {
  dataType: [
    {
      alias: 'text',
      sortOrder: 0,
      name: 'Text',
      type: 'string',
      editor: 'text',
    },
    {
      alias: 'longText',
      sortOrder: 1,
      name: 'Long text',
      type: 'string',
      editor: 'text',
    },
  ],
  contentType: [
    {
      alias: 'node',
      sortOrder: 0,
      properties: [],
    },
    {
      alias: 'page',
      parentAlias: 'node',
      sortOrder: 1,
      templateAlias: 'master',
      properties: [
        {
          alias: 'header',
          dataTypeAlias: 'text'
        },
        {
          alias: 'description',
          dataTypeAlias: 'longText'
        }
      ],
      templateMapping: [
        { slot: 'header', propertyAlias: 'header' },
        { slot: 'description', propertyAlias: 'description' },
      ],
    },
  ],
  content: [
    {
      alias: 'home',
      sortOrder: 0,
      title: 'My Simple Site',
      urlFragment: '',
      contentTypeAlias: 'page',
      properties: {
        description: 'This site is empty. Visit /admin and start adding pages'
      },
    },
  ],
  template: [
    {
      alias: 'master',
      sortOrder: 0,
      content: `<!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>{{title}}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="favicon.ico">
      </head>
      <body>
        {{TEMPLATE.CONTENT}}
      </body>
      </html>`
    },
    {
      alias: 'home',
      sortOrder: 1,
      parentAlias: 'master',
      content: `<h1>{{header}}</h1>
      <br>
      <span>{{description}}</span>`
    }
  ]
};
