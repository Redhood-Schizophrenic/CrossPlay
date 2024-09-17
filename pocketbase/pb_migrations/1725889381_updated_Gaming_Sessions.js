/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wdb5uic0385wfg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "do2fpkd5",
    "name": "Date",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wdb5uic0385wfg")

  // remove
  collection.schema.removeField("do2fpkd5")

  return dao.saveCollection(collection)
})
