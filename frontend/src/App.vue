<script setup></script>

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

<style scoped></style>
