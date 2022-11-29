<template>
  <div>
    <Header :ktg_visible="true"></Header>
    <div class="d-flex">
      <Aside v-if="false"></Aside>
      <div style="height: calc(100vh - 61px - 64px)" class="overflow-auto w-100 py-4 px-2">
        <div class="container">
          <el-carousel indicator-position="inside" height="500px" :autoplay="true">
            <el-carousel-item v-for="ktg in slider" :key="ktg" class="rounded">
              <div class="position-relative">
                <el-image :src="getBlogImage(ktg.image)" style="height: 500px; width: 100%" fit="cover">
                  <div slot="placeholder" v-loading="true">Yükleniyor<span class="dot">...</span></div>
                </el-image>
                <div
                  class="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center top-0"
                  style="background: rgba(0, 0, 0, 0.7)"
                >
                  <h1 class="text-white display-2 w-100 px-4 text-center">{{ ktg.title }}</h1>
                  <el-button
                    type="warning"
                    size="small"
                    @click="$router.push('/kategori/' + ktg.title.replace(/\s/g, '-') + '?k=' + ktg.id)"
                  >
                    <a :href="'/kategori/' + ktg.title.replace(/\s/g, '-') + '?k=' + ktg.id">Daha fazla...</a>
                  </el-button>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="row my-5">
            <div
              class="col-12 col-sm-6 col-md-3 cursor-pointer"
              @click="yonlendir('kobi')"
              @mouseenter="kobi_card = true"
              @mouseleave="kobi_card = false"
            >
              <transition name="el-fade-in">
                <el-card v-if="!kobi_card">
                  <div class="d-flex align-items-center flex-column justify-content-center">
                    <img src="/icon/is_black3.png" class="m-0" style="max-height: 30px" alt="" />
                    <h4 class="m-0">Kobi</h4>
                  </div>
                </el-card>
                <el-card v-show="kobi_card" class="bg-dark">
                  <div class="d-flex align-items-center flex-column justify-content-center">
                    <img src="/icon/is_white3.png" class="m-0" style="max-height: 30px" alt="" />
                    <h4 class="m-0 text-white">Kobi</h4>
                  </div>
                </el-card>
              </transition>
            </div>
            <div
              class="col-12 col-sm-6 col-md-3 cursor-pointer"
              @click="yonlendir('onmuhasebe')"
              @mouseenter="on_card = true"
              @mouseleave="on_card = false"
            >
              <transition name="el-fade-in">
                <el-card v-if="!on_card">
                  <div class="d-flex align-items-center flex-column justify-content-center">
                    <img src="/icon/is_black3.png" class="m-0" style="max-height: 30px" alt="" />
                    <h4 class="m-0">Ön Muhasebe</h4>
                  </div>
                </el-card>
                <el-card v-show="on_card" class="bg-dark">
                  <div class="d-flex align-items-center flex-column justify-content-center">
                    <img src="/icon/is_white3.png" class="m-0" style="max-height: 30px" alt="" />
                    <h4 class="m-0 text-white">Ön Muhasebe</h4>
                  </div>
                </el-card>
              </transition>
            </div>
            <div
              class="col-12 col-sm-6 col-md-3 cursor-pointer"
              @click="yonlendir('muhasebe')"
              @mouseenter="resmi_card = true"
              @mouseleave="resmi_card = false"
            >
              <transition name="el-fade-in">
                <el-card v-if="!resmi_card">
                  <div class="d-flex align-items-center flex-column justify-content-center">
                    <img src="/icon/is_black3.png" class="m-0" style="max-height: 30px" alt="" />
                    <h4 class="m-0">Resmi Muhasebe</h4>
                  </div>
                </el-card>
                <el-card v-show="resmi_card" class="bg-dark">
                  <div class="d-flex align-items-center flex-column justify-content-center">
                    <img src="/icon/is_white3.png" class="m-0" style="max-height: 30px" alt="" />
                    <h4 class="m-0 text-white">Resmi Muhasebe</h4>
                  </div>
                </el-card>
              </transition>
            </div>
            <div
              class="col-12 col-sm-6 col-md-3 cursor-pointer"
              @click="yonlendir('kobi')"
              @mouseenter="donusum_card = true"
              @mouseleave="donusum_card = false"
            >
              <transition name="el-fade-in">
                <el-card v-if="!donusum_card">
                  <div class="d-flex align-items-center flex-column justify-content-center">
                    <img src="/icon/is_black3.png" class="m-0" style="max-height: 30px" alt="" />
                    <h4 class="m-0">E-Dönüşüm</h4>
                  </div>
                </el-card>
                <el-card v-show="donusum_card" class="bg-dark">
                  <div class="d-flex align-items-center flex-column justify-content-center">
                    <img src="/icon/is_white3.png" class="m-0" style="max-height: 30px" alt="" />
                    <h4 class="m-0 text-white">E-Dönüşüm</h4>
                  </div>
                </el-card>
              </transition>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6" v-for="blog in bloglar" :key="blog.id">
              <main class="main-cards">
                <section class="main-card main-card-one" :style="{ background: 'url(' + getBlogImage(blog.image) + ')' }">
                  <div class="top">
                    <div class="actions">
                      <i class="fa-regular fa-bookmark"></i>
                      <i class="fa-regular fa-heart"></i>
                      <i class="fa-regular fa-comment"></i>
                      <i class="fa-solid fa-share-nodes"></i>
                    </div>
                  </div>
                  <div class="bottom w-100">
                    <div class="author">
                      <span>{{ moment(blog.created_at).format("Do MMMM  YYYY, h:mm") }}</span>
                    </div>
                    <h1 class="ellipsis-1">{{ blog.title }}</h1>
                    <div class="text">
                      <p class="ellipsis-1">{{ blog.content }}</p>
                      <el-tag type="primary" size="small">
                        <a :href="'/detay/' + blog.title.replace(/\s/g, '-') + '?b=' + blog.id">Devamı...</a>
                      </el-tag>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
          <div class="my-5">
            <el-tag class="m-2" v-for="ktg in kategoriler" :key="ktg.id">
              <a :href="'/kategori/' + ktg.title.replace(/\s/g, '-') + '?k=' + ktg.id">{{ ktg.title }}</a>
            </el-tag>
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
      blogImgUrl: "https://blog.siberhesap.com/uploads/",
      kategoriler: [],
      bloglar: [],
      slider: [],
      kobi_card: false,
      on_card: false,
      resmi_card: false,
      donusum_card: false,
    };
  },
  mounted() {
    moment.locale("tr");
    this.getKategoriler();
    this.getBlogs();
  },
  methods: {
    moment,
    getKategoriler() {
      const prm = {
        limit: 100,
        page: 1,
        sorts: {},
        filters: {},
        column_array_id: 0,
        column_array_id_query: 0,
      };
      this.$axios.$post("public/tables/kategori", { params: JSON.stringify(prm) }).then((res) => {
        this.slider = [];
        let say = 0;
        for (const val of Object.values(res.data.records)) {
          this.slider.push(val);
          say++;
          if (say == 6) break;
        }
        this.kategoriler = res.data.records;
      });
    },
    getBlogs() {
      const prm = {
        limit: 6,
        page: 1,
        sorts: {},
        filters: {},
        column_array_id: 0,
        column_array_id_query: 0,
      };
      this.$axios.$post("public/tables/blog", { params: JSON.stringify(prm) }).then((res) => {
        this.bloglar = res.data.records;
      });
    },
    getBlogImage(img) {
      if (img == null) return;
      return this.blogImgUrl + JSON.parse(img)?.[0].destination_path + "m_" + JSON.parse(img)?.[0].file_name;
    },
    yonlendir(name) {
      window.open("https://ishesap-landing.vercel.app/" + name);
    },
  },
};
</script>
<style>
ol,
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}

