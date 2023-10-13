<script setup>
import { ref } from 'vue'

const nRubik = ref('')

function rubiks() {
  alert('Hi I am Rubik')
}
function clock() {
  alert('Hi I am Clock')
}
function stop() {
  alert('STOP!')
}

</script>

<template>
 
  <div>
    <h1>Hexaturion</h1>
    
    <button @click="rubiks">Start rubiks</button><br>
    <br>

    <span> nRubik: {{ nRubik }}</span><br> 
    <br>

    <div>nRubik:

     <select v-model="nRubik">
       <option disabled value="">Please select one</option>Property 'nRubik' does not exist on type '{ $: ComponentIntern
       <option>2</option>
       <option>3</option>
       <option>4</option>
       </select>
    </div>
    <h3>_______________</h3>
    <button @click="clock">Start clock</button>
    <h3>_______________</h3>
    <button @click="stop">Stop</button>
  </div>
</template>
