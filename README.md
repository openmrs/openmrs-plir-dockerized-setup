## PLIR-Dockerized-Setup
THis project contains the dockerized setup for the [PLIR](https://wiki.openmrs.org/pages/viewpage.action?pageId=235278351) project.
see [PLIR archtecture](https://wiki.openmrs.org/display/projects/Architectural+Design+Approach+to+support+an+integrated+approach+to+patient-level+indicator+reporting+for+OpenMRS)

Ensure you have Docker and Docker compose installed locally.
See Docker Installation Instructions for your environment.  If running on Linux, check https://docs.docker.com/compose/install/ to install docker compose.

To run the project , folow the instractions below .
1. Clone the Repository locally

        `git clone https://github.com/openmrs/openmrs-plir-dockerized-setup.git`

2. Move to the project root directory and Spin Up the pre-configured OpenMRS ,OpenHIM and Hapi-Fhir instances . 

       `docker-compose up`

  
  
3. You should be able to acces the OpenMRS ,OpenHIM and Hapi-Fhir instances  at the following urls



| Instance  |     URL       | credentials (user : password)|
|---------- |:-------------:|------:                       |
| OpenMRS   |  http://localhost:8080/openmrs  | admin : Admin123 |
| OpenHIM   |    http://localhost:9000  |  root@openhim.org : openhim-password |
| Hapi FHir | http://localhost:8090d |    hapi : hapi123|




After Logging into OpenHIM  ([see more](https://openhimreadthedocs.io/en/v1.4.0/getting-started.html)), Import the Config-file inside the Config folder ie  config/openhim-config.json .

Note that the OpenMRS Instance above is pre-loaded with CIEL and comes with a sample form (TX_PVLS form) to collect TX_PVLS specific data


4. Load the necesary TX_PVLS [Measure](https://wiki.openmrs.org/display/projects/FHIR+Measure+Resources+For+PLIR) and [Library](https://wiki.openmrs.org/display/projects/Sample+FHIR+CQL+Libraries+for+the+Calculation+of+TX_PVLS) Resources into the Hapi FHir  . see how to [load the Resources](https://wiki.openmrs.org/display/projects/Steps+For+Testing+Calculation+of+TX-PVLS+Indicator+Using+CQL) into Hapi Fhir .


5. Spin up the streaming-debezium pipeline  . 


       docker-compose -f pipeline-compose.yml up


   Note that you run the above command from the root directory of the cloned repository.



   You can use the TX_PVLS form pre-loaded in the OpenMRS instance to capture TX_PVLS specific data

  6. The running Pipeline will listen to any  any data changes  added in to OpenMRS and route them to the FHIR server through OpenHIM.

7. Invoke the evaluate-measure and collect-data operation on the Hapi FHIR server  .See [here](https://wiki.openmrs.org/display/projects/Steps+For+Testing+Calculation+of+TX-PVLS+Indicator+Using+CQL) how to invoke the evaluate-measure and collect-data operation to generate the relevant Dataset for TX_PVLS and the actual indicator calculation based on CQL evaluation