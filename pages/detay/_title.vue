<template>
  <div>
    <Header></Header>
    <div class="d-flex">
      <Aside></Aside>
      <div style="height: calc(100vh - 61px - 64px)" class="overflow-auto w-100 py-4 px-2">
        <div class="container" v-loading="loading">
          <el-card class="w-100 mb-3">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }"> Anasayfa </el-breadcrumb-item>
              <el-breadcrumb-item> {{ $route.params.title.replace("-", " ") }} </el-breadcrumb-item>
            </el-breadcrumb>
          </el-card>
          <div v-if="blog_detail.video_link != null">
            {{ blog_detail.video_link }}
          </div>
          <div class="d-flex justify-content-center">
            <el-image :src="getBlogImage(blog_detail.image)" style="width: 1000px"></el-image>
          </div>
          <h1 class="text-center w-100">
            {{ blog_detail.title }}
          </h1>
          <div v-html="blog_detail.content"></div>
          <div class="d-flex justify-content-end fs-7 text-info">
            {{ moment(blog_detail.created_at).format("Do MMMM  YYYY, h:mm") }}
          </div>
          <el-card class="my-4">
            <div class="d-flex">
              <el-image
                :src="getBlogImage(user_detail.profile_picture)"
                class="rounded-circle"
                style="height: 150px; width: 150px; object-fit: contain"
              ></el-image>
              <div class="px-4">
                <h5>{{ user_detail.name_basic }} {{ user_detail.surname }}</h5>
                <p>{{ user_detail.description }}</p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      loading: true,
      blogImgUrl: "https://blog.siberhesap.com/uploads/",
      blog_detail: {},
      user_detail: {},
    };
  },
  mounted() {
    moment.locale("tr");
    this.getBlog();
  },
  methods: {
    moment,
    getBlog() {
      this.$axios.$post("public/tables/blog/" + this.$route.query.b, { params: '{"column_set_id":"0"}' }).then((res) => {
        this.blog_detail = res.data.record;
        document.title = this.blog_detail.title;
        this.getUserData(this.blog_detail.blog_yazari.split("-")[0]);
      });
    },
    getUserData(id) {
      this.$axios.$post("public/tables/users/" + id, { params: '{"column_set_id":"0"}' }).then((res) => {
        this.user_detail = res.data.record;
        this.loading = false;
      });
    },
    getBlogImage(img) {
      if (img == null) return;
      return this.blogImgUrl + JSON.parse(img)?.[0].destination_path + "m_" + JSON.parse(img)?.[0].file_name;
    },
  },
};
</script>
