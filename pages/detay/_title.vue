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

          <div class="row">
            <div class="col-12 col-sm-11">
              <div v-if="blog_detail.video_link != null" class="d-flex justify-content-center">
                <iframe
                  width="1000px"
                  height="500px"
                  :src="blog_detail.video_link.replace('watch?v=', 'embed/').split('&t')[0]"
                  :title="blog_detail.title"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
              <div v-else class="d-flex justify-content-center">
                <el-image :src="getBlogImage(blog_detail.image)" :alt="blog_detail.title" style="width: 1000px"></el-image>
              </div>
              <h1 class="text-center w-100 my-3">
                {{ blog_detail.title }}
              </h1>

              <div class="container my-3 p-0 px-sm-1 px-md-2 px-lg-3 px-xl-4 px-xxl-5">
                <div v-html="blog_detail.html_content"></div>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="my-3 d-flex">
                  <el-tag class="m-1" v-for="ktg in blog_kategoriler" :key="ktg"> {{ ktg.display }} </el-tag>
                </div>
                <label for="">{{ moment(blog_detail.created_at).format("Do MMMM  YYYY, h:mm") }}</label>
              </div>

              <div class="d-flex d-sm-none">
                <div class="">
                  <a
                    class="btn rounded-circle pt-2 mx-1 cursor-pointer"
                    :class="begeni_state == true ? 'btn-primary' : 'btn-secondary'"
                    @click="setBegeni()"
                    @mouseenter="begeni_visible = true"
                    @mouseleave="begeni_visible = false"
                  >
                    <div v-if="islogin">
                      <div v-if="!begeni_visible" style="width: 20px" class="text-center">
                        <i class="fs-5">{{ blog_detail.blog_begeni_sayisi > 0 ? blog_detail.blog_begeni_sayisi : 0 }}</i>
                      </div>

                      <div v-if="begeni_visible">
                        <i v-if="begeni_state" class="bi m-0 fs-5 bi-star-fill"></i>
                        <i v-else class="bi m-0 fs-5 bi-star"></i>
                      </div>
                    </div>
                    <div v-else style="width: 20px" class="text-center">
                      <i class="fs-5">{{ blog_detail.blog_begeni_sayisi > 0 ? blog_detail.blog_begeni_sayisi : 0 }}</i>
                    </div>
                  </a>
                </div>
                <div>
                  <a
                    class="btn rounded-circle pt-2 btn-secondary mx-1"
                    :href="'https://www.facebook.com/sharer/sharer.php?u=' + location_href"
                    target="_blank"
                  >
                    <i class="bi m-0 fs-5 bi-facebook"></i>
                  </a>
                </div>
                <div>
                  <a
                    class="btn rounded-circle pt-2 btn-secondary mx-1"
                    :href="'whatsapp://send?text=' + location_href"
                    data-action="share/whatsapp/share"
                    ><i class="bi m-0 fs-5 bi-whatsapp"></i
                  ></a>
                </div>
                <div>
                  <a
                    class="btn rounded-circle pt-2 btn-secondary mx-1"
                    :href="'https://twitter.com/intent/tweet?text=' + location_href"
                    target="_blank"
                    ><i class="bi m-0 fs-5 bi-twitter"></i
                  ></a>
                </div>
                <div>
                  <a
                    class="btn rounded-circle pt-2 btn-secondary mx-1"
                    :href="'https://www.linkedin.com/sharing/share-offsite/?url=' + location_href"
                    target="_blank"
                    ><i class="bi m-0 fs-5 bi-linkedin"></i
                  ></a>
                </div>
              </div>
              <el-card class="my-4">
                <div class="d-flex">
                  <el-image
                    :src="getBlogImage(user_detail.profile_picture)"
                    class="rounded-circle"
                    style="height: 100px; width: 100px; object-fit: contain"
                    :alt="blog_detail.title"
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
                        <a :href="'/detay/' + blog.title.replace(/s/g, '-') + '?b=' + blog.id" class="text-white"
                          >Devamı...</a
                        >
                      </div>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="my-5"></div>
            </div>
            <div class="d-none d-sm-block col-sm-1 position-relative">
              <div class="d-flex flex-column position-sticky" style="top: calc(50vh - 162px)">
                <div class="">
                  <a
                    class="btn rounded-circle pt-2 my-1 cursor-pointer"
                    :class="begeni_state == true ? 'btn-primary' : 'btn-secondary'"
                    @click="setBegeni()"
                    @mouseenter="begeni_visible = true"
                    @mouseleave="begeni_visible = false"
                  >
                    <div v-if="islogin">
                      <div v-if="!begeni_visible" style="width: 20px" class="text-center">
                        <i class="fs-5">{{ blog_detail.blog_begeni_sayisi > 0 ? blog_detail.blog_begeni_sayisi : 0 }}</i>
                      </div>

                      <div v-if="begeni_visible">
                        <i v-if="begeni_state" class="bi m-0 fs-5 bi-star-fill"></i>
                        <i v-else class="bi m-0 fs-5 bi-star"></i>
                      </div>
                    </div>
                    <div v-else style="width: 20px" class="text-center">
                      <i class="fs-5">{{ blog_detail.blog_begeni_sayisi > 0 ? blog_detail.blog_begeni_sayisi : 0 }}</i>
                    </div>
                  </a>
                </div>

                <div>
                  <a
                    class="btn rounded-circle pt-2 btn-secondary my-1"
                    :href="'https://www.facebook.com/sharer/sharer.php?u=' + location_href"
                    target="_blank"
                  >
                    <i class="bi m-0 fs-5 bi-facebook"></i>
                  </a>
                </div>
                <div>
                  <a
                    class="btn rounded-circle pt-2 btn-secondary my-1"
                    :href="'whatsapp://send?text=' + location_href"
                    data-action="share/whatsapp/share"
                    ><i class="bi m-0 fs-5 bi-whatsapp"></i
                  ></a>
                </div>
                <div>
                  <a
                    class="btn rounded-circle pt-2 btn-secondary my-1"
                    :href="'https://twitter.com/intent/tweet?text=' + location_href"
                    target="_blank"
                    ><i class="bi m-0 fs-5 bi-twitter"></i
                  ></a>
                </div>
                <div>
                  <a
                    class="btn rounded-circle pt-2 btn-secondary my-1"
                    :href="'https://www.linkedin.com/sharing/share-offsite/?url=' + location_href"
                    target="_blank"
                    ><i class="bi m-0 fs-5 bi-linkedin"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="d-flex w-100 flex-column">
            <div v-if="islogin">
              <span>Yorumunuz:</span>
              <el-input type="textarea" :rows="3" placeholder="Yorumunuzu buraya yazabilirsiniz." v-model="yorum_content">
              </el-input>
              <div class="d-flex justify-content-end">
                <el-button type="primary" class="my-2" @click="setYorum()"> Gönder</el-button>
              </div>
            </div>

            <div class="my-5">
              <el-timeline class="ps-0">
                <el-timeline-item
                  v-for="yorum in yorumlar"
                  :key="yorum"
                  :timestamp="moment(yorum.created_at).format('Do MMMM  YYYY, h:mm')"
                  placement="top"
                >
                  <el-card>
                    <span class="h5">{{ yorum.user_id }}</span>
                    <p>{{ yorum.content }}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
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
      begeni_state: false,
      begeni_id: 0,
      begeni_visible: false,
      islogin: false,
      yorumlar: [],
      yorum_content: "",
    };
  },
  mounted() {
    moment.locale("tr");
    this.islogin = this.$auth.$storage.getUniversal("token");
    this.location_href = "https://ishesap-blog.vercel.app" + this.$route.path; //window.location.href;
    this.getBlog();
    if (this.islogin) {
      this.getBegeni();
    }
    this.getYorumlar();
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
    getBegeni() {
      let params = {
        page: 1,
        limit: 1,
        sorts: [],
        column_array_id: 0,
        column_array_id_query: 0,
        filters: {
          blog_id: { type: 1, guiType: "multiselect", filter: [this.$route.query.b] },
          user_id: { type: 1, guiType: "multiselect", filter: [this.$auth.$storage.getUniversal("user")?.user?.id] },
        },
      };

      this.$axios.$post("public/tables/blog_begeni", { params: JSON.stringify(params) }).then((res) => {
        this.begeni_state = res.data.all_records_count > 0;
        this.begeni_id = res.data.records[0].id;
      });
    },
    setBegeni() {
      if (this.begeni_state == false) {
        this.$axios
          .$post(this.$auth.$storage.getUniversal("token") + "/tables/blog_begeni/store", {
            blog_id: this.$route.query.b,
            column_set_id: "0",
          })
          .then((res) => {
            this.begeni_state = true;
          });
      } else {
        this.$axios
          .$post(this.$auth.$storage.getUniversal("token") + "/tables/blog_begeni/" + this.begeni_id + "/delete")
          .then((res) => {
            this.begeni_state = false;
          });
      }
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
    getYorumlar() {
      let params = {
        page: 1,
        limit: 20,
        sorts: [],
        column_array_id: 0,
        column_array_id_query: 0,
        filters: {
          blog_id: { type: 1, guiType: "multiselect", filter: [this.$route.query.b] },
          state: { type: 1, guiType: "boolean", filter: true },
        },
      };

      this.$axios.$post("public/tables/yorumlar", { params: JSON.stringify(params) }).then((res) => {
        this.yorumlar = res.data.records;
      });
    },
    setYorum() {
      this.$axios
        .$post(this.$auth.$storage.getUniversal("token") + "/tables/yorumlar/store", {
          blog_id: this.$route.query.b,
          content: this.yorum_content,
          column_set_id: "0",
        })
        .then((res) => {
          if (res.data.message == "success") {
            this.$message({
              message: "Yorum Başarıyla Gönderildi",
              type: "success",
            });
          } else {
            this.$message({
              message: "Yorum Gönderilirken Bir Hata İle Karşılaşıldı.",
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "Yorum Gönderilirken Bir Hata İle Karşılaşıldı.",
            type: "error",
          });
        });
    },
  },
};
</script>
