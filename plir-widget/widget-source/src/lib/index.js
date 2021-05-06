
exports.fetchData = async function fetchData(url, json){
    let response = await fetch(url, {
        headers:{'Content-Type':'application/json'},
        body: json
    }) 
    let data = response.json()
    return data
}
