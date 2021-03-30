## PLIR dockerized setup
THis project contains the dockerized setup for the [PLIR](https://wiki.openmrs.org/pages/viewpage.action?pageId=235278351) project.
see [PLIR archtecture](https://wiki.openmrs.org/display/projects/Architectural+Design+Approach+to+support+an+integrated+approach+to+patient-level+indicator+reporting+for+OpenMRS)

Ensure you have Docker and Docker compose installed locally.
See Docker Installation Instructions for your environment.  If running on Linux, check https://docs.docker.com/compose/install/ to install docker compose.

To run the project , follow the instructions below .
1. Clone the repository locally

        git clone https://github.com/openmrs/openmrs-plir-dockerized-setup.git

2. Move to the project root directory and spin up the pre-configured OpenMRS ,OpenHIM ,Hapi-Fhir and the streaming-binlog pipeline instances . 

       chmod +x run.sh ; ./run.sh

3. You should be able to acces the OpenMRS ,OpenHIM and Hapi-Fhir instances  at the following urls



| Instance  |     URL       | credentials (user : password)|
|---------- |:-------------:|------:                       |
| OpenMRS   |  http://localhost:8080/openmrs  | admin : Admin123 |
| OpenHIM   |    http://localhost:9000  |  root@openhim.org : openhim-password |
| Hapi FHir | http://localhost:8090 |    hapi : hapi123| 


> After Logging in OpenHIM  [see more](https://openhim.readthedocs.io/en/v1.4.0/getting-started.html), go to the Import/Export tab and import the Config-file inside the Config folder ie  `config/openhim-config.json` .

   Note:
 * The OpenMRS Instance is pre-loaded with CIEL and a  sample form (HIV_form) to collect TX_PVLS specific data

 * The above script also loads the necesary TX_PVLS Measure and Library Resources into the Hapi FHir . see the Resources under the `resources` folder.

  > The running Pipeline will listen to any  any data changes  added in to OpenMRS and route them to the FHIR server through OpenHIM.



  4. Invoke the **collect-data** FHIR Operation using the GET request below to generate the relevant Dataset for TX_PVLS


          GET: http://localhost:8090/fhir/Measure/TX-PVLS/$collect-data?periodStart=<date>&periodEnd=<date>
   

  5. Invoke the  **evaluate-measure** FHIR Operation using the GET request below for the  indicator calculation based on CQL evaluation

         GET: http://localhost:8090/fhir/Measure/TX-PVLS/$evaluate-measure?periodStart=<date>&periodEnd=<date> 
         
   Note : substitute `<date>` in the GET request with your actual date parameter  .     

