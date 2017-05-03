module.exports = {
    texttospeech : function(sentence){
        var TextToSpeech = require('watson-developer-cloud/text-to-speech/v1');
        var fs = require ('fs');

        var text_to_speech = new TextToSpeech({
            username: 'e870c1f0-5fa3-471b-9854-154363d551a9',
            password : 'S8abJ2lVje1J'
        });

        var params = {
            text: sentence,
            voice : 'en-US_AllisonVoice',
            accept: 'audio/wav'
        };

        text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'));

    }

};