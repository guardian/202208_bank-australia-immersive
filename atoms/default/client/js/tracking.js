
import ReactGA from "react-ga-gtm";

// const Db = async () => {
//     const uri = "https://data.mongodb-api.com/app/data-qbmjy/endpoint/data/v1/action/insertOne";

//     const res = await axios(uri, {
//         method: 'POST',
//         cache: 'no-cache',
//         // mode: 'no-cors',
//         headers: {
//             'Content-Type': "application/json",
//             'Access-Control-Request-Headers':'*',
//             'api-key':'gnNtYWgVg9dnNwkeOeFY72Dac2MgaM3HJ2okrMvaJWPEl14n0QJrOMMzx3dih8bc',
//             'Accept':'application/ejson',
//             'Access-Control-Allow-Origin': "*"
//         },
//         withCredentials: true,
//         credentials: 'include',
//         body: JSON.stringify({
//             "collection":"BAU",
//             "database":"Glabs",
//             "dataSource":"Cluster0",
//             'document:' : {
//                 "code": 'Red'
//             }
//         })
//     });
//     return res;
// }


const GA = (type) => {
    ReactGA.event({
        category: 'User',
        action: 'Code select',
        label: type
    })
}

export default GA;

export function initGA () {
    // console.log('initGA')
    // ReactGA.initialize('G-9EVGDRTQ7J', {debug: true});
    ReactGA.initialize('UA-244269257-1', {debug: true});
}

// https://www.mongodb.com/docs/atlas/api/data-api/
/*
curl --location --request POST 'https://data.mongodb-api.com/app/data-qbmjy/endpoint/data/v1/action/insertOne' \
--header 'Content-Type: application/json' \
--header 'Access-Control-Request-Headers: *' \
--header 'api-key: gnNtYWgVg9dnNwkeOeFY72Dac2MgaM3HJ2okrMvaJWPEl14n0QJrOMMzx3dih8bc' \
--header 'Accept: application/ejson' \
--data-raw '{
    "collection":"BAU",
    "database":"Glabs",
    "dataSource":"Cluster0",
    "projection": {"_id": 1}
}'
//*/
// Paste this code as high in the <head> of the page as possible:
/*

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-9EVGDRTQ7J"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-9EVGDRTQ7J');
</script>
*/