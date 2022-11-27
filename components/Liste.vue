<template>
  <div class="row" style="min-height: 500px" v-loading="loading">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" v-for="blog in blogs.records" :key="blog.id">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="getBlogImage(blog.image)" class="image" width="100%" />
        <div style="padding: 14px">
          <span>{{ blog.title }}</span>
          <div class="d-flex align-items-baseline justify-content-between">
            <time class="fs-8">{{ moment(blog.created_at).format("Do MMMM  YYYY") }}</time>
            <a :href="'/detay/' + blog.title.replace(/\s/g, '-') + '?b=' + blog.id">Devamı...</a>
          </div>
        </div>
      </el-card>
    </div>
    <div class="col-12">
      <div class="d-flex justify-content-center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="params.page"
          :page-size="12"
          layout=" prev, pager, next"
          :hide-on-single-page="false"
          background
          :total="blogs.all_records_count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["kategori_id"],
  data() {
    return {
      blogImgUrl: "https://blog.siberhesap.com/uploads/",
      blogs: [],
      loading: true,
      params: {
        page: 1,
        limit: 12,
        sorts: [],
        filters: {},
        column_array_id: 0,
        column_array_id_query: 0,
      },
    };
  },
  watch: {},
  mounted() {
    moment.locale("tr");
    this.getBlogs();
  },
  methods: {
    moment,
    getBlogs() {
      if (this.kategori_id > 0) {
        this.params.filters = {
          kategori_ids: {
            type: 1,
            guiType: "multiselect",
            filter: [this.kategori_id],
          },
        };
      }
      this.$axios.$post("public/tables/blog", { params: JSON.stringify(this.params) }).then((res) => {
        this.blogs = res.data;
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

<style></style>
