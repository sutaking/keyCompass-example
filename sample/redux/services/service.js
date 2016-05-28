'use strict';

app.factory('tedData', ['$http', '$q', 'CONSTANT', 'localData', function ($http, $q, CONSTANT, localData) {

    var CATEGORY = CONSTANT.CATEGORY;

    var watchAnyingLoaderCounter = CONSTANT.DATA_LOAD_MAX_TIMES;

    function requestData(callback, requestUrl) {
        var deferred = $q.defer();

        var cancel = function (reason) {
            deferred.resolve(reason);
        };
        $http.jsonp(CONSTANT.TED_REQUEST_URL + requestUrl.json + CONSTANT.JSON_CALLBACK, {
            cache: true,
            timeout: deferred.promise,
            params: {
                'api-key': CONSTANT.USER_KEY,
                'fields': requestUrl.params,
                'sort': requestUrl.sort,
                'order': requestUrl.order,
                'offset': requestUrl.offset,
                'limit': requestUrl.limit,
                'language': requestUrl.languages,
                'filter': requestUrl.filter,
                'photo_url_sizes': requestUrl.photoUrlSizes,
            }
        }).success(function (response) {
            var data = requestUrl.types ? response[requestUrl.types] : response;
            if (requestUrl.types === CONSTANT.JSON_TYPE.TALKS) {
                for (var i = 0; i < data.length; i++) {
                    data[i].talk.isResumeWatched = false;
                    data[i].talk.isWatchEnd = localData.getPlaySeekTime(data[i].talk.id, CONSTANT.SEEK_TYPE.IS_WATCHED);
                    data[i].talk.isMyTalk = localData.isMyTalk(data[i].talk.id);
                    data[i].talk.currentPlayTime = 0;
                }
            }
            if (callback) {
                callback(data);
            }
            deferred.resolve(data);
        }).error(function () {
            callback(null, 'error');
        });
        return {
            cancel: cancel,
            promise: deferred.promise
        };
    }

    function fetchTalkById(talk, callback) {
        return localData.isPlayListData(talk) ? '' : requestData(callback, {
            types: CONSTANT.JSON_TYPE.TALK,
            json: 'talks/' + talk.id + '.json'
        });
    }

    function arrayShuffle(array) {
        for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
        return array;
    }

    return {
        /****** Request json ******/
        fetchCategoryList: function (type, callback, index, number) {
            var requestUrl = {
                types: CONSTANT.JSON_TYPE.TALKS,
                json: 'talks.json'
            };
            
            switch (type) {
                case CATEGORY.NEWEST_RELEASES:
                    requestUrl.params = CONSTANT.REQUEST_TALKS_PARAMS;
                    requestUrl.sort = CONSTANT.REQUEST_SORT;
                    requestUrl.order = CONSTANT.REQUEST_ORDER;
                    requestUrl.offset = index === -1 ? 3 : CONSTANT.NUMBER_EACH_LOAD * (index === undefined ? 0 : index);//CONSTANT.NUMBER_EACH_LOAD * (index || 0);
                    requestUrl.limit = number || CONSTANT.NUMBER_EACH_LOAD;
                    requestUrl.photoUrlSizes = CONSTANT.PHOTO_URL_SIZES;
                    break;
                case CATEGORY.MY_TALKS:
                    return callback(localData.getMyTalkList());
                case CATEGORY.TRENDING:
                    requestUrl.params = CONSTANT.REQUEST_TALKS_PARAMS;
                    requestUrl.sort = CONSTANT.REQUEST_TREND_SORT;
                    requestUrl.limit = CONSTANT.NUMBER_EACH_LOAD;
                    requestUrl.photoUrlSizes = CONSTANT.PHOTO_URL_SIZES;
                    break;
                case CATEGORY.PLAYLISTS:
                    requestUrl.types = CONSTANT.JSON_TYPE.PLAYLISTS;
                    requestUrl.json = 'playlists.json';
                    requestUrl.params = CONSTANT.REQUEST_PALYLISTS_PARAMS;
                    requestUrl.sort = CONSTANT.REQUEST_SORT;
                    requestUrl.order = CONSTANT.REQUEST_ORDER;
                    requestUrl.offset = CONSTANT.NUMBER_EACH_LOAD * index;
                    break;
            }
            return requestData(callback, requestUrl);
        },
        fetchSpeakerById: function (speakers, callback) {
            if (!speakers) {
                return;
            }
            return requestData(callback, {
                types: CONSTANT.JSON_TYPE.SPEAKERS,
                json: 'speakers/' + speakers[0] + '.json'
            });
        },
        fetchTalksInPlaylist: function (id, callback) {
            return requestData(callback, {
                types: CONSTANT.JSON_TYPE.TALKS,
                json: 'playlists/' + id + '/talks.json',
                params: CONSTANT.REQUEST_TALKS_PARAMS,
                sort: CONSTANT.REQUEST_SORT,
                order: CONSTANT.REQUEST_ORDER,
                limit: '100',
                photoUrlSizes: CONSTANT.PHOTO_URL_SIZES
            });
        },
        fetchRelatedTalks: function (nextArray, callback) {
            var nextData = [];
            var cb = function (response) {
                nextData.push({
                    talk: response
                });
                nextData.length === 3 && callback(nextData);
            };
            fetchTalkById({id: nextArray[0]}, cb);
            fetchTalkById({id: nextArray[1]}, cb);
            fetchTalkById({id: nextArray[2]}, cb);
        },
        fetchSubtitleByTalk: function (id, lang, callback) {
            return requestData(callback, {
                types: '',
                json: 'talks/' + id + '/captions.json',
                languages: lang
            });
        },
        fetchTalkById: fetchTalkById,
        addWatchAnything: function (data) {
            return data && data.unshift(CONSTANT.WATCH_ANYTHING_ITEM);
        },
        fetchWatchAnythingTalk: function (existingTalks, callback) {
            var talks = existingTalks;
            if (!talks) {// fetch more data from TED remote server
                this.fetchCategoryList(CATEGORY.NEWEST_RELEASES, function (response) {
                    arrayShuffle(response);
                    callback(response);
                }, watchAnyingLoaderCounter++);
            } else {
                arrayShuffle(talks);
                callback(talks);
            }
        }
    };
}]);