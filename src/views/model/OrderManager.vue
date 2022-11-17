<template>
  <div class="order-manager">
    <!-- 操控区 -->
    <div class="handler-box">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="handelAdd">
        新增商品
      </el-button>
    </div>

    <!-- 表格区 -->
    <el-table :data="tableData" stripe style="width: 100%" @selection-change="selectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column prop="orderNo" label="订单号" min-width="16%"></el-table-column>
      <el-table-column prop="totalPrice" label="订单总价" min-width="17%"></el-table-column>

      <el-table-column prop="orderStatus" label="订单状态" min-width="17%" :formatter="formmatterOrderState">
      </el-table-column>

      <el-table-column prop="payStatus" label="支付方式" min-width="17%" :formatter="formmatterState"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="16%"></el-table-column>
      <el-table-column prop="address" label="操作" min-width="16%">
        <template v-slot="{ row }">
          <el-popconfirm title="确定关闭订单吗？" @confirm="handleUpdate(row.categoryId)">
            <el-link type="primary" slot="reference">关闭订单</el-link>
          </el-popconfirm>
          <el-link type="primary" slot="reference" @click="upDown(row)">订单详情</el-link>

        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区 -->
    <el-pagination background layout="prev, pager, next" :hide-on-single-page="false" :page-size="pageSize"
      :total="total" :current-page="currentPage" @current-change="changePage"></el-pagination>
  </div>
</template>

<script>

export default {
  name: "classi-fication",
  data() {
    return {
      //关于表格区域的
      tableData: [],
      tableLoading: false,
      pageSize: 10,
      total: 0,
      currentPage: 1,
      categoryLevel: 1,
      parentId: 0,
      selection: [],
      categoryId: null,
      updateTime: null,
    }
  },
  created() {
    this.init();
  },
  methods: {
    /* 关于table表格的 */
    //获取数据
    async init(currentPage, pageSize) {
      this.tableLoading = true;
      currentPage = this.currentPage;
      try {
        let { resultCode, data } = await this.$api.model.queryOrderList(currentPage, pageSize);
        if (+resultCode === 200) {
          let { totalCount, list } = data;
          this.total = +totalCount;
          this.tableData = list;
          this.tableLoading = false;
          return;
        }
      } catch (_) {
        console.log('错误：', _);
      }
      this.tableData = [];
      this.total = 0;
      this.tableLoading = false;
    },
    //点击分页
    changePage(num) {
      this.currentPage = num;
      console.log();

      this.init();
    },
    //支付方式状态
    formmatterState(row) {

      return row.payStatus === 0 ? '未支付' : '微信支付';
    },
    //订单状态
    formmatterOrderState(row) {
      switch (row.orderStatus) {
        case -3: {
          return '商家关闭';
          break;
        }
        case -2: {
          return '超时关闭';
          break;
        }
        case -1: {
          return '手动关闭';
          break;
        }
        case 0: {
          return '待支付';
          break;
        }
        case 1:
          {
            return '已支付';
            break;
          }
        case 2: {
          return '配货完成';
          break;
        }
        case 3: {
          return '出库成功';
          break;
        }
        case 4: {
          return '交易成功';
          break;
        }

        default:
          break;
      }
    },
    //点击修改
    handleUpdate(row) {
      this.dialogVisible = true;
      this.$router.push({
        path: '/home/add',
        query: {
          id: row.goodsId,
        }
      })
      this.dialogVisible = false;

    },
    //点击新增
    handelAdd() {
      this.$router.push('/home/add');
    },

    //点击上下架
    async upDown(row) {
      let ids = [];
      if (row.goodsSellStatus === 0 || row.goodsSellStatus === 1) {
        row.goodsSellStatus = row.goodsSellStatus === 0 ? 1 : 0;
        ids.push(row.goodsId);
      }
      try {
        let { resultCode, message } = await this.$api.model.upDown(row.goodsSellStatus, ids);
        if (+resultCode === 200) {
          this.$message.success('修改成功');
          this.init();
        } else {
          this.$message.error(message);
        }
      } catch (_) {
        console.log('错误：', _);
      }
    },
    selectionChange(val) {
      this.selection = val;
    },
  }
};
</script>

<style lang="less" scoped>
.order-manager {
  position: relative;
  box-sizing: border-box;
  padding: 10px;
  padding-bottom: 20px;
  margin-bottom: 50px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

  .handler-box {
    z-index: 999;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #ebeef5;

    .el-button {
      margin-right: 10px;
    }
  }

  a {
    color: #409EFF;
  }

  .el-pagination {

    z-index: 999;
    display: flex;
    align-items: center;
    height: 40px;
    margin-top: 20px;
    justify-content: center;
  }

  .el-table {
    box-sizing: border-box;
    width: 100%;
  }

  .el-image {
    display: block;
    width: 50px;
    height: 50px;
  }

  .el-link {
    margin-right: 10px;
  }

  /deep/.el-dialog__body {
    padding: 10px 20px;
  }

  /deep/.el-upload {
    display: block;
  }

  .avatar-uploader-icon,
  .avatar-uploader-img {
    display: block;
    box-sizing: border-box;
    width: 120px;
    height: 120px;
    line-height: 120px;
    font-size: 24px;
    color: #8c939d;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
  }
}

:deep(.el-input-number) {
  width: auto;
  position: static;
}

:deep(.el-input-number) {
  width: 100%;
}
</style>