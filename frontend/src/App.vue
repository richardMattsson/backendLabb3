<script setup>
import { useLoginStore } from '@/stores/loginStore';
const loginStore = useLoginStore();
</script>

<template>
  <header>
    <BNavbar
      :toggleable="true"
      class="navbar-nav-scroll"
      v-b-color-mode="'light'"
      toggleable
      variant="light"
      style="padding-inline: 2.5em"
    >
      <BNavbarToggle target="nav-scroll" />
      <BNavbarBrand href="#" variant="success"
        >Delagator
        <img
          style="max-width: 50px"
          src="../public/crocodileLyingDown.jpg"
          alt="crocodile icon"
        />
      </BNavbarBrand>
    </BNavbar>
    <BCollapse id="nav-scroll" is-nav>
      <BNavbarNav style="padding-inline: 1.5em">
        <BNavItem to="/">Hem</BNavItem>
        <BNavItem to="/tasks">Visa Tjänster</BNavItem>
        <BNavItem to="/createtask">Skapa Tjänst</BNavItem>
        <BNavItem to="/profile">Profil</BNavItem>
        <BNavItem v-if="!loginStore.isLoggedIn" to="/login">Logga in</BNavItem>
        <BNavItem v-else to="/login">Logga ut</BNavItem>
      </BNavbarNav>
    </BCollapse>
  </header>

  <main style="padding-block: 1.5em">
    <RouterView />
  </main>
</template>

<style>
@import 'primeicons/primeicons.css';
</style>
