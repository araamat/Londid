/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ReturnImport } from './routes/return'
import { Route as LoginImport } from './routes/login'
import { Route as ItemImport } from './routes/item'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const ReturnRoute = ReturnImport.update({
  path: '/return',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ItemRoute = ItemImport.update({
  path: '/item',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/item': {
      preLoaderRoute: typeof ItemImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/return': {
      preLoaderRoute: typeof ReturnImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ItemRoute,
  LoginRoute,
  ReturnRoute,
])

/* prettier-ignore-end */
