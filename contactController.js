const controller = {};

controller.list = (req,res)=>{
    req.getConnection((err,conn)=>{
        conn.query('select * from contact ', (err,contact)=>{
            if(err){
                res.json(err);
            }
            res.render('contact',{
                info:contact
            });
        });
    });
};

controller.save = (req,res)=>{
    const info = req.body;
    var a;
    var w=[];
   // var i;
    req.getConnection((err,conn) => {
        var q=conn.query('insert into contact set ?',{"fname":info["fname"],"mname":info["mname"],"lname":info["lname"]}, (err , contact)=>{
            a= contact.insertId;
            console.log(info["p"]);
            var f=info["x"]+"";
            var w=f.split(",");
            var ii=w.length;
             console.log(ii);
             var v=info["p"]+"";
             var j=v.split(",");
             var jj=j.length;
             console.log(jj);
             console.log(j[jj-1]);
             var u=info["p"]+"";
             var gg=u.split(",");
             var ggg=gg.length;
             console.log(ggg);
           console.log("madhurinimmala"+a);
           
            conn.query('insert into address set ?',{"contactid":a,"address":info["address"],"city":info["city"],"state":info["state"],"zip":info["zip"],"addresstype":info["addresstype"]}, (err , contact)=>{
            });
           for(i=1;i<=w[ii-1];i++)
          {
           
           conn.query('insert into address set ?',{"contactid":a,"address":info["address"+i],"city":info["city"+i],"state":info["state"+i],"zip":info["zip"+i],"addresstype":info["addresstype"+i]}, (err , contact)=>{
             });
           }
             conn.query('insert into phone set ?',{"number":info["number"],"phonetype":info["phonetype"],"contactid":a,"areacode":info["areacode"]}, (err , contact)=>{
                 });
             for(i=1;i<=j[jj-1];i++)
             {
                 conn.query('insert into phone set ?',{"number":info["number"+i],"phonetype":info["phonetype"+i],"contactid":a,"areacode":info["areacode"+i]}, (err , contact)=>{
                 });
             }
              conn.query('insert into date set ?',{"date":info["date"],"contactid":a,"datetype":info["datetype"]}, (err , contact)=>{
   
        });
             for(i=1;i<=gg[ggg-1];i++)
             {
            conn.query('insert into date set ?',{"date":info["date"+i],"contactid":a,"datetype":info["datetype"+i]}, (err , contact)=>{
   
        });
        }
            });
             res.redirect('/');

        
    });
};

   


controller.delete = (req,res)=>{
    const {id} = req.params;
    req.getConnection((err,conn)=>{
        conn.query('delete from contact where contactid=?',[id],(err,rows)=>{
            res.redirect('/');
        });
    });
};

controller.update = (req,res)=>{
    const {id} = req.params;
    const newContact = req.body;
    console.log(JSON.stringify(newContact));
    console.log(id);
    var f=newContact["dateid"];
    console.log(f);
    req.getConnection((err,conn)=>{
    var l  =  conn.query('update contact set ? where contactid=?',[{"fname":newContact["fname"],"mname":newContact["mname"],"lname":newContact["lname"]},id],(err,contact)=>{
        });
       console.log(err);
       var m=      conn.query('update address set ? where contactid=?',[{"address":newContact["address"],"city":newContact["city"],"state":newContact["state"],"zip":newContact["zip"],"addresstype":newContact["addresstype"]},id],(err,address)=>{
             });
       console.log(err);
         var o=        conn.query('update phone set ? where contactid=?',[{"number":newContact["number"],"phonetype":newContact["phonetype"],"areacode":newContact["areacode"]},id],(err,phone)=>{
                 });
         console.log(err);
            var k=        conn.query('update date set ? where contactid=?',[{"datetype":newContact["datetype"],"date":newContact["date"]},id],(err,date)=>{
                    });
            console.log(err);

            console.log("madhurinimmala"+l);
            console.log("madhurinimmala"+m);
            console.log("madhurinimmala"+o);
            console.log("madhurinimmala"+k);
        
         res.redirect('/');
    });

};

controller.edit = (req,res)=>{
    const {id} = req.params;
    req.getConnection((err,conn)=>{
        conn.query('select  * from contact c , address d , phone p , date m where c.contactid=? and c.contactid=d.contactid and c.contactid=p.contactid and c.contactid=m.contactid', [id],(err,contact)=>{
                
            res.render('contact_edit',{
                info:contact[0]
            });
        });
    }); 
    
};
controller.search = (req,res)=>{
    
            res.render('search_edit');
            
    
};
controller.key = (req,res)=>{
    const newkey=req.body;
    console.log(JSON.stringify(newkey));
    
    req.getConnection((err,conn)=>{ 
       conn.query('select c.fname,c.mname,c.lname from contact c, address d, phone p , date m where (c.contactid=d.contactid and c.contactid=p.contactid and c.contactid=m.contactid) and (c.fname LIKE ? or c.mname LIKE ? or c.lname LIKE ? or d.address LIKE ? or d.addresstype LIKE ? or d.city LIKE ? or d.state LIKE ? or d.zip LIKE ? or p.phonetype LIKE ? or p.number LIKE ? or p.areacode LIKE ? or m.date LIKE ? or m.datetype LIKE ?) ',["%"+newkey["search"]+"%","%"+newkey["search"]+"%","%"+newkey["search"]+"%","%"+newkey["search"]+"%","%"+newkey["search"]+"%","%"+newkey["search"]+"%","%"+newkey["search"]+"%","%"+newkey["search"]+"%","%"+newkey["search"]+"%","%"+newkey["search"]+"%","%"+newkey["search"]+"%","%"+newkey["search"]+"%","%"+newkey["search"]+"%"],(err,contact)=>{
    
            res.render('contact',{info:contact
            });
             
            
            
    });
    });
};


/*controller.search=(req,res)=>{
    const skey=req.body;
    */

module.exports = controller;