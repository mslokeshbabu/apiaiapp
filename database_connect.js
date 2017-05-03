module.exports = {

    databaseConnect : function(){

        var dbconnect = require('tedious').Connection;
        var Request = require('tedious').Request;
        var Types = require('tedious').TYPES;
        var ConnectionPool = require('tedious-connection-pool');

        var config = {
                userName: 'root12345@candidatesearch.database.windows.net',
                password: 'admin1234$$',
                server: 'candidatesearch.database.windows.net',
                options: {
                    encrypt: true, 
                    database: 'employer', 
                    rowCollectionOnRequestCompletion: true
                }
        };

        var poolConfig = {
                min: 2,
                max: 4,
                log: true
        };

        pool = new ConnectionPool(poolConfig, config);

        pool.on('error', function(err) {
                 console.error(err);
        });

        pool.acquire(function(err, connection){
                 if (err){
                        console.log('error in connecting ' + err);
                        return;
                 }
                 var querysqlstring = "SELECT * FROM dbo.Employees";
                 req = new Request(querysqlstring, function(err, rowCount, rows){
                     if (err){
                         Console.log(err);
                     }
                     connection.release();

                 });
                 var result = "";
                 req.on('row',function(columns){
                     columns.forEach(function(element) {
                         if (element.value === null){
                             console.log('NULL');
                            } else {
                                result+= element.value + " || ";
                            }
                     });
                     console.log(result);
                     result = "\n";
                 });
                 req.on('doneInProc',function(rowCount, more){
                     console.log(rowCount + ' rows returned');
                    });
                 connection.execSql(req);
        });

        }


};
