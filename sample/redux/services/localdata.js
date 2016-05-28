'use strict';

app.factory('localData', ['CONSTANT', 'tedStorage', appLocalDataService]);

function appLocalDataService(CONSTANT, tedStorage) {

    function getLastResumeTalk() {
        var result = '';
        if (!isResumeListEmpty()) {
            var i = 0;
            do {
                result = getLocalStorage(CONSTANT.KEY_PALYER_HISTORY)[i++];
            } while (result && (result.talk.isWatchEnd === true || isMyTalk(result.talk.id)));
        }
        return result;
    }

    function getLocalStorage(key) {
        var aArray = tedStorage.getObject(key);
        return aArray.hasOwnProperty(length) ? aArray : [];
    }

    function isMyTalk(talkId) {
        var aArray = getLocalStorage(CONSTANT.KEY_MYTALKS);
        for (var i = 0; i < aArray.length; i++) {
            if (aArray[i].talk.id === talkId) {
                return true;
            }
        }
        return false;
    }

    function cleanResumeList() {
        var aArray = getLocalStorage(CONSTANT.KEY_PALYER_HISTORY);
        var newArray = [];
        for (var i = 0; i < aArray.length / 3; i++) {
            newArray[i] = aArray[i];
        }
        tedStorage.setObject(CONSTANT.KEY_PALYER_HISTORY, newArray);
    }

    function isResumeListEmpty() {
        var aArray = getLocalStorage(CONSTANT.KEY_PALYER_HISTORY);
        return !aArray.hasOwnProperty(length);
    }

    function saveData(key, data) {
        var currentUsageRate = tedStorage.calcuateStorageSpace() / CONSTANT.MAX_SIZE_LOCAL_STORAGE;
        if (currentUsageRate < CONSTANT.MAX_RATE) {
            tedStorage.setObject(key, data);
        } else {
            // clear resume talk list
            cleanResumeList();
            saveData(key, data);
        }
    }

    function isWatched(talkId, callback) {
        if (talkId === CONSTANT.MIAGIC_CODE_ANYTHING) {
            return false;
        }
        var aArray = getLocalStorage(CONSTANT.KEY_PALYER_HISTORY);

        for (var i = 0; i < aArray.length; i++) {
            if (aArray[i].talk.id === talkId) {
                if (callback) {
                    callback(aArray[i]);
                }
                return true;
            }
            else if (aArray[i].talk.playlist_items_id === talkId) {
                return true;
            }
        }
        return false;
    }

    function addNewItem(data, key) {
        /*if (!data.photo_urls) {
            data.photo_urls = [data.images[1].image];
        }*/
        var aArray = getLocalStorage(key);
        aArray.unshift({talk: data});
        saveData(key, aArray);
    }

    function isPlayListData(data) {
        return data.hasOwnProperty('playlist_items') ? true : false;
    }

    function isPlayListVideo(data) {
        return data.type === CONSTANT.HISTORY_PLAYLIST ? true : false;
    }

    return {
        /*********   LocalStroage for data   ***********/
        isMyTalk: isMyTalk,
        getMyTalkList: function () {
            var lastTalk = getLastResumeTalk();
            var myTalkList = getLocalStorage(CONSTANT.KEY_MYTALKS);
            if (!lastTalk) {
                return myTalkList;
            }
            myTalkList.unshift(lastTalk);
            return myTalkList;
        },
        addMyTalkList: function (data) {
            var aArray = getLocalStorage(CONSTANT.KEY_MYTALKS);
            for (var i = 0; i < aArray.length; i++) {
                if (aArray[i].talk.id === data.talk.id) {
                    return;
                }
            }
            data.talk.isMyTalk = true;
            addNewItem(data.talk, CONSTANT.KEY_MYTALKS);
        },
        removeMyTalkList: function (talkId) {
            var aArray = getLocalStorage(CONSTANT.KEY_MYTALKS);
            for (var i = 0; i < aArray.length; i++) {
                if (aArray[i].talk.id === talkId) {
                    aArray.splice(i, 1);
                }
            }
            saveData(CONSTANT.KEY_MYTALKS, aArray);
        },
        /****Show Play Status****/
        isWatched: isWatched,
        isResumeListEmpty: isResumeListEmpty,
        isPlayListData: isPlayListData,
        isPlayListVideo: isPlayListVideo,
        /*addPlayListHistory: function (playlist, talk) {
            var aArray = getLocalStorage(CONSTANT.KEY_PALYER_HISTORY);
            for (var i = 0; i < aArray.length; i++) {
                if (aArray[i].talk.id === playlist.id && isPlayListVideo(aArray[i].talk)) {
                    var tempData = aArray[i];
                    tempData.talk.playtalk = talk;
                    aArray.splice(i, 1);
                    aArray.unshift(tempData);
                    saveData(CONSTANT.KEY_PALYER_HISTORY, aArray);
                    return;
                }
            }
            addNewItem({
                type: CONSTANT.HISTORY_PLAYLIST,
                id: playlist.id,
                name: 'playlist: ' + playlist.name,
                photo_urls: [{url: playlist.image}],
                playtalk: talk,
                playlist_items_id: talk.id,
                playlist_items: playlist.playlist_items
            }, CONSTANT.KEY_PALYER_HISTORY);
        },*/
        addPlayStatus: function (data) {
            if (data.id === CONSTANT.MIAGIC_CODE_ANYTHING || isPlayListData(data)) {
                return;
            }
            var aArray = getLocalStorage(CONSTANT.KEY_PALYER_HISTORY);
            for (var i = 0; i < aArray.length; i++) {
                if (aArray[i].talk.id === data.id) {
                    aArray.splice(i, 1);
                }
            }
            addNewItem(data, CONSTANT.KEY_PALYER_HISTORY);
        },
        updatePlayStatus: function (talkId, time, durationSec) {
            if (talkId === CONSTANT.MIAGIC_CODE_ANYTHING || isResumeListEmpty()) {
                return;
            }
            var aArray = getLocalStorage(CONSTANT.KEY_PALYER_HISTORY);
            var isEndValue = time / durationSec;
            for (var i = 0; i < aArray.length; i++) {
                if (aArray[i].talk.id === talkId) {
                    aArray[i].talk.currentPlayTime = time;
                    aArray[i].talk.durationSec = durationSec;
                    aArray[i].talk.isWatchEnd = (isEndValue > CONSTANT.MAX_RATE) ? true : false;
                } else if (aArray[i].talk.playlist_items_id === talkId) {
                    aArray[i].talk.playtalk.currentPlayTime = time;
                    aArray[i].talk.playtalk.durationSec = durationSec;
                }
            }
            saveData(CONSTANT.KEY_PALYER_HISTORY, aArray);
        },
        getPlaySeekTime: function (talkId, obj) {
            if (isResumeListEmpty()) {
                return;
            }
            var aArray = getLocalStorage(CONSTANT.KEY_PALYER_HISTORY);
            for (var i = 0; i < aArray.length; i++) {
                if (aArray[i].talk.id === talkId) {
                    return aArray[i].talk[obj];
                }
                else if (aArray[i].talk.playlist_items_id === talkId) {
                    return aArray[i].talk.playtalk[obj];
                }
            }
        }
    };
}