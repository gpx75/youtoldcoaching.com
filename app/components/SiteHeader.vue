<script setup lang="ts">
const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Stands For', to: '/what-youtold-stands-for' },
  { label: 'Philosophy', to: '/youtold-philosophy' },
  { label: 'Entry Point', to: '/your-entry-point' },
  { label: 'Leadership Path', to: '/youtold-leadership-path' },
  { label: 'About Moya', to: '/about-moya' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Call to Action', to: '/call-to-action' },
]

const route = useRoute()
const isActive = (to: string) => {
  if (to === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(to)
}
</script>

<template>
  <header class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow"
        >
          <li v-for="item in navigation" :key="item.to + '-dropdown'">
            <NuxtLink :to="item.to" :class="{ 'active': isActive(item.to) }">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        You Told
      </NuxtLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal flex flex-row flex-wrap items-center px-1">
        <li v-for="item in navigation" :key="item.to + '-desktop'">
          <NuxtLink :to="item.to" :class="{ 'active': isActive(item.to) }">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <NuxtLink to="/your-entry-point" class="btn btn-secondary rounded-full">
        Book your Leadership Story Session
      </NuxtLink>
    </div>
  </header>
</template>
