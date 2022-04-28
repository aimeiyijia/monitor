import { overrideNative, overrideOn, throttle } from '@ame/monitor-utils'

function overrideConsole(): void {
  const windowConsole = window.console
  if (!windowConsole) {
    return
  }

  const originalConsoleTypes = ['log', 'debug', 'info', 'warn', 'error', 'assert']
  originalConsoleTypes.forEach(function (type: string): void {
    if (!(type in windowConsole)) return
    overrideNative(windowConsole, type, function (originalConsole: () => any): Function {
      return function (...args: any[]): void {
        if (originalConsole) {
          originalConsole.apply(windowConsole, args)
        }
      }
    })
  })
}

function overrideXhr(){}

function overrideFetch(){}

function overrideHistory(){}

function overrideUnhandledrejection(){}

function listenClick(){
  if (!('document' in window)) return
  const clickThrottle = throttle(function(){}, 1)
  overrideOn(
    window.document,
    'click',
    function () {
      console.log('点击')
    },
    true
  )
}

function listenError(){}

function listenHashChange(){}
