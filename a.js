const db=require("./db")

db.prepare("update users set score=0 where id=9").run()