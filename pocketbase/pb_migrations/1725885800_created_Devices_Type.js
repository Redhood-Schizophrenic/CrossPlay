/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "a63kzk7ovvr241w",
    "created": "2024-09-09 12:43:20.619Z",
    "updated": "2024-09-09 12:43:20.619Z",
    "name": "Devices_Type",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4nwxkjdz",
        "name": "Name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "lqw0wxbc",
        "name": "Description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_LiIfOXz` ON `Devices_Type` (`Name`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("a63kzk7ovvr241w");

  return dao.deleteCollection(collection);
})