.main-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  background-color: #fff;
  height: 200px;
  padding: 1rem;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.main-card-one {
  background-size: cover !important;
  background-position-x: center !important;
  background-position-y: center !important;
}

/* top */
.top {
  display: flex;
  justify-content: space-between;
  opacity: 0.8;
}

.actions i {
  margin-left: 0.5em;
  transition: transform 200ms ease-in-out;
}

.actions i:hover {
  cursor: pointer;
  transform: scale(1.2) translatey(-0.2em);
}

/* bottom */
.bottom {
  position: relative;
  z-index: 1;
  transform: translateY(50%);
  transition: transform 500ms ease;
}

.bottom::after {
  /*   outline: 1px solid tomato; */
  z-index: -1;
  content: "";
  position: absolute;
  bottom: -1em;
  left: -1em;
  right: 0;
  width: calc(100% + 2rem);
  height: calc(100% + 5rem);
  background: linear-gradient(to top, rgba(0 0 0 / 0.9), rgba(0 0 0 / 0));
}

.bottom:hover,
.bottom:hover::after {
  transform: translateY(0);
}

.author {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  opacity: 0.8;
}

.author-img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 4px;
}

.bottom h1 {
  display: inline-block;
  font-size: 2.5em;
  position: relative;
  margin-bottom: 0.3em;
}

.bottom h1::after {
  position: absolute;
  content: "";
  bottom: -0.2em;
  left: -2rem;
  width: calc(100% + 2rem);
  height: 0.1em;
  background-color: #8aeef1;
  transform: scaleX(0);
  transition: transform 600ms ease;
  transform-origin: right;
}

.bottom:hover h1::after {
  transform: scaleX(1);
  transform-origin: left;
}

.text {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.text p {
  font-weight: 100;
}
</style>
