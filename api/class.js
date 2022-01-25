const md5 = require('md5');
const fs = require('fs');



let college = ['高等职业技术学院', '计算机与软件学院', '智能电子学院'];
let major = [
    ['计算机应用技术', '电子商务', '软件技术'],
    ['计算机科学与技术', '软件工程', ],
    ['智能科学与技术', '电子信息与工程', '机器人工程']
];

function createClass(string) {
    return [...Array(4)].map((item, index) => `${string}${index+1}班`)
}

let data = [];
college.forEach((item, index) => {
    //单个学院的信息
    let _data = {
        college: item,
        majors: []
    }
    //为单个学院设置专业
    major[index].forEach((el, i) => {
        _data.majors.push({
            major: el,
            class: createClass(el)
        })

    })
    data.push(_data)
})
console.log(JSON.stringify(data));
// fs.writeFileSync('./data.json', `{data:${JSON.stringify(data)}}`)