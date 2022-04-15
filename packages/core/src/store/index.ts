// 日志的存，取，删
interface ILog {
  // 一条log的唯一Id
  id: number
  // 什么类型的错误，ajax错误，图片加载失败
  type: string
  // log等级
  level: string
  // log内容
  message: string
  // log生成时间
  time: number
}
class LogStores {
  private static instance: LogStores = null
  private states: any[]
  constructor(){
    this.states = []
  }

  setLog(log){
    this.states.push(log)
  }

  getLog(){
    return this.states
  }

  delLog(){}

  clearLog(){
    this.states = []
  }

  static getInstance() {
    if (LogStores.instance) {
      return LogStores.instance
    }
    LogStores.instance = new LogStores()
    return LogStores.instance
  }
}

export default { LogStores: LogStores.getInstance() }
