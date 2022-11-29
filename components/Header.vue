<template>
  <el-menu
    :default-active="this.$route.path"
    class="d-flex"
    mode="horizontal"
    @select="handleSelect"
    :class="width < 900 ? ' justify-content-between' : ''"
    router
  >
    <!--Mobil görünümde aside'ı açan buton-->
    <el-menu-item @click="setMenu()" v-show="width < 900 && !ktg_visible">
      <i v-show="!getMenuVisible" class="bi bi-list h2"></i>
      <i v-show="getMenuVisible" class="bi bi-x-lg h2"></i>
    </el-menu-item>
    <!--Site logosu-->
    <el-menu-item index="/" class="active-iptal" :class="width < 900 ? 'w-100 text-center' : ''">
      <div class="d-flex h-100 align-items-center">
        <img src="/icon/is_black3.png" class="m-0" style="max-height: 30px" alt="" />
        <h5 class="m-0">&nbsp;- Blog</h5>
      </div>
    </el-menu-item>
    <!--Kategorinin gösterilmesi isteniyorsa açılan menü-->
    <template v-if="ktg_visible && width >= 900">
      <el-menu-item index="/kategori/tumu">Tümü</el-menu-item>
      <el-menu-item v-for="k in kategori" :key="k" :index="'/kategori/' + k.title.replace(/\s/g, '-') + '?k=' + k.id">
        <i :class="k.icon"></i>
        {{ k.title }}
      </el-menu-item>
    </template>
    <!--Masaüstü görünümde linkler arasına boşluk ver -->
    <el-menu-item v-if="width >= 900" class="w-100 active-iptal"></el-menu-item>

    <!--Kullanıcı işlemleri-->
    <template v-if="this.$auth.$storage.getUniversal('token')">
      <el-menu-item class="" index="/profil">Profil </el-menu-item>
    </template>
    <template v-else>
      <el-menu-item index="/uye-ol">Üye Ol</el-menu-item>

      <el-menu-item index="/giris-yap">Giriş Yap</el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["ktg_visible"],
  data() {
    return {
      width: 0,
      kategori: [],
    };
  },
  methods: {
    setMenu() {
      console.log(this.getMenuVisible);
      if (this.getMenuVisible) {
        this.$store.commit("setMenuVisible", false);
      } else {
        this.$store.commit("setMenuVisible", true);
      }
    },
    getKategori() {
      const prm = {
        page: 1,
        limit: 5,
        sorts: [],
        filters: [],
        column_array_id: 0,
        column_array_id_query: 0,
      };
      this.$axios.$post("/public/tables/kategori", { params: JSON.stringify(prm) }).then((res) => {
        this.kategori = res.data.records;
        this.loaded = true;
      });
    },
  },
  mounted() {
    this.width = window.innerWidth;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
    });
    if (this.ktg_visible == true) {
      this.getKategori();
    }
  },
  computed: {
    ...mapGetters(["getMenuVisible"]),
  },
};
</script>

<style>
.active-iptal {
  border-bottom: none !important;
}
.el-menu-item {
  padding: 0 5px !important;
}
@media screen and (min-width: 900px) {
  .el-menu-item {
    padding: 0 25px !important;
  }
}
</style>
