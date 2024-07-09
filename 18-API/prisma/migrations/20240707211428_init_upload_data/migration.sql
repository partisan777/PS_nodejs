-- This is an empty migration.

INSERT INTO public."RowStatusModel" (id, description, status_number, "created_at", "updated_at") VALUES(nextval('"RowStatusModel_id_seq"'::regclass), 'new', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public."RowStatusModel" (id, description, status_number, "created_at", "updated_at") VALUES(nextval('"RowStatusModel_id_seq"'::regclass), 'active', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public."RowStatusModel" (id, description, status_number, "created_at", "updated_at") VALUES(nextval('"RowStatusModel_id_seq"'::regclass), 'on_consideration', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public."RowStatusModel" (id, description, status_number, "created_at", "updated_at") VALUES(nextval('"RowStatusModel_id_seq"'::regclass), 'deleted', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public."RowStatusModel" (id, description, status_number, "created_at", "updated_at") VALUES(nextval('"RowStatusModel_id_seq"'::regclass), 'disable', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public."UserRoleModel" (id, description, role_number, "created_at", "updated_at") VALUES(nextval('"UserRoleModel_id_seq"'::regclass), 'admin', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public."UserRoleModel" (id, description, role_number, "created_at", "updated_at") VALUES(nextval('"UserRoleModel_id_seq"'::regclass), 'user', 2,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public."UserRoleModel" (id, description, role_number, "created_at", "updated_at") VALUES(nextval('"UserRoleModel_id_seq"'::regclass), 'shipper', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public."UserRoleModel" (id, description, role_number, "created_at", "updated_at") VALUES(nextval('"UserRoleModel_id_seq"'::regclass), 'storekeeper', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO public."ItemTypeModel" (id, description, item_type_number, row_status_number, created_at, updated_at) VALUES(nextval('"ItemTypeModel_id_seq"'::regclass),  'type1', 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public."ItemTypeModel" (id, description, item_type_number, row_status_number, created_at, updated_at) VALUES(nextval('"ItemTypeModel_id_seq"'::regclass), 'type2' , 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public."ItemTypeModel" (id, description, item_type_number, row_status_number, created_at, updated_at) VALUES(nextval('"ItemTypeModel_id_seq"'::regclass), 'type3', 3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

