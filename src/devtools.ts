import VersionMap from './version.json'

declare const window: any

const defineWindowProperty = (name: string, value: any) => {
  if (window[name]) return
  Object.defineProperty(window, name, {
    enumerable: false,
    configurable: true,
    get() {
      return value
    },
  })
}

type Config = {
  packageName?: string | true
  enable: () => void
  // disbale:()=>void TODO
}

export const allDevtools = {
  next: {
    packageName: true,
    enable: () => {
      allDevtools.react.enable()
      defineWindowProperty('next', {
        version: VersionMap.next,
      })
    },
  },
  vite: {
    enable: () => {
      defineWindowProperty('__vite_is_modern_browser', true)
    },
  },
  vitepress: {
    enable: () => {
      defineWindowProperty('__VP_HASH_MAP__', true)
      defineWindowProperty('__vitepress', true)
    },
  },
  element: {
    enable: () => {
      const $div = document.createElement('div')
      $div.classList.add('el-table-column')
      document.body.appendChild($div)
    },
  },
  solid: {
    enable: () => {
      defineWindowProperty('__SOLID_DEVTOOLS__', true)
      defineWindowProperty('Solid$$', true)
    },
  },
  react: {
    enable: () => {
      defineWindowProperty('__REACT_DEVTOOLS_ATTACH__', {})

      if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        try {
          window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
            reconcilerVersion: '100.666',
          })
        } catch {}
      }
    },
  },
  nuxt: {
    enable: () => {
      const $nuxt = {
        config: {},
        data: {},
        path: '/',
        state: {},
        serverRendered: true,
        $root: {
          constructor: {
            config: {
              devtools: false,
            },
          },
        },
      }
      defineWindowProperty('$nuxt', $nuxt)
    },
  },
  vue: {
    enable: () => {
      defineWindowProperty('__VUE__', true)
    },
  },
  svelte: {
    enable: () => {
      defineWindowProperty('__svelte', {
        v: new Set('🤡'),
      })
    },
  },
  angular: {
    enable: () => {
      document.body.setAttribute('ng-version', '🤡')
    },
  },
  redux: {
    enable: () => {
      defineWindowProperty('__REDUX_DEVTOOLS_EXTENSION__', {
        connect: () => '🤡',
      })
    },
  },
  motion: {
    enable: () => {
      defineWindowProperty('__MOTION_DEV_TOOLS__', '🤡')
    },
  },
  framer: {
    enable: () => {
      defineWindowProperty('Framer', {
        version: '100',
        Animatable: true,
      })
      defineWindowProperty('__framer_importFromPackage', true)
    },
  },
  gsap: {
    packageName: true,
    enable: () => {
      defineWindowProperty('gsap', {
        version: VersionMap.gsap,
      })
    },
  },
  three: {
    packageName: true,
    enable: () => {
      defineWindowProperty('THREE', {
        REVISION: VersionMap.three,
      })
    },
  },
  mobx: {
    enable: () => {
      defineWindowProperty('__mobxGlobal', '1')
      defineWindowProperty('__mobxInstanceCount', '1')
      defineWindowProperty('__mobxGlobals', '1')
    },
  },
  tailwind: {
    enable: () => {
      defineWindowProperty('tailwind', '🤡')
    },
  },
  rive: {
    packageName: true,
    enable: () => {
      defineWindowProperty('rive', {
        Rive: '',
      })
    },
  },
  antd: {
    packageName: true,
    enable: () => {
      defineWindowProperty('antd', {
        version: VersionMap.antd,
      })
    },
  },
  naive: {
    enable: () => {
      const $style = document.createElement('style')
      $style.setAttribute('cssr-id', 'n-skeleton')
      $style.innerHTML = `.n-skeleton {}`
      document.head.appendChild($style)
    },
  },
  manoco: {
    enable: () => {
      defineWindowProperty('MonacoEnvironment', {})
      defineWindowProperty('manoco', { editor: {} })
    },
  },
  codemirror: {
    packageName: true,
    enable: () => {
      defineWindowProperty('CodeMirror', {
        version: VersionMap.codemirror,
      })
    },
  },
  vuepress: {
    packageName: true,
    enable: () => {
      defineWindowProperty('__VUEPRESS__', {
        version: VersionMap.vuepress,
      })
    },
  },
  remix: {
    enable: () => {
      defineWindowProperty('__remixContext', {})
    },
  },
  nextui: {
    enable: () => {
      const $style = document.createElement('style')
      $style.innerHTML = `#fake-devfools {--nextui-colors-text: #000}`
      document.head.appendChild($style)
    },
  },
  material: {
    enable: () => {
      defineWindowProperty('ngMaterial', {})
    },
  },
  pwa: {
    enable: () => {
      const $link = document.createElement('link')
      $link.setAttribute('rel', 'manifest')
      document.head.appendChild($link)
    },
  },
  sentry: {
    packageName: true,
    enable: () => {
      defineWindowProperty('__SENTRY__', true)
      defineWindowProperty('Raven', {
        config: {},
      })
      defineWindowProperty('Sentry', {
        SDK_VERSION: VersionMap.sentry,
      })
    },
  },
  styledComponent: {
    enable: () => {
      const $div = document.createElement('div')
      $div.setAttribute('sc-component-id', '🤡')
      document.body.appendChild($div)

      const $style = document.createElement('style')
      $style.setAttribute('data-styled-version', '🤡')
      document.head.appendChild($style)
    },
  },
  webpack: {
    enable: () => {
      defineWindowProperty('webpackChunk', {})
    },
  },
  googleAnalytics: {
    enable: () => {
      defineWindowProperty('gaGlobal', {})
      defineWindowProperty('GoogleAnalyticsObject', {})
    },
  },
  umami: {
    enable: () => {
      defineWindowProperty('umami', {})
    },
  },
  babel: {
    enable: () => {
      defineWindowProperty('_babelPolyfill', {})
    },
  },
  hljs: {
    enable: () => {
      defineWindowProperty('hljs', {
        highlightBlock: {},
        listLanguages: ['javascript'],
      })
    },
  },
  prism: {
    packageName: true,
    enable: () => {
      defineWindowProperty('Prism', {})
      defineWindowProperty('apex', {
        libVersions: { prismJs: { version: VersionMap.prism } },
      })
    },
  },
} satisfies { [key: string]: Config }
