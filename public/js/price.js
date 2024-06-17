// import axios from "axios";
const fetchAndSaveData = async () => {
        // API 엔드포인트 URL
    const API_ENDPOINT = 'https://purewalletapisub.com/trygetcoinprice/metamonkeyai';
    // const API_ENDPOINT = 'https://purewalletapisub.com/pingokabary';
    const API_AUTH_VAL = 'b73b3f872214cde049f72932a958ce1f27298704e226472a35cf46dcaa6cfb30';
    const requestoptions  = {
        headers: { 
            'Authorization': API_AUTH_VAL,
            'Content-Type': 'application/json' 
        }
    }
    axios.get(API_ENDPOINT, requestoptions)
      .then(function (response) {
        console.log(response.data);
        Jdata = JSON.parse(response.data);
        Jdata.priceUsd;
      })
      .catch(function (error) {
        console.log(error);
      });
    
};

$(window).load(function () {

    console.log(document.getElementById("priceText"))
    console.log("asdfasdfasdfasdf")

    fetchAndSaveData();
})
