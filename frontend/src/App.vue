<script setup></script>

<template>
  <header>
    <BNavbar
      :toggleable="true"
      class="navbar-nav-scroll"
      v-b-color-mode="'light'"
      toggleable
      variant="light"
    >
      <BNavbarToggle target="nav-scroll" />
      <BNavbarBrand href="#" variant="success"
        >Delagator
        <img
          style="max-width: 50px"
          src="../public/crocodileLyingDown.jpg"
          alt=""
      /></BNavbarBrand>
    </BNavbar>
    <BCollapse id="nav-scroll" is-nav>
      <BNavbarNav>
        <BNavItem to="/">Hem</BNavItem>
        <BNavItem to="/tasks">Visa Tjänster</BNavItem>
        <BNavItem to="/createtask">Skapa Tjänst</BNavItem>
        <BNavItem to="/profile">Profil</BNavItem>
        <BNavItem to="/login">Logga in / Logga ut</BNavItem>
      </BNavbarNav>
    </BCollapse>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>
@import 'primeicons/primeicons.css';
</style>
