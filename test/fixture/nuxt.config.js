export default {
  components: [
    { path: "~/components/awesome", prefix: "awesome", pathPrefix: false },
  ],
  modules: [["../../src/module.js", { withConsole: true }]],
};
