<template>
  <div class="sidebar-container">
    <!-- SideBar -->
    <aside class="sidebar">
      <nav>
        <ul class="menu">
          <li>
            <UButton
              label="Home"
              color="primary"
              variant="ghost"
              icon="i-heroicons-home"
              @click="navigateTo('/')"
            />
          </li>
          <li>
            <UButton
              label="About"
              color="primary"
              variant="ghost"
              icon="i-heroicons-information-circle"
              @click="navigateTo('/about')"
            />
          </li>
          <li>
            <UButton
              label="Settings"
              color="primary"
              variant="ghost"
              icon="i-heroicons-cog"
              @click="navigateTo('/settings')"
            />
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content (สำหรับแสดงควบคู่กับ SideBar) -->
    <main class="main-content">
        
      <slot /> <!-- ใช้ slot เพื่อให้เนื้อหาหลักจาก parent component แสดงที่นี่ -->
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // หรือ useRouter จาก Nuxt 3
const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
.sidebar-container {
  display: flex;
  height: 100vh; /* ความสูงเต็มหน้าจอ */
}

.sidebar {
  width: 250px; /* กว้างของ SideBar */
  background-color: #f8f9fa; /* สีพื้นหลัง */
  padding: 1rem;
  border-right: 1px solid #e0e0e0; /* เส้นขอบขวา */
  overflow-y: auto; /* รองรับการเลื่อนเมื่อเนื้อหายาว */
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  margin-bottom: 0.5rem;
}

.main-content {
  flex: 1; /* เนื้อหาหลักใช้พื้นที่ที่เหลือ */
  padding: 1rem;
  overflow-y: auto; /* รองรับการเลื่อน */
}
</style>