## Start dev Mongodb

```bash
sudo docker run --rm -d --name=mongo-0 -p 27017:27017  -v ${PWD}/data:/data mongo:5 mongod --replSet rs0 --dbpath /data
cp metas.json data/metas.json

sudo docker exec -it $CONTAINER_ID bash

mongo --eval 'rs.initiate({_id : "rs0", members: [ { _id: 0, host: "127.0.0.1:27017" } ] })'

mongoimport metas.json --jsonArray --db foxter --collection MetaObjects
```
