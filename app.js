var apiai = require('apiai');
var builder = require('botbuilder');
var restify = require('restify'); 
var apiairecognizer = require('api-ai-recognizer');

var dbconnect = require('./database_connect');
var ttos = require('./texttospeech');
var ContextsRequest = require('./contexts_request');
 
var app = apiai("492d3d2054ef4aa48870b83d351d09c5");

var options = {
    sessionId: '12345'
};

// // Setup Restify Server
// var server = restify.createServer();  
// server.listen(process.env.port || process.env.PORT || 3978, function () {  
//    console.log('%s listening to %s', server.name, server.url); 
// });

// // Create chat bot
// var connector = new builder.ChatConnector({  
//     appId: 'b5092823-73e8-4e4c-b1c5-a26e11c7aa24',
//     appPassword: 'tkknFAtXiAHXp8JT4QdEgEK'
// });

// server.post('/api/messages', connector.listen());

// /*var connector = new builder.ConsoleConnector().listen();*/

// var bot = new builder.UniversalBot(connector);

// // recognizer
// var recognizer = new apiairecognizer('492d3d2054ef4aa48870b83d351d09c5');

// // intents
// var intents = new builder.IntentDialog({recognizers: [recognizer]});

// bot.dialog('/', intents);

// var technology = "";
// var location = "";
// var leadtime = "";
// var level = "";


// intents.matches('searchcandidates', [
//     function(session, args, next){
//         session.send('Inside search candidates');

//         technology = builder.EntityRecognizer.findEntity(args.entities, 'technology');
//         location = builder.EntityRecognizer.findEntity(args.entities, 'location');
//         leadtime = builder.EntityRecognizer.findEntity(args.entities, 'leadtime');
//         level = builder.EntityRecognizer.findEntity(args.entities, 'level');
        
//         session.dialogData.candidate = {
//             technology : technology ? technology.entity : null,
//             location : location ? location.entity : null,
//             leadtime : leadtime ? leadtime.entity : null,
//             level : level ? level.entity : null,
//         }
//         if (!technology){
//             builder.Prompts.text(session, 'Please specify technology');
//         } else {
//             if (!location) {
//             builder.Prompts.text(session, 'Please specify location');
//             } else {
//                 builder.Prompts.text(session, 'Please specify the candidate Level');
//             }
//         } 
//         next();
//     }
    
// ]);

// intents.matches('searchtechnology', [
//     function(session, args, next){
//          session.send('Inside search candidates technology');
//          technology = builder.EntityRecognizer.findEntity(args.entities,'techology');
//         //  location = session.dialogData.candidate.location;
        
//          if (!technology){
//                builder.Prompts.text(session, 'Please specify technology');
//          }
//          next();
//     },
//     function(session, results, next){
//         if (results.response){
//             session.dialogData.candidate.technology = results.response;
//         }
//         if (!session.dialogData.candidate.location){
//             builder.Prompts.text(session, 'Please specify Location');
//         }
//         next();
//     }
// ]);

// intents.matches('searchlocation', [
//     function(session, args, next){
//          session.send('Inside search candidates location');
//         //  var technology = session.dialogData.candidate.technology;
//          location = builder.EntityRecognizer.findEntity(args.entities, 'location');
         
//          if (!location){
//              builder.Prompts.text(session, 'Please specify location');
//          }
//          next();
//     },
//     function(session, results, next){
//         if (results.response){
//             session.dialogData.candidate.location = results.response;
//         }
//         // if (!session.dialogData.candidate.level){
//             builder.Prompts.text(session, 'Please specify level');
//             next();
//         // }
//     }
// ]);

// intents.matches('searchcandidatelevel', [
//     function(session, args, next){
//          session.send('Inside search candidate level');
//          level = builder.EntityRecognizer.findEntity(args.entities,'level');
//         //  var leadtime = session.dialogData.candidate.leadtime;
    
//          if (!level){
//              builder.Prompts.text(session, 'Please specify level once again!');
//          }
//          next();
//     },
//     function(session,results, next){
//         if (results.response){
//             session.dialogData.candidate.level = results.response;
//         }
//         // if (!leadtime){
//             builder.Prompts.text(session, 'Please specify start date');
//             next();
//         // }
//     }
// ]);

// intents.matches('searchcandidatestartdate', [
//     function(session, args, next){
//          session.send('Inside search candidate start date');
//         //  var technology = session.dialogData.candidate.technology;
//         //  var location = session.dialogData.candidate.location;
//          leadtime = builder.EntityRecognizer.findEntity(args.entities, 'leadtime');
//         //  var level = session.dialogData.candidate.level;
                  
//          if (!leadtime){
//              builder.Prompts.text(session, 'Please specify Leadtime once again!');
//          }
//          next ();
//     },
//     function(session, results){
//         var lt = session.dialogData.candidate;
//         if(results.response){
//             lt.leadtime = results.response;
//         }
        
//         // session.send('lead time is %s: ', lt.leadtime);
//         // if (technology && location && level && leadtime){
//             // session.send('got all information'+ session.dialogData.candidate.leadtime +'location'+ session.dialogData.candidate.location);
//         // }
//     }
// ]);

// intents.matches('smalltalk.greetings', function(session, args){
//     session.send('Inside small talk');
//     var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');

//     if (fulfillment){
//         var speech = fulfillment.entity;
//         session.send(speech);
//     } else {
//         session.send('sorry ... not sure how to respond');
//     }
// });

// intents.onDefault(function(session){
//     session.send('Sorry can you rephrase...');
// });



var request = app.textRequest('search for java candidates in bangalore', options);

console.log('The request is ');

request.on('response', function(response, results) {
    
    // ttos.texttospeech('playing this in audio');
    // console.log(results.contexts);
    // dbconnect.databaseConnect();
});

request.on('error', function(error) {
    console.log(error);
});

request.end();

var contextrequest = ContextsRequest.ContextsRequest(app,'candidatetechloc',options);

contextrequest.on('response', function(response) {
        // response = [
        // { name: "contextName" }
        // ]
        console.log(response);
});
contextrequestt.on('error', function(error) {
        console.log(error);
});

contextrequest.end();