<template>
  <md-card class="md-card-not-found" :class="{ 'md-card-hidden': cardHidden }">
    <md-card-header :class="getClass(headerColor)">
      <slot name="title"></slot>
    </md-card-header>

    <md-card-content>
      <slot name="description"></slot>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: "not-found-card",
  props: {
    headerColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      cardHidden: true
    };
  },
  beforeMount() {
    setTimeout(this.showCard, 400);
  },
  methods: {
    showCard: function() {
      this.cardHidden = false;
    },
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    }
  }
};
</script>

<style lang="css">
.md-card-not-found .description {
  font-size: 20px;
}
</style>
