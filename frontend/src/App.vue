<script setup>
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';
import TestComponent from './components/TestComponent.vue';
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink to="/">Hem</RouterLink>
        </li>
        <li>
          <RouterLink to="/categories">Kategorier</RouterLink>
        </li>
        <li>
          <RouterLink to="/createtask">Skapa tjänst</RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <main>
    <RouterView />
    <!-- <TheWelcome /> -->
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
