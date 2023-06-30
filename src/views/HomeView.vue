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
      :class="{'has-background-success-light' : todo.done}"
      class="card">
        <div class="card-content">
          <div class="content">
            <div 
            :class="{'has-text-success line-through' : todo.done}">{{ todo.content }}</div>
            <div class="btn-group">
                <button 
                @click="toggleDone(todo.id)"
                :class="todo.done ? 'is-success' : 'is-light'"
                class="button">
                  &check;
                </button>
                <button @click="deleteTodo(todo.id)" class="button is-danger">
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
    // {
    //   id: 'id1',
    //   content: 'shave my butt',
    //   done: false
    // },
    // {
    //   id: 'id2',
    //   content: 'washing clotch',
    //   done: false
    // },
    // {
    //   id: 'id3',
    //   content: 'Coding a project',
    //   done: false
    // },
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

  const deleteTodo = id => {
    todos.value =todos.value.filter(todo => todo.id !==id)
  }

  const toggleDone = id => {
    const index = todos.value.findIndex(todo => todo.id === id)
    todos.value[index].done = !todos.value[index].done
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

.line-through{
  text-decoration: line-through;
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
