echo '\033[31m Make sure you have redis-server and ttab library installed \033[0m'

ttab -t "redis-server" "redis-server"
ttab -t "node 1" "npm run start:node1"
ttab -t "node 2" "npm run start:node2"