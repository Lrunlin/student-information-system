# 学生信息管理系统

使用 Vue3+Node.js+MySQL 搭建的学生信息管理系统,组件库使用 Element-Plus  
整体分为三个权限，学生、指导教师、超级管理员,共七个数据表  
之前学生的毕业设计

## 功能

### 学生

1. 编写周报、修改
2. 向指导教师发起问题询问
3. 修改个人信息
4. 公告查询

### 指导教师

指导教师对学生的所有信息处理只针对本班学生

1. 对学生进行修改和查询
2. 可以操作学生档案
3. 可以查询学生周报并且进行批复
4. 对学生的提问进行反馈、管理
5. 对个人信息进行修改
6. 公告查询

### 管理员

在对学生、管理员进行头像修改时会使用 Sharp 对图片进行压缩和格式修改

1. 对指导教师进行管理（增删改查）
2. 对学生进行管理（增删改查）
3. 信息修噶
4. 使用 Markdown 发送公告（学生和教师绑定的邮箱可以接收）

## 启动

设置 QQ 邮箱发送配置  

1. npm i yarn -g（如果已经有 yarn 请忽略）
2. 点击 install.bat
3. 点击 dev.bat

## 联系我

**对毕业设计等问题进行解答**  
QQ:1974109227  
<img src="https://disk.blogweb.cn/me/qq.svg" width="150" /> <br/>
微信:  
<img src="https://disk.blogweb.cn/me/wechat.svg" width="150" />

## 基本展示

指导教师和管理员的截图，简单截几张，具体功能自己运行吧，简单的毕设没问题  
<img src="https://disk.blogweb.cn/open-source/student-information-system/student-information-system1.jpg" width="80%" />
<img src="https://disk.blogweb.cn/open-source/student-information-system/student-information-system2.jpg" width="80%" /><img src="https://disk.blogweb.cn/open-source/student-information-system/student-information-system3.jpg" width="80%" />
