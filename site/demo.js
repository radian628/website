import {EditorState, EditorView, basicSetup} from "@codemirror/next/basic-setup"
import {javascript} from "@codemirror/next/lang-javascript"
import {autocomplete} from "@codemirror/next/autocomplete"

let jsCompletions = "break case catch class const continue debugger default delete do else enum export extends false finally for function if implements import interface in instanceof let new package private protected public return static super switch this throw true try typeof var void while with yield".split(" ")
    .concat(Object.getOwnPropertyNames(window))

let state = EditorState.create({doc: `function hello(who = "world") {
  console.log(\`Hello, \${who}!\`)
}`, extensions: [
  ...basicSetup,
  javascript(),
  autocomplete({
    override(state, pos, cx) {
      let prefix = /[\w$]*$/.exec(state.doc.slice(Math.max(0, pos - 30), pos))[0]
      if (!prefix) return []
      return jsCompletions.filter(str => cx.filter(str, prefix))
        .map(str => ({label: str, start: pos - prefix.length, end: pos}))
    }
  })
]})

let view = window.view = new EditorView({state, parent: document.querySelector("#editor")})
