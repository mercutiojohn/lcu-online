<template>
  <div
    :id="'monaco-container-' + index"
    ref="monacoEditor"
    class="monaco-container"
    @keyup="$emit('updateValue', getValue())"
  ></div>
</template>
<style>
.monaco-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
.monaco-editor {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
<script>
import * as monaco from "monaco-editor";
export default {
  name: "Editor",
  props: {
    value: String,
    index: String,
  },
  data() {
    return {
      editValue:""
    };
  },
  watch: {
    value(newVal) {
      console.log("watched: "+newVal);
      this.changeData(newVal);
    },
  },
  methods: {
    getValue() {
      return this.monacoEditor.getValue();
    },
    changeData(data) {
      // 更改editor内容
      console.log("changed to: "+ data);
      this.monacoEditor.setValue(data);
      this.monacoEditor.getAction("editor.action.formatDocument")._run();
    },
    destroyEditor() {
      // 销毁编辑器
      this.monacoEditor.dispose();
    },
    saveEditor() {
      this.oldValue = this.monacoEditor.getValue();
      // ...保存逻辑
    },
    changeModel() {
      var oldModel = this.monacoEditor.getModel(); //获取旧模型
      var value = this.monacoEditor.getValue(); //获取旧的文本
      //创建新模型，value为旧文本，id为modeId，即语言（language.id）
      //modesIds即为支持语言
      //var modesIds = monaco.languages.getLanguages().map(function(lang) { return lang.id; });
      var newModel = monaco.editor.createModel(value, id);
      //将旧模型销毁
      if (oldModel) {
        oldModel.dispose();
      }
      //设置新模型
      this.editor.setModel(newModel);
    },
  },
  mounted() {
    this.editValue = this.value.toString();
    this.monacoEditor = monaco.editor.create(
      document.getElementById("monaco-container-" + this.index),
      {
        value: this.value,
        // readOnly: true,
        // language: 'java',
        theme: "vs-dark",
        automaticLayout: true,
        // selectOnLineNumbers: true,//显示行号
        // roundedSelection: false,
        // readOnly: false,        // 只读
        // cursorStyle: 'line',        //光标样式
        // automaticLayout: false, //自动布局
        // glyphMargin: true,  //字形边缘
        // useTabStops: false,
        // fontSize: 28,       //字体大小
        autoIndent: true, //自动布局
        // quickSuggestionsDelay: 500,   //代码提示延时
      }
    );
    // this.monacoEditor.onKeyUp(() => {
    //     // 当键盘按下，判断当前编辑器文本与已保存的编辑器文本是否一致
    //     if(this.monacoEditor.getValue() != this.oldValue){
    //         this.isSave = false;
    //         this.saveEditor();
    //         // this.$emit("value",this.getValue());
    //     }
    // });
  },
};
</script>


