import type { NavigationMenuItem } from '@nuxt/ui'

export const useLinks = () => {
  const { t } = useI18n()

  const navLinks = ref<NavigationMenuItem[]>([
    {
      label: t('index.title'),
      icon: 'i-lucide:home',
      to: '/'
    },
    {
      label: t('projects.title'),
      icon: 'i-lucide:folder',
      to: '/projects'
    },
    // {
    //   label: t('blog.title'),
    //   icon: 'i-lucide:file-text',
    //   to: '/blog'
    // },
    // {
    //   label: t('speaking.title'),
    //   icon: 'i-lucide:mic',
    //   to: '/speaking'
    // },
    {
      label: t('about.title'),
      icon: 'i-lucide:user',
      to: '/about'
    }
  ])

  const footerLinks = ref<any>([
    {
      icon: 'i-simple-icons:whatsapp',
      to: 'https://wa.me/380637369690',
      target: '_blank',
      ariaLabel: t('footer.icons.whatsapp')
    },
    {
      icon: 'i-simple-icons:telegram',
      to: 'http://t.me/niqitos',
      target: '_blank',
      ariaLabel: t('footer.icons.telegram')
    },
    {
      icon: 'i-simple-icons:github',
      to: 'https://github.com/niqitos',
      target: '_blank',
      ariaLabel: t('footer.icons.github')
    }
  ])

  return {
    navLinks,
    footerLinks
  }
}
