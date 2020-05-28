const request = require('postman-request');
const geocode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFobW91ZGV6eiIsImEiOiJja2FvMTBrOWcxMHRyMnJtdm5zYmZycDc2In0.f_karrx_rupFBk9g7J9VWA&limit=1`;

    request({url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to geocode API', undefined);
        }else if(!body.features.length){
            callback('Unable to find this location, Try another search', undefined);
        }else{
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;