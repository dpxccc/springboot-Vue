<template>
    <div>
<!--        一般导航菜单栏以撑满整个页面的，设置一个最小高度整个页面高度-头部高度，不加的话只会到拥有的按钮个数的高度，旁边有个细线可以观察下-->
        <el-menu
                style="width: 200px; min-height: calc(100vh - 50px)"
                default-active="user"
                default-openeds="[1]"
                class="el-menu-vertical-demo">
            <el-sub-menu index="1">
                    <template #title>系统管理</template>
                    <el-menu-item index="user">用户管理</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="data">数据管理</el-menu-item>
<!--            <el-menu-item index="2">-->
<!--                <el-icon><icon-menu /></el-icon>-->
<!--                <span>导航二</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="4">-->
<!--                <el-icon><setting /></el-icon>-->
<!--                <span>导航四</span>-->
<!--            </el-menu-item>-->
        </el-menu>
    </div>
</template>

<script>
    import {
        Location,
        Menu as IconMenu,
        Setting,
    } from '@element-plus/icons'

    export default {
        name: "Aside",
        components:{
            Location,
            Setting,
            IconMenu,
        }
    }
</script>

<style scoped>

</style>