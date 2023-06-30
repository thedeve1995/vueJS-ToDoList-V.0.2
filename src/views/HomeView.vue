<template lang="">
  <form @submit.prevent="addTodo">
      <div class="input-form">
        <div class="field has-addons">
          <div class="control">
            <input v-model="newTodo" class="input" type="text" placeholder="Add A Task" />
          </div>
          <div class="control">
            <button :disabled="!newTodo" class="button is-info">
               Add
            </button>
          </div>
        </div>
      </div>
  </form>

  
    <div class="container">
      <div 
      v-for="todo in todos"
      class="card">
        <div class="card-content">
          <div class="content">
            {{ todo.content }}
            <div class="btn-group">
                <button class="button is-light">
                  &check;
                </button>
                <button class="button is-danger">
                  &cross;
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
</template>
<script setup>
  import { ref } from 'vue';
  import { v4 as uuidv4 } from 'uuid';

  const todos = ref ([
    {
      id: 'id1',
      content: 'shave my butt',
      done: false
    },
    {
      id: 'id2',
      content: 'washing clotch',
      done: false
    },
    {
      id: 'id3',
      content: 'Coding a project',
      done: false
    },
  ])

  const newTodo= ref('')

  const addTodo = () => {
    const newTo ={
      id: uuidv4(),
      content:newTodo.value,
      done:false,
    }
    todos.value.unshift(newTo)
    newTodo.value=''
  }
</script>
<style>
.input-form{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (min-width:1000px) {
  .container{
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }
}

.card{
  margin-top: 20px;
  width: 300px;
  
}

.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.content .btn-group{
  width: 100px;
  display: flex;
  justify-content: space-between;
}
</style>
