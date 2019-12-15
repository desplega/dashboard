<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <slot name="title"></slot>
        <slot name="category"></slot>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field
              :class="[
                { 'md-error': errors.has('name') },
                { 'md-valid': !errors.has('name') && touched.name }
              ]"
            >
              <label>Name</label>
              <md-input
                v-model="name"
                data-vv-name="name"
                type="text"
                v-validate="modelValidations.name"
                required
              ></md-input>
              <slide-y-down-transition>
                <md-icon class="error" v-show="errors.has('name')"
                  >close</md-icon
                >
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon
                  class="success"
                  v-show="!errors.has('name') && touched.name"
                  >done</md-icon
                >
              </slide-y-down-transition>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field
              :class="[
                { 'md-error': errors.has('number') },
                {
                  'md-valid':
                    !errors.has('number') && touched.number && !disableNumber
                }
              ]"
            >
              <label>number</label>
              <md-input
                v-model="number"
                data-vv-name="number"
                type="number"
                v-validate="modelValidations.number"
                required
                :disabled="disableNumber"
              ></md-input>
              <slide-y-down-transition>
                <md-icon class="error" v-show="errors.has('number')"
                  >close</md-icon
                >
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon
                  class="success"
                  v-show="
                    !errors.has('number') && touched.number && !disableNumber
                  "
                  >done</md-icon
                >
              </slide-y-down-transition>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field
              :class="[
                { 'md-error': errors.has('location') },
                { 'md-valid': !errors.has('location') && touched.location }
              ]"
            >
              <label>Location</label>
              <md-input
                v-model="location"
                data-vv-name="location"
                type="text"
                v-validate="modelValidations.location"
                required
              ></md-input>
              <slide-y-down-transition>
                <md-icon class="error" v-show="errors.has('location')"
                  >close</md-icon
                >
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon
                  class="success"
                  v-show="!errors.has('location') && touched.location"
                  >done</md-icon
                >
              </slide-y-down-transition>
            </md-field>
          </div>
        </div>
      </md-card-content>

      <md-card-actions class="text-center">
        <md-button
          native-type="submit"
          @click.native.prevent="validate"
          class="md-info"
        >
          Save
          <md-icon>keyboard_arrow_right</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";

export default {
  name: "edit-register-device-form",
  components: {
    SlideYDownTransition
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    },
    disableNumber: {
      type: Boolean,
      default: false
    },
    device: {
      type: Object,
      default: () => {
        return {
          name: "",
          number: "", // Used to detect if component is called from Register or Edit
          location: ""
        };
      }
    }
  },
  data() {
    return {
      // Device
      name: "",
      number: "",
      location: "",
      // Form validation
      touched: {
        name: false,
        number: false,
        location: false
      },
      modelValidations: {
        name: {
          required: true
        },
        number: {
          required: true,
          numeric: true,
          min: 12,
          max: 12
        },
        location: {
          required: true
        }
      }
    };
  },
  created() {
    if (this.device.number != "") {
      this.name = this.device.name;
      this.number = this.device.number;
      this.location = this.device.location;
    }
  },
  methods: {
    validate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          // Check not empty fields
          let device = {
            name: this.name,
            number: this.number,
            location: this.location
          };
          this.$emit("saveDevice", device);
        }
      });
    }
  },
  watch: {
    name() {
      this.touched.name = true;
    },
    number() {
      this.touched.number = true;
    },
    location() {
      this.touched.location = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}

.text-center {
  justify-content: center !important;
}

input[type="number"]:disabled {
  color: rgba(0, 0, 0, 0.42) !important;
  -webkit-text-fill-color: rgba(0, 0, 0, 0.42) !important;
}
</style>
