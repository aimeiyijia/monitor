import { overrideNative } from '@zyf2e/monitor-utils'
function override(source, name: string, replacement: (...args: any[]) => any, isForced = false): void {
  if (source === undefined) return
  if (name in source || isForced) {
    const original = source[name]
    const wrapped = replacement(original)
    if (typeof wrapped === 'function') {
      source[name] = wrapped
    }
  }
}

function overrideConsole(): void {
  const windowConsole = window.console
  if (!windowConsole) {
    return
  }

  const originalConsoleTypes = ['log', 'debug', 'info', 'warn', 'error', 'assert']
  originalConsoleTypes.forEach(function (level: string): void {
    if (!(level in windowConsole)) return
    overrideNative(windowConsole, level, function (originalConsole: () => any): Function {
      return function (...args: any[]): void {
        if (originalConsole) {
          originalConsole.apply(windowConsole, args)
        }
      }
    })
  })
}
