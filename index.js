var apiai = require('apiai');
var builder = require('botbuilder');
var restify = require('restify'); 
var apiairecognizer = require('api-ai-recognizer');

// var dbconnect = require('./database_connect');
// var ttos = require('./texttospeech');
// // var ContextsRequest = require('./contexts_request').ContextsRequest;
 
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
    Shop: 'search candidates',
    Support: 'update candidate status'
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
            //  if (response.result.actionIncomplete == true ){
                
            //     builder.Prompts.text(session, response.result.fulfillment.speech);

            //     var request = app.textRequest(session.message.text, options);
            //     request.on('response', function (response, results){

            //         console.log('Inside apiai function ----3');
            //      });

            //     request.on('error', function(error) {
            //         console.log(error);
            //     });
            //  }
            console.log (response['result']['contexts'][0].parameters.technology);

            if (response.result.actionIncomplete === true){
            
                console.log('inside the results');

                var tech = response['result']['contexts'][0].parameters.technology;
                console.log('tech',response['result']['contexts'][0].parameters.technology);

                var loc = response.result.parameters.location;
                console.log('loc', response.result.parameters.location);

                if (!tech) {

                    // session.send(response.result.fulfillment.speech);
                    builder.Prompts.text(session, response.result.fulfillment.speech);

                    // var request = app.textRequest(session.message.text, options);

                    // request.on('response', function (response, results){ 
                    //     console.log (response['result']['contexts'][0].parameters.technology);
                    // });

                    // request.on('error', function(error) {
                    //     console.log(error);
                    // });
        
                    // request.end();

                } else {
                
                    // session.send(response.result.fulfillment.speech);
                    console.log ('we are jhere');
                    console.log(session.message.text);
                    builder.Prompts.text(session, response.result.fulfillment.speech);

                    // var request = app.textRequest(session.message.text, options);

                    // request.on('response', function (response, results){

                    //         console.log(response.result.parameters.location);
                    // });

                    // request.on('error', function(error) {
                    //     console.log(error);
                    // });
        
                    // request.end();

                }
                // var request = app.textRequest(session.message.text, options);
                // request.on('response', function (response, results){

                //      console.log('Inside apiai function with action', response.result.actionIncomplete);
                     
                //      if (response.result.actionIncomplete === false){
                //          checkwhile = 1;
                //      }

                // });
                // request.on('error', function(error) {
                //     console.log(error);
                //  });
                // request.end();
            } else {

                // session.send(response.result.fulfillment.speech);
                builder.Prompts.text(session, response.result.fulfillment.speech);

                // var request = app.textRequest(session.message.text, options);
                // request.on('response', function (response, results){ 
                //     console.log (response['result']['contexts'][0].parameters.level);
                // });

                // request.on('error', function(error) {
                //        console.log(error);
                // });
        
                // request.end();
            }
            // session.send(response.result.fulfillment.speech);
            // builder.Prompts.text(session, response.result.fulfillment.speech);

            // var request = app.textRequest(session.message.text, options);
            // request.on('response', function (response, results){ 
            //         console.log (response['result']['contexts'][0].parameters.leadtime);
            // });

            // request.on('error', function(error) {
            //         console.log(error);
            // });
        
            // request.end();
                       
        });

        request.on('error', function(error) {
            console.log(error);
        });
        
        request.end();

    //     technology = builder.EntityRecognizer.findEntity(args.entities, 'technology');
    //     location = builder.EntityRecognizer.findEntity(args.entities, 'location');
    //     leadtime = builder.EntityRecognizer.findEntity(args.entities, 'leadtime');
    //     level = builder.EntityRecognizer.findEntity(args.entities, 'level');

    //    session.dialogData.candidate = {
    //         technology : technology ? technology.entity : null,
    //         location : location ? location.entity : null,
    //         leadtime : leadtime ? leadtime.entity : null,
    //         level : level ? level.entity : null,
    //    }
    //next();
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
        // var request = app.textRequest(results.response, options);

        // request.on('response', function(response, results) {
            
        //     // ttos.texttospeech('playing this in audio');
        //     // console.log(results.contexts);
        //     // dbconnect.databaseConnect();
        //     console.log (response['result']['contexts'][0].parameters.technology);
        //     console.log (response['result']['contexts'][0].parameters.location);
        //     // console.log (response['result']['contexts'][0].parameters.level);
        // });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();
        
        // var loc = session.dialogData.candidate;
        // if (results.response){
        //     loc.location = results.response;
        // }
        // if (loc.location){
        //     builder.Prompts.text(session, 'Please specify level');
        // } else {
        // }
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
        // var request = app.textRequest(results.response, options);

        // request.on('response', function(response, results) {
            
        //     // ttos.texttospeech('playing this in audio');
        //     // console.log(results.contexts);
        //     // dbconnect.databaseConnect();
        //     console.log (response['result']['contexts'][0].parameters.technology);
        //     console.log (response['result']['contexts'][0].parameters.location);
        //     // console.log (response['result']['contexts'][0].parameters.level);
        // });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();
        
        // var loc = session.dialogData.candidate;
        // if (results.response){
        //     loc.location = results.response;
        // }
        // if (loc.location){
        //     builder.Prompts.text(session, 'Please specify level');
        // } else {
        // }
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
        // var request = app.textRequest(results.response, options);

        // request.on('response', function(response, results) {
            
        //     // ttos.texttospeech('playing this in audio');
        //     // console.log(results.contexts);
        //     // dbconnect.databaseConnect();
        //     console.log (response['result']['contexts'][0].parameters.technology);
        //     console.log (response['result']['contexts'][0].parameters.location);
        //     // console.log (response['result']['contexts'][0].parameters.level);
        // });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();
        
        // var loc = session.dialogData.candidate;
        // if (results.response){
        //     loc.location = results.response;
        // }
        // if (loc.location){
        //     builder.Prompts.text(session, 'Please specify level');
        // } else {
        // }
    }
]);

