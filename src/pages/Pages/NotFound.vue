<template>
  <div class="md-layout text-center">
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <not-found-card header-color="red">
        <h1 slot="title" class="title">404</h1>
        <p slot="description" class="description">
          We're sorry, we couldn't find the page you requested.
        </p>
      </not-found-card>
    </div>
  </div>
</template>
<script>
import { NotFoundCard } from "@/components";
export default {
  components: {
    NotFoundCard
  }
};
</script>

<style>
.text-center {
  text-align: center;
}
</style>
