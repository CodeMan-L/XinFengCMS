<template>
  <div class="recommend-setting">
    <el-upload action="" :show-file-list="false" accept=".jpg,.jpeg,.png,.gif" :before-upload="beforUpload"
      :http-request="myupload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import _ from "@/assets/utils"
export default {
  name: "recommend-setting",
  data() {
    return {
      imageUrl: "",
      token: _.storage.get('tk'),
    }
  },
  methods: {
    //:on-success="uploadSuccess"
    uploadSuccess(response) {
      //response响应主体信息
      let { resultCode, data } = response;
      if (+resultCode === 200) {
        this.imageUrl = data;
        return;
      }
      this.$message.error('上传失败!@_@')
    },
    beforUpload(file) {
      // return false/true 控制是否继续上传
      if (file.size > 1024) {
        this.$message.warning('上传文件不能超过10KB');
        return false;
      }
      return true;
    },
    async myupload(config) {
      //自己方式长传

      let file = config.file;
      let { resultCode, data } = await this.$api.upload(file);
      if (+resultCode === 200) {
        this.imageUrl = data;
        return;
      }
      this.$message.error('上传失败')
    }
  }
};
</script>

<style lang="less" scoped>

</style>