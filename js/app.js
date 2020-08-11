const API_KEY = '46881344'
const SESSION_ID = '2_MX40Njg4MTM0NH5-MTU5NzE2ODAxMTczOX5KY2ZUbFpDU3AxNnBJY012b0ZmSXZ1eC9-fg'
const TOKEN = 'T1==cGFydG5lcl9pZD00Njg4MTM0NCZzaWc9OGRhOThmNmMzMWYyMWQ3ZWU3NGI3OWE4OTg3ODg5NWRmMDMyNzc3MzpzZXNzaW9uX2lkPTJfTVg0ME5qZzRNVE0wTkg1LU1UVTVOekUyT0RBeE1UY3pPWDVLWTJaVWJGcERVM0F4Tm5CSlkwMTJiMFptU1haMWVDOS1mZyZjcmVhdGVfdGltZT0xNTk3MTY4MDM3Jm5vbmNlPTAuMzY3NTMyNjUwNzIyMDcwNjQmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU5OTc2MDAzNiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=='

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
        alert(error.message);
    }
}

initializeSession();

function initializeSession() {
    const session = OT.initSession(API_KEY, SESSION_ID);

    // Subscribe to a newly created stream

    // Create a publisher
    const publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%',
    }, handleError);

    session.connect(TOKEN, function (error) {
        if (error) {
            handleError(error);
        } else {
            session.publish(publisher, handleError);
        }
    });

    session.on('streamCreated', function (event) {
       session.subscribe(event.stream, 'subscriber', {
           insertMode: 'append',
           width: '100%',
           height: '100%',
       }, handleError);
    });
}
