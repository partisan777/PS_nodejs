const { PrismaClient } = require('@prisma/client');
const { objectStatuses, userRoles, itemTypes } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.objectStatusModel.deleteMany();
    console.log('Deleted records in objectStatuses table');

    await prisma.userRoleModel.deleteMany();
    console.log('Deleted records in userRoles table');

    await prisma.itemTypeModel.deleteMany();
    console.log('Deleted records in itemTypes table');

    await prisma.$queryRaw`ALTER SEQUENCE public."ObjectStatusModel_id_seq" MINVALUE 1 START 1 RESTART WITH 1;`;
    console.log('reset ObjectStatusesModel auto increment to 1');

    await prisma.$queryRaw`ALTER SEQUENCE public."ItemTypeModel_id_seq" MINVALUE 1 START 1 RESTART WITH 1;`;
    console.log('reset UserRolesModel auto increment to 1');

    await prisma.$queryRaw`ALTER SEQUENCE public."UserRoleModel_id_seq" MINVALUE 1 START 1 RESTART WITH 1;`;
        console.log('reset ItemTypesModel auto increment to 1');

    await prisma.objectStatusModel.createMany({
      data: objectStatuses,
    });
    console.log('Added object Statuses data');

    await prisma.userRoleModel.createMany({
      data: userRoles,
    });
    console.log('Added user role data');

    await prisma.itemTypeModel.createMany({
        data: itemTypes,
    });
    console.log('Added item types data');

    console.log('Added data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
