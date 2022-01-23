<template>
    <div style="padding:10px">
        <!--    功能区域-->
        <div style="margin: 10px 0">
            <el-button type="primary" @click="add">新增</el-button>
            <el-button type="primary">导入</el-button>
            <el-button type="primary">删除</el-button>
        </div>
        <!--    搜索区域-->
        <div style="margin: 10px 0">
            <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable/>
            <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" stripe>
            <el-table-column sortable prop="id" label="ID"/>
            <el-table-column prop="username" label="用户名"/>
            <el-table-column prop="nickName" label="昵称"/>
            <el-table-column prop="age" label="年龄"/>
            <el-table-column prop="sex" label="性别"/>
            <el-table-column prop="address" label="地址"/>
            <el-table-column label="操作" width="120">
                <template #default="scope">
                    <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm title="确认删除吗" @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button type="text">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 10px 0">
            <el-pagination
                    v-model:currentPage="currentPage"
                    :page-sizes="[5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            >
            </el-pagination>
            <!--            需要设置 model-value / v-model 属性，它接收 Boolean，当为 true 时显示 Dialog-->
            <el-dialog v-model="dialogVisible" title="请输入内容" width="30%">
                <el-form label-width="120px" :model="form">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="form.nickName" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="form.age" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio v-model="form.sex" label="男">男</el-radio>
                        <el-radio v-model="form.sex" label="女">女</el-radio>
                        <el-radio v-model="form.sex" label="未知">未知</el-radio>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input type="textarea" v-model="form.address" style="width: 80%"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="save">确认</el-button>
                  </span>
                </template>
            </el-dialog>
        </div>
    </div>


</template>

<script>

    import request from "../utils/request";
    import {ElMessage} from 'element-plus'

    export default {
        name: 'Home',
        components: {},
        data() {
            return {
                //这个form已经和表单参数进行绑定，表单输入后会保存到这个form  json中
                form: {},
                dialogVisible: false,
                search: '',
                currentPage: 1,
                pageSize: 10,
                total: 0,
                tableData: []
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                request.get("/user", {
                    params: {
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
                        search: this.search
                    }
                }).then(res => {
                    console.log(res)
                    //将接受的res中的records赋值给tableData
                    this.tableData = res.data.records
                    this.total = res.data.total
                })
            },
            add() {
                this.dialogVisible = true;
                //重新进入表单时清空里面的数据
                this.form = {};
            },
            save() {
                if (this.form.id) {     //有id就更新
                    request.put("/user", this.form).then(res => {
                        console.log(res)
                        if (res.code === '0') {
                            ElMessage({
                                type: 'success',
                                message: '更新成功'
                            })
                        } else {
                            ElMessage({
                                type: 'error',
                                message: res.msg
                            })
                        }
                        this.load()     //刷新页面
                        this.dialogVisible = false  //关闭弹窗
                    })
                } else {
                    request.post("/user", this.form).then(res => {
                        console.log(res)
                        if (res.code === '0') {
                            ElMessage({
                                type: 'success',
                                message: '新增成功'
                            })
                        } else {
                            ElMessage({
                                type: 'error',
                                message: res.msg
                            })
                        }
                        this.load()     //刷新页面
                        this.dialogVisible = false  //关闭弹窗
                    })
                }

            },
            handleEdit(row) {
                //深拷贝，避免浅拷贝，防止在编辑中，没有确认而是取消情况的修改
                this.form = JSON.parse(JSON.stringify(row))
                this.dialogVisible = true

            },
            handleDelete(id) {
                console.log(id)
                request.delete("/user/" + id).then(res => {
                    if (res.code === '0') {
                        ElMessage({
                            type: 'success',
                            message: '删除成功'
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: res.msg
                        })
                    }
                    this.load()     //删除后重新加载
                })
            },
            handleSizeChange(pageSize) {        //改变当前每页的个数触发
                this.pageSize = pageSize
                this.load()
            },
            handleCurrentChange(pageNum) {     //改变当前页码触发
                this.pageNum = pageNum
                this.load()
            },
        }
    }
</script>
