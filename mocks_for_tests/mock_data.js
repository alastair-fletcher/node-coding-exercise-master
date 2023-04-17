//=== mock Knack app schema with duplicate fields and views
const mockAppSchema = {
  name: 'Knack App Schema',
  versions: [
    {
      objects: [
        {
          fields: [
            { name: 'field1', type: 'string' },
            { name: 'field2', type: 'number' },
            { name: 'field2', type: 'number' },
          ],
        },
      ],
      scenes: [
        {
          views: [
            { name: 'view1', type: 'form' },
            { name: 'view2', type: 'list' },
            { name: 'view2', type: 'list' },
          ],
        },
      ],
    },
  ],
};

//=== mock Knack app schema with duplicate fields and views removed
const cleanMockAppSchema = {
  name: 'Knack App Schema',
  versions: [
    {
      objects: [
        {
          fields: [
            { name: 'field1', type: 'string' },
            { name: 'field2', type: 'number' },
          ],
        },
      ],
      scenes: [
        {
          views: [
            { name: 'view1', type: 'form' },
            { name: 'view2', type: 'list' },
          ],
        },
      ],
    },
  ],
};

module.exports = {
  mockAppSchema,
  cleanMockAppSchema,
};