intents.matches('searchtechnology', [
    function(session, args, next){
         session.send('Inside search candidates technology');
         technology = builder.EntityRecognizer.findEntity(args.entities,'techology');
        //  location = session.dialogData.candidate.location;
        
         if (!technology){
               builder.Prompts.text(session, 'Please specify technology');
         } 
         next();
    },
    function(session, results, next){
        if (results.response){
            session.dialogData.candidate.technology = results.response;
            console.log ('Testing ......'+ response['result']['contexts'][0].parameters.technology);
        }
        if (!(response['result']['contexts'][0].parameters.location)){
            builder.Prompts.text(session, 'Please specify Location');
        }
    }
]);

intents.matches('searchlocation', [
    function(session, args, next){
         session.send('Inside search candidates location');
        //  var technology = session.dialogData.candidate.technology;
         location = builder.EntityRecognizer.findEntity(args.entities, 'location');
         
         if (!location){
             builder.Prompts.text(session, 'Please specify location');
         }
         next();
    },
    function(session, results, next){
        if (results.response){
            session.dialogData.candidate.location = results.response;
        }
        // if (!session.dialogData.candidate.level){
            builder.Prompts.text(session, 'Please specify level');
            next();
        // }
    }
]);

intents.matches('searchcandidatelevel', [
    function(session, args, next){
         session.send('Inside search candidate level');
         level = builder.EntityRecognizer.findEntity(args.entities,'level');
        //  var leadtime = session.dialogData.candidate.leadtime;
    
         if (!level){
             builder.Prompts.text(session, 'Please specify level once again!');
         }
         next();
    },
    function(session,results, next){
        if (results.response){
            session.dialogData.candidate.level = results.response;
        }
        // if (!leadtime){
            builder.Prompts.text(session, 'Please specify start date');
            next();
        // }
    }
]);

intents.matches('searchcandidatestartdate', [
    function(session, args, next){
         session.send('Inside search candidate start date');
        //  var technology = session.dialogData.candidate.technology;
        //  var location = session.dialogData.candidate.location;
         leadtime = builder.EntityRecognizer.findEntity(args.entities, 'leadtime');
        //  var level = session.dialogData.candidate.level;
                  
         if (!leadtime){
             builder.Prompts.text(session, 'Please specify Leadtime once again!');
         }
         next ();
    },
    function(session, results){
        var lt = session.dialogData.candidate;
        if(results.response){
            lt.leadtime = results.response;
        }
        console.log ('All done');
        console.log (response['result']['contexts'][0].parameters.technology);
        // session.send('lead time is %s: ', lt.leadtime);
        // if (technology && location && level && leadtime){
            // session.send('got all information'+ session.dialogData.candidate.leadtime +'location'+ session.dialogData.candidate.location);
        // }
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



// var request = app.textRequest('search for java candidates in bangalore', options);

// console.log('The request is');

// request.on('response', function(response, results) {
    
//     // ttos.texttospeech('playing this in audio');
//     // console.log(results.contexts);
//     // dbconnect.databaseConnect();
//     console.log (response['result']['contexts'][0].parameters.technology);
    
// });

// request.on('error', function(error) {
//     console.log(error);
// });

// request.end();

// var contextrequest = ContextsRequest(app, contexts, options );

// contextrequest.on('response', function(response) {
//         // response = [
//         // { name: "contextName" }
//         // ]
//         console.log(response);
// });
// contextrequestt.on('error', function(error) {
//         console.log(error);
// });

// contextrequest.end();