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
          <h1 class="text-center w-100 my-3">
            {{ blog_detail.title }}
          </h1>
          <div class="my-3 d-flex justify-content-end">
            <el-tag class="m-1" v-for="ktg in blog_kategoriler" :key="ktg"> {{ ktg.display }} </el-tag>
          </div>
          <div class="container my-3 p-0 px-sm-1 px-md-2 px-lg-3 px-xl-4 px-xxl-5">
            <div v-html="blog_detail.html_content"></div>
          </div>
          <div class="d-flex justify-content-between my-3 fs-7 text-info">
            <div class="d-flex">
              <a class="btn btn-secondary rounded-circle pt-2 mx-1 cursor-pointer"
                ><i class="bi m-0 fs-5 bi-bookmark"></i
              ></a>
              <a class="btn btn-secondary rounded-circle pt-2 mx-1 cursor-pointer"
                ><i class="bi m-0 fs-5 bi-hand-thumbs-up"></i
              ></a>
              <a
                class="btn rounded-circle pt-2 btn-secondary mx-1"
                :href="'https://www.facebook.com/sharer/sharer.php?u=' + location_href"
                target="_blank"
              >
                <i class="bi m-0 fs-5 bi-facebook"></i>
              </a>
              <a
                class="btn rounded-circle pt-2 btn-secondary mx-1"
                :href="'whatsapp://send?text=' + location_href"
                data-action="share/whatsapp/share"
                ><i class="bi m-0 fs-5 bi-whatsapp"></i
              ></a>
              <a
                class="btn rounded-circle pt-2 btn-secondary mx-1"
                :href="'https://twitter.com/intent/tweet?text=' + location_href"
                target="_blank"
                ><i class="bi m-0 fs-5 bi-twitter"></i
              ></a>
              <a
                class="btn rounded-circle pt-2 btn-secondary mx-1"
                :href="'https://www.linkedin.com/sharing/share-offsite/?url=' + location_href"
                target="_blank"
                ><i class="bi m-0 fs-5 bi-linkedin"></i
              ></a>
            </div>
            <label for="">{{ moment(blog_detail.created_at).format("Do MMMM  YYYY, h:mm") }}</label>
          </div>
          <el-card class="my-4">
            <div class="d-flex">
              <el-image
                :src="getBlogImage(user_detail.profile_picture)"
                class="rounded-circle"
                style="height: 100px; width: 100px; object-fit: contain"
              ></el-image>
              <div class="px-4">
                <h5>{{ user_detail.name_basic }} {{ user_detail.surname }}</h5>
                <p>{{ user_detail.description }}</p>
              </div>
            </div>
          </el-card>

          <div class="my-4">
            <h3>Diğer Bloglarımız</h3>
            <el-divider></el-divider>
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="blog in blogs" :key="blog.title">
                <div class="position-relative card">
                  <el-image :src="getBlogImage(blog.image)" fit="cover" class="w-100" style="height: 200px">
                    <div slot="placeholder" class="image-slot">Loading<span class="dot">...</span></div>
                  </el-image>

                  <div
                    class="position-absolute flex-column text-center top-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style="background: rgba(0, 0, 0, 0.7)"
                  >
                    <h4 class="text-white">{{ blog.title }}</h4>
                    <a :href="'/detay/' + blog.title.replace(/\s/g, '-') + '?b=' + blog.id" class="text-white">Devamı...</a>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="my-5"></div>
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
      blog_kategoriler: {},
      blogs: {},
      location_href: "",
    };
  },
  mounted() {
    moment.locale("tr");
    this.location_href = "https://ishesap-blog.vercel.app" + this.$route.path; //window.location.href;
    this.getBlog();
  },
  methods: {
    moment,
    getBlog() {
      this.$axios.$post("public/tables/blog/" + this.$route.query.b, { params: '{"column_set_id":"0"}' }).then((res) => {
        this.blog_detail = res.data.record;
        document.title = this.blog_detail.title;
        this.blog_kategoriler = JSON.parse(this.blog_detail.kategori_ids);
        this.getDigerBloglar();
        this.getUserData(this.blog_detail.blog_yazari.split("-")[0]);
      });
    },
    getUserData(id) {
      this.$axios.$post("public/tables/users/" + id, { params: '{"column_set_id":"0"}' }).then((res) => {
        this.user_detail = res.data.record;
        this.loading = false;
      });
    },
    getDigerBloglar() {
      let params = {
        page: 1,
        limit: 6,
        sorts: [],
        column_array_id: 0,
        column_array_id_query: 0,
        filters: {},
      };
      console.log("params", params);
      this.$axios.$post("public/tables/blog", { params: JSON.stringify(params) }).then((res) => {
        this.blogs = res.data.records;
      });
    },
    getBlogImage(img) {
      if (img == null) return;
      return this.blogImgUrl + JSON.parse(img)?.[0].destination_path + "m_" + JSON.parse(img)?.[0].file_name;
    },
  },
};
</script>
