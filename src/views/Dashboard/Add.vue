<template>
    <div class="Add">
        <el-form ref="form" label-width="80px">

            <el-form-item label="商品分类">
                <div class="block">
                    <el-cascader :props="props"></el-cascader>
                </div>
            </el-form-item>

            <el-form-item label="商品名称">
                <el-input placeholder="请输入商品名称"></el-input>
            </el-form-item>

            <el-form-item label="商品简介" prop="goodsIntro">
                <el-input type="textarea" placeholder="请输入商品简介（100字）"></el-input>
            </el-form-item>

            <el-form-item label="商品价格" prop="goodsName">
                <el-input-number controls-position="right" :min="0" v-model="num" placeholder="请输入商品价格">
                </el-input-number>
            </el-form-item>
            <el-form-item label="商品售卖价" prop="originalPrice">
                <el-input-number controls-position="right" placeholder="请输入商品售价" :min="0" v-model="num2">
                </el-input-number>
            </el-form-item>
            <el-form-item label="商品库存">
                <el-input-number controls-position="right" :min="0" placeholder="请输入商品库存" v-model="num3">
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
                <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1"
                    v-show="flag ? true : false">
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
                    <el-button type="primary" @click="submit">立即创建</el-button>
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
        let that = this;
        return {
            radio: 3,
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            content: '请输入正文',
            flag: true,
            num: 0,
            num2: 0,
            num3: 0,
            options: [],
            props: {
                lazy: true,
                async lazyLoad(node, resolve) {
                    const { level } = node;
                    try {
                        let { resultCode, data } = await that.$api.dashboard.queryGoodsClassify(1, 1000, node.level + 1, node.value)

                        if (+resultCode === 200) {
                            that.options = data.list;
                        } else {
                            that.$message.error('null')
                        }
                    } catch (_) {
                        console.log('错误：', _);
                    }
                    const nodes = that.options.map(item => ({
                        value: item.categoryId,
                        label: item.categoryName,
                        leaf: level >= 2
                    }));
                    // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                    resolve(nodes);
                }
            },

        };
    },
    async created() {
    },
    methods: {
        /* 上传图片相关的 */
        handleRemove(file) {
            this.dialogImageUrl = '';
        },
        handlePictureCardPreview(file) {
            this.flag = false;
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            // console.log(file);
        },

        handleImageAdded() {
            // console.log('upload image');
        },
        submit() {

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