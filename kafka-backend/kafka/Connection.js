var kafka = require('kafka-node');
var topics = [
    { topic: 'login_request', partition: 0 },
    { topic: 'signup1_request', partition: 0 },
    { topic: 'userprofile_request', partition: 0 },
    { topic: 'updateprofile_request', partition: 0 },
    { topic: 'uploadimage_request', partition: 0 },
    { topic: 'addcourse1_request', partition: 0 },
    { topic: 'getcourses1_request', partition: 0 },
    { topic: 'searchcourses1_request', partition: 0 },
    { topic: 'enroll1_request', partition: 0 },
    { topic: 'enrollwaitlist1_request', partition: 0 },
    { topic: 'drop1_request', partition: 0 },
    { topic: 'getstudents1_request', partition: 0 },
    { topic: 'getannouncement1_request', partition: 0 },
    { topic: 'makeannouncement1_request', partition: 0 },
    { topic: 'getlecturefiles1_request', partition: 0 },
    { topic: 'uploadfile1_request', partition: 0 },
    { topic: 'loadassignment1_request', partition: 0 },
    { topic: 'getassignment1_request', partition: 0 },
    { topic: 'uploadassignment1_request', partition: 0 },
    { topic: 'viewassignment1_request', partition: 0 },
    { topic: 'getsubmissions1_request', partition: 0 },
    { topic: 'postgrade1_request', partition: 0 },
    { topic: 'getgrade1_request', partition: 0 },
    { topic: 'getquiz1_request', partition: 0 },
    { topic: 'getquizdetail1_request', partition: 0 },
    { topic: 'submitquiz1_request', partition: 0 },
    { topic: 'submitquizanswers1_request', partition: 0 },
    { topic: 'givepermission1_request', partition: 0 },
    { topic: 'getcourseinfo1_request', partition: 0 },
    { topic: 'sendmessage1_request', partition: 0 },
    { topic: 'getmessage1_request', partition: 0 },
    { topic: 'updateorder1_request', partition: 0 }

];

function ConnectionProvider() {

    this.getConsumer = function () {
        if (!this.kafkaConsumerConnection) {

            //this.client = new kafka.Client("localhost:2181");
            this.client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
            this.kafkaConsumerConnection = new kafka.Consumer(this.client, topics);
            this.client.on('ready', function () {
                //console.log('In kafka-back-end - Connection.js : Client ready!')
            })
        }
        return this.kafkaConsumerConnection;
    };

    this.getProducer = function () {

        if (!this.kafkaProducerConnection) {
            //this.client = new kafka.Client("localhost:2181");
            this.client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            //console.log('In kafka-back-end - Connection.js : Producer ready');
        }
        return this.kafkaProducerConnection;
    };
}

exports = module.exports = new ConnectionProvider;