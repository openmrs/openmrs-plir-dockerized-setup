## PLIR JS widget for the Tx_PVLS Indicator

###How to run in development mode

     yarn install

     yarn start

### Build a widget bundle

This project uses Parcel to build and bundle all our .css and .js files into one index.css and index.js file that we can import into and use in any webpage.

In the package.json file you will find a widget script used to run this build

//package.json file

    "widget": "parcel build src/index.js -d bundle",

Run this script to build our files.

    yarn widget
You can now find the generated files in the bundle/ folder

Embedding widget

    <link rel="stylesheet" href="bundle/index.css">
</head>
    <body>
        <!-- SOME CONTENT -->

        <div id="tx-pvls-widget"></div>

        <!-- SOME MORE CONTENT -->

        
    
    <script src="bundle/index.js"></script>
    
    <script>
    <!-- configurable parameters-->
          //note that we use a proxy to handle CORS isuues
          window.fhirBaseUrl = "http://localhost:8899/fhir";
          window.hapiUser = "hapi";
          window.hapiPass = "hapi123";
     </script>
    </body>
</html>