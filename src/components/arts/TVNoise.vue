<template>
  <div class="TVNoise">
      <code>
      </code>
  </div>
</template>

<script>
export default {
    name:"TVNoise"
}
</script>

<style>
@property --length {
  syntax: '<length>';
  inherits: false;
  initial-value: 0.0008px;
}

div.TVNoise {
    width: 100%;
    height: 200px;
    margin: auto;
}

div.TVNoise {
    background-image: repeating-radial-gradient(
        circle at -100% -1000%,
        rgb(4, 4, 0),
        rgb(52, 72, 197),
        rgb(115, 252, 224),
        rgb(116, 71, 5),
        rgb(223, 46, 169),
        rgb(255, 255, 255),
        rgb(193, 255, 214),
        rgb(255, 255, 255) var(--length)
    );
    animation: change 1s infinite alternate;
}

@keyframes change {
    100% {
        --length: 0.0009px;
    }
}

</style>