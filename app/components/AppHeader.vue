<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'

const { navLinks } = useLinks()

const { locale, locales, setLocale: setI18nLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const setLocale = (value: SupportedLocale) => {
  if (locales.value.filter((i: LocaleObject) => i.code !== value)) {
    setI18nLocale(value)

    location.href = switchLocalePath(value)
  }
}
</script>

<template>
  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10">
    <UNavigationMenu
      :items="navLinks"
      variant="link"
      color="neutral"
      class="bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-1',
        linkLeadingIcon: 'hidden'
      }"
    >
      <template #list-trailing>
        <ULocaleSelect
          v-model="locale"
          variant="ghost"
          :locales="locales.map((l: LocaleObject) => ({
            name: l.name?.substring(0, 3),
            code: l.code,
            dir: l.dir
          })) as any[]"
          @update:model-value="setLocale($event as SupportedLocale)"
        />

        <ColorModeButton />
      </template>
    </UNavigationMenu>
  </div>
</template>
