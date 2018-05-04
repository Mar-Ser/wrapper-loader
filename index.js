const util = require('util');
const ejs = require('ejs');
const objectAssign = require('object-assign');

module.exports = function(content){
    const query = this.query;
    // 模板字符串
    const template = query.template;
    // 附加数据
    const data = query.data;
    // 编译引擎配置
    const templateOptions = query.templateOptions;
    if (template) {
        // 渲染
        return ejs.render(template, objectAssign({
            content: content
        }, data || {}), objectAssign({
            escape: String
        }, templateOptions || {}));
    }
    return content;
};