console.log("client side js");

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{              //fetch to get data from http url , then use .then to get access too that data (response)
//   response.json().then((data)=>{                                      // response.json -> data parsed from url then get into data parameter
// console.log(data);
//   })
// })

// challlernge , do the same above fetch for weather api

// fetch('http://localhost:3000/weather?address=anantnag').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
// console.log(data.error);
//         }
//         else{
// console.log(data.forecast);
// console.log(data.address);
//         }
//     }
//     )
// })

// const weatherform = document.querySelector('form')                             //used to select form element of html
// const search = document.querySelector('input')                                 // serch takes value , a user puts in box

// weatherform.addEventListener('submit',(e)=>{                                   // eventlis to get event , 2 param req , 1 event and 2 callback function
// e.preventDefault()                                                        //used to prevent default thing(refreshing) i-e refreshing the page on search click 

// const location = search.value                                            //location takes value user typed in searchbox
// console.log(location);


// })


//making above two things i-e fetch and eventlist altogether dynamic (i-e user enter location and gets weather) 
const weatherform = document.querySelector('form')                             
const search = document.querySelector('input')  
const message1 = document.querySelector('#message1')                     //used for id (#)
const message2 = document.querySelector('#message2')                                            
// message1.textContent='From Javascript'


weatherform.addEventListener('submit',(e)=>{                                
e.preventDefault()                                                    

const location = search.value  
message1.textContent='Loading...' 
message2.textContent=''                                       

// fetch('http://localhost:3000/weather?address='+location).then((response)=>{                //for local machine
    fetch('/weather?address='+location).then((response)=>{                                    // for live server (heroku)
    response.json().then((data)=>{
        if(data.error){
// console.log(data.error);
message2.textContent = data.error
message1.textContent=''                //used my me itself as a bug resolver
        }
        else{
            message1.textContent= data.forecast
            message2.textContent=data.address
// console.log(data.forecast);
// console.log(data.address);
        }
    }
    )
})


})




