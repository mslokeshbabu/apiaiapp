var apiai = require('apiai');
var builder = require('botbuilder');
var restify = require('restify'); 
var apiairecognizer = require('api-ai-recognizer');

var app = apiai("492d3d2054ef4aa48870b83d351d09c5");

var options = {
    sessionId: '12345'
};

// Setup Restify Server
var server = restify.createServer();  
server.listen(process.env.port || process.env.PORT || 3978, function () {  
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector({  
    appId: 'b5092823-73e8-4e4c-b1c5-a26e11c7aa24',
    appPassword: 'tkknFAtXiAHXp8JT4QdEgEK'
});

server.post('/api/messages', connector.listen());

/*var connector = new builder.ConsoleConnector().listen();*/

var bot = new builder.UniversalBot(connector, { persistConversationData: true });

// recognizer
var recognizer = new apiairecognizer('492d3d2054ef4aa48870b83d351d09c5');

// intents
var intents = new builder.IntentDialog({recognizers: [recognizer]});

bot.dialog('/', intents);

// Welcome Dialog
var MainOptions = {
    Shop: 'Search Candidates',
    Support: 'Update Candidate Status'
};

intents.onBegin(
    function (session, args, next) {
            msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(session)
                    .title("Welcome to Meet Accenture Talent for Engagement (MATE)")
                    .subtitle("I am a Smart resource management Bot")
                    .text("The smart resource management Bot is a intelligent bot for PMs/SAs/TAs or TFS/Scheduler for resource management")
                    .images([
                        builder.CardImage.create(session, "https://thumbs.dreamstime.com/z/teamwork-handle-group-logo-22538327.jpg")
                    ])
                    .tap(builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Space_Needle"))
                    .buttons([
                        builder.CardAction.imBack(session, session.gettext(MainOptions.Shop), MainOptions.Shop),
                        builder.CardAction.imBack(session, session.gettext(MainOptions.Support), MainOptions.Support)
                    ])
            ]);
            session.send(msg);
            
            session.send('Hi Sam! How can I help today.. ');
            session.send('Candidates search : eg : I am searching for candidates with Hadoop skiils:');
       }
);

var technology = "";
var location = "";
var leadtime = "";
var level = "";

intents.matches('searchcandidates', [
    function(session, args, next){
        session.send('Inside search candidates........%s',session.message.text);
        
        var request = app.textRequest(session.message.text, options);

        request.on('response', function (response, results){

             console.log('Inside apiai function with action', response.result.actionIncomplete);
             console.log (response['result']['contexts'][0].parameters.technology);

             if (response.result.actionIncomplete === true){
            
                console.log('inside the results');

                var tech = response['result']['contexts'][0].parameters.technology;
                console.log('tech',response['result']['contexts'][0].parameters.technology);

                var loc = response.result.parameters.location;
                console.log('loc', response.result.parameters.location);

                if (!tech) {

                    builder.Prompts.text(session, response.result.fulfillment.speech);

                } else {
                
                    console.log ('we are jhere');
                    console.log(session.message.text);
                    builder.Prompts.text(session, response.result.fulfillment.speech);
                }
            } else {

                builder.Prompts.text(session, response.result.fulfillment.speech);

            }
        });

        request.on('error', function(error) {
            console.log(error);
        });
        
        request.end();
    },
    function(session,results,next){

        console.log('The session data is', session.message.text);
        var request = app.textRequest(session.message.text, options);

        request.on('response', function(response, results) {

            var tech = response.result.contexts[0].parameters.technology;
            var loc = response.result.contexts[0].parameters.location;
            var level = "";

            console.log('The context tech data is', response.result.contexts[0].parameters.technology);
            console.log('The context loc data is', response.result.contexts[0].parameters.location);
            
            console.log('The context data is', response.result.contexts[0].parameters.level);
            level = response.result.contexts[0].parameters.level;
            // session.send(response.result.fulfillment.speech);
            builder.Prompts.text(session, response.result.fulfillment.speech);

        });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();
       
    },
    function(session,results,next){

        console.log('The 2 nd session data is', session.message.text);
        var request = app.textRequest(session.message.text, options);

        request.on('response', function(response, results) {

            var tech = response.result.contexts[0].parameters.technology;
            var loc = response.result.contexts[0].parameters.location;

            // session.send(response.result.fulfillment.speech);
            builder.Prompts.text(session, response.result.fulfillment.speech);
            
        });
        request.on('error', function(error) {
            console.log(error);
        });

        request.end();
    },
    function(session,results){

        console.log('The 3rd session data is', session.message.text);
        var request = app.textRequest(session.message.text, options);

        request.on('response', function(response, results) {

            var tech = response.result.contexts[0].parameters.technology;
            var loc = response.result.contexts[0].parameters.location;
            // session.send(response.result.fulfillment.speech);
            builder.Prompts.text(session, response.result.fulfillment.speech);
        });
        request.on('error', function(error) {
            console.log(error);
        });

        request.end();
    }
]);

intents.matches('smalltalk.greetings', function(session, args){
    session.send('Inside small talk');
    var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');

    if (fulfillment){
        var speech = fulfillment.entity;
        session.send(speech);
    } else {
        session.send('sorry ... not sure how to respond');
    }
});

intents.onDefault(function(session){
    session.send('Sorry can you rephrase...');
    var pythonshell = require ('python-shell');

    pythonshell.run ('my_script.py', function(err, results){
        if (err){
            throw err;
        }
        console.log('The script is run:', results);
    });
});
