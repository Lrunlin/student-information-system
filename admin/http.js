const axios = require('axios')
let index = 0;
setInterval(() => {
    // axios.get(`https://codelife.cc?v${Math.random()+''+(+new Date())}`).then(res => {
    axios.get(`https://blogweb.cn?v${Math.random()+''+(+new Date())}`).then(res => {
        index++
        console.log(index);
    }).catch(err => {
        console.log(err);
    })
}, 200);