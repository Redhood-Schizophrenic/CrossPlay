/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wdb5uic0385wfg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c4lxji5h",
    "name": "Status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Booked",
        "Open"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wdb5uic0385wfg")

  // remove
  collection.schema.removeField("c4lxji5h")

  return dao.saveCollection(collection)
})
