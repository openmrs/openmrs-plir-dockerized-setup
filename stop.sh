echo " >>>>>>>>  CLEANING UP EXISTING CONTAINERS "
docker-compose down  --remove-orphans

docker-compose -f pipeline-compose.yml down  --remove-orphans

docker system prune --volumes