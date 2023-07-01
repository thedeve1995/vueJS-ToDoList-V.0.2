<template lang="">
    <h1 style="
    font-size:30px;
    text-align:center;
    margin-top: 20px;
    font-weight:700;
    color:burlywood;
    ">
      Tugas Yang Telah Di Selesaikan</h1> 
    <div class="container">
      <div 
      v-for="task in tasks"
      :class="{'has-background-success-light' : task.done}"
      class="card">
        <div class="card-content">
          <div class="content">
            <div :class="{'line-through' : task.done}">
              <h2 id="jobDone"></h2>
              <h3>{{ task.content }} </h3>
              
              <br>

              <span style="color:black;background-color:#F86F03;padding:5px 10px;border-radius:10px;">
              Author : {{task.author}}</span>

              <br><br>

              <span style="color:black;background-color:#FFA41B;padding:5px 10px;border-radius:10px;">
              Waktu : {{task.time}}</span>

              <br><br>

              <span style="color:black;background-color:#FFF6F4;padding:5px 10px;border-radius:10px;">
              Deadline : {{task.deadline}}</span>

            </div>
            <div class="btn-group">
                <button 
                @click="toggleDone(task.id)"
                :class="task.done ? 'is-success' : 'is-light'"
                class="button">
                {{ task.done ? 'Cancel' : 'Done ?' }}
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
  
  // Import dan inisialisasi Firebase

  const tasksCollectionQuery = query(collection(db, "selesai"), orderBy("time", "desc"), limit(10));
  const tasks = ref([]);

  // Fungsi-fungsi untuk mengelola tugas

  onMounted(() => {
    onSnapshot(tasksCollectionQuery, (querySnapshot) => {
      const fbTasks = [];
      querySnapshot.forEach((doc) => {
        const task = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done,
          time: doc.data().time,
          author: doc.data().author,
          deadline: doc.data().deadline,
        };
        fbTasks.push(task);
      });
      tasks.value = fbTasks;
    });
  });

  // Fungsi-fungsi untuk menambahkan, menghapus, dan mengubah status tugas
 

  const addTodo = () => {
    addDoc(collection(db, "selesai"), {
      content: newTodo.value,
      done: done,
      time: new Date().toLocaleString(),
      author: author.value,
      deadline: deadline.value
    });
    tasks.value.unshift()
    
  }

  const deleteTodo = id => {
    deleteDoc(doc(db, "selesai", id));
  }

  const toggleDone = id => {
    const index = tasks.value.findIndex(task => task.id === id);
    updateDoc(doc(collection(db, "selesai"), id), {
      done: !tasks.value[index].done
    });
  }
</script>

<style scoped>

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
  justify-content: center;
}
</style>
