echo " >>>>>>>>  CLEANING UP EXISTING CONTAINERS "
docker-compose down  --remove-orphans

docker-compose -f pipeline-compose.yml down  --remove-orphans

docker-compose -f plir-widget/docker-compose.yml down --remove-orphans

docker system prune --volumes