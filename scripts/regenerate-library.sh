#!/bin/bash
data=`base64 resources/cql_logic.txt | tr -d '\n'`

cat ./resources/tx_pvls-library.json | 
jq '.content[0].data = "'"$data"'"' > temp.json && cp temp.json ./resources/tx_pvls-library.json

rm temp.json




