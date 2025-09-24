<script setup lang="ts">
defineProps<{
  page: any
}>()
</script>

<template>
  <UPageSection
    :title="page.stack.title"
    :ui="{
      container: '!p-0 gap-4 sm:gap-4 w-full overflow-hidden',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium'
    }"
  >
    <template #description>
      <UMarquee
        v-for="(marquee, marqueeIndex) in page.stack.items"
        :key="`marquee-${marqueeIndex}`"
        pause-on-hover
        reverse
        :overlay="false"
        :ui="{
          root: '[--gap:--spacing(4)]',
          content: 'w-auto py-2'
        }"
      >
        <UTooltip
          v-for="(stack, index) in marquee"
          :key="index"
          :delay-duration="0"
          :text="stack.title"
        >
          <UIcon
            :name="stack.icon"
            class="h-10 min-w-10 text-base"
            :style="stack.color ? {
              color: stack.color
            } : {}"
          />
        </UTooltip>
      </UMarquee>
    </template>
  </UPageSection>
</template>
