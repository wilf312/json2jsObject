import Vue from 'vue'
import Content from '@/components/Content'

describe('Content.vue', () => {
  it('should input data is json string', () => {
    const Constructor = Vue.extend(Content)
    const vm = new Constructor().$mount()
    const input = '{"string":"string","boolean":true,"number":1,"object":{"string":"string","boolean":true,"number":123,"object":{"string":"string"},"array":[true]},"array":["string",555,true]}'

    expect(vm.input).to.equal(input)
  })

  it('should output data is js object string', () => {
    const Constructor = Vue.extend(Content)
    const vm = new Constructor().$mount()
    const output = '{\n' +
      '  string: \'string\',\n' +
      '  boolean: true,\n' +
      '  number: 1,\n' +
      '  object:   {\n' +
      '    string: \'string\',\n' +
      '    boolean: true,\n' +
      '    number: 123,\n' +
      '    object:     {\n' +
      '      string: \'string\'\n' +
      '    },\n' +
      '    array: [\n' +
      '      true\n' +
      '    ]\n' +
      '  },\n' +
      '  array: [\n' +
      '    \'string\',\n' +
      '    555,\n' +
      '    true\n' +
      '  ]\n' +
      '}'

    expect(vm.output).to.equal(output)
  })
})
