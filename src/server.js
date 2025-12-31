import app from "./app.js";
import  { conf } from "./conf/conf.js";
import db from "./db/db.js";
import { strategiesQuery, userQuery, logsQuery, insertStrategiesQuery } from "./db/db.tables.js"

;(async () => {
  try {
    // db execution (db connection)
    db.pragma("foreign_keys = ON"); // enable foreign key contraints
    
    // table creation queries 
    db.exec(strategiesQuery);
    db.exec(userQuery);
    db.exec(logsQuery);

    // insertion of strategies into strategies table
    db.exec(insertStrategiesQuery);

    // listen to app at port
    app.listen(conf.port, ()=>{
      console.log(`Server is listening on http://localhost:${conf.port}`)
    });

  } catch (error) {
    // Todo : Make it more better
    console.log("Something went wrong while listening app")
    process.exit(1)
  }
})();


