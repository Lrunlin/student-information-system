const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//todo获取学院、班级等相关信息
//?学院、专业、班级的信息保存在data.json的配置文件中
//!使用map可能会改变原数组所以在这里要避免使用map
let data = JSON.parse(fs.readFileSync(path.join(__dirname, `../../public/data.json`)).toString()).data


/** 查询学院 专业 班级 列表查询单个信息*/
router.get('/college', async (req, res) => {
    let _data = []
    data.forEach(item => {
        _data.push(item.college)
    })
    res.json({
        success: true,
        message: '查询全部学院',
        data: _data
    })
});

router.get('/major', async (req, res) => {
    let _data = []
    data.forEach(item => {
        item.majors.forEach(el => {
            _data.push(el.major)
        })
    })
    res.json({
        success: true,
        message: '查询全部学院',
        data: _data
    })
});

router.get('/class', async (req, res) => {
    let _data = []
    data.forEach(item => {
        item.majors.forEach(el => {
            _data = [..._data, ...el.class]
        })
    })
    res.json({
        success: true,
        message: '查询全部班级',
        data: _data
    })
});


/** 联动*/
//根据学院查找对应的专业
router.get('/college/:value', async (req, res) => {
    let value = req.params.value;
    let _data = []
    data.find(item => item.college == value).majors.forEach(item => {
        _data.push(item.major)
    })
    res.json({
        success: true,
        message: '查询全部学院',
        data: _data
    })
});

// 根据专业查找对应的班级
router.get('/major/:value', async (req, res) => {
    let value = req.params.value;
    let _data = []
    data.forEach(item => {
        if (item.majors.find(el => el.major == value)) {
            _data = [...item.majors.find(el => el.major == value).class]
        }
    })

    res.json({
        success: true,
        message: '查询全部学院',
        data: _data
    })
});


module.exports = router;