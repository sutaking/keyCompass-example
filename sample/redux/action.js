import fetchJsonp from 'fetch-jsonp'

const REQUEST_HEADER = 'https://app-api.ted.com/v1/';
const API_KEY = 'api-key=b26yxyqwkx8fmtuttfavssf6';

export function testJsonp() {
    var url = 'https://app-api.ted.com/v1/talks/ids.json?sort=popular&podcasts=true&api-key=b26yxyqwkx8fmtuttfavssf6';
    fetchJsonp(url)
      .then(function(response) {
        return response.json()
      }).then(function(data) {
        console.log('parsed data', data)
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })

};

