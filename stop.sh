echo " >>>>>>>>  CLEANING UP EXISTING CONTAINERS "
docker-compose -f docker/docker-compose.yml down  --remove-orphans

docker-compose -f docker/pipeline-compose.yml down  --remove-orphans

docker-compose -f plir-widget/docker-compose.yml down --remove-orphans

docker system prune --volumes