## PLIR-Dockerized-Setup
THis project contains the dockerized setup for the [PLIR](https://wiki.openmrs.org/pages/viewpage.action?pageId=235278351) project.
see [PLIR archtecture](https://wiki.openmrs.org/display/projects/Architectural+Design+Approach+to+support+an+integrated+approach+to+patient-level+indicator+reporting+for+OpenMRS)

Ensure you have Docker and Docker compose installed locally.
See Docker Installation Instructions for your environment.  If running on Linux, check https://docs.docker.com/compose/install/ to install docker compose.

To run the project , folow the instructions below .
1. Clone the Repository locally

        git clone https://github.com/openmrs/openmrs-plir-dockerized-setup.git

2. Move to the project root directory and Spin Up the pre-configured OpenMRS ,OpenHIM and Hapi-Fhir instances . 

       docker-compose up

  
  
3. You should be able to acces the OpenMRS ,OpenHIM and Hapi-Fhir instances  at the following urls



| Instance  |     URL       | credentials (user : password)|
|---------- |:-------------:|------:                       |
| OpenMRS   |  http://localhost:8080/openmrs  | admin : Admin123 |
| OpenHIM   |    http://localhost:9000  |  root@openhim.org : openhim-password |
| Hapi FHir | http://localhost:8090 |    hapi : hapi123|




 After Logging into OpenHIM  [see more](https://openhim.readthedocs.io/en/v1.4.0/getting-started.html), Import the Config-file inside the Config folder ie     config/openhim-config.json .

 Note that the OpenMRS Instance above is pre-loaded with CIEL and comes with a sample form (TX_PVLS form) to collect TX_PVLS specific data


4. Load the necesary TX_PVLS [Measure](https://wiki.openmrs.org/display/projects/FHIR+Measure+Resources+For+PLIR) and [Library](https://wiki.openmrs.org/display/projects/Sample+FHIR+CQL+Libraries+for+the+Calculation+of+TX_PVLS) Resources into the Hapi FHir . 
you can load the resources directly from the resources folder directly using the loadResources script. run the command below from the project Root directory

       chmod +x * ; ./load-resources.sh

see how to [load the Resources](https://wiki.openmrs.org/display/projects/Steps+For+Testing+Calculation+of+TX-PVLS+Indicator+Using+CQL) into Hapi Fhir using PostMan client.


5. Spin up the streaming-debezium pipeline  . 


       docker-compose -f pipeline-compose.yml up


   Note that you run the above command from the root directory of the cloned repository.



   You can use the TX_PVLS form pre-loaded in the OpenMRS instance to capture TX_PVLS specific data

  6. The running Pipeline will listen to any  any data changes  added in to OpenMRS and route them to the FHIR server through OpenHIM.

  7. Invoke the **collect-data** FHIR Operation using the Get request below to generate the relevant Dataset for TX_PVLS


          GET: http://localhost:8090/fhir/Measure/TX-PVLS/$collect-data?periodStart=<date>&periodEnd=<date>

     see sample [here](https://wiki.openmrs.org/display/projects/Steps+For+Testing+Calculation+of+TX-PVLS+Indicator+Using+CQL)     

  8. Invoke the  **evaluate-measure** FHIR Operation using the Get request below for the  indicator calculation based on CQL evaluation

         GET: http://localhost:8090/fhir/Measure/TX-PVLS/$evaluate-measure?periodStart=<date>&periodEnd=<date>

       see sample resultset [here](https://wiki.openmrs.org/display/projects/Steps+For+Testing+Calculation+of+TX-PVLS+Indicator+Using+CQL)
