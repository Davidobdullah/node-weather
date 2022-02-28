const express = require('express')

const path = require('path')
const hbs = require('hbs')
const { readdirSync } = require('fs')
const geocode =require('./utilis/geocode')            //geocode.js
const forecast = require('./utilis/forecast')         //forecast.js file
const port = process.env.PORT || 3000

// console.log(__dirname)                          //__dirname gives path of irectory ,src here
// console.log(path.join(__dirname))            // path helps in finding path, here it will give same path as by simple__dirname as only one argument given
// console.log(path.join(__dirname,'../public'))   // here 2nd arg passed is name of folder path we want to go 





const pathdirectory = path.join(__dirname,'../public')             //for static
//const viewspath = path.join(__dirname,'../templates')            // makng path, views folder changed to templates folder , so express needs to be given pth, cox no default path i-e views 
const viewspath = path.join(__dirname,'../templates/views')        // we made two fold in templates , so in view we hve hbs files
const partialspath = path.join(__dirname,'../templates/partials')  // for partials folder ,hbs files in them

const app = express()                                //to make an app server

app.set('view engine','hbs')                         //for setup of hbs(handlebars) we use app.set()
app.set('views', viewspath)                          //here folder chnged of above one ,i-e views folder
hbs.registerPartials(partialspath)                    //setup of partialfolder's hbs files, regpartials takes to the directory where partials files are


app.use(express.static(pathdirectory))               //it will display index.html data on browser, static html not dynamic for dyn we use hbs       


app.get('',(req,res)=>{                                //for dynamic render of html or hbs 
    res.render('index' ,{                              // res.render used to render index.hbs ,2 arg , 1 name of view (here index)
        title:'Weather ',                       // 2nd arg is object , having val we want to view
        name:'Dawood'
    })                                           
})

app.get('/about',(req,res)=>{                               //FOR ABOUT PATH, title devil
    res.render('about',{
        title:"devil",
        name:'dawooooooood'
    })
})
// app.get('*',(req,res)=>{                                   // for other than mentioned routes , we usew *                                     
//     res.send('404 ERROR')                                  // re4s.send for showing text in  browserr{STATIC Text}
// })




// app.get('',(req,res)=>{                              // '' means the path & req and res ae two arguments , one request bu use another is resonse
//     // res.send('Hello Express')                     //res.send , it will show message in the browser
//     res.send('<h1>Weather App</h1>')                 // so generally we use html , to render on browswer     , it wont run because above pathb already did job 
// })

app.get('/help',(req,res)=>{                         // '/path' whatever for route we want the message
    // res.send('Help page')                   //localhost:3000/help
res.send([{name:'Dawood'},                     // not only html , but also json data , here array of objects renderd 
{
    name:'jhon'
}])
})
app.get('/weather',(req,res)=>{

    if(!req.query.address){                                    //req from user "query  sent"
        return res.send({
            error:'you must provide an  address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}= {} )=>{                //accessing api via browser ,means forecast ,we givebaddress as query and get result
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{                    //3 params passed
if(error){
    res.send({error})
}
res.send({
    forecast:forecastdata,
     location,                                       //shorthand as location:lovcation , location comes from above
    address: req.query.address
})
        })
         
    })
    // res.send({                                               //dummy data for weather, above is real dynamic, this code was old and above is its exchange code new
    //     forecast:'its snowing',
    //     location:'anantnag',
    //     address:req.query.address
    // })
})



app.get('/products',(req,res)=>{
if(!req.query.search){
return res.send({
    error:'provide search query'                        //if search quer not prvded in browser
})
}



    console.log(req.query);                //   req.query used for handling QUERYA data i-e localhost:3000/products?search=games
    res.send({
        products:[]                        //returns empty array (json here)
    })
})

app.get('*',(req,res)=>{                              //for error messages 404
    res.render('404',{
        title:'404',
        name:'Dawood',
        errorMessage:'page not found'
    })
})




app.listen(port, ()=>{                       // to start an app server , needs 2 arguments i-e port , fun
    console.log('server started on port 3000');
})