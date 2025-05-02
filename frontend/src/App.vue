<script setup></script>

<template>
  <header>
    <BNavbar :toggleable="true" class="navbar-nav-scroll">
      <BNavbarToggle target="nav-scroll" />
      <BCollapse id="nav-scroll" is-nav>
        <BNavbarNav>
          <BNavItem to="/">Hem</BNavItem>
          <BNavItem to="/tasks">Visa Tjänster</BNavItem>
          <BNavItem to="/createtask">Skapa Tjänst</BNavItem>
          <BNavItem to="/profile">Profil</BNavItem>
        </BNavbarNav>
      </BCollapse>
      <!-- <BNavbarBrand href="#">Grupp3Projekt</BNavbarBrand> -->
    </BNavbar>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>
@import "primeicons/primeicons.css";
</style>
