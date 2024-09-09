# 🚀 Backend Structure


```yaml
/
├── api/
│   └── playstation/
│       └── add/
│       └── update/
│       └── extend/
│       └── close/
│   └── pc_gaming/
│       └── add/
│       └── update/
│       └── extend/
│       └── close/
│       
│   └── dashboard/
│       └── sales/

```


# 🤖 MICROSERVICES API CALLS

----------------------------------------------------------------------------------

### Session 🔐

| Function                      | API Call                                                 | Method            |
| :------------------------     | :-----------------------------------------------         |:------------------|
| `Add Session (Playstation)`   |     http://localhost:3000/api/playstation/add            |   `POST`          |
| `Add Session (PC-Gaming)`     |     http://localhost:3000/api/pc_gaming/add              |   `POST`          |
| `Extend Session(Playstation)` |     http://localhost:3000/api/playstation/extend         |   `PUT`           |
| `Extend Session(PC-Gaming)`   |     http://localhost:3000/api/pc_gaming/extend           |   `PUT`           |
| `Update Session(Playstation)` |     http://localhost:3000/api/playstation/update         |   `PATCH`         |
| `Update Session(PC-Gaming)`   |     http://localhost:3000/api/pc_gaming/update           |   `PATCH`         |
| `Close Session(Playstation)`  |     http://localhost:3000/api/playstation/close          |   `PUT`           |
| `Close Session(PC-Gaming)`    |     http://localhost:3000/api/pc_gaming/close            |   `PUT`           |

----------------------------------------------------------------------------------


### Dashboard 🏠

| Function                      | API Call                                               | Method            |
| :------------------------     | :-----------------------------------------------       |:------------------|
| `Sales`                       |    http://localhost:3000/api/dashboard/sales           |   `POST`          |

----------------------------------------------------------------------------------
