import * as util from '../index'
import {strictEqual} from 'assert'

describe('createString', () => {
  it('string text \'test\'', () => {
    const value = 'test'
    strictEqual(util.createString(value), `'${value}'`)
  })
})

describe('createNumber', () => {
  it('number text 123', () => {
    const value = 123
    strictEqual(util.createNumber(value), `${value}`)
  })
})

describe('test', () => {
  it('number text 123', () => {
    const value = 123
    strictEqual(util.createNumber(value), `${value}`)
  })
})

describe('createBoolean', () => {
  it('boolean text true', () => {
    const value = true
    strictEqual(util.createBoolean(value), 'true')
  })
  it('boolean text false', () => {
    const value = false
    strictEqual(util.createBoolean(value), 'false')
  })
})
