<template>
  <div class="position-relative" style="width: auto; height: calc(100vh - 61px - 64px)">
    <transition name="el-fade-in">
      <el-menu
        v-show="getMenuVisible && loaded"
        :class="width < 900 ? 'position-absolute' : ''"
        :default-active="this.$route.path"
        class="top-0 h-100 overflow-auto"
        router
        :collapse-transition="false"
      >
        <el-menu-item v-for="k in kategori" :key="k" :index="'/kategori/' + k.title.replace(/\s/g, '-') + '?k=' + k.id">
          <i :class="k.icon"></i>
          {{ k.title }}
        </el-menu-item>

        <el-menu-item v-if="width < 900" class="text-danger" @click="menuKapat()">
          <i class="bi bi-x-lg h5"></i>
          <span>Menüyü Kapat</span>
        </el-menu-item>
      </el-menu>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      width: 0,
      links: {},
      loaded: false,
    };
  },
  mounted() {
    this.width = window.innerWidth;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      if (window.innerWidth < 900) {
        this.$store.commit("setMenuVisible", false);
      } else {
        this.$store.commit("setMenuVisible", true);
      }
    });
    this.getKategori();
  },
  methods: {
    menuKapat() {
      this.$store.commit("setMenuVisible", false);
    },
    getKategori() {
      const prm = {
        page: 1,
        limit: 1000,
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
  computed: {
    ...mapGetters(["getMenuVisible"]),
  },
};
</script>

<style></style>
