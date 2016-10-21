import fetchJsonp from 'fetch-jsonp'

const REQUEST_HEADER = 'https://app-api.ted.com/v1/';
const REQUEST_TALKS = 'talks.json'
const API_KEY = '?api-key=b26yxyqwkx8fmtuttfavssf6';
const TALKS_FIELDS = '&fields=photo_urls,speaker_ids,media,media_profile_uris,next_talks_ids,name,languages,speakers,viewed_count';
const TALKS_SORT = '&sort=new';
const TALKS_ORDER = '&order=created_at:desc';
const TALKS_LIMIT = '&limit=20';
const PHOTO_URL = '&photo_url_sizes=615x461,800x600,1600x1200,original';

const GET_TALK_LISTS = 'GET_TALK_LISTS';
const GET_TALK = 'GET_TALK';

export const receiveData = data => ({ type: 'RECEIVE_TALKS', data: data });

export function fetchTalks() {
    //var url = 'https://app-api.ted.com/v1/talks/ids.json?sort=popular&podcasts=true&api-key=b26yxyqwkx8fmtuttfavssf6';
    const url = REQUEST_HEADER +REQUEST_TALKS+ API_KEY + TALKS_FIELDS + TALKS_SORT + TALKS_ORDER
    +TALKS_LIMIT+PHOTO_URL;
    return fetchJsonp(url)
      .then(res => res.json())
      .then(data => {
        //console.log('parsed data', data);
        dispatch(receiveData(data));
      }).catch(ex => {
        console.log('parsing failed', ex)
      })
};

export function updataTalkLists (index) {

    let data = {
      title: 'Automated playlist',
      name: 'Watch anything',
      more: '18:00 - 105k views - Jun 2016',
      url: require('../images/bkgrd_watch_anything.jpg')
    };
    let talks = [];
    for(let i=0; i < 30;i++) {
      talks.push(data);
    }
    return {
        type: 'GET_TALK_LISTS',
        index: index,
        talks: talks
    }
};



