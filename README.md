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


> After Logging in OpenHIM  [see more](https://openhim.readthedocs.io/en/v1.4.0/getting-started.html), go to the Export/Import tab and import the config-file inside the `config` folder ie  `config/openhim-config.json` .

   Note:
 * The OpenMRS Instance is pre-loaded with CIEL and a  sample form (HIV_form) to collect TX_PVLS specific data

 * The above script also loads the necesary TX_PVLS Measure and Library Resources into the Hapi FHir . see the Resources under the `resources` folder.

  > The running Pipeline will listen to any  any data changes  added in to OpenMRS and route them to the FHIR server through OpenHIM.



  4. Invoke the **collect-data** FHIR Operation using the GET request below to generate the relevant Dataset for TX_PVLS


          GET: http://localhost:8090/fhir/Measure/TX-PVLS/$collect-data?periodStart=<date>&periodEnd=<date>
   

  5. Invoke the  **evaluate-measure** FHIR Operation using the GET request below for the  indicator calculation based on CQL evaluation

         GET: http://localhost:8090/fhir/Measure/TX-PVLS/$evaluate-measure?periodStart=<date>&periodEnd=<date> 
         
  > Note : substitute `<date>` in the GET request with your actual date parameter  .  

   6. You can use a (plir-widget)[https://github.com/mozzy11/plir-widget] innitially develeoped by the bahmni team , to easily query and  visualise the Measure report generated from the HAPI-FHIR server .
   
* install the [http-server](https://www.npmjs.com/package/http-server)  .
 see inginix (proxy) config under  `plir-widget/config/nginx.conf`  . 
* To run the widget , run the command below from the root directory



          chmod +x run-widget.sh ; ./run-widget.sh  


 * you should be able to access the widget at `http://localhost:7000/` .

>  Procede to select the measure  TX-PVLS ,
      select the start date and generate the report using the widget
      


 7. To remove and clean out all created containers and volumes, run

          chmod +x stop.sh ; ./stop.sh

#Main Repositories
* Hapi FHir for OpenMRS PLIR https://github.com/openmrs/openmrs-contrib-plm-fhir-server
* Analytics Engine Pipeline   https://github.com/GoogleCloudPlatform/openmrs-fhir-analytics

