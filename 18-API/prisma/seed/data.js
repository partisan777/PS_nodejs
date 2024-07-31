const { Prisma } = require('@prisma/client');

const objectStatuses = [
  {
    description: 'new'
  },
  {
    description: 'active'
  },
  {
    description: 'on_consideration'
  },
  {
    description: 'deleted'
  },
  {
    description: 'disable'
  },
];

const userRoles = [
  {
    description: 'admin'
  },
  {
    description: 'user'
  },
  {
    description: 'shipper'
  },
  {
    description: 'storekeeper'
  },
];

const itemTypes = [
    {
        description: 'type1',
        objectStatusId: 2
    },
    {
        description: 'type2',
        objectStatusId: 2
    },
    {
        description: 'type3',
        objectStatusId: 2

    },
];

module.exports = {
    objectStatuses,
    userRoles,
    itemTypes
};
