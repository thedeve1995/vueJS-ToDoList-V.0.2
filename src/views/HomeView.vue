<template lang="">
  <h1 style="
    font-size:30px;
    text-align:center;
    margin-top: 20px;
    font-weight:700;
    color:burlywood;
    ">
      DAFTAR TUGAS</h1> 
  <form @submit.prevent="addTodo">
      <div class="input-form">
        <div class="field has-addons">
          <div class="control">
            <input v-model="newTodo" class="input" type="text" placeholder="Add A Task" />
          </div>
          <div class="control">
            <input v-model="author" class="input" type="text" placeholder="Your Name" />
          </div>
          <div class="control">
            <input title="Deadline" v-model="deadline" class="input" type="date" placeholder="Deadline" />
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
            <div :class="{'line-through' : todo.done}">
              <h2 id="jobDone"></h2>
              <h3>{{ todo.content }} </h3>
              
              <br>

              <span style="color:black;background-color:#F86F03;padding:5px 10px;border-radius:10px;">
              Author : {{todo.author}}</span>

              <br><br>

              <span style="color:black;background-color:#FFA41B;padding:5px 10px;border-radius:10px;">
              Waktu : {{todo.time}}</span>

              <br><br>

              <span style="color:black;background-color:#FFF6F4;padding:5px 10px;border-radius:10px;">
              Deadline : {{todo.deadline}}</span>

            </div>
            <div class="btn-group">
                <button 
                @click="toggleDone(todo.id)"
                :class="todo.done ? 'is-success' : 'is-light'"
                class="button">
                {{ todo.done ? 'Cancel' : 'Done ?' }}
                </button>
                <button @click="deleteTodo(todo.id)" class="button is-danger">
                  Delete
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import { collection, 
        onSnapshot, 
        getFirestore,
        getDocs,
        addDoc,
        getDoc,
        deleteDoc,
        doc,
        updateDoc, 
        query, 
        orderBy, 
        limit} from "firebase/firestore"; 
  import { db } from '@/firebase'
  
  const todosCollectionQuery = query(collection(db, "todos"), orderBy("time", "desc"), limit(10));
  const todos = ref ([])

  onMounted(()=>{
    onSnapshot(todosCollectionQuery, (querySnapshot) => {
      const fbTodos = [];
      querySnapshot.forEach((doc) => {
        const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
        time: doc.data().time,
        author: doc.data().author,
        deadline: doc.data().deadline
      }

      fbTodos.push(todo)
      });
      todos.value = fbTodos
    });

  })

  const newTodo= ref('')
  const author= ref('')
  const deadline= ref('')

 

  const addTodo = () => {
    addDoc(collection(db, "todos"), {
      content: newTodo.value,
      done: false,
      time: new Date().toLocaleString(),
      author: author.value,
      deadline: deadline.value
    });
    todos.value.unshift()
    newTodo.value=''
  }

  const deleteTodo = async id => {
  const deletedTask = await getDoc(doc(db, "todos", id));
  if (deletedTask.exists()) {
    const deletedData = deletedTask.data();
    await addDoc(collection(db, "selesai"), deletedData);
    deleteDoc(doc(db, "todos", id));
  }
}


  const toggleDone = id => {
    const index = todos.value.findIndex(todo => todo.id === id);
    updateDoc(doc(collection(db, "todos"), id), {
      done: !todos.value[index].done
    });
  }
</script>

<style>

.card:hover{
  transform: translateX(2px);
  transform: rotateY(4deg);
  background-color: rgb(172, 184, 184);
  transition: 0.3s ease;
  box-shadow: 2px 2px 15px rgb(7, 6, 6);
}

.card {
  background-color: burlywood;
}

.card h3{
  color: black;
  text-align: center;
}

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
  width: 200px;
  display: flex;
  justify-content: space-between;
}
</style>
