/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wdb5uic0385wfg")

  // update
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
        "Open",
        "Closed"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wdb5uic0385wfg")

  // update
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
        "Closed"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
