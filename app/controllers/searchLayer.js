var mongo = require('mongodb').MongoClient;
var https = require('https');
var mongoose = require('mongoose')
var dbURI = process.env.MONGO_URI;
var apiKey = "YOURAPI"
var cx = "YOURCX"
var host = "https://www.googleapis.com"

mongoose.connect(dbURI);
var Schema = mongoose.Schema;

var SaveSearchSchema = new Schema({
    searchItem: String,
    created_at: Date
});

var SaveSearch = mongoose.model("searches", SaveSearchSchema);


SaveSearchSchema.pre('save', function(next) {
    this.created_at = new Date();
   next(); 
});



module.exports = {
    getImageData: function(search,query,callback) {
    var url = host+ "/customsearch/v1?key="+apiKey+"&cx="+cx+"&q="+search+"&searchType=image";
    
    if (query['offset']!=undefined)
    {
        var offset = Number(query['offset']);
        if (offset)  url = url+"&start="+offset;
    }

    var resultObject = [];

    console.log("Inside getImageData, path = ", url)
     var req = https.get(url, function(res) {
            res.setEncoding('utf-8');
            var responseString = '';
            res.on('data', function(data) {
              responseString += data;
            });
            res.on('end', function() {
                var responseObject = JSON.parse(responseString);
               // console.log(responseString);
                if (responseObject.error!=undefined) return callback(responseObject);
            for (var i=0;i<responseObject.items.length;i++)
            {   
                var obj = responseObject.items[i];
                resultObject.push({"url":obj.link, "snippet":obj.snippet, "thumbnail":obj.image.thumbnailLink,"context":obj.image.contextLink});
            }
              var newSearch = new SaveSearch({searchItem: search});
              newSearch.save(function(err){
                  if (err) console.log(err);
                  console.log("Entry was saved to database")
                  return callback(resultObject);
              })
              
              
            });
            
          });
    },
    
    getRecentQueries: function(callback)
    {
       SaveSearch.find({}, function(err, users) { 
           if (err) throw err; 
          // console.log(users);
           var lastTen = users.slice(-10);
           var resultObject = []
           for (var i =0;i<lastTen.length;i++)
           {
               var obj = lastTen[i]
               resultObject.push({"search":obj.searchItem, "date":obj.created_at});
           }
           return callback(resultObject);
       });
    }
    
};
