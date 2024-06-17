

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

    // HTTP 요청 보내기
    // request.get(API_ENDPOINT, requestoptions, function(error, response, body){
    //     if(error){
    //       console.log("request error "+error);
    //       return;
    //     }
        
    //     // console.log(body);
    //     Jdata = JSON.parse(body);
    //     Jdata.priceUsd;
    //     // console.log("parsing: "+ obj); // 콘솔창에 찍어보기

    //     // try {
    //     //     const data = JSON.parse(body);
      
    //     //     console.log(data.priceUsd);

    //     //     // 데이터를 배열 형태로 저장
    //     //     const dataArray = Array.isArray(data) ? data : [data];
      
    //     //     // JSON 파일에 데이터 저장
    //     //     fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(dataArray, null, 2));
    //     //     console.log('Data saved to JSON file');
    //     //   } catch (err) {
    //     //     console.error('Error:', err);
    //     //   }
    //   }
    // );
    
};

$(window).load(function () {

    console.log(document.getElementById("priceText"))
    console.log("asdfasdfasdfasdf")
    
    fetchAndSaveData();

})
