#!/bin/bash
data=`base64 resources/tx_curr_cql.txt | tr -d '\n'`

cat ./resources/tx_curr-library.json | 
jq '.content[0].data = "'"$data"'"' > temp.json && cp temp.json ./resources/tx_curr-library.json

rm temp.json