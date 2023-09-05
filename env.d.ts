/// <reference types="vite/client" />
// .d.ts  结尾的文件叫类型文件

declare module '*.vue' {
    import { App, defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent> & {
      install(app: App): void
    }
    export default component
  }