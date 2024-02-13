import { createRouter, createWebHistory } from 'vue-router'

import ProductType from '@/views/ProductType.vue'
import ProductTypeUpdate from '@/views/ProductTypeUpdate.vue'
import Product from '@/views/Product.vue'
import ProductStatus from '@/views/ProductStatus.vue'
import ProductStatusUpdate from "@/views/ProductStatusUpdate.vue";
import ProductUpdate from "@/views/ProductUpdate.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'product',
      component: Product,
    },
    {
      path: '/product/:id',
      name: 'product-update',
      component: ProductUpdate,
    },
    {
      path: '/type',
      name: 'type',
      component: ProductType,
    },
    {
      path: '/type/:id',
      name: 'type-update',
      component: ProductTypeUpdate,
    },
    {
      path: '/status',
      name: 'status',
      component: ProductStatus,
    },
    {
      path: '/status/:id',
      name: 'status-update',
      component: ProductStatusUpdate,
    },
  ]
})

export default router
