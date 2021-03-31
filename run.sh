echo " >>>>>>>>  STARTING OPENHIM , OPENMRS , HAPI-FHIR "
docker-compose up -d  --remove-orphans

 sleep 4m

 openmrs_start_wait_time=0
  contenttype=$(curl -o /dev/null --head -w "%{content_type}\n" -X GET -u admin:Admin123 --connect-timeout 5 \
    --max-time 20 http://localhost:8080/openmrs/ws/fhir2/R4/metadata 2>/dev/null | cut -d ";" -f 1)
  until [[ ${contenttype} == "application/fhir+json" ]]; do
    sleep 60s
    echo  ">>>>> WAITING FOR OPENMRS SERVER TO START"
    contenttype=$(curl -o /dev/null --head -w "%{content_type}\n" -X GET -u admin:Admin123 --connect-timeout 5 \
      --max-time 20 http://localhost:8080/openmrs/ws/fhir2/R4/metadata 2>/dev/null | cut -d ";" -f 1)
    ((openmrs_start_wait_time += 1))
    if [[ ${openmrs_start_wait_time} == 20 ]]; then
      echo  "TERMINATING  AS OPENMRS TOOK TOO LONG TO START"
      exit 1
    fi
  done
  echo "............OPENMRS SERVER STARTED SUCCESSFULLY........"

hapifhir_start_wait_time=0
  contenttype=$(curl -o /dev/null --head -w "%{content_type}\n" -X GET -u hapi:hapi123 --connect-timeout 5 \
    --max-time 20 http://localhost:8090/fhir/metadata 2>/dev/null | cut -d ";" -f 1)
  until [[ ${contenttype} == "application/fhir+json" ]]; do
    sleep 60s
    echo  ">>>>> WAITING FOR HAPI FHIR SERVER TO START"
    contenttype=$(curl -o /dev/null --head -w "%{content_type}\n" -X GET -u hapi:hapi123 --connect-timeout 5 \
      --max-time 20 http://localhost:8090/fhir/metadata 2>/dev/null | cut -d ";" -f 1)
    ((hapifhir_start_wait_time += 1))
    if [[ ${hapifhir_start_wait_time} == 20 ]]; then
      echo  "TERMINATING AS HAPI-FHIR TOOK TOO LONG TO START"
      exit 1
    fi
  done
 echo "..........HAPI FHIR SERVER STARTED SUCCESSFULLY.............." 
 echo ">>>>>>> LOADING MEASURE AND LIBRARY RESOURCES INTO HAPI FHIR "
./load-resources.sh
 echo "........LOADED MEASURE AND LIBRARY RESOURCES INTO HAPI FHIR ......."

 echo ">>>>>> STARTING STREAMING PIPE LINE "
docker-compose -f pipeline-compose.yml up  
