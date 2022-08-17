var kafka = require('kafka-node');
var topics = [
    { topic: 'login_response', partition: 0 },
    { topic: 'signup1_response', partition: 0 },
    { topic: 'userprofile_response', partition: 0 },
    { topic: 'updateprofile_response', partition: 0 },
    { topic: 'uploadimage_response', partition: 0 },
    { topic: 'addcourse1_response', partition: 0 },
    { topic: 'getcourses1_response', partition: 0 },
    { topic: 'searchcourses1_response', partition: 0 },
    { topic: 'enroll1_response', partition: 0 },
    { topic: 'enrollwaitlist1_response', partition: 0 },
    { topic: 'drop1_response', partition: 0 },
    { topic: 'getstudents1_response', partition: 0 },
    { topic: 'getannouncement1_response', partition: 0 },
    { topic: 'makeannouncement1_response', partition: 0 },
    { topic: 'getlecturefiles1_response', partition: 0 },
    { topic: 'uploadfile1_response', partition: 0 },
    { topic: 'loadassignment1_response', partition: 0 },
    { topic: 'getassignment1_response', partition: 0 },
    { topic: 'uploadassignment1_response', partition: 0 },
    { topic: 'viewassignment1_response', partition: 0 },
    { topic: 'getsubmissions1_response', partition: 0 },
    { topic: 'postgrade1_response', partition: 0 },
    { topic: 'getgrade1_response', partition: 0 },
    { topic: 'getquiz1_response', partition: 0 },
    { topic: 'getquizdetail1_response', partition: 0 },
    { topic: 'submitquiz1_response', partition: 0 },
    { topic: 'submitquizanswers1_response', partition: 0 },
    { topic: 'givepermission1_response', partition: 0 },
    { topic: 'getcourseinfo1_response', partition: 0 },
    { topic: 'sendmessage1_response', partition: 0 },
    { topic: 'getmessage1_response', partition: 0 },
    { topic: 'updateorder1_response', partition: 0 }
];

function ConnectionProvider() {

    this.getConsumer = function (topic_name) {
        if (!this.kafkaConsumerConnection) {

            this.client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
            this.kafkaConsumerConnection = new kafka.Consumer(this.client, topics);
            this.client.on('ready', function () {
                //console.log('In Back-end - Connection.js : Client ready!') 
            })
        }
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function () {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            //console.log('In Back-end - Connection.js : Producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;