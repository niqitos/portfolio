<script setup lang="ts">
const { t, locale } = useI18n()

const { data: page } = await useAsyncData(`${locale.value}/projects-page`, () => queryCollection(`pages_${locale.value}`).first())
console.log(page.value)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('error.404'),
    fatal: true
  })
}

const { data: projects } = await useAsyncData('projects', () => queryCollection(`projects_${locale.value}`)
  .order('date', 'DESC')
  .all()
)

const { global } = useAppConfig()

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex items-center gap-2"
        >
          <UButton
            :label="page.links[0]?.label"
            :to="global.meetingLink"
            v-bind="page.links[0]"
          />

          <UButton
            :to="`mailto:${global.email}`"
            v-bind="page.links[1]"
          />
        </div>
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <Motion
        v-for="(project, index) in projects"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          :to="project.url"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last',
            container: '!items-start'
          }"
        >
          <template #leading>
            <div class="text-sm text-muted">
              {{ new Date(project.date).getFullYear() }}
            </div>
          </template>

          <template #footer>
            <div class="flex gap-2 flex-wrap mb-4">
              <UBadge
                v-for="(tag, tagIndex) in project.tags"
                :key="`project-${index}-tag-${tagIndex}`"
                variant="subtle"
                color="neutral"
                :label="tag"
              />
            </div>

            <ULink
              :to="project.url"
              class="text-sm text-primary flex items-center"
            >
              {{ $t('projects.view') }}
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </ULink>
          </template>

          <NuxtImg
            :src="project.image"
            :alt="project.title"
            class="object-cover w-full h-48 rounded-lg"
          />
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
