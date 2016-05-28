'use strict';

app.factory('CONSTANT', function () {
    var ITEM = {
        loaded: false
    };

    return {
        MAX_SIZE_LOCAL_STORAGE: 5 * 1024 * 1024,
        SEEK_TYPE: {
            IS_WATCHED: 'isWatchEnd',
            CURRENT_TIME: 'currentPlayTime'
        },
        DECOLLATOR: {
            STRIKE: '-',
            DOT: ' • ',
            COLON: ': ',
            BLANK: ' '
        },
        PLAYER_TYPE: {
            WATCH_ANYTHING: 0,
            PLAYLISTS: 1
        },
        WATCH_ANYTHING_ITEM: {
            talk: {
                id: 'gnihtynahctaw',
                name: 'Automated playlist : Watch anything',
                more: false,
                photo_urls: [{url: 'images/shelf_watch_anything.png'}],
                description: 'Do not know what to watch? We will decide for you, from our library of over 1700 talks.'
            }
        },
        HISTORY_PLAYLIST: 'plh',
        MAX_RATE: 0.98,
        PLAYER_RATES: ['1500k', '950k', '600k', '450k', '320k', '180k', '64k'],
        LENGTH_TALK_PROGRESS: 470,
        DEFAULT_LANGUAGE: 'en',
        DEPTH: {
            INDEX: 1,
            TALK: 2,
            PLAYLIST: 3,
            TALK_IN_PLAYLIST: 4,
            PLAYER: 5
        },
        CATEGORY: {
            NEWEST_RELEASES: 0,
            MY_TALKS: 1,
            TRENDING: 2,
            PLAYLISTS: 3,
            RELATED_TALK: 4,
            SHOW_PLAYLIST: 5,
            //TALKS_IN_PLAYLIST: 6
        },
        ITEM: ITEM,
        ITEM_BLANK: {
            isBlank: true
        },
        ITEMS: [ITEM, ITEM, ITEM],
        KEY_MYTALKS: 'STORAGE_MYTALK',
        KEY_PALYER_HISTORY: 'STORAGE_PLAY_HISTORY',
        WATCH_ANYTHING_BG: 'images/bkgrd_watch_anything.jpg',
        NUMBER_EACH_LOAD: 20,
        NUMBER_LOAD_WATCH: 50,
        THOUSAND: 1000,
        TEN: 10,
        HUNDRED: 100,
        HOUR: 3600,
        MINUTE: 60,
        MILLION: 1000000,
        TED_REQUEST_URL: 'https://api.ted.com/v1/',
        JSON_CALLBACK: '?&callback=JSON_CALLBACK',
        USER_KEY: 'b26yxyqwkx8fmtuttfavssf6',
        PHOTO_URL_SIZES: '615x461,800x600,1600x1200,original',//113x85,240x180,615x461,800x600,1600x1200,original
        REQUEST_TALKS_PARAMS: 'photo_urls,speaker_ids,media,media_profile_uris,next_talks_ids,name,languages,speakers,viewed_count',
        REQUEST_PALYLISTS_PARAMS: 'playlist_items,suggestions,attribution_data,duration_in_seconds,image,guest_curated,original_image',
        REQUEST_SORT: 'new',
        REQUEST_TREND_SORT: 'popular',
        REQUEST_ORDER: 'created_at:desc',
        REQUEST_ANYTHING_FILTER: '100',
        TITLE_PLAYLIST: 'Playlist',
        JSON_TYPE: {
            TALK: 'talk',
            TALKS: 'talks',
            PLAYLISTS: 'playlists',
            SPEAKERS: 'speaker'
        },
        DESC_LENGTH: {
            SUMMARY: 250,
            DETAIL: 600
        },
        TITLE_LENGTH: {
            SUMMARY: 60,
            DETAIL: 200
        },
        EFFECT_DELAY_TIME: 500,
        TIPS_DELAY_TIME: 1000,
        DATA_LOAD_MAX_TIMES: 4,
        SCROLL_HEIGHT_OF_INDEX: 369,//344
        SCROLL_HEIGHT_OF_TALK: -298,
        KEY_CODE: {
            SPACE: 32,
            RETURN: 10009,
            ESC: 27,
            EXIT: 10182,
            MEDIARE_WIND: 412,
            MEDIA_FAST_FORWARD: 417,
            MEDIA_PLAY: 415,
            MEDIA_PAUSE: 19,
            MEDIA_STOP: 413,
            MEDIA_TRACK_PREVIOUS: 10232,
            MEDIA_TRACK_NEXT: 10233,
            MEDIA_PLAY_PAUSE: 10252
        },
        CLASS_NAMES: {
            BTN: '.btn',
            BTN_PLAY: '.btn-play',
            BTN_RESUME: '.btn-resume',
            BTN_RESTART: '.btn-restart',
            BTN_ADD_MY_TALKS: '.btn-add-talks',
            BTN_REMOVE_MY_TALKS: '.btn-remove-talks',
            BTN_PLAYER_MY_TALKS: '.player_talks',
            BTN_PLAYER_MY_TALKS_ACTIVE: '.player_talks_active',
            BTN_ABOUT_SPEAKER: '.btn-about-speaker',
            BTN_ABOUT_TALK: '.btn-about-talk',
            VIDEO_INFORMATION: '.video-information',
            CONTROLS_BAR: '.controls-bar',
            SUBTITLE_BOTTOM: 'subtitle-bottom',
            SUBTITLE_MID: 'subtitle-mid',
            SUBTITLE: '#subtitle'
        },
        REPEAT_MODE: {
            ONE: 'one',
            OFF: 'off',
            ALL: 'all',
            SHUFFLE: 'shuffle'
        },
        FORWARD_INTERVAL: 15,
        MIAGIC_CODE_ANYTHING: 'gnihtynahctaw'
    };
}).factory('tedStorage', ['$window', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        },
        clear: function () {
            $window.localStorage.clear();
        },
        calcuateStorageSpace: function () {
            return JSON.stringify($window.localStorage).length;
        }
    };
}]).factory('tedUtility', ['CONSTANT', function (CONSTANT) {

    function tedDate(date) {
        var array = date.toUTCString().split(' ');
        return array[2] + ' ' + array[3];
    };
    function stringToHHMMSS(data) {
        var sec_num = parseInt(data + '', CONSTANT.TEN);
        var hours = Math.floor(sec_num / CONSTANT.HOUR);
        var minutes = Math.floor((sec_num - (hours * CONSTANT.HOUR)) / CONSTANT.MINUTE);
        var seconds = sec_num - (hours * CONSTANT.HOUR) - (minutes * CONSTANT.MINUTE);

        if (hours < CONSTANT.TEN) {
            hours = '0' + hours;
        }
        if (minutes < CONSTANT.TEN) {
            minutes = '0' + minutes;
        }
        if (seconds < CONSTANT.TEN) {
            seconds = '0' + seconds;
        }
        return [hours, minutes, seconds];
    };

    return {
        /*********   Convert data   ***********/
        convertDuration: function (duration) {
            if (!duration)
                return;
            var splitArray = duration.split(':');
            return splitArray[1] * 1 + ':' + splitArray[2];
        },
        convertViewedCount: function (count) {
            if (count < CONSTANT.THOUSAND) {
                return count;
            } else if (CONSTANT.THOUSAND <= count && count < CONSTANT.MILLION) {
                return Math.round((count / CONSTANT.THOUSAND) * CONSTANT.TEN) / CONSTANT.TEN + 'K';
            } else {
                return Math.round((count / CONSTANT.MILLION) * CONSTANT.TEN) / CONSTANT.TEN + 'M';
            }
        },
        convertPlaylistTotalDuration: function (duration) {
            var array = stringToHHMMSS(duration);
            return array[0] === '00' ? array[1] + 'm' : array[0] * 1 + 'h ' + array[1] * 1 + 'm';
        },
        convertDate: function (date) {
            var yymmdd = date.split(' ')[0].toString().split('-');
            return tedDate(new Date(yymmdd[0], yymmdd[1], yymmdd[2]));
        },
        convertToHHMMSS: function (sec) {
            var array = stringToHHMMSS(sec);
            return sec ? array[0] + ':' + array[1] + ':' + array[2] : '00:00:00';
        },
        convertSpeakers: function (speakers) {
            var speakersString = '';
            angular.forEach(speakers, function (value) {
                speakersString += ', ' + (value.speaker.firstname ? (value.speaker.firstname + CONSTANT.DECOLLATOR.BLANK + value.speaker.lastname) : value.speaker.name);
            });
            return speakersString && speakersString.substring(2);
        },
        convertPlaylistInfo: function (currentPlaylist, index) {
            return (index + 1) + ' of ' + currentPlaylist.length + ' talks • ' + currentPlaylist.totalDuration;
        },
        convertLanguages: function (languages) {
            var captionLanguages = [];
            languages && angular.forEach(languages, function (value, key) {
                captionLanguages.push({
                    language:{
                        language_code: key,
                        name: value.name
                    }
                });
            });
            return captionLanguages;
        },
        getSelectableObjectOfArray: function(array, targetIndex) {
            return array[targetIndex < array.length ? targetIndex : array.length - 1];
        }
    };
}]);