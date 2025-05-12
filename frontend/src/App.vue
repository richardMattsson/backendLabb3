<script setup>
import { ref } from 'vue';
import { useLoginStore } from '@/stores/loginStore';
const loginStore = useLoginStore();

const modal = ref(false)
</script>

<template>
  <header>
    <BNavbar :toggleable="true" class="navbar-nav-scroll" v-b-color-mode="'light'" toggleable variant="light"
      style="padding-inline: 3em">
      <BNavbarToggle target="nav-scroll" />
      <BNavbarBrand href="#" variant="success">Delegator
        <img style="max-width: 50px" src="../public/crocodileLyingDown.jpg" alt="crocodile icon" />
      </BNavbarBrand>
    </BNavbar>
    <BCollapse id="nav-scroll" is-nav>
      <BNavbarNav style="padding-inline: 1.5em">
        <BNavItem to="/">Hem</BNavItem>
        <BNavItem to="/tasks">Visa Tjänster</BNavItem>
        <BNavItem to="/createtask">Skapa Tjänst</BNavItem>
        <BNavItem to="/profile">Profil</BNavItem>
        <BNavItem v-if="!loginStore.isLoggedIn" to="/login">Logga in</BNavItem>
        <BNavItem v-else @click="modal = !modal" to="/">Logga ut</BNavItem>
        <BModal v-model="modal" title="Bekräfta utloggning">
          <p>Är du säker på att du vill logga ut?</p>
          <template #footer>
            <BButton variant="secondary" @click="modal = !modal">Avbryt</BButton>
            <BButton variant="danger" @click="loginStore.logout(), modal = !modal">Logga ut</BButton>
          </template>
        </BModal>
      </BNavbarNav>
    </BCollapse>
  </header>

  <main style="padding-block: 1.5em">
    <RouterView />
  </main>
</template>

<style>
@import "primeicons/primeicons.css";
@import '@coreui/coreui-pro/dist/css/coreui.min.css';
</style>
