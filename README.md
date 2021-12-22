# express-demo

setup

```
$ make setup
```

動作確認

```
$ curl -X POST localhost:3000/users  -H "Accept: application/json" -H "Content-type: application/json" -d '{ "name" : "Alice" }'
$ curl -X GET localhost:3000/users  -H "Accept: application/json" -H "Content-type: application/json" | jq
```
