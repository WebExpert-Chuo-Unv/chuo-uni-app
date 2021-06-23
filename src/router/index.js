import Vue from "vue";
import VueRouter from "vue-router";
import LogInPage from "@/views/LogInPage.vue";
import MyPage from "@/views/MyPage.vue";
import PostForm from "@/components/PostForm.vue";
import firebase from "firebase";
import viewpage from "@/components/viewpage.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/LogInPage",
  },
  {
    path: "/LogInPage/",
    name: "LogInPage",
    component: LogInPage,
  },
  {
    path: "/MyPage",
    name: "MyPage",
    component: MyPage,
  },
  {
    path: "/PostForm",
    name: "PostForm",
    component: PostForm,
  },
  {
    path: "/viewpage",
    name: "viewpage",
    component: viewpage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Vue Router のグローバルガードで、ログインしてない場合は、BeforeSignInにしか行けなくする。

let isSignedIn = () => {
  return firebase.auth().currentUser;
};

router.beforeEach((to, from, next) => {
  if (to.name !== "LogInPage" && !isSignedIn()) {
    next("/LogInPage");
  } else {
    next();
  }
});

export default router;
