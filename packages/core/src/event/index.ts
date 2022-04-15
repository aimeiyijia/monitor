// 监听并触发日志处理及存储
// 单例
export class Events {
  private static instance: Events = null
  private events: Object
  constructor() {
    this.events = Object.create(null)
  }
  private on(eventName: string, listener: Function, ctx: any) {
    if (typeof listener !== 'function') {
      console.error('listener必须为函数')
    }

    this.events[eventName].push({
      listener,
      ctx
    })
  }
  private off(eventName: string, listener: Function) {
    // 不指定移除全部
    if (!arguments.length) {
      this.events = Object.create(null)
    }

    const store = this.events[eventName]
    if (!store) {
      console.error(`${eventName}是未注册的事件`)
      return
    }

    if (arguments.length === 1) {
      delete this.events[eventName]
      return
    }

    let cb
    for (let i = 0, len = store.length; i < len; i++) {
      cb = store[i].listener
      if (cb === listener) {
        store.splice(i, 1)
        break
      }
    }
  }
  private emit(eventName: string ) {
    let store = this.events[eventName]
    let args: any

    if (store) {
      // 拷贝
      store = store.slice(0)
      // 获取到事件负载
      args = Array.prototype.slice.call(arguments, 1)
      const payLoad = [{
        eventName,
        data: args ? args[0] : null
      }]
      for (let i = 0, len = store.length; i < len; i++) {
        store[i].listener.apply(store[i].ctx, payLoad)
      }
    } else {
      console.error(`${eventName}事件未注册`)
    }
  }
  static getInstance() {
    if (Events.instance) {
      return Events.instance
    }
    Events.instance = new Events()
    return Events.instance
  }
}

export default { Events: Events.getInstance() }
