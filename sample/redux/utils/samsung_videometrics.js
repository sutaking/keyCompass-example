function trackStreamStart(talkId) {
    //build the postbody to send
    var postbody = {
            "event": {
                "location": document.location.href,
                "model": "talks",
                "format": "mp4",
                "service": "samsung_tizen_player",
                "env": "production",
                "talk_id": talkId,
                "language": "en",
                "platform": "Samsung IPTV",
                "channel": "Samsung Tizen",
                "quality": 950,
                "apikey": "vtPi1CAZ0kvk7511341NaOdToiG3768O",
                "user_agent": navigator.userAgent
            }
        };

    //send the event to VideoMetrics
    $.ajax({
        'url': "https://metrics.ted.com/v1/events",
        'type': "POST",
        'dataType': 'json',
        'data': postbody,
    }).then(function(data) {
        console.log("Video metrics capture complete");
    }, function(xhr,status) {
    	//this may trigger even in success case - CORS-related errors should be ignored
         console.log("Video metrics capture complete");
    })
}