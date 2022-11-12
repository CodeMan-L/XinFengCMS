<template>
    <div class="Add">
        <el-form ref="form" label-width="80px">

            <el-form-item label="商品分类">
                <div class="block">
                    <span class="demonstration"></span>
                    <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>
                </div>
            </el-form-item>

            <el-form-item label="商品名称">
                <el-input placeholder="请输入商品名称"></el-input>
            </el-form-item>

            <el-form-item label="商品简介">
                <el-input type="textarea" placeholder="请输入商品简介（100字）"></el-input>
            </el-form-item>

            <el-form-item label="商品价格">
                <el-input-number controls-position="right" :min="0" placeholder="请输入商品价格">
                </el-input-number>
            </el-form-item>
            <el-form-item label="商品售卖价">
                <el-input-number controls-position="right" placeholder="请输入商品售价">
                </el-input-number>
            </el-form-item>
            <el-form-item label="商品库存">
                <el-input-number controls-position="right" :min="0" placeholder="请输入商品库存">
                </el-input-number>
            </el-form-item>
            <el-form-item label="商品标签">
                <el-input placeholder="请输入商品小标签"></el-input>
            </el-form-item>
            <el-form-item label="上架状态">
                <template>
                    <el-radio-group v-model="radio">
                        <el-radio :label="3">上架</el-radio>
                        <el-radio :label="6">下架</el-radio>
                    </el-radio-group>
                </template>
            </el-form-item>

            <el-form-item label="商品主图">
                <el-upload action="#" list-type="picture-card" :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                <i class="el-icon-download"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item label="详情内容">
                <div class="editor-container">

                    <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="content">
                    </vue-editor>
                    <el-button type="primary">立即创建</el-button>
                </div>

            </el-form-item>
        </el-form>
    </div>
</template>
   
<script>
import { VueEditor } from "vue2-editor/dist/vue2-editor.core.js";
export default {
    name: "Add",
    data() {
        return {
            radio: 3,
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            content: '请输入正文',
            value: [],
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                    }, {
                        value: 'color',
                        label: 'Color 色彩'
                    }, {
                        value: 'typography',
                        label: 'Typography 字体'
                    }, {
                        value: 'icon',
                        label: 'Icon 图标'
                    }, {
                        value: 'button',
                        label: 'Button 按钮'
                    }]
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                    }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                    }, {
                        value: 'input',
                        label: 'Input 输入框'
                    }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                    }, {
                        value: 'select',
                        label: 'Select 选择器'
                    }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                    }, {
                        value: 'switch',
                        label: 'Switch 开关'
                    }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                    }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                    }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                    }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                    }, {
                        value: 'upload',
                        label: 'Upload 上传'
                    }, {
                        value: 'rate',
                        label: 'Rate 评分'
                    }, {
                        value: 'form',
                        label: 'Form 表单'
                    }]
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格'
                    }, {
                        value: 'tag',
                        label: 'Tag 标签'
                    }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                    }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                    }, {
                        value: 'badge',
                        label: 'Badge 标记'
                    }]
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                    }, {
                        value: 'loading',
                        label: 'Loading 加载'
                    }, {
                        value: 'message',
                        label: 'Message 消息提示'
                    }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                    }, {
                        value: 'notification',
                        label: 'Notification 通知'
                    }]
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                    }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                    }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                    }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                    }]
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                    }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                    }, {
                        value: 'card',
                        label: 'Card 卡片'
                    }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                    }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                    }]
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
            }]
        };
    },
    methods: {
        handleRemove(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },
        handleChange() { },
        updateData(e) {
            this.content = e;
        },
        handleImageAdded() {
            console.log('upload image');
        }
    },
    components: {
        VueEditor
    },


};
</script> 
  
<style lang="less" scoped>
@import "~vue2-editor/dist/vue2-editor.css";
/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";

.Add {
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    margin-bottom: 50px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);


    :deep(#editor) {
        height: 300px;
        margin-bottom: 20px;
    }

    :deep(.el-form-item__label) {
        width: 82px !important;
    }

    :deep(.el-form-item__content) {
        margin-left: 82px !important;
    }

    /deep/input {
        width: 298px;
        height: 38px;
        padding: 0 15px;
    }

    /deep/.el-textarea {
        width: 298px;
        height: 38px;
        box-sizing: border-box;
    }

    /deep/.el-input-number {
        width: 298px;
    }
}
</style>