var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_searchcourses(msg, callback) {

    console.log("In searchcourses.js - handle_searchcourses :" + JSON.stringify(msg));
    let matchQuery = { term: msg.searchData.term }
    let queryObj = [
        {
            $addFields: {
                tempmapping: {
                    $filter: {
                        input: "$coursemapping",
                        as: "coursemap",
                        cond: { $eq: ["$$coursemap.sjsuid", msg.searchData.sjsuid] }
                    }
                }
            }
        },
        {
            $addFields: {
                mappings: {
                    $cond: { if: { $eq: [{ $size: "$tempmapping" }, 0] }, then: { sjsuid: msg.searchData.sjsuid, status: null, role: "student" }, else: "$tempmapping" }
                }
            }
        },
        {
            $project: {
                coursemapping: 0,
                tempmapping: 0,
                lecturefiles: 0,
                assignments: 0,
                quiz: 0,
                announcement: 0
            }
        },
        {
            $unwind: "$mappings"
        }
    ]
    if (msg.searchData.coursename) {
        matchQuery.name = msg.searchData.coursename
    }
    if (msg.searchData.courseid) {
        let courseid = msg.searchData.courseid
        if (msg.searchData.filter == 'like') {
            courseid = '.*' + msg.searchData.courseid + '.*'
            matchQuery.id = { $regex: courseid }
        }
        else if (msg.searchData.filter == '>=') {
            matchQuery.id = { $gte: courseid }
        }
        else {
            matchQuery.id = courseid
        }
    }
    queryObj.push({
        $match: matchQuery
    })
    queryObj.push({
        $addFields: {
            enrolled:
            {
                $eq: ["$mappings.status", "EN"]
            },
            waitlisted:
            {
                $eq: ["$mappings.status", "WL"]
            },
            canEnroll:
            {
                $lt: ["$currEnrlNum", "$capacity"]
            },
            canWaitList:
            {
                $and: [{ $eq: ["$currEnrlNum", "$capacity"] }, { $lt: ["$currWLNum", "$waitlist"] }, { $ne: ["$mappings.status", "EN"] }]
            }
        }
    })
    //console.log("query obj", queryObj)
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');
        myCollection.aggregate(queryObj).toArray(
            function (err, result) {
                if (err) {
                    console.log("Error");
                } else {
                    console.log("Success", result);
                    callback(null, JSON.stringify(result));
                }
            });
    });
}

exports.handle_searchcourses = handle_searchcourses;