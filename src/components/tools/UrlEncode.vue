<template>
  <div class="encode-template">
    <h1>URL Encode / Decode编码转换</h1>
    <textarea class="editor-area" name="" id="" cols="30" rows="10" v-model="input"></textarea>
      <!-- <Editor :value="input" index="1" @updateValue="input = $event" /> -->
    <div class="options">
      <button class="convert-button convert-button-active" @click="convert('encode')">URL Encode</button>
      <button class="convert-button convert-button-active" @click="convert('decode')">URL Decode</button>
      <!-- <span>{{this.values.input}}</span> -->
    </div>
    <textarea class="editor-area" name="" id="" cols="30" rows="10" v-model="output"></textarea>

      <!-- <Editor :value="output" index="2" ref="outputEditor" :key="timer" @updateValue="output = $event" /> -->
  </div>
</template>

<script>

export default {
  name: "UrlEncode",
  components: {
    // Editor
  },
  data() {
    return {
      input: "",
      output: "",
      timer:""
    };
  },
  methods: {
    convert(mode) {
      if(mode == 'encode'){
        this.output = encodeURIComponent(this.input);
      }else{
        this.output = decodeURIComponent(this.input);
      }
    },
  },
  watch: {
    output(newVal){
      this.timer = new Date().getTime();
      // console.log(newVal);
      // this.outputEditor.changeData(newVal);
    }
  },
  mounted(){
    this.timer = new Date().getTime();
  }
};
</script>

<style>
.encode-template {
  display: flex;
  flex-direction: column;
  padding: 30px;
}
.editor-area {
  resize: none;
  flex: 1;
  min-height: 200px;
  border-radius: 10px;
  overflow: hidden;
  background: var(--first-assist-color);
  border: 2px solid transparent;
  padding: 10px;
  transition: all .2s ease;
}
.editor-area:focus {
  border-color:var(--accent-color);
  /* box-shadow: 0 0 10px -6px var(--accent-color); */
}.encode-template .options{
  margin: 15px 0;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}.convert-button{
  margin-right: 10px;
  border:none;
  padding: 8px 12px;
  border-radius: 10px;
  transition: all .2s ease;
}
.convert-button-active{
  background: var(--accent-color);
  color: #fff;
}
.convert-button-active:hover{
  transform: scale(1.03);
  background: var(--accent-color-opa);
  cursor: pointer;
}
.convert-button-active:active{
  background: var(--accent-color);
  /* filter: brightness(70%); */
  transform: scale(0.98);

}
</style>