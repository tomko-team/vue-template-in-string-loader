import { findComponentProperty } from "./find-component-property"

describe("Tests of 'findComponentProperty'", () => {
  test("Simple 'template'", () => {
    const source = `export default {
      template
    }
    `
    const result = findComponentProperty(source)
    expect(result).toBeDefined()
    expect(result!.code).toBe("template")
    expect(source.substr(result!.start, result!.code.length)).toBe(result!.code)
  })

  test("Simple 'template' with trailing comma", () => {
      const source = `
export default {
    template,
  }
      `
      const result = findComponentProperty(source)
      expect(result).toBeDefined()
      expect(result!.code).toBe("template")
      expect(source.substr(result!.start, result!.code.length)).toBe(result!.code)
    })

  test("True code", () => {
      const source = `
export default createComponent({
    name: "FirstComp",
    template,
    setup() {
      const state = reactive({
        val: 0,
      })
      return {
        inc: () => ++state.val,
        state,
      }
    },
  })
      `
      const result = findComponentProperty(source)
      expect(result).toBeDefined()
      expect(result!.code).toBe("template")
      expect(source.substr(result!.start, result!.code.length)).toBe(result!.code)
    })

  test("Prompt template declaration to property", () => {
    const source = `export default {
      template: /*  html */\`<p>ab</p>\`
    }
    `
    const result = findComponentProperty(source)
    expect(result).toBeDefined()
    expect(result!.code).toBe("template: /*  html */\`<p>ab</p>\`")
    expect(source.substr(result!.start, result!.code.length)).toBe(result!.code)
  })
})
