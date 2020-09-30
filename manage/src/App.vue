<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  @import "assets/css/base.less";
  @import "assets/css/iview_reset.less";
#app {
  font-family: "microsoft yahei", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
i{
	font-size: 18px;
}
</style>
