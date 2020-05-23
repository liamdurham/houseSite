var axios = require('axios');

function testStart()
{
    axios.get( 'http://localhost:3000/open').then (function (response)
    {
      console.log(response.data);  
    }
    ).catch(function(error)
    {
       console.log(error);    
    }
    );
}

/*
function testEnd()
{
    axios.get( 'http://localhost:3000/close').then (function (response)
    {
      console.log(response.data);  
    }
    ).catch(function(error)
    {
       console.log(error);    
    }
    );
}
*/

function init()
{
    testStart();
   // setTimeout( testEnd , 10000);
}

init();