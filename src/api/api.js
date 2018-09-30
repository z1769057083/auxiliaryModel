export default  [{
    url: '/code/captcha-image?',
    method: 'get',
    name: 'captchaImage',
    type: 'url',
},
    //语料操作 start ======
    {
        name: 'delMore',
        url: '/corpus/delMore',
        method: 'post',
    },
    {
        name: 'delOne',
        url: '/corpus/delOne',
        method: 'post',
    },
    {
        name: 'exportCorpus',
        url: '/corpus/exportBy',
        method: 'post',
    },
    {
        name: 'exportUrl',
        url: '/corpus/export?queryType=',
        method: 'get',
        type: 'url',
    },
    {
        name: 'queryCount',
        url: '/corpus/queryCountBy',
        method: 'get',
    },
    {
        name: 'queryOne',
        url: '/corpus/queryOne',
        method: 'post',
    },
    {
        name: 'queryCorpusUrl',
        url: '/corpus/queryPageBy',
        method: 'post',
    },
    {
        name: 'queryCorpusByPage',
        url: '/corpus/queryPageBy',
        method: 'post',
    },
    {
        name: 'saveCorpus',
        url: '/corpus/save',
        method: 'post',
    },
    {
        name: 'searchCorpus',
        url: '/corpus/search',
        method: 'post',
    },
    {
        name: 'updateClassifyUrl',
        url: '/corpus/updateClassifyBy',
        method: 'post',
    },
    {
        name: 'updateClassifyBy',
        url: '/corpus/updateClassifyBy',
        method: 'post',
    },
    {
        name: 'uploadCorpus',
        url: '/corpus/upload',
        method: 'post',
    },
    //语料操作 end ======
    //登录    start======
    {
        name: 'checkLoginUrl',
        url: '/checkLogin',
        type: 'url',
    },
    {
        name: 'checkLogin',
        url: '/checkLogin',
        method: 'post',
    },
    {
        name: 'login',
        url: '/login',
        method: 'post',
    },
    {
        name: 'logoutUrl',
        url: '/logout',
        method: 'post',
        type: 'url',
    },
    {
        name: 'logout',
        url: '/logout',
        method: 'post',
    },
    //登录   end ======
    //字符串比较和处理 start ======
    {
        name: 'getTextType',
        url: '/tools/getTextHandleType',
        method: 'get',
    },
    {
        name: 'textHandle',
        url: '/tools/textHandle',
        method: 'post',
    },
    {
        name: 'dupRemove',
        url: '/tools/wordDuplicateRemoval',
        method: 'post',
    },
    {
        name: 'wordSort',
        url: '/tools/wordSort',
        method: 'post',
    },
    {
        name: 'wordStatis',
        url: '/tools/wordStatistics',
        method: 'post',
    },
    {
        name: 'charConvert',
        url: '/tools/charConvert',
        method: 'post',
    },
    {
        name: 'chineseConvert',
        url: '/tools/chineseConvert',
        method: 'post',
    },
    //字符串比较和处理 end ======
    //用户管理  start ======
    {
        name: 'delUser',
        url: '/user/del',
        method: 'post',
    },
    {
        name: 'queryOneUser',
        url: '/user/queryById',
        method: 'post',
    },
    {
        name: 'queryUserList',
        url: '/user/queryPageBy',
        method: 'post',
    },
    {
        name: 'resetPassword',
        url: '/user/resetPassword',
        method: 'post',
    },
    {
        name: 'saveUser',
        url: '/user/save',
        method: 'post',
    },
    {
        name: 'updatePassword',
        url: '/user/updatePassword',
        method: 'post',
    },
    {
        //角色查询
        name: 'queryRole',
        url: '/auth/role/findAdminRole',
        method: 'get',
    },
    {
        //查询创建用户
        name: 'queryCreator',
        url: '/user/findGroupByCreator',
        method: 'get',
    },
    {
        //查询创建用户
        name: 'querydispatchCreator',
        url: '/text/task/findUserByPage',
        method: 'post',
    },
    //用户管理 end ======
    //模型分析 start============
    {
        name: 'downloadUrl',
        url: '/analysis/download?',
        type: 'url',
    },
    {
        name: 'download',
        url: '/analysis/download',
        method: 'get',
    },
    {
        name: 'multiple',
        url: '/analysis/multiple',
        method: 'post',
    },
    {
        name: 'single',
        url: '/analysis/single',
        method: 'post'
    },
    {
        name: 'analysisupload',
        url: '/analysis/upload',
        method: 'post'
    },
    //模型分析end========
    //文本标注
    {
        name: 'queryProject',
        url: '/text/findByPage',
        method: 'post',
    },
    {
        name: 'saveProject',
        url: '/text/save',
        method: 'post',
    },
    {
        name: 'checkNameIsExist',
        url: '/text/checkNameIsExist',
        method: 'post',
    },
    {
        name: 'delProject',
        url: '/text/delById',
        method: 'post',
    },
    {
        name: 'queryProjectById',
        url: '/text/findById',
        method: 'post',
    },
    {
        name: 'exportLabel',
        url: '/text/exportLabel',
        method: 'post',
    },
    {
        name: 'projectQueryMember',
        url: '/text/queryUserPageBy',
        method: 'post',
    },
    {
        name: 'labelExport',
        url: '/text/downloadLabel/',
        type: 'url',
    },
    {
        name: 'queryTaskList',
        url: '/text/task/findByPage',
        method: 'post',
    },
    {
        name: 'queryUploaders',
        url: '/text/task/findAllUploader',
        method: 'post',
    },
    {
        name: 'importCommonCorpus',
        url: '/text/task/importCommonTask',
        method: 'post'
    },
    {
        name: 'importAdminCorpus',
        url: '/text/task/importAdminTask',
        method: 'post'
    },
    {
        name: 'taskAllot',
        url: '/text/task/allot',
        method: 'post'
    },
    {
        name: 'taskDel',
        url: '/text/task/del',
        method: 'post'
    },
    {
        name: 'findTaskCorpus',
        url: '/text/taskCorpus/findByPage',
        method: 'post'
    },
    {
        name: 'delCorpus',
        url: '/text/taskCorpus/del',
        method: 'post'
    },
    {
        name: 'taskReceive',
        url: '/text/task/receive',
        method: 'post'
    },
    {
        name: 'taskGiveUp',
        url: '/text/task/giveUp',
        method: 'post'
    },
    {
        name: 'queryTaskCorpus', //获取语料
        url: '/text/taskCorpus/findById',
        method: 'post'
    }, {
        name: 'queryLabelList', //根据项目id查询实体标签列表
        url: '/text/findByProjectId',
        method: 'post'
    }, {
        name: 'queryRelaList', //根据项目id查询关系标签列表
        url: '/text/relation/findByProjectId',
        method: 'post'
    }, {
        name: 'saveTaskCorpus',
        url: '/text/taskCorpus/save',
        method: 'post'
    } , {
        name: 'getExcelNum',
        url: '/text/task/countExcelData',
        method: 'post'
    },
    {
        name: 'projectExport',
        url: '/text/exportProjectById/',
        type:'url'
    }
];
