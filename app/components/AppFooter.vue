<script setup lang="ts">
const { t } = useI18n()
const { footerLinks } = useLinks()
</script>

<template>
  <UFooter
    class="z-10 bg-default"
    :ui="{ left: 'text-muted text-xs' }"
  >
    <template #left>
      {{ `${t('footer.copyright')} • © ${new Date().getFullYear()}` }}
    </template>

    <template #right>
      <template v-if="footerLinks">
        <UButton
          v-for="(link, index) of footerLinks"
          :key="index"
          size="xs"
          color="neutral"
          variant="ghost"
          v-bind="link"
        />
      </template>
    </template>
  </UFooter>
</template>
