const API_KEY = ''
const SESSION_ID = ''
const TOKEN = ''

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
