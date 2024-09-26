<script setup lang="ts">

defineProps({
  title: String,
  icon: {
    type: String
  },
  subtitle: {
    type: String,
  },
  prependImage: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <v-card>
    <v-row v-if="prependImage != ''">
      <v-col cols="3" class="pr-0">
        <v-img
          :src="prependImage"
          height="220"
          cover
        >
          <template #placeholder>
            <v-skeleton-loader
              type="image"
              height="300"
              cover
            />
          </template>
        </v-img>
      </v-col>

      <v-col class="pl-0" >
        <v-card-title>
          {{ title }}
        </v-card-title>

        <v-card-subtitle>
          {{ subtitle }}
        </v-card-subtitle>

        <div class="pa-4">
          <slot></slot>
        </div>

        <v-card-actions v-if="$slots.actions" class="card-actions position-absolute bottom-0 right-0">
          <v-spacer />
          <slot name="actions"></slot>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-container v-else>
      <slot></slot>
    </v-container>

    


    <!-- Show default container only, if there is content -->
    <!-- <v-container v-if="$slots.default">
      <slot></slot>
    </v-container> -->

    <!-- Slot for content without padding -->
    <!-- <slot name="withoutContainer"></slot> -->
    
    <!-- Slot for Action Buttons in the right bottom corner -->
    <!-- <v-card-actions v-if="$slots.actions" class="card-actions">
      <v-spacer />
      <slot name="actions"></slot>
    </v-card-actions> -->
  </v-card>
</template>
