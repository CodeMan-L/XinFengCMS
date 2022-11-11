<template>
    <div class="Add">
        <el-form ref="form" label-width="80px">

            <el-form-item label="商品分类">
                <el-select>
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
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
        </el-form>
    </div>
</template>
  
<script>
export default {
    name: "Add",
    data() {
        return {
            radio: 3,
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
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
        }
    }
};
</script>
  
<style lang="less" scoped>
.Add {
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    margin-bottom: 50px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

    // :deep(.el-form-item__label) {
    //     width: 82px !important;
    // }

    // :deep(.el-form-item__content) {
    //     width: 80px !important;
    // }
}
</style>