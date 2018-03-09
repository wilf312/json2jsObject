<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row justify-space-around>
        <v-flex xs5>
          <v-text-field
            v-model="input"
            label="JSON"
            textarea
            multi-line
            box
          ></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            v-model="_output"
            label="JS Object"
            textarea
            multi-line
            box
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import Const from '../config/Const'
import * as util from '../util/index'

export default {
  data () {
    return Object.assign({}, Const.CONTENT_INIT)
  },
  name: 'Content',
  methods: {
    ...util,
    json2JSObjectString: function (json) {
      const jsObj = JSON.parse(json)
      if (Array.isArray(jsObj)) {
        this.output = this.getArray(null, jsObj)
      } else {
        this.output = this.parseObject(jsObj)
      }

      return jsObj
    },
    execType: function (key, value) {
      const type = typeof value
      if (type === 'string') {
        return this.getString(key, value)
      } else if (type === 'boolean') {
        return this.getBoolean(key, value)
      } else if (type === 'number') {
        return this.getNumber(key, value)
      } else if (type === 'object') {
        if (value === null) {
          return this.getNull(key)
        } else if (Array.isArray(value)) {
          return this.getArray(key, value)
        } else {
          return this.getObject(key, value)
        }
      }
    },
    parseObject: function (obj) {
      if (!obj) return 'null'

      this.indentSize++
      const indent = ' '.repeat(this.indentSize * this.tabSize)
      let textList = []
      const keys = Object.keys(obj)
      keys.forEach((v) => {
        textList.push(`${indent}${this.execType(v, obj[v])}`)
      })
      this.indentSize--

      const coverIndnet = ' '.repeat(this.indentSize * this.tabSize)
      return `${coverIndnet}{${this.lineBreak}${textList.join(',' + this.lineBreak)}${this.lineBreak}${coverIndnet}}`
    },

    createObject: function (value) {
      return `${this.parseObject(value)}`
    },
    getString: function (key, value) {
      return `${key}: ${this.createString(value)}`
    },
    getNumber: function (key, value) {
      return `${key}: ${this.createNumber(value)}`
    },
    getBoolean: function (key, value) {
      return `${key}: ${this.createBoolean(value)}`
    },
    getObject: function (key, value) {
      return `${key}: ${this.createObject(value)}`
    },
    getNull: function (key, value) {
      return `${key}: null`
    },
    getArray: function (key, value) {
      let val = []
      this.indentSize++
      const indent = ' '.repeat(this.indentSize * this.tabSize)
      value.forEach((v) => {
        const type = typeof v
        if (type === 'string') {
          val.push(`${indent}${this.createString(v)}`)
        } else if (type === 'boolean') {
          val.push(`${indent}${this.createBoolean(v)}`)
        } else if (type === 'number') {
          val.push(`${indent}${this.createNumber(v)}`)
        } else if (type === 'object') {
          if (v === null) {
            val.push(`${indent}null`)
          } else if (Array.isArray(v)) {
            val.push(this.getArray(null, v))
          } else {
            val.push(this.createObject(v))
          }
        }
      })

      this.indentSize--
      const coverIndnet = ' '.repeat(this.indentSize * this.tabSize)
      return `${key}: [${this.lineBreak}${val.join(`,${this.lineBreak}`)}${this.lineBreak}${coverIndnet}]`
    }
  },
  computed: {
    _output: function () {
      this.output = ''
      this.json2JSObjectString(this.input)
      return this.output
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
