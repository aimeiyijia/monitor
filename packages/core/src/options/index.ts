// 配置项相关
export class Options {
  beforeAppAjaxSend: Function = () => {}
  enableTraceId: Boolean
  filterXhrUrlRegExp: RegExp
  includeHttpUrlTraceIdRegExp: RegExp
  traceIdFieldName = 'Trace-Id'
  throttleDelayTime = 0
  maxDuplicateCount = 2

  constructor() {
    this.enableTraceId = false
  }
}

