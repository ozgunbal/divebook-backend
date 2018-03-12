# POST a dive
curl -H "Content-Type: application/json" -X POST -d '{"site": "Bodrum - Fener", "meter": 18, "minute": 40, "date": "2018-01-23T07:58:47.001Z"}' "http://localhost:3000/dives"
sleep 1
echo "\n"
# GET dives
curl localhost:3000/dives
# PUT a dive
curl -H "Content-Type: application/json" -X PUT -d '{"note": "Lahoz gördük"}'  "http://localhost:3000/dives/5a66ebd18477cc41f2ddce7c"
sleep 1
echo "\n"