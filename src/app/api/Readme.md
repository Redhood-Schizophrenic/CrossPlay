# API Requests

----------------------------------------------------------------------------------
###### 1. Sales Dashboard
http://localhost:3000/api/dashboard/sales
`GET`


###### 2. Add Session (Playstation)
http://localhost:3000/api/playstation/add
`POST`
```json
{
    "customer_name": "Test",
    "customer_contact": "9090909090",
    "device_id": "<id: k7rq7ulnq5w4d7i>",
    "date": "9 September 2024",
    "hours": 2,
    "in_time": "09:00",
    "out_time": "10:00",
    "no_of_players": 2,
    "snacks": 10
}
```


###### 3. Add Session (PC-Gaming)
http://localhost:3000/api/pc_gaming/add
`POST`
```json
{
    "customer_name": "Shashank",
    "customer_contact": "9090909090",
    "device_id": "<id: k7rq7ulnq5w4d7i>",
    "date": "9 September 2024",
    "hours": 2,
    "in_time": "09:00",
    "out_time": "10:00",
    "no_of_players": 1,
    "snacks": 25
}
```

###### 4. Extend Session(Playstation)
http://localhost:3000/api/playstation/extend
`PUT`
```json
{
    "session_id": "<id: qvrnuv373i7nl5g>",
    "minutes": 15,
    "in_time": "09:00",
    "out_time": "12:00" 
}
```

###### 5. Extend Session(PC-Gaming) 
http://localhost:3000/api/pc_gaming/extend
`PUT`
```json
{
    "session_id": "<id: mvi62gzt581g4xy>",
    "hours": 0.5,
    "in_time": "09:00",
    "out_time": "12:00" 
}
```

###### 6. Update Session(Playstation)
http://localhost:3000/api/playstation/update
`PATCH`
```json
{
    "session_id": "<id: qvrnuv373i7nl5g>",
    "customer_name": "Test",
    "customer_contact": "9090909090",
    "device_id": "<id: k7rq7ulnq5w4d7i>",
    "date": "9 September 2024",
    "hours": 2,
    "in_time": "09:00",
    "out_time": "10:00",
    "no_of_players": 1,
    "snacks": 10,
    "player_type": "Single",
    "session_price": 150,
    "total_price": 160
}
```

###### 7. Update Session(PC-Gaming)
http://localhost:3000/api/pc_gaming/update
`PATCH`
```json
{
    "session_id": "<id: mvi62gzt581g4xy>",
    "customer_name": "Test",
    "customer_contact": "9090909090",
    "device_id": "<id: k7rq7ulnq5w4d7i>",
    "date": "9 September 2024",
    "hours": 2,
    "in_time": "09:00",
    "out_time": "10:00",
    "no_of_players": 1,
    "snacks": 10,
    "player_type": "Single",
    "session_price": 150,
    "total_price": 160
}
```

###### 8. Close Session(Playstation)
http://localhost:3000/api/playstation/close
`PUT`
```json
{
    "session_id": "<id: qvrnuv373i7nl5g>"
}
```

###### 9. Close Session(PC-Gaming)
http://localhost:3000/api/pc_gaming/close
`PUT`
```json
{
    "session_id": "<id: mvi62gzt581g4xy>"
}
```
----------------------------------------------------------------------------------
